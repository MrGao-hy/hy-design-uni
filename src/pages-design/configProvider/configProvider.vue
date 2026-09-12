<template>
    <the-root-page>
        <view class="hy-title">{{ t('darkSection') }}</view>
        <view class="hy-container">
            <hy-switch v-model="darkMode" activeValue="dark" inactiveValue="light"></hy-switch>
        </view>

        <view class="hy-title">{{ t('themeSection') }}</view>
        <view class="hy-container">
            <hy-check-button
                :columns="columns"
                v-model="color"
                select-type="radio"
                @change="changeFn"
            ></hy-check-button>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '全局配置'
    }
})

const { t } = useTranslate('configProvider')
usePageTitle('configProvider')

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)
// 颜色列表：value 为色值，key 与 locale configProvider.colors.* 对应
const colorKeys = [
    'red',
    'magenta',
    'purple',
    'bluePurple',
    'oceanBlue',
    'blue',
    'indigo',
    'cyan',
    'green',
    'yellowGreen',
    'lime',
    'yellow',
    'orangeYellow',
    'orange',
    'orangeRed',
    'brown',
    'darkGray',
    'gray'
]
const colorValues = [
    '#E83A30',
    '#E72F8C',
    '#892FE8',
    '#5F4FD9',
    '#3646FF',
    '#3D7EFF',
    '#31C9E8',
    '#2DE88D',
    '#31E749',
    '#A4E82F',
    '#D5EB00',
    '#FFF420',
    '#FFCA28',
    '#FFA726',
    '#FF7043',
    '#914F2C',
    '#78909C',
    '#AAAAAA'
]
const columns = computed(() =>
    colorKeys.map((key, i) => ({ label: t(`colors.${key}`), value: colorValues[i] }))
)

const changeFn = (temp: AnyObject) => (color.value = temp.value)

useShareButton()
</script>

<style scoped lang="scss"></style>
