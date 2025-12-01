<template>
    <hy-config-provider :custom-style="themeColor" :theme="darkMode">
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-input
                v-model="value"
                :shape="shape"
                :border="border"
                :type="type"
                clearable
                :disabled="disabled"
                placeholder="输入值"
            ></hy-input>
        </view>

        <view class="hy-title">限制输入金额格式</view>
        <view class="hy-container">
            {{ value3 }}
            <hy-input v-model="value3" type="digit" clearable @change="onChange"></hy-input>
        </view>

        <view class="hy-title">清空按钮</view>
        <view class="hy-container">
            <hy-input v-model="value2" clearable focus placeholder="输入值"></hy-input>
        </view>

        <view class="hy-title">icon</view>
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

        <view class="hy-title">自定义icon</view>
        <view class="hy-container">
            <hy-input
                v-model="value"
                :prefixIcon="{
                    name: 'feishu-gray',
                    customPrefix: 'icon',
                    color: 'red'
                }"
                :disabled="disabled"
                border="bottom"
            ></hy-input>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">禁用</view>
            <hy-switch v-model="disabled"></hy-switch>

            <view class="hy-title">输入框形状</view>
            <hy-subsection :list="list_1" v-model="shape"></hy-subsection>

            <view class="hy-title">输入框类型</view>
            <hy-subsection :list="list_2" v-model="type"></hy-subsection>

            <view class="hy-title">边框</view>
            <hy-subsection :list="list_3" v-model="border"></hy-subsection>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import HyInput from '@/package/components/hy-input/hy-input.vue'
import HySubsection from '@/package/components/hy-subsection/hy-subsection.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { IconConfig } from '@/package'
import { useThemeStore } from '@/store'
import HySwitch from '../../../package/components/hy-switch/hy-switch.vue'
import type { InputType } from '@uni-helper/uni-types'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { themeColor, darkMode } = storeToRefs(themeStore)
const value = ref('')
const value3 = ref('')
const value2 = ref('中国速度，东风快递，使命必达，风雨无阻！！！')
const disabled = ref(false)
const shape = ref<HyApp.ShapeType>('square')
const type = ref<InputType>('text')
const border = ref<HyApp.BorderType>('surround')

const list_1 = reactive([
    { name: '半圆', value: 'circle' },
    { name: '方形', value: 'square' }
])

const list_2 = reactive([
    { name: '文本', value: 'text' },
    { name: '数字', value: 'number' },
    { name: '身份证id', value: 'idcard' },
    { name: '小数点', value: 'digit' },
    { name: '密码', value: 'password' }
])

const list_3 = reactive([
    { name: '四周边框', value: 'surround' },
    { name: '底部边框', value: 'bottom' },
    { name: '无边框', value: 'none' }
])

// 实时过滤
const onChange = (e) => {
    const val = e
    // 1. 只保留数字和小数点
    let filtered = val.replace(/[^\d.]/g, '')
    // 2. 保证只有一个小数点
    filtered = filtered.replace(/\.{2,}/g, '.')
    // 3. 去掉开头的小数点
    filtered = filtered.replace(/^\./g, '')
    // 4. 保留 2 位小数
    filtered = filtered.replace(/^\d+\.\d{2}.*/, (match) => match.slice(0, match.indexOf('.') + 3))
    // 5. 防止 00、01 这类开头
    filtered = filtered.replace(/^0(\d+)/, '$1')

    // 7. 回写
    value3.value = filtered
}

watch(
    () => value3.value,
    (newValue) => {},
    { immediate: true }
)
</script>

<style scoped lang="scss"></style>
