<template>
    <the-root-page>
        <view class="hy-title">复选按钮</view>
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

        <view class="hy-title">单选按钮</view>
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
            <view class="hy-title">形状</view>
            <hy-subsection :list="list_1" v-model="shape"></hy-subsection>

            <view class="hy-title">主题色</view>
            <hy-subsection :list="list_2" v-model="type"></hy-subsection>

            <view class="hy-title">大小</view>
            <hy-subsection :list="list_3" v-model="size"></hy-subsection>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '复选框按钮'
    }
})

const value_1 = ref('')
const value_2 = ref('')
const type = ref<HyApp.ThemeType>('primary')
const shape = ref<HyApp.ShapeType>('square')
const size = ref<HyApp.SizeType>('medium')

const columns = reactive([
    { label: '老师', value: 0 },
    { label: '护士', value: 1 },
    { label: '空姐', value: 2 },
    { label: '作家', value: 3 },
    { label: '网红', value: 4 },
    { label: '科学家', value: 5 }
])

const list_1 = reactive([
    { name: '半圆', value: 'circle' },
    { name: '方形', value: 'square' }
])

const list_2 = reactive([
    { name: '主要', value: 'primary' },
    { name: '信息', value: 'success' },
    { name: '危险', value: 'error' },
    { name: '提示', value: 'warning' },
    { name: '默认', value: 'info' }
])

const list_3 = reactive([
    { name: '小', value: 'small' },
    { name: '中', value: 'medium' },
    { name: '大', value: 'large' }
])

useShareButton()
</script>

<style scoped lang="scss"></style>
