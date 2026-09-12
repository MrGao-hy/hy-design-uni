<template>
    <the-root-page>
        <view class="hy-title">{{ t('checkboxBtn') }}</view>
        <view class="hy-container">
            <hy-check-button
                v-model="value_1"
                :columns="columns"
                :type="type"
                :shape="shape"
                :size="size"
                selectType="checkbox"
            >
            </hy-check-button>
        </view>

        <view class="hy-title">{{ t('radioBtn') }}</view>
        <view class="hy-container">
            <hy-check-button
                v-model="value_2"
                :columns="columns"
                :type="type"
                :shape="shape"
                :size="size"
                selectType="radio"
            ></hy-check-button>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">{{ t('shapeSection') }}</view>
            <hy-subsection :list="list_1" v-model="shape"></hy-subsection>

            <view class="hy-title">{{ t('themeSection') }}</view>
            <hy-subsection :list="list_2" v-model="type"></hy-subsection>

            <view class="hy-title">{{ t('sizeSection') }}</view>
            <hy-subsection :list="list_3" v-model="size"></hy-subsection>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import type { ThemeType, ShapeType, SizeType } from '@/package/libs/typing'
import { computed, ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '复选框按钮'
    }
})

const { t } = useTranslate('checkButton')
usePageTitle('checkButton')

const value_1 = ref('')
const value_2 = ref('')
const type = ref<ThemeType>('primary')
const shape = ref<ShapeType>('square')
const size = ref<SizeType>('medium')

const columns = computed(() => [
    { label: t('jobs.teacher'), value: 0 },
    { label: t('jobs.nurse'), value: 1 },
    { label: t('jobs.stewardess'), value: 2 },
    { label: t('jobs.writer'), value: 3 },
    { label: t('jobs.influencer'), value: 4 }
])

const list_1 = computed(() => [
    { name: t('shapeHalfCircle'), value: 'circle' },
    { name: t('shapeSquare'), value: 'square' }
])

const list_2 = computed(() => [
    { name: t('themePrimary'), value: 'primary' },
    { name: t('themeSuccess'), value: 'success' },
    { name: t('themeError'), value: 'error' },
    { name: t('themeWarning'), value: 'warning' },
    { name: t('themeInfo'), value: 'info' }
])

const list_3 = computed(() => [
    { name: t('sizeSmall'), value: 'small' },
    { name: t('sizeMedium'), value: 'medium' },
    { name: t('sizeLarge'), value: 'large' }
])

useShareButton()
</script>

<style scoped lang="scss"></style>
