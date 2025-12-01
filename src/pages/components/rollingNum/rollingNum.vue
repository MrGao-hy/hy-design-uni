<template>
    <hy-config-provider :theme-color="color" :theme="darkMode" customClass="rolling-num-page">
        <view class="hy-container hy-margin-bottom">
            <view class="hy-title">基础使用</view>
            <hy-rolling-num :value="val3" size="60rpx" height="70rpx" color="#FF5500" />
        </view>

        <view class="hy-container hy-margin-bottom">
            <view class="hy-title">异步触发</view>
            <hy-rolling-num :value="val6" size="60rpx" height="70rpx" color="#FF5500" />
        </view>

        <view class="hy-container hy-margin-bottom">
            <view class="hy-title">千分位</view>
            <hy-rolling-num
                :value="formatNumber(val4)"
                size="60rpx"
                height="70rpx"
                scroll-direction="alternate"
                stop-order="left-to-right"
                color="red"
                :delay-step="0.1"
            />
        </view>

        <view class="hy-container hy-margin-bottom">
            <view class="hy-title">从左到右、从右到左</view>
            <view class="hy-flex">
                <hy-rolling-num
                    :value="val1"
                    size="60rpx"
                    height="70rpx"
                    scroll-direction="up"
                    stop-order="ltr"
                    color="#18BC37"
                    :delay-step="0.3"
                />
                <hy-rolling-num
                    :value="val2"
                    size="60rpx"
                    height="70rpx"
                    scroll-direction="down"
                    stop-order="rtl"
                    color="#007AFF"
                    :delay-step="0.3"
                />
            </view>
        </view>

        <view class="hy-container hy-margin-bottom">
            <view class="hy-title">自定义样式</view>
            <hy-rolling-num
                :value="val5"
                size="60rpx"
                height="120rpx"
                color="#fff"
                custom-class="myClass"
            />
        </view>

        <hy-button text="随机变化数值" @click="randomize"></hy-button>
    </hy-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HyRollingNum from '@/package/components/hy-rolling-num/hy-rolling-num.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import HyButton from '@/package/components/hy-button/hy-button.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)
const val1 = ref<string | number>('000000')
const val2 = ref<string | number>('000000')
const val3 = ref<string | number>('23456')
const val4 = ref<string | number>(1234567)
const val5 = ref<string | number>('000000')
const val6 = ref<string | number>(0)

setTimeout(() => {
    val6.value = Math.floor(Math.random() * 900000 + 100000).toString()
}, 2000)

// 工具函数：生成千分位
const formatNumber = (num: number | string) => {
    num = Number(num)
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const randomize = () => {
    // 生成随机6位数
    val1.value = Math.floor(Math.random() * 900000 + 100000).toString()
    val2.value = Math.floor(Math.random() * 900000 + 100000).toString()
    val3.value = Math.floor(Math.random() * 900000 + 100000).toString()
    val4.value = Math.floor(Math.random() * 9000000 + 1000000).toString()
    val5.value = Math.floor(Math.random() * 900000 + 100000).toString()
}
</script>

<style lang="scss">
.rolling-num-page {
    padding: 40rpx;

    :deep(.myClass) {
        display: grid;
        gap: 10px;
        .hy-rolling-num__column {
            background: #007aff;
            width: 90rpx;
            border-radius: $hy-border-margin-padding-sm;
        }
    }
}
</style>
