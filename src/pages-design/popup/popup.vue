<template>
    <the-root-page>
        <view class="hy-box">
            <the-cell :list="list" @click="onClick"></the-cell>
        </view>

        <hy-popup :show="show" :mode="mode" closeable closeOnClickOverlay @close="show = false">
            <view style="padding: 20px">我是弹窗</view>
        </hy-popup>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '弹出层'
    }
})

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

useShareButton()
</script>

<style scoped lang="scss"></style>
