import { useShare, Locale } from '@/package'
import { createSSRApp } from 'vue'
import App from './App.vue'
import pinia from '@/store'
import { setupLocale } from "@/locale"
import { useThemeStore } from '@/store/useTheme'
// import router from './router'

// uni-app 标准入口写法，@uni-ku/root 依赖此结构向入口注入 global-ku-root 组件的全局注册
export function createApp() {
    const app = createSSRApp(App)

    app.use(pinia)
    setupLocale()

    // 恢复持久化的语言设置
    const themeStore = useThemeStore()
    Locale.use(themeStore.locale)
    // app.use(router)
    app.mixin(
        useShare({
            title: '华玥组件库'
        })
    )

    return { app }
}
