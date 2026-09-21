<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container">
            <hy-search
                v-model="value"
                :animation="showClose"
                clearabled
                :shape="shape"
                :action-text="label"
                :disabled="disabled"
                :inputAlign="inputAlign"
                @change="onChange"
                @search="onSearch"
            ></hy-search>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">{{ t('searchText') }}</view>
            <hy-input v-model="label"></hy-input>

            <view class="hy-title">{{ t('animationSection') }}</view>
            <hy-switch v-model="showClose"></hy-switch>

            <view class="hy-title">{{ t('disabled') }}</view>
            <hy-switch v-model="disabled"></hy-switch>

            <view class="hy-title">{{ t('shapeSection') }}</view>
            <hy-subsection :list="list" v-model="shape"></hy-subsection>

            <view class="hy-title">{{ t('alignSection') }}</view>
            <hy-subsection :list="list_1" v-model="inputAlign"></hy-subsection>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import type { ShapeType, LeftRightType } from '@/package/libs/typing'
import { computed, ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '搜索'
    }
})

const { t } = useTranslate('search')
usePageTitle('search')

const value = ref(t('testValue'))
const label = ref(t('searchLabel'))
const disabled = ref(false)
const shape = ref<ShapeType>('circle')
const showClose = ref(false)
const inputAlign = ref<LeftRightType>('left')
// 形状选项（computed 保证语言切换时响应）
const list = computed(() => [
    { name: t('shapeCircle'), value: 'circle' },
    { name: t('shapeSquare'), value: 'square' }
])

const list_1 = computed(() => [
    { name: t('posLeft'), value: 'left' },
    { name: t('posCenter'), value: 'center' },
    { name: t('posRight'), value: 'right' }
])

// 搜索函数
const onSearch = () => {
    uni.showToast({ title: value.value })
}

// 输入框值改变
const onChange = (value: string) => {
    // console.log(value, "输入框值改变");
}

useShareButton()
</script>

<style scoped lang="scss"></style>
