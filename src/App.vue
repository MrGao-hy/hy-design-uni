<script setup lang="ts">
import { onLaunch, onThemeChange, onUnload } from '@dcloudio/uni-app'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { enableTouchSimulation } from '@/utils'

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

onThemeChange((option) => {
    console.log(option.theme, '===')
    darkMode.value = option.theme
})

onLaunch(() => {
    uni.onThemeChange(function (res) {
        darkMode.value = res.theme
    })
})
</script>
<style lang="scss">
@import '@/style/common.scss';
@import '@/package/libs/css/common.scss';
</style>
