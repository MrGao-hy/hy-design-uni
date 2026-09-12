<template>
    <the-root-page>
        <hy-float-button
            :shape="shape"
            :size="size"
            :menus="menus"
            :float="float"
            :direction="direction"
            :shadow="shadow"
            :opacity="opacity"
            :position="position"
            :draggable="draggable"
            :expandable="expandable"
        ></hy-float-button>

        <view class="hy-setting__box">
            <view class="hy-title">{{ t('shapeSection') }}</view>
            <hy-subsection :list="list_1" v-model="shape"></hy-subsection>

            <view class="hy-title">{{ t('sizeSection') }}</view>
            <hy-subsection :list="list_2" v-model="size"></hy-subsection>

            <view class="hy-title">{{ t('directionSection') }}</view>
            <hy-subsection :list="list_3" v-model="direction"></hy-subsection>

            <view class="hy-title">{{ t('positionSection') }}</view>
            <hy-subsection :list="list_4" v-model="position"></hy-subsection>

            <view class="hy-title">{{ t('floatSwitch') }}</view>
            <hy-switch v-model="float"></hy-switch>

            <view class="hy-title">{{ t('shadowSwitch') }}</view>
            <hy-switch v-model="shadow"></hy-switch>

            <view class="hy-title">{{ t('draggableSwitch') }}</view>
            <hy-switch v-model="draggable"></hy-switch>

            <view class="hy-title">{{ t('expandSwitch') }}</view>
            <hy-switch v-model="expandable"></hy-switch>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'
import { DirectionType, type FloatPositionType, ShapeType, SizeType } from '@/package'

definePage({
    style: {
        navigationBarTitleText: '悬浮按钮'
    }
})

const { t } = useTranslate('floatButton')
usePageTitle('floatButton')

// 悬浮菜单（响应语言切换）
const menus = computed(() => [t('menu', 1), t('menu', 2), t('menu', 3)])
const shape = ref<ShapeType>('circle')
const size = ref<SizeType>('medium')
const direction = ref<DirectionType>('column')
const float = ref(false)
const shadow = ref(false)
const draggable = ref(false)
const expandable = ref(true)
const opacity = ref(1)
const position = ref<FloatPositionType>('right-top')

const list_1 = computed(() => [
    { name: t('shapeCircle'), value: 'circle' },
    { name: t('shapeSquare'), value: 'square' }
])

const list_2 = computed(() => [
    { name: t('sizeLarge'), value: 'large' },
    { name: t('sizeMedium'), value: 'medium' },
    { name: t('sizeSmall'), value: 'small' }
])

const list_3 = computed(() => [
    { name: t('directionRow'), value: 'row' },
    { name: t('directionColumn'), value: 'column' }
])

const list_4 = computed(() => [
    { name: t('posLeftTop'), value: 'left-top' },
    { name: t('posRightTop'), value: 'right-top' },
    { name: t('posLeftCenter'), value: 'left-center' },
    { name: t('posRightCenter'), value: 'right-center' },
    { name: t('posLeftBottom'), value: 'left-bottom' },
    { name: t('posRightBottom'), value: 'right-bottom' },
    { name: t('posTopCenter'), value: 'top-center' },
    { name: t('posBottomCenter'), value: 'bottom-center' }
])

useShareButton()
</script>

<style scoped lang="scss"></style>
