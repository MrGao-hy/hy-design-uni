import { defineConfig } from 'vite'
import { resolve } from 'path'
import uni from '@dcloudio/vite-plugin-uni'

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
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData:
                    '@use "@/package/libs/css/theme.scss" as *;\n' +
                    '@use "@/package/libs/css/_mixin.scss" as *;\n'
            }
        }
    }
})
