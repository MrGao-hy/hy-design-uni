<template>
    <the-root-page>
        <!-- 顶部搜索栏 -->
        <view class="page-header">
            <hy-search placeholder="搜索商品"></hy-search>
            <hy-tabs v-model:current="current" :list="tabs"></hy-tabs>
        </view>

        <!-- 示例区域 -->
        <view class="page-body">
            <default-demo v-if="current" />
            <waterfall-demo v-else-if="!current" />
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import DefaultDemo from './components/default-demo.vue'
import WaterfallDemo from './components/waterfall-demo.vue'

import { useShareButton } from '@/composables'

useShareButton()

const current = ref(0)
// ====== 筛选标签 ======
const tabs = reactive([
    { name: '横向', value: 0 },
    { name: '纵向', value: 1 }
])

// ====== 列表数据 ======
const list = ref<AnyObject[]>([])
const itemCardHeight = ref(280)

definePage({
    style: {
        navigationBarTitleText: '商品列表',
        enablePullDownRefresh: false
    }
})
</script>

<style scoped lang="scss">
.page {
    &-header {
        padding: $hy-border-margin-padding-base $hy-border-margin-padding-base 0;
        background: $hy-background--container;
    }

    &-body {
        height: calc(100% - 170rpx);
        padding: 10rpx $hy-border-margin-padding-base 0;
    }
}
</style>
