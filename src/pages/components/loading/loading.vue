<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-loading></hy-loading>
        </view>

        <view class="hy-title">圆形</view>
        <view class="hy-container">
            <hy-loading mode="circle"></hy-loading>
        </view>

        <view class="hy-title">半圆</view>
        <view class="hy-container">
            <hy-loading mode="semicircle"></hy-loading>
        </view>

        <view class="hy-title">自定义颜色</view>
        <view class="hy-flex hy-container">
            <hy-loading mode="circle" color="#19be6b"></hy-loading>
            <hy-loading mode="spinner" color="#19be6b"></hy-loading>
        </view>

        <view class="hy-title">自定义文字/排列</view>
        <view class="hy-container hy-flex">
            <hy-loading mode="circle" text="加载中..." direction="column"></hy-loading>
            <hy-loading mode="circle" text="加载中..." direction="row"></hy-loading>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HyLoading from '@/package/components/hy-loading/hy-loading.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)
</script>

<style scoped lang="scss"></style>
