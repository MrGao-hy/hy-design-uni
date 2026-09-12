<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container">
            <view class="hy-title">{{ t('combinedComponent') }}</view>
            <hy-checkbox
                :columns="columns"
                v-model="value"
                :size="size"
                :shape="shape"
            ></hy-checkbox>

            <view class="hy-title">{{ t('separateComponent') }}</view>
            <hy-checkbox-group v-model="value2" :size="size" :shape="shape" icon-color="green">
                <hy-checkbox-item value="f" :label="t('cars.ferrari')"></hy-checkbox-item>
                <hy-checkbox-item value="l" :label="t('cars.lamborghini')"></hy-checkbox-item>
                <hy-checkbox-item value="b" :label="t('cars.bugatti')"></hy-checkbox-item>
                <hy-checkbox-item value="a" :label="t('cars.astonMartin')"></hy-checkbox-item>
            </hy-checkbox-group>
        </view>

        <view class="hy-title">{{ t('disabledSection') }}</view>
        <view class="hy-container">
            <hy-checkbox
                :columns="columns"
                v-model="value"
                :size="size"
                :shape="shape"
                disabled
            ></hy-checkbox>
        </view>

        <view class="hy-title">{{ t('layoutSection') }}</view>
        <view class="hy-container">
            <hy-checkbox
                :columns="columns"
                v-model="value"
                :size="size"
                :shape="shape"
                placement="column"
            ></hy-checkbox>
        </view>
        <view class="hy-container" style="margin-top: 10px">
            <hy-checkbox
                :columns="columns"
                v-model="value"
                :size="size"
                :shape="shape"
                placement="column"
                iconPlacement="right"
                borderBottom
            ></hy-checkbox>
        </view>

        <view class="hy-title">{{ t('colorSection') }}</view>
        <view class="hy-container">
            <hy-checkbox
                :columns="columns"
                v-model="value"
                :size="size"
                :shape="shape"
                activeColor="red"
                inactiveColor="green"
            ></hy-checkbox>
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
        navigationBarTitleText: '复选框'
    }
})

const { t } = useTranslate('checkbox')
usePageTitle('checkbox')

const value = ref([])
const value2 = ref(['f', 'l'])
const size = ref<SizeType>('medium')
const shape = ref<ShapeType>('square')

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
