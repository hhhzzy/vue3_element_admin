const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    productionSourceMap: true,
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src') // 配置文件路径
            }
        },
        externals: [
            {
                './cptable': 'var cptable'
            }
        ],
        devtool: 'source-map',
        plugins: [require('unplugin-vue-define-options/webpack')()]
    },
    chainWebpack: config => {
        // 设置 svg-sprite-loader
        config.module.rule('svg').exclude.add(resolve('src/icons/svg')).end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    },
    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://www.mock.com', // 对应自己的接口
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        },
        open: true
    }
}
