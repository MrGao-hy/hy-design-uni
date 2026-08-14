<script setup lang="ts">
import { onThemeChange, onUnload } from '@dcloudio/uni-app'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { enableTouchSimulation } from '@/utils'
import type { ThemeModeType } from '@/package'

const themeStore = useThemeStore()
const { darkMode } = storeToRefs(themeStore)

// #ifdef H5
const getMessage = (event: MessageEvent) => {
    // 判断消息是否来自可信任的源
    if (event.origin === 'https://www.hy-design-uni.top') {
        darkMode.value = event.data ? 'dark' : 'light'
    }
}
window.addEventListener('message', getMessage)
// 获取pc端的移动事件
enableTouchSimulation()
// #endif
onUnload(() => {
    // #ifdef H5
    window.removeEventListener('message', getMessage)
    // #endif
})

uni.getSystemInfo({
    success(res) {
        // theme: dark / light
        if (res.theme) darkMode.value = res.theme as ThemeModeType
    }
})

onThemeChange((option) => {
    console.log(option)
    darkMode.value = option.theme
})
</script>
<style lang="scss">
@use '@/style/common.scss';
@use '@/static/icon/font_1/iconfont.css';
</style>
