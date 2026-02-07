<template>
    <the-root-page>
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-subsection :list="list" v-model="value"></hy-subsection>
        </view>

        <view class="hy-title">模式</view>
        <view class="hy-container">
            <hy-subsection :list="list" v-model="value" mode="subsection"></hy-subsection>
        </view>

        <view class="hy-title">颜色</view>
        <view class="hy-container">
            <hy-subsection
                :list="list"
                v-model="value"
                activeColor="#f56c6c"
                mode="subsection"
            ></hy-subsection>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '分段器'
    }
})

const value = ref('')
const list = ['未付款', '待评价', '已付款']

useShareButton()
</script>

<style scoped lang="scss"></style>
