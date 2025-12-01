<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-image :src="config.avatar"></hy-image>
        </view>

        <view class="hy-title">大小</view>
        <view class="hy-container">
            <hy-image :src="config.avatar" width="50px" height="50px"></hy-image>
        </view>

        <view class="hy-title">预览大图</view>
        <view class="hy-container">
            <hy-image :src="config.avatar" preview-image></hy-image>
        </view>

        <view class="hy-title">模糊图片</view>
        <view class="hy-container">
            <hy-image :src="config.avatar" :indistinct="true"></hy-image>
        </view>

        <view class="hy-title">加载错误</view>
        <view class="hy-container">
            <hy-image src="http://127.0.0.1:8080/685b54c8cb8da5c86d0d4c.png"></hy-image>
        </view>

        <view class="hy-title">圆形</view>
        <view class="hy-container">
            <hy-image :src="config.avatar" width="100px" height="100px" shape="circle"></hy-image>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HyImage from '@/package/components/hy-image/hy-image.vue'
import { config } from '@/config/config'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)
</script>

<style scoped lang="scss"></style>
