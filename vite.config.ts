import { defineConfig } from 'vite'
import { resolve } from 'path'
import uni from '@dcloudio/vite-plugin-uni'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        uni({
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
