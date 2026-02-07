<template>
    <the-root-page>
        <view class="hy-title">边角形状</view>
        <view class="hy-flex hy-container">
            <hy-badge :value="123" shape="circle"></hy-badge>
            <hy-badge :value="123" shape="horn"></hy-badge>
        </view>

        <view class="hy-title">显示方式</view>
        <view class="hy-flex hy-container">
            <hy-badge :value="123456" numberType="overflow"></hy-badge>
            <hy-badge :value="123456" numberType="ellipsis"></hy-badge>
            <hy-badge :value="123456" numberType="limit"></hy-badge>
        </view>

        <view class="hy-title">显示圆点</view>
        <view class="hy-flex hy-container">
            <hy-badge :value="12" is-dot></hy-badge>
        </view>

        <view class="hy-title">显示主题色</view>
        <view class="hy-flex hy-container">
            <hy-badge :value="12" type="primary"></hy-badge>
            <hy-badge :value="12" type="error"></hy-badge>
            <hy-badge :value="12" type="info"></hy-badge>
            <hy-badge :value="12" type="success"></hy-badge>
            <hy-badge :value="12" type="warning"></hy-badge>
            <hy-badge :value="12" bg-color="#800080"></hy-badge>
        </view>

        <view class="hy-title">反转色</view>
        <view class="hy-flex hy-container">
            <hy-badge :value="12" type="primary" inverted></hy-badge>
            <hy-badge :value="12" type="error" inverted></hy-badge>
            <hy-badge :value="12" type="info" inverted></hy-badge>
            <hy-badge :value="12" type="success" inverted></hy-badge>
            <hy-badge :value="12" type="warning" inverted></hy-badge>
            <hy-badge :value="12" color="#800080" inverted></hy-badge>
        </view>

        <view class="hy-title">相对定位</view>
        <view class="hy-flex hy-container">
            <view class="relative">
                <hy-badge :value="12" absolute :offset="[-8, 50]"></hy-badge>
                <hy-avatar size="large" shape="square" :src="config.avatar"></hy-avatar>
            </view>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { config } from '@/config/config'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '徽标数'
    }
})

useShareButton()
</script>

<style scoped lang="scss">
.relative {
    position: relative;
}
</style>
