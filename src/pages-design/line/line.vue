<template>
    <the-root-page>
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-line></hy-line>
        </view>

        <view class="hy-title">自定义颜色</view>
        <view class="hy-container">
            <hy-line color="red"></hy-line>
        </view>

        <view class="hy-title">竖着（需要设置length，否则不显示）</view>
        <view class="hy-container">
            <hy-line direction="column" length="100" color="red"></hy-line>
        </view>

        <view class="hy-title">虚线</view>
        <view class="hy-container">
            <hy-line dashed color="red"></hy-line>
        </view>

        <view class="hy-title">粗线</view>
        <view class="hy-container">
            <hy-line :hairline="false" color="red"></hy-line>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '线条'
    }
})

useShareButton()
</script>

<style scoped lang="scss"></style>
