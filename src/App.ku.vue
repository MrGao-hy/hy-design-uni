<script setup lang="ts">
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { provide } from 'vue'

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)

/**
 * 小程序端组件父子链跟随 wxml 书写位置：页面内容的逻辑父组件是本虚拟根组件（global-ku-root），
 * 而非插槽渲染位置所在的 hy-config-provider，provide/inject 会断链，这里补一份同 key 注入。
 * */
provide('hy-config-provider', {
    theme: darkMode,
    themeColor: color
})

// provider 默认样式是 100vh 视口高度 + overflow-y:auto 的内部滚动容器，
// 会吞掉页面级滚动（onPageScroll/onReachBottom 失效），这里覆盖为自然高度，恢复页面级滚动
const providerStyle = {
    height: 'auto',
    minHeight: '100vh',
    overflow: 'visible'
}
</script>

<template>
    <hy-config-provider
        :theme-color="color"
        :theme="darkMode"
        :custom-style="providerStyle"
    >
        <KuRootView />

        <hy-toast></hy-toast>
        <hy-modal :message="true"></hy-modal>
    </hy-config-provider>
</template>
