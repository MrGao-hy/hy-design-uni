<template>
    <the-root-page>
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-qrcode text="我是文本111"></hy-qrcode>
        </view>

        <view class="hy-title">异步显示数据</view>
        <view class="hy-container">
            <hy-qrcode :show="showCode" cid="qrcode_2" :text="textContent"></hy-qrcode>
        </view>

        <view class="hy-title">带logo</view>
        <view class="hy-container">
            <hy-qrcode
                cid="qrcode_3"
                text="https://www.hy-design-uni.top"
                icon="../../static/hy_logo_light.png"
            ></hy-qrcode>
        </view>

        <view class="hy-title">预览</view>
        <view class="hy-container">
            <hy-qrcode cid="qrcode_4" text="https://www.hy-design-uni.top" allowPreview></hy-qrcode>
        </view>

        <view class="hy-title">设置二维码颜色</view>
        <view class="hy-container">
            <hy-qrcode
                cid="qrcode_5"
                text="华玥组件库，中国13亿人都在用的组件库"
                background="red"
                foreground="green"
                pdGround="blue"
            ></hy-qrcode>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '二维码'
    }
})

const showCode = ref(false)
const textContent = ref('')

setTimeout(() => {
    showCode.value = true
    textContent.value = 'https://www.hy-design-uni.top'
}, 3000)

useShareButton()
</script>

<style scoped lang="scss"></style>
