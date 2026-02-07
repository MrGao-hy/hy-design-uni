<template>
    <the-root-page>
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-textarea
                v-model="value"
                :disabled="disabled"
                :count="count"
                selectionEnd="10"
                :auto-height="autoHeight"
            ></hy-textarea>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">自动增加高度</view>
            <hy-switch v-model="autoHeight"></hy-switch>

            <view class="hy-title">显示统计字数</view>
            <hy-switch v-model="count"></hy-switch>

            <view class="hy-title">禁用</view>
            <hy-switch v-model="disabled"></hy-switch>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '文本域'
    }
})

const value = ref('')
const autoHeight = ref(false)
const count = ref(false)
const disabled = ref(false)

useShareButton()
</script>

<style scoped lang="scss"></style>
