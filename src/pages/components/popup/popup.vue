<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-box">
            <the-cell :list="list" @click="onClick"></the-cell>
        </view>

        <hy-popup :show="show" :mode="mode" closeable closeOnClickOverlay @close="show = false">
            <view style="padding: 20px">我是弹窗</view>
        </hy-popup>
    </hy-config-provider>
</template>

<script setup lang="ts">
import TheCell from '@/components/TheCell.vue'
import HyPopup from '@/package/components/hy-popup/hy-popup.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { ref } from 'vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)

const show = ref(false)
const mode = ref<HyApp.LayoutType>('center')

const list = [
    { title: '底部弹出', value: 'bottom' },
    { title: '顶部弹出', value: 'top' },
    { title: '中间弹出', value: 'center' },
    { title: '右侧弹出', value: 'right' },
    { title: '左侧弹出', value: 'left' }
]

const onClick = (temp: AnyObject) => {
    mode.value = temp.value as HyApp.LayoutType
    show.value = true
}
</script>

<style scoped lang="scss"></style>
