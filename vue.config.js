const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
// cdn配置
const cdn = {
    // 排除的打包项
    externals: {
        vue: 'Vue',
        'element-plus': 'ElementPlus'
    },
    css: ['https://cdn.bootcdn.net/ajax/libs/element-plus/2.3.3/index.css'],
    js: ['https://cdn.bootcdn.net/ajax/libs/vue/3.2.47/vue.global.js', 'https://cdn.bootcdn.net/ajax/libs/element-plus/2.3.3/index.full.js']
}
// 判断线上环境才需要配置cdn
const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
    productionSourceMap: true,
    // bable默认不编译node_modules文件，通过数组设置需要编译的文件
    transpileDependencies: ['@arcgis/core', '@esri'],
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src') // 配置文件路径
            }
        },
        externals: isProduction
            ? cdn.externals
            : {
                  './cptable': 'var cptable' // xlsx-style需要依赖于cptable，但是这个很大而且只有特殊情况才会使用，所以我们可以在打包的时候排除他
              },
        devtool: 'source-map',
        plugins: [require('unplugin-vue-define-options/webpack')()],
        optimization: {
            // 分包
            splitChunks: {
                chunks: 'async', // 只处理异步 chunk，这里两个缓存组都另配了 chunks，那么就被无视了
                minSize: 30000, // 允许新拆出 chunk 的最小体积
                maxSize: 0, // 旨在与 HTTP/2 和长期缓存一起使用。它增加了请求数量以实现更好的缓存。它还可以用于减小文件大小，以加快二次构建速度。
                minChunks: 1, // 拆分前被 chunk 公用的最小次数
                maxAsyncRequests: 5, // 每个异步加载模块最多能被拆分的数量
                maxInitialRequests: 3, // 每个入口和它的同步依赖最多能被拆分的数量
                automaticNameDelimiter: '~',
                cacheGroups: {
                    // 缓存组
                    vendors: {
                        name: `chunk-vendors`,
                        test: /[\\/]node_modules[\\/]/,
                        priority: 1, // 缓存组权重，数字越大优先级越高
                        chunks: 'all', // 只处理初始 chunk
                        reuseExistingChunk: true,
                        enforce: true
                    },
                    mock: {
                        name: `chunk-mock`,
                        test: /[\\/]node_modules[\\/]mockjs[\\/]/,
                        chunks: 'all',
                        priority: 3,
                        reuseExistingChunk: true,
                        enforce: true
                    },
                    xlsx: {
                        name: `chunk-xlsx`,
                        test: /[\\/]node_modules[\\/]xlsx[\\/]/,
                        chunks: 'all',
                        priority: 3,
                        reuseExistingChunk: true,
                        enforce: true
                    },
                    xlsxStyle: {
                        name: `chunk-xlsx-style`,
                        test: /[\\/]node_modules[\\/]xlsx-style[\\/]/,
                        chunks: 'all',
                        priority: 3,
                        reuseExistingChunk: true,
                        enforce: true
                    },
                    common: {
                        name: `chunk-common`,
                        minChunks: 2, // common 组的模块必须至少被 2 个 chunk 共用 (本次分割前)
                        priority: 5,
                        chunks: 'initial', // 只针对同步 chunk
                        reuseExistingChunk: true // 复用已被拆出的依赖模块，而不是继续包含在该组一起生成
                    }
                }
            }
        }
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
        // 加入需要打包的cdn插件
        config
            .plugin('html')
            .tap(args => {
                if (isProduction) args[0].cdn = cdn
                return args
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
