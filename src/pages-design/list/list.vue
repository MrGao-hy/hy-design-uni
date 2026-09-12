<template>
    <the-root-page>
        <!-- 顶部搜索栏 -->
        <view class="page-header">
            <hy-search :placeholder="t('searchPlaceholder')"></hy-search>
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
import { computed, ref } from 'vue'
import DefaultDemo from './components/default-demo.vue'
import WaterfallDemo from './components/waterfall-demo.vue'

import { usePageTitle, useShareButton, useTranslate } from '@/composables'

useShareButton()

const current = ref(0)
// ====== 筛选标签（响应语言切换） ======
const tabs = computed(() => [
    { name: t('tabHorizontal'), value: 0 },
    { name: t('tabVertical'), value: 1 }
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

const { t } = useTranslate('list')
usePageTitle('list')
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
