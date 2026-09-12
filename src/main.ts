import { useShare, Locale } from '@/package'
import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/store'
import { setupLocale } from "@/locale"
import { useThemeStore } from '@/store/useTheme'
// import router from './router'

const app = createApp(App)
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

app.mount('#app')
