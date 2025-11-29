<template>
    <hy-config-provider :custom-style="themeColor" :theme="darkMode" customClass="home-page">
        <the-cell title="基础组件" :list="list_1"></the-cell>
        <the-cell title="表单组件" :list="list_2"></the-cell>
        <the-cell title="布局组件" :list="list_3"></the-cell>
        <the-cell title="反馈组件" :list="list_4"></the-cell>
        <the-cell title="导航组件" :list="list_5"></the-cell>
        <the-cell title="其他组件" :list="list_6"></the-cell>
        <the-cell title="业务组件" :list="list_7"></the-cell>

        <hy-modal v-model="showHint" title="摇一摇更换主题色"></hy-modal>
    </hy-config-provider>
</template>

<script setup lang="ts">
import TheCell from '@/pages/index/components/TheCell.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import HyModal from '@/package/components/hy-modal/hy-modal.vue'
import { list_1, list_2, list_3, list_4, list_5, list_6, list_7 } from './index1'
import { useThemeStore } from '@/store'
import { useShakeService } from '@/package'
import { onHide, onShow } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
const themeStore = useThemeStore()
const { startShakeListener, stopShakeListener } = useShakeService()

const { themeColor, darkMode, showHint } = storeToRefs(themeStore)

onShow(() => {
    startShakeListener(handleShake)
})
onHide(() => {
    stopShakeListener()
})

const handleShake = () => {
    // 在这里执行摇一摇后的逻辑
    themeColor.value['--hy-theme-color'] = getRandomHexColor()
}

function getRandomHexColor() {
    // 生成随机的十六进制颜色
    const hex = Math.floor(Math.random() * 0xffffff).toString(16)
    // 补齐 6 位
    return `#${hex.padStart(6, '0')}`
}
</script>

<style lang="scss">
:deep(.home-page) {
    padding: $hy-border-margin-padding-base;
    /* ifdef H5 */
    height: calc(100vh - 94px);
    /* endif */
}
</style>
