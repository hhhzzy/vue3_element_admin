import { saveAs } from 'file-saver'
import { WorkBook, WorkSheet } from 'xlsx'
import * as XLSX from 'xlsx'
import XLSXStyle from 'xlsx-js-style'
import http from '@/utils/http'

interface ICell {
    v: Date | number | boolean | string
    t: string
    z: string
}

class Workbook implements WorkBook {
    SheetNames: string[] = []
    Sheets: { [sheet: string]: WorkSheet } = {}
}

const generateArray = (table: HTMLElement) => {
    const out = []
    const rows = table.querySelectorAll('tr')
    const i = table.querySelectorAll('.el-table-column--selection').length ? 1 : 0
    const ranges = []
    for (let R = 0; R < rows.length; ++R) {
        const outRow = []
        const row = rows[R]
        // 查询出所有的td和th
        const columns = row.querySelectorAll('td,th')
        for (let C = i; C < columns.length; ++C) {
            const cell = columns[C]
            const colspanStr = cell.getAttribute('colspan')
            const rowspanStr = cell.getAttribute('rowspan')
            let colspan
            let rowspan
            if (colspanStr) {
                colspan = parseInt(colspanStr)
            }
            if (rowspanStr) {
                rowspan = parseInt(rowspanStr)
            }
            const cellValue = (cell as any).innerText
            // Skip ranges
            ranges.forEach(function (range) {
                if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
                    for (let i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null)
                }
            })
            // Handle Row Span
            if (rowspan || colspan) {
                rowspan = rowspan || 1
                colspan = colspan || 1
                ranges.push({
                    s: {
                        r: R,
                        c: outRow.length
                    },
                    e: {
                        r: R + rowspan - 1,
                        c: outRow.length + colspan - 1
                    }
                })
            }
            // Handle Value
            outRow.push(cellValue !== '' ? cellValue : null)
            // Handle Colspan
            if (colspan) {
                for (let k = 0; k < colspan - 1; ++k) {
                    outRow.push(null)
                }
            }
        }
        out.push(outRow)
    }
    return [out, ranges]
}

const datenum = (date: Date) => {
    return (+date - +new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
}

const sheetFromDataArray = (data: any) => {
    const ws: { [key: string]: any } = {}
    const range = {
        s: {
            c: 10000000,
            r: 10000000
        },
        e: {
            c: 0,
            r: 0
        }
    }
    for (let R = 0; R !== data.length; ++R) {
        for (let C = 0; C !== data[R].length; ++C) {
            if (range.s.r > R) range.s.r = R
            if (range.s.c > C) range.s.c = C
            if (range.e.r < R) range.e.r = R
            if (range.e.c < C) range.e.c = C
            const cell: ICell = {
                v: data[R][C],
                t: '',
                z: ''
            }
            if (cell.v == null) continue
            const cellRef = XLSX.utils.encode_cell({
                c: C,
                r: R
            })
            if (typeof cell.v === 'number') cell.t = 'n'
            else if (typeof cell.v === 'boolean') cell.t = 'b'
            else if (cell.v instanceof Date) {
                cell.t = 'n'
                cell.z = XLSX.SSF.get_table()[14]
                cell.v = datenum(cell.v)
            } else cell.t = 's'
            ws[cellRef] = cell
        }
    }
    if (range.s.c < 10000000) {
        ws['!ref'] = XLSX.utils.encode_range(range)
    }
    return ws
}

const s2ab = (s: string) => {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xff
    }
    return buf
}
/**
 * 格式化数组对象为数组数组：[{a:'1',b:'2'}] => [[1,2]]
 * @param filterKeys 对象的key
 * @param jsonData 目标数组对象
 * @returns
 */
const formatJsonToArray = (filterKeys: any, jsonData: any) => {
    return jsonData.map((data: any, i: number) =>
        filterKeys.map((key: string) => {
            if (key === 'index') {
                return i + 1
            } else {
                return data[key]
            }
        })
    )
}
export const useExport = () => {
    //
    const methods = {
        /**
         * 通过table的ID导出多级表头
         * @param id table的id
         * @param filename 导出文件名称
         * @param bookType 导出文件格式
         */
        exportTable2Excel: (id: string, filename = 'Excel', bookType = 'xlsx') => {
            const theTable = document.getElementById(id)
            if (theTable) {
                const oo = generateArray(theTable)
                const ranges = oo[1]

                /* original data */
                const data = oo[0]
                const wsName = 'SheetJS'

                const wb = new Workbook()
                const ws = sheetFromDataArray(data)
                console.log(oo, ws, ranges)

                /* add ranges to worksheet */
                // ws['!cols'] = ['apple', 'banan']
                ws['!merges'] = ranges

                /* add worksheet to workbook */
                wb.SheetNames.push(wsName)
                wb.Sheets[wsName] = ws

                const wbout = XLSX.write(wb, {
                    bookType: 'xlsx',
                    bookSST: false,
                    type: 'binary'
                })

                saveAs(
                    new Blob([s2ab(wbout)], {
                        type: 'application/octet-stream'
                    }),
                    `${filename}.${bookType}`
                )
            }
        },
        /**
         * 通过json文件导出表格
         * @param header 表头数组
         * @param jsonData 需要导出json数据
         * @param multiHeader 多级表头数组，格式为[[],[]]
         * @param merges 合并策略
         * @param filterVal 导出json数据的key值
         * @param filename 导出文件名称
         * @param autoWidth 是否自动宽度
         * @param bookType 导出文件后缀
         */
        exportJson2Excel: (
            jsonData: any,
            header: string[],
            multiHeader: string[][] = [],
            merges: any[] = [],
            filterVal: string[] = [],
            filename = 'Excel',
            autoWidth = true,
            bookType = 'xlsx'
        ) => {
            // 格式化json数据为[[],[]]
            const data = formatJsonToArray(filterVal, jsonData)
            data.unshift(header)
            for (let i = multiHeader.length - 1; i > -1; i--) {
                data.unshift(multiHeader[i])
            }

            const wsName = 'SheetJS'
            const wb = new Workbook()
            const ws = sheetFromDataArray(data)

            if (merges.length > 0) {
                if (!ws['!merges']) {
                    ws['!merges'] = []
                }
                merges.forEach(item => {
                    ws['!merges'].push(XLSX.utils.decode_range(item))
                })
            }

            if (autoWidth) {
                // 设置worksheet每列的最大宽度
                const colWidth = data.map((row: any) =>
                    row.map((val: any) => {
                        // 先判断是否为 null/undefined
                        if (val == null) {
                            return {
                                wch: 10
                            }
                            // 再判断是否为中文
                        } else if (val.toString().charCodeAt(0) > 255) {
                            return {
                                wch: val.toString().length * 3
                            }
                        } else {
                            return {
                                wch: val.toString().length
                            }
                        }
                    })
                )
                // 以第一行为初始值
                const result = colWidth[0]
                for (let i = 1; i < colWidth.length; i++) {
                    for (let j = 0; j < colWidth[i].length; j++) {
                        if (result[j].wch < colWidth[i][j].wch) {
                            result[j].wch = colWidth[i][j].wch
                        }
                    }
                }
                ws['!cols'] = result
            }
            // ws['A1'].s = {									// 为某个单元格设置单独样式
            //     font: {
            //         name: '宋体',
            //         bold: true
            //     },
            //     alignment: { horizontal: 'center', vertical: 'center', wrap_text: true }
            // }
            for (const b in ws) {
                if (b !== '!ref') {
                    ws[b].s = {
                        font: {
                            name: '宋体',
                            bold: true
                        },
                        alignment: { horizontal: 'center', vertical: 'center', wrap_text: true }
                    }
                }
            }
            // Add worksheet to workbook
            wb.SheetNames.push(wsName)
            wb.Sheets[wsName] = ws

            // const wbout = XLSX.write(wb, {
            //     bookType: bookType as any,
            //     bookSST: false,
            //     type: 'binary'
            // })
            const wbout = XLSXStyle.write(wb, {
                bookType: bookType as any,
                bookSST: false,
                type: 'binary'
            })

            saveAs(
                new Blob([s2ab(wbout)], {
                    type: 'application/octet-stream'
                }),
                `${filename}.${bookType}`
            )
        },
        /**
         * 文件流导出excel
         * @param url 请求地址
         * @param name 导出文件名称
         * @param bookType 导出文件类型
         * @returns 返回一个Promise
         */
        exportFileStream2Excel: (url: string, name = 'Excel', bookType = 'xlsx') => {
            return new Promise((resolve, reject) => {
                http.post(url, {}, { responseType: 'blob' })
                    .then(res => {
                        if (res.code === 1) {
                            const blob = new Blob([res.data as any], {
                                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
                            })
                            const fileName = `${name}.${bookType}`
                            if ('download' in document.createElement('a')) {
                                // 非IE下载
                                const elink = document.createElement('a')
                                elink.download = fileName
                                elink.style.display = 'none'
                                elink.href = URL.createObjectURL(blob)
                                document.body.appendChild(elink)
                                elink.click()
                                URL.revokeObjectURL(elink.href) // 释放URL 对象
                                document.body.removeChild(elink)
                            } else {
                                // IE10+下载
                                ;(navigator as any).msSaveBlob(blob, fileName)
                            }
                        }
                        resolve(true)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
    }
    return {
        methods
    }
}
