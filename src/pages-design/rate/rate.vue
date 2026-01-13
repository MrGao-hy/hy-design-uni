<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-rate v-model="value"></hy-rate>
        </view>

        <view class="hy-title">星星间距</view>
        <view class="hy-container">
            <hy-rate v-model="value" :gutter="20"></hy-rate>
        </view>

        <view class="hy-title">星星大小</view>
        <view class="hy-container">
            <hy-rate v-model="value" :size="10"></hy-rate>
            <view style="height: 20px"></view>
            <hy-rate v-model="value" :size="30"></hy-rate>
        </view>

        <view class="hy-title">自定义颜色</view>
        <view class="hy-container">
            <hy-rate v-model="value" inactiveColor="green" activeColor="red"></hy-rate>
        </view>

        <view class="hy-title">使用图片</view>
        <view class="hy-container">
            <hy-rate
                v-model="value"
                activeIcon="https://pic1.imgdb.cn/item/67d6820788c538a9b5bf333a.png"
                inactiveIcon="https://pic1.imgdb.cn/item/67d6820788c538a9b5bf333b.png"
            ></hy-rate>
        </view>

        <view class="hy-title">最多评分</view>
        <view class="hy-container">
            <hy-rate v-model="value" :count="10"></hy-rate>
        </view>

        <view class="hy-title">允许半星</view>
        <view class="hy-container">
            <hy-rate v-model="value" allowHalf></hy-rate>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HyRate from '../../package/components/hy-rate/hy-rate.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '评分'
    }
})

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)
const value = ref(3)

useShareButton()
</script>

<style scoped lang="scss"></style>
