import { Locale, useShare } from '@/package'
import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/store'
// import router from './router'

const app = createApp(App)
app.use(pinia)
// app.use(router)
app.mixin(
    useShare({
        title: '华玥组件库'
    })
)

app.mount('#app')
