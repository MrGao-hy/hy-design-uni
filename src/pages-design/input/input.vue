<template>
    <view class="hy-title">{{ t('basicUsage') }}</view>
    <view class="hy-container">
        <hy-input
            v-model="value"
            :shape="shape"
            :border="border"
            :type="type"
            clearable
            :disabled="disabled"
            :placeholder="t('phValue')"
        ></hy-input>
    </view>

    <view class="hy-title">{{ t('amountFormatSection') }}</view>
    <view class="hy-container">
        <!-- formatter：输入时实时过滤并回显，无需手动回写 -->
        <hy-input
            v-model="value3"
            type="digit"
            :maxlength="999"
            clearable
            :formatter="amountFormatter"
        ></hy-input>
    </view>

    <view class="hy-title">{{ t('clearableSection') }}</view>
    <view class="hy-container">
        <hy-input v-model="value2" clearable focus :placeholder="t('phValue')"></hy-input>
    </view>

    <view class="hy-title">{{ t('iconSection') }}</view>
    <view class="hy-container">
        <hy-input
            v-model="value"
            :prefixIcon="{
                name: IconConfig.LOCK
            }"
            :suffix-icon="{
                name: IconConfig.DOWN
            }"
            :disabled="disabled"
            border="bottom"
        ></hy-input>
    </view>

    <view class="hy-title">{{ t('customIconSection') }}</view>
    <view class="hy-container">
        <hy-input v-model="value" clearable :disabled="disabled">
            <template #suffix>
                <hy-button :text="t('sendCode')"></hy-button>
            </template>
        </hy-input>
    </view>

    <view class="hy-setting__box">
        <view class="hy-title">{{ t('disabledSection') }}</view>
        <hy-switch v-model="disabled"></hy-switch>

        <view class="hy-title">{{ t('shapeSection') }}</view>
        <hy-subsection :list="list_1" v-model="shape"></hy-subsection>

        <view class="hy-title">{{ t('typeSection') }}</view>
        <hy-subsection :list="list_2" v-model="type"></hy-subsection>

        <view class="hy-title">{{ t('borderSection') }}</view>
        <hy-subsection :list="list_3" v-model="border"></hy-subsection>
    </view>
</template>

<script setup lang="ts">
import type { ShapeType, BorderType } from '@/package/libs/typing'
import { computed, ref } from 'vue'
import { IconConfig } from '@/package'
import type { InputType } from '@uni-helper/uni-types'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '输入框'
    }
})

const { t } = useTranslate('input')
usePageTitle('input')

const value = ref('')
const value3 = ref('')
const value2 = ref(t('defaultValue'))
const disabled = ref(false)
const shape = ref<ShapeType>('square')
const type = ref<InputType>('text')
const border = ref<BorderType>('surround')

const list_1 = computed(() => [
    { name: t('shapeCircle'), value: 'circle' },
    { name: t('shapeSquare'), value: 'square' }
])

const list_2 = computed(() => [
    { name: t('typeText'), value: 'text' },
    { name: t('typeNumber'), value: 'number' },
    { name: t('typeIdcard'), value: 'idcard' },
    { name: t('typeDigit'), value: 'digit' },
    { name: t('typePassword'), value: 'password' }
])

const list_3 = computed(() => [
    { name: t('borderSurround'), value: 'surround' },
    { name: t('borderBottom'), value: 'bottom' },
    { name: t('borderNone'), value: 'none' }
])

// 金额输入格式化：只保留数字和小数点，最多 2 位小数
const amountFormatter = (value: string) => {
    // 1. 只保留数字和小数点
    let filtered = value.replace(/[^\d.]/g, '')
    // 2. 保证只有一个小数点
    filtered = filtered.replace(/\.{2,}/g, '.')
    // 3. 去掉开头的小数点
    filtered = filtered.replace(/^\./g, '')
    // 4. 保留 2 位小数
    filtered = filtered.replace(/^(\d+\.\d{2}).*/, '$1')
    // 5. 防止 00、01 这类开头
    filtered = filtered.replace(/^0(\d+)/, '$1')
    return filtered
}

useShareButton()
</script>

<style scoped lang="scss"></style>
