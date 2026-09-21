<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container">
            <hy-radio :columns="columns" v-model="value" :size="size" :shape="shape"></hy-radio>
        </view>

        <view class="hy-title">{{ t('disabled') }}</view>
        <view class="hy-container">
            <hy-radio
                :columns="columns"
                v-model="value"
                :size="size"
                :shape="shape"
                disabled
            ></hy-radio>
        </view>

        <view class="hy-title">{{ t('layout') }}</view>
        <view class="hy-container">
            <hy-radio
                :columns="columns"
                v-model="value"
                :size="size"
                :shape="shape"
                placement="column"
            ></hy-radio>
        </view>
        <view class="hy-container" style="margin-top: 10px">
            <hy-radio
                :columns="columns"
                v-model="value"
                :size="size"
                :shape="shape"
                placement="column"
                iconPlacement="right"
                borderBottom
            ></hy-radio>
        </view>

        <view class="hy-title">{{ t('colorSection') }}</view>
        <view class="hy-container">
            <hy-radio
                :columns="columns"
                v-model="value"
                :size="size"
                :shape="shape"
                activeColor="red"
                inactiveColor="green"
            ></hy-radio>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">{{ t('shapeSection') }}</view>
            <hy-subsection :list="list_1" v-model="shape"></hy-subsection>

            <view class="hy-title">{{ t('sizeSection') }}</view>
            <hy-subsection :list="list_2" v-model="size"></hy-subsection>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import type { SizeType, ShapeType } from '@/package/libs/typing'
import { computed, ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '单选框'
    }
})

const { t } = useTranslate('radio')
usePageTitle('radio')

const value = ref('')
const size = ref<SizeType>('medium')
const shape = ref<ShapeType>('circle')

// 选项数据（computed 保证语言切换时响应）
const columns = computed(() => [
    { label: t('jobs.teacher'), value: 0 },
    { label: t('jobs.nurse'), value: 1 },
    { label: t('jobs.stewardess'), value: 2 }
])

const list_1 = computed(() => [
    { name: t('shapeCircle'), value: 'circle' },
    { name: t('shapeSquare'), value: 'square' }
])
const list_2 = computed(() => [
    { name: t('sizeSmall'), value: 'small' },
    { name: t('sizeMedium'), value: 'medium' },
    { name: t('sizeLarge'), value: 'large' }
])

useShareButton()
</script>

<style scoped lang="scss"></style>
