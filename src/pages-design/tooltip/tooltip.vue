<template>
    <the-root-page>
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-tooltip triggerMode="click" text="复制内容"></hy-tooltip>
        </view>

        <view class="hy-title">下方显示</view>
        <view class="hy-container">
            <hy-tooltip text="复制内容" direction="bottom"></hy-tooltip>
        </view>

        <view class="hy-title">扩展按钮</view>
        <view class="hy-container">
            <hy-tooltip
                text="复制内容"
                :buttons="['扩展', '分享']"
                :show-copy="false"
                trigger-mode="click"
                placement="bottom-start"
                @click="onClick"
            ></hy-tooltip>
        </view>

        <view class="hy-title">高亮选中文本背景色</view>
        <view class="hy-container">
            <hy-tooltip text="复制内容" bgColor="#e3e4e6"></hy-tooltip>
        </view>

        <view class="hy-title">改变字体</view>
        <view class="hy-container">
            <hy-tooltip text="复制内容" color="red" size="30" bold></hy-tooltip>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '长按提示'
    }
})

const onClick = (index: number) => {
    uni.showToast({ title: `点击第${index}个`, icon: 'none' })
}

useShareButton()
</script>

<style scoped lang="scss"></style>
