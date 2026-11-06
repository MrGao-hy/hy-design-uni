<template>
    <view class="page">
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
    </view>
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
    display: flex;
    flex-direction: column;
    /* 虚拟列表容器必须有确定高度，否则 scroll-view 塌陷后滚动发生在页面级，
       @scroll/@scrolltolower 不触发，虚拟加载会失效 */
    /* #ifdef H5 */
    height: calc(100vh - 44px);
    /* #endif */
    /* #ifndef H5 */
    height: 100vh;
    /* #endif */

    &-header {
        flex-shrink: 0;
        padding: $hy-border-margin-padding-base $hy-border-margin-padding-base 0;
        background: $hy-background--container;
    }

    &-body {
        flex: 1;
        // 允许 flex 子项收缩，保证 hy-list 的 100% 高度可解析
        min-height: 0;
        overflow: hidden;
        padding: 10rpx $hy-border-margin-padding-base 0;
    }
}
</style>
