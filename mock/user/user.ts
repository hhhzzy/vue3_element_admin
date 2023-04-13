export const users = {
    'admin-token': {
        code: 200,
        message: '请求成功',
        data: {
            roles: ['admin'],
            introduction: 'I am a super administrator',
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            name: '超级管理员'
        }
    },
    'editor-token': {
        code: 200,
        message: '请求成功',
        data: {
            roles: ['editor'],
            introduction: 'I am an editor',
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            name: '普通用户'
        }
    }
}
export const tokens = {
    admin: {
        code: 200,
        message: '请求成功',
        data: {
            token: 'admin-token'
        }
    },
    editor: {
        code: 200,
        message: '请求成功',
        data: {
            token: 'editor-token'
        }
    }
}
