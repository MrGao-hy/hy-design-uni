import { useShare } from 'hy-app'
import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/store'

const app = createApp(App)

app.use(pinia)
app.mixin(
    useShare({
        title: '华玥组件库'
    })
)

app.mount('#app')
