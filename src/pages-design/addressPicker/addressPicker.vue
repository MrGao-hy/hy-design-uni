<template>
    <the-root-page>
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-address-picker v-model="value" has-input></hy-address-picker>
        </view>

        <view class="hy-title">分割线</view>
        <view class="hy-container">
            <hy-address-picker v-model="value" has-input separator="/"></hy-address-picker>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '地址选择器'
    }
})

const value = ref('')

useShareButton()
</script>

<style scoped lang="scss"></style>
