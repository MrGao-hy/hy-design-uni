<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-title">基础使用</view>
        <view class="hy-container hy-flex">
            <hy-price text="10.234567"></hy-price>
            <hy-price :text="10.1"></hy-price>
            <hy-price :text="0"></hy-price>
            <hy-price :text="100000000"></hy-price>
        </view>

        <view class="hy-title">设置颜色</view>
        <view class="hy-container">
            <hy-price text="10.22" color="#9CC53D"></hy-price>
        </view>

        <view class="hy-title">设置大小</view>
        <view class="hy-container">
            <hy-price text="10.22" :size="20"></hy-price>
        </view>

        <view class="hy-title">保留6位小数</view>
        <view class="hy-container hy-flex">
            <hy-price text="10.22234563" :num="6"></hy-price>
            <hy-price :text="10.22234563" :num="6"></hy-price>
            <hy-price :text="10.23" :num="6"></hy-price>
            <hy-price text="10" :num="6"></hy-price>
        </view>

        <view class="hy-title">设置前缀单位</view>
        <view class="hy-container hy-flex">
            <hy-price text="10.22" symbol="$"></hy-price>
            <hy-price text="10.22" symbol="￥"></hy-price>
            <hy-price text="10.22" symbol="现金"></hy-price>
        </view>

        <view class="hy-title">倾斜/加粗</view>
        <view class="hy-container">
            <hy-price text="10.22" :slant="true" :weight="900"></hy-price>
        </view>

        <view class="hy-title">设置比例1、1.2、1.6</view>
        <view class="hy-flex hy-container">
            <hy-price text="10.22" :ratio="1"></hy-price>
            <hy-price text="10.22" :ratio="1.2"></hy-price>
            <hy-price text="10.22"></hy-price>
            <hy-price text="10.22" :ratio="1.6"></hy-price>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HyPrice from '@/package/components/hy-price/hy-price.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '金额'
    }
})

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)

useShareButton()
</script>

<style scoped lang="scss"></style>
