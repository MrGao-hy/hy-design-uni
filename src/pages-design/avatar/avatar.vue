<template>
    <the-root-page>
        <!-- 基础使用 -->
        <view class="hy-title">基础使用</view>
        <view class="hy-flex hy-container">
            <hy-avatar :src="config.avatar"></hy-avatar>
        </view>

        <!-- 文字头像 -->
        <view class="hy-title">文字头像</view>
        <view class="hy-flex hy-container">
            <hy-avatar text="胡" random-bg-color />
            <hy-avatar text="李" random-bg-color />
            <hy-avatar text="孙" random-bg-color />
            <hy-avatar text="王" random-bg-color />
        </view>

        <!-- 图标头像 -->
        <view class="hy-title">图标头像</view>
        <view class="hy-flex hy-container">
            <hy-avatar :icon="IconConfig.MINE_FILL" bg-color="#448aca" />
            <hy-avatar :icon="IconConfig.PHOTO" bg-color="#f18080" />
            <hy-avatar :icon="IconConfig.STAR" bg-color="#ffb34b" />
            <hy-avatar :icon="IconConfig.CUSTOMER_SERVICE" bg-color="#89c152" />
        </view>

        <!-- 不同大小 -->
        <view class="hy-title">不同大小</view>
        <view class="hy-flex hy-container">
            <hy-avatar :src="config.avatar" size="small"></hy-avatar>
            <hy-avatar :src="config.avatar" size="medium"></hy-avatar>
            <hy-avatar :src="config.avatar" size="large"></hy-avatar>
            <hy-avatar :src="config.avatar" :size="60"></hy-avatar>
        </view>

        <!-- 自定义颜色 -->
        <view class="hy-title">自定义颜色</view>
        <view class="hy-flex hy-container">
            <hy-avatar text="红" bg-color="#ff4757" />
            <hy-avatar text="绿" bg-color="#2ed573" />
            <hy-avatar text="蓝" bg-color="#3742fa" />
            <hy-avatar text="紫" bg-color="#a55eea" />
        </view>

        <!-- 指定颜色索引 -->
        <view class="hy-title">指定颜色索引</view>
        <view class="hy-flex hy-container">
            <hy-avatar text="0" random-bg-color :color-index="0" />
            <hy-avatar text="5" random-bg-color :color-index="5" />
            <hy-avatar text="10" random-bg-color :color-index="10" />
            <hy-avatar text="15" random-bg-color :color-index="15" />
        </view>

        <!-- 头像形状 -->
        <view class="hy-title">头像形状</view>
        <view class="hy-flex hy-container">
            <hy-avatar :src="config.avatar" shape="circle" size="large"></hy-avatar>
            <hy-avatar :src="config.avatar" shape="square" size="large"></hy-avatar>
        </view>

        <!-- 自定义文字样式 -->
        <view class="hy-title">自定义文字样式</view>
        <view class="hy-flex hy-container">
            <hy-avatar text="大" :font-size="24" bg-color="#667eea" />
            <hy-avatar text="小" :font-size="14" bg-color="#764ba2" />
            <hy-avatar text="白" :font-size="20" bg-color="#333" color="#fff" />
            <hy-avatar text="黑" :font-size="18" bg-color="#eee" color="#333" />
        </view>

        <!-- 点击事件 -->
        <view class="hy-title">点击事件</view>
        <view class="hy-flex hy-container">
            <hy-avatar :src="config.avatar" @click="previewImage"></hy-avatar>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { config } from '@/config/config'
import { useShareButton } from '@/composables'
import type { IAvatarClickConfig } from '@/package'
import { IconConfig } from '@/package'

definePage({
    style: {
        navigationBarTitleText: '头像'
    }
})

const showAvatar = ref(false)

const previewImage = ({ url }: IAvatarClickConfig) => {
    console.log(url)

    uni.previewImage({
        urls: [url],
        longPressActions: {
            itemList: ['发送给朋友', '保存图片', '收藏'],
            success: function () {},
            fail: function (err) {
                console.log(err.errMsg)
            }
        }
    })
}

useShareButton()
</script>

<style scoped lang="scss">
.avatar-actions {
    padding: 20rpx;
    display: flex;
    gap: 20rpx;

    :deep(.hy-button) {
        flex: 1;
    }
}
</style>
