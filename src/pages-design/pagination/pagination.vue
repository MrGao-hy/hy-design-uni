<template>
    <the-root-page>
        <view class="hy-title">基础示例</view>
        <view class="hy-container">
            <hy-pagination v-model="current" :total="999"></hy-pagination>
        </view>

        <view class="hy-title">icon</view>
        <view class="hy-container">
            <hy-pagination v-model="current" showIcon :total="12"></hy-pagination>
        </view>

        <view class="hy-title">文字提示</view>
        <view class="hy-container">
            <hy-pagination v-model="current" showMessage :total="999"></hy-pagination>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '分页'
    }
})

const current = ref(1)

useShareButton()
</script>

<style scoped lang="scss"></style>
