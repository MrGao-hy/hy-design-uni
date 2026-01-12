<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-picker v-model="value" :columns="columns" has-input></hy-picker>
        </view>

        <!--        <view class="hy-title">修改分隔符</view>-->
        <!--        <view class="hy-container">-->
        <!--            <hy-picker-->
        <!--                v-model="value_2"-->
        <!--                :columns="columns_2"-->
        <!--                has-input-->
        <!--                :separator="'，'"-->
        <!--            ></hy-picker>-->
        <!--        </view>-->

        <!--        <view class="hy-title">多列联动</view>-->
        <!--        <view class="hy-container">-->
        <!--            <hy-picker-->
        <!--                ref="pickerRef"-->
        <!--                v-model="value_3"-->
        <!--                :columns="columns_3"-->
        <!--                has-input-->
        <!--                @change="changeHandler"-->
        <!--            ></hy-picker>-->
        <!--        </view>-->

        <!--        <view class="hy-title">自定义插槽</view>-->
        <!--        <view class="hy-container">-->
        <!--            <hy-picker v-model="value" :columns="columns_2" has-input>-->
        <!--                <template #toolbar-right>-->
        <!--                    <view>自定义按钮</view>-->
        <!--                </template>-->
        <!--                <template #toolbar-bottom>-->
        <!--                    <view style="text-align: center; color: red">我是底部信息</view>-->
        <!--                </template>-->
        <!--            </hy-picker>-->
        <!--        </view>-->
    </hy-config-provider>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import HyPicker from '@/package/components/hy-picker/hy-picker.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import type { PickerColumnVo } from '@/package/components/hy-picker/typing'
const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)

const value = ref('冷月雪')
const value_2 = ref('欧元，票子')
const value_3 = ref('')
const pickerRef = ref()
const columns: PickerColumnVo[][] = reactive([
    [
        {
            label: '雪月夜',
            value: 2021
        },
        {
            label: '冷夜雨',
            value: 804
        }
    ]
])

const columns_2: string[][] = reactive([
    ['欧元', '美元'],
    ['房子', '车子', '票子', '女人']
])

const columns_3: string[][] = reactive([
    ['中国', '美国'],
    ['深圳', '厦门', '上海', '拉萨']
])
const column_3Data = reactive([
    ['深圳', '厦门', '上海', '拉萨'],
    ['得州', '华盛顿', '纽约', '阿拉斯加']
])
const changeHandler = (e) => {
    const { columnIndex, value, values, index } = e

    if (columnIndex === 0) {
        // columns_2[1] = column_2Data[index]
        pickerRef.value.setColumnValues(1, column_3Data[index])
    }
}
</script>

<style scoped lang="scss"></style>
