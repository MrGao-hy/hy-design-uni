<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-picker v-model="value" :columns="columns" has-input></hy-picker>
        </view>

        <view class="hy-title">修改分隔符</view>
        <view class="hy-container">
            <hy-picker v-model="value" :columns="columns_2" has-input :separator="' '"></hy-picker>
        </view>

        <view class="hy-title">多列联动</view>
        <view class="hy-container">
            <hy-picker v-model="value" :columns="columns_2" has-input></hy-picker>
        </view>

        <view class="hy-title">自定义插槽</view>
        <view class="hy-container">
            <hy-picker v-model="value" :columns="columns_2" has-input>
                <template #toolbar-right>
                    <view>自定义按钮</view>
                </template>
                <template #toolbar-bottom>
                    <view style="text-align: center; color: red">我是底部信息</view>
                </template>
            </hy-picker>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import HyPicker from '@/package/components/hy-picker/hy-picker.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)

const value = ref('')
const columns: string[][] = reactive([['西瓜', '香蕉', '苹果']])

const columns_2: string[][] = reactive([
    ['中国', '美国'],
    ['深圳', '厦门', '上海', '拉萨']
])
</script>

<style scoped lang="scss"></style>
