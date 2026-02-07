<template>
    <the-root-page>
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-line-progress :percentage="value"></hy-line-progress>
        </view>

        <view class="hy-title">自定义高度</view>
        <view class="hy-container">
            <hy-line-progress :percentage="value" height="20"></hy-line-progress>
        </view>

        <view class="hy-title">自定义颜色</view>
        <view class="hy-container">
            <hy-line-progress :percentage="value" activeColor="red"></hy-line-progress>
        </view>

        <view class="hy-title">手动控制</view>
        <view class="hy-container">
            <hy-flex justify="space-around">
                <hy-button type="error" text="减少" @click="computedWidth('minus')"></hy-button>
                <hy-button text="增加" @click="computedWidth('plus')"></hy-button>
            </hy-flex>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { range } from '@/package'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '线形进度条'
    }
})

const value = ref(20)

const computedWidth = (type: 'plus' | 'minus') => {
    if (type === 'plus') {
        value.value = range(0, 100, value.value + 10)
    } else {
        value.value = range(0, 100, value.value - 10)
    }
}

useShareButton()
</script>

<style scoped lang="scss"></style>
