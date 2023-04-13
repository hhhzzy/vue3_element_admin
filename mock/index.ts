// 引入mock
import Mock from 'mockjs'
import * as user from './user/user'
import * as table from './table/table'
import * as upload from './upload/upload'
// 设置延迟时间
Mock.setup({
    timeout: 2000
})

Mock.mock('http://www.mock.com/api/login', 'post', req => {
    console.log(req)
    return user.tokens['editor']
})

Mock.mock('http://www.mock.com/api/getUserInfo', 'post', req => {
    const reqBody = JSON.parse(req.body)
    console.log(reqBody)
    return user.users[reqBody.token]
})
Mock.mock('http://www.mock.com/api/table/getList', 'post', req => {
    const body = JSON.parse(req.body)
    const pageSize = body.pageSize
    const currentPage = body.currentPage
    let list = table.table
    // 作者名字过滤
    if (body.author) {
        list = list.filter(item => item.author.indexOf(body.author) >= 0)
    }
    // 权重过滤
    if (body.importance) {
        list = list.filter(item => item.importance === Number(body.importance))
    }
    const pageList = list.filter((item, index) => index < pageSize * currentPage && index >= pageSize * (currentPage - 1))
    console.log(body, pageList)
    return {
        code: 1,
        message: '成功！',
        data: {
            total: list.length,
            list: pageList,
            pageSize: pageSize,
            currentPage: currentPage
        }
    }
})
Mock.mock('http://www.mock.com/api/upload', 'post', req => {
    console.log(req)
    // const reqBody = JSON.parse(req.body)
    return upload
})
