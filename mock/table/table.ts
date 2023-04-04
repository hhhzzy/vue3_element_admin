import Mock from 'mockjs'
const count = 200
const List: any = []
const baseContent = '<p>这是备注!!!!</p>'

for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: i + 1,
            author: '@first',
            title: '@title(5, 10)',
            content: baseContent,
            importance: '@integer(1, 3)',
            display_time: '@datetime',
            pageviews: '@integer(300, 5000)',
            lastName: '@last',
            firstName: '@first',
            name: '@first' + '@last',
            address: '@region' + '@city()',
            ip: '@ip'
        })
    )
}
export const table = List
