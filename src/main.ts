import { useShare } from '@/package'
import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/store'
import { setupLocale } from "@/locale"
// import router from './router'

const app = createApp(App)
app.use(pinia)
setupLocale()
// app.use(router)
app.mixin(
    useShare({
        title: '华玥组件库'
    })
)

app.mount('#app')
