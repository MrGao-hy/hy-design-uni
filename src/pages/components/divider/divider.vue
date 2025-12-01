<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-divider text="月落"></hy-divider>
            <hy-divider text="loadMore"></hy-divider>
            <hy-divider text="loading"></hy-divider>
            <hy-divider text="noMore"></hy-divider>
        </view>

        <view class="hy-title">点</view>
        <view class="hy-container">
            <hy-divider text="月落" dot></hy-divider>
        </view>

        <view class="hy-title">虚线</view>
        <view class="hy-container">
            <hy-divider text="月落" dashed></hy-divider>
        </view>

        <view class="hy-title">粗线</view>
        <view class="hy-container">
            <hy-divider text="月落" :hairline="false"></hy-divider>
        </view>

        <view class="hy-title">文本的位置</view>
        <view class="hy-container">
            <hy-divider text="月落" textPosition="left"></hy-divider>
            <hy-divider text="月落" textPosition="center"></hy-divider>
            <hy-divider text="月落" textPosition="right"></hy-divider>
        </view>

        <view class="hy-title">线条颜色</view>
        <view class="hy-container">
            <hy-divider text="月落" lineColor="red"></hy-divider>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HyDivider from '@/package/components/hy-divider/hy-divider.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)
</script>

<style scoped lang="scss"></style>
