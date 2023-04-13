import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import EslintPlugin from 'vite-plugin-eslint'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        EslintPlugin({
            cache: false,
            include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'] // 检查的文件
        }),
        createSvgIconsPlugin({
            // 导入所有的icons
            iconDirs: [path.resolve(process.cwd(), 'src/icons')],
            // 指定symbolId格式
            symbolId: 'icon-[dir]-[name]'
        })
    ],
    css: {
        preprocessorOptions: {
            less: {
                additionalData: '@import "./src/styles/var.less";',
                javascriptEnabled: true
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            path: 'path-browserify'
        }
    },
    server: {
        port: 8080,
        https: false,
        proxy: {
            // 选项写法
            '/api': {
                target: 'http://www.mock.com',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    }
})
