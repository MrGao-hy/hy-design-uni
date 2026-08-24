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

// #ifdef APP || H5 || MP-WEIXIN
// 微信小程序、App、H5 使用新版 getAppBaseInfo，避免 getSystemInfo 被废弃的警告
const { theme } = uni.getAppBaseInfo()
if (theme) darkMode.value = theme as ThemeModeType
// #endif
// #ifndef APP || H5 || MP-WEIXIN
// 其他小程序基础库暂不支持 getAppBaseInfo，继续使用 getSystemInfo 获取主题（dark / light）
uni.getSystemInfo({
    success(res) {
        if (res.theme) darkMode.value = res.theme as ThemeModeType
    }
})
// #endif

onThemeChange((option) => {
    console.log(option)
    darkMode.value = option.theme
})
</script>
<style lang="scss">
@use '@/style/common.scss';
@use '@/static/icon/font_1/iconfont.css';
</style>
