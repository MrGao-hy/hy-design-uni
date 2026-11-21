<template>
    <view class="hy-title">{{ t('basicUsage') }}</view>
    <view class="hy-container">
        <hy-pagination v-model="basicPage" :total="50" :page-size="10"></hy-pagination>
    </view>

    <view class="hy-title">{{ t('simpleSection') }}</view>
    <view class="hy-container">
        <hy-pagination
            v-model="simplePage"
            mode="simple"
            :total="120"
            show-message
            :page-size="10"
        ></hy-pagination>
    </view>

    <view class="hy-title">{{ t('ellipsisSection') }}</view>
    <view class="hy-container">
        <hy-pagination
            v-model="ellipsisPage"
            :total="130"
            :page-size="20"
            :page-count="3"
        ></hy-pagination>
    </view>

    <view class="hy-title">{{ t('iconSection') }}</view>
    <view class="hy-container">
        <hy-pagination v-model="iconPage" showIcon :total="50" :page-size="10"></hy-pagination>
    </view>

    <view class="hy-title">{{ t('slotSection') }}</view>
    <view class="hy-container">
        <hy-pagination v-model="slotPage" :total="500" :page-size="10">
            <template #page="{ text, active }">
                <text
                    class="pagination-slot__page"
                    :class="{ 'pagination-slot__page--active': active }"
                >
                    {{ text }}
                </text>
            </template>
            <template #prev-text>
                <text class="pagination-slot__arrow">←</text>
            </template>
            <template #next-text>
                <text class="pagination-slot__arrow">→</text>
            </template>
        </hy-pagination>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '分页'
    }
})

const { t } = useTranslate('pagination')
usePageTitle('pagination')

/** 基础用法：5 页，演示页码模式 */
const basicPage = ref(5)
/** 简单模式：12 页，演示当前页/总页数 */
const simplePage = ref(5)
/** 显示省略号：7 页，演示页码窗口与省略号 */
const ellipsisPage = ref(7)
/** 自定义按钮：上一页/下一页使用图标 */
const iconPage = ref(1)
/** 自定义插槽：页码、上一页、下一页均通过插槽渲染 */
const slotPage = ref(3)

useShareButton()
</script>

<style scoped lang="scss">
/* page 插槽示例：自定义页码字号与字重 */
.pagination-slot__page {
    font-size: 30rpx;
    font-weight: 500;

    &--active {
        font-weight: 700;
    }
}

/* prev-text / next-text 插槽示例：用箭头替代默认文字 */
.pagination-slot__arrow {
    font-size: 32rpx;
}
</style>
