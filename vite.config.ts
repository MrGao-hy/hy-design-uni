import { defineConfig } from 'vite'
import { resolve } from 'path'
import Uni from '@uni-helper/plugin-uni'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import { visualizer } from 'rollup-plugin-visualizer'
import { useUniPages } from './src/composables/useUniPages'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        UniPages(useUniPages),
        Uni({
            vueOptions: {
                templateCompilerOptions: {
                    isNativeTag: () => false,
                    isBuiltInComponent: () => false,
                    // 关键配置：强制解析字面量类型
                    optimizeImports: false
                }
            }
        }),
        visualizer({
            filename: 'dist/stats.html', // 生成报告
            gzipSize: true // 同时显示 gzip 体积
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    }
})
