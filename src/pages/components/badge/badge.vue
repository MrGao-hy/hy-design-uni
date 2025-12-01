<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
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
    </hy-config-provider>
</template>

<script setup lang="ts">
import HyBadge from '@/package/components/hy-badge/hy-badge.vue'
import HyAvatar from '@/package/components/hy-avatar/hy-avatar.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { config } from '@/config/config'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)
</script>

<style scoped lang="scss">
.relative {
    position: relative;
}
</style>
