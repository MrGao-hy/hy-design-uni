<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicSingleSection') }}</view>
        <view class="hy-container">
            <hy-picker v-model:show="show1" :columns="columns1" @confirm="onConfirm1"></hy-picker>
            <hy-cell clickable @click="onCellClick">
                <hy-cell-item :title="t('openPicker')" name="show1" :value="value1"></hy-cell-item>
            </hy-cell>
        </view>

        <view class="hy-title">{{ t('inputSection') }}</view>
        <view class="hy-container">
            <hy-picker
                v-model="value2"
                has-input
                :columns="columns2"
                :input="{ placeholder: t('selectCountry') }"
                @confirm="onConfirm2"
            ></hy-picker>
        </view>

        <view class="hy-title">{{ t('multiSection') }}</view>
        <view class="hy-container">
            <hy-picker
                v-model="value3"
                has-input
                :columns="columns3"
                separator="-"
                @confirm="onConfirm3"
            ></hy-picker>
        </view>

        <view class="hy-title">{{ t('linkageSection') }}</view>
        <view class="hy-container">
            <hy-picker
                ref="pickerRef"
                v-model="value4"
                :columns="columns4"
                has-input
                @change="changeHandler"
                @confirm="onConfirm4"
            ></hy-picker>
        </view>

        <view class="hy-title">{{ t('objectSection') }}</view>
        <view class="hy-container">
            <hy-picker
                v-model="value5"
                has-input
                :columns="columns5"
                label-key="label"
                value-key="value"
                @confirm="onConfirm5"
            ></hy-picker>
        </view>

        <view class="hy-title">{{ t('positionSection') }}</view>
        <view class="hy-container">
            <hy-picker
                :show="show6"
                :columns="columns6"
                popup-mode="top"
                @confirm="onConfirm6"
            ></hy-picker>
            <hy-cell clickable @click="onCellClick">
                <hy-cell-item :title="t('topPopup')" name="show6" :value="value6"></hy-cell-item>
            </hy-cell>
        </view>

        <view class="hy-title">{{ t('toolbarSection') }}</view>
        <view class="hy-container">
            <hy-picker
                :show="show7"
                :columns="columns7"
                :cancel-text="t('cancelSelect')"
                :confirm-text="t('confirmSelect')"
                cancel-color="#999999"
                confirm-color="#4F8EF7"
                :title="t('customTitle')"
                @confirm="onConfirm7"
                @cancel="onCancel7"
            ></hy-picker>
            <hy-cell clickable @click="onCellClick">
                <hy-cell-item :title="t('customBtn')" name="show7" :value="value7"></hy-cell-item>
            </hy-cell>
        </view>

        <view class="hy-title">{{ t('inputStyleSection') }}</view>
        <view class="hy-container">
            <hy-picker
                v-model="value8"
                has-input
                :columns="columns8"
                :input="{
                    placeholder: t('selectOption'),
                    fontSize: 16
                }"
            ></hy-picker>
        </view>

        <view class="hy-title">{{ t('defaultSection') }}</view>
        <view class="hy-container">
            <hy-picker
                v-model="value9"
                :columns="columns9"
                :defaultIndex="[1, 2]"
                has-input
                @confirm="onConfirm9"
            ></hy-picker>
        </view>

        <view class="hy-title">{{ t('maskSection') }}</view>
        <view class="hy-container">
            <hy-picker
                v-model:show="show10"
                :columns="columns10"
                :closeOnClickOverlay="false"
                :title="t('mustClickClose')"
                @confirm="onConfirm10"
            ></hy-picker>
            <hy-cell clickable @click="onCellClick">
                <hy-cell-item
                    :title="t('maskDisabled')"
                    name="show10"
                    :value="value10"
                ></hy-cell-item>
            </hy-cell>
        </view>

        <view class="hy-title">{{ t('slotSection') }}</view>
        <view class="hy-container">
            <hy-picker
                ref="pickerRef11"
                v-model="value11"
                has-input
                :columns="columns11"
                :title="t('customTitle')"
            >
                <template #toolbar-right>
                    <hy-button :text="t('save')" size="small" @click="handleSave"></hy-button>
                </template>
                <template #toolbar-bottom>
                    <view style="text-align: center; color: #999; padding: 10rpx">
                        {{ t('selectYourOption') }}
                    </view>
                </template>
            </hy-picker>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PickerColumnVo, IPickerExpose } from '@/package'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '选择器'
    }
})

const { t } = useTranslate('picker')
usePageTitle('picker')

// 1. 基础使用
const show1 = ref(false)
const value1 = ref('')
const columns1 = computed(() => [[t('china'), t('usa'), t('japan'), t('korea')]])

// 2. 输入框模式
const value2 = ref('')
const columns2 = computed(() => [[t('china'), t('usa'), t('japan')]])

// 3. 多列模式
const value3 = ref([])
const columns3 = computed(() => [
    [t('mon'), t('tue'), t('wed'), t('thu'), t('fri')],
    [t('morning'), t('afternoon'), t('evening')],
    ['9:00', '10:00', '11:00']
])

// 4. 多列联动
const pickerRef = ref<IPickerExpose>()
// 11. 自定义插槽 ref
const pickerRef11 = ref<IPickerExpose>()
const value4 = ref([])
const columns4 = computed(() => [
    [t('china'), t('usa')],
    [t('beijing'), t('shanghai'), t('guangzhou')]
])
type CountryMap = {
    [key: string]: string[]
}
const cityData = computed<CountryMap>(() => ({
    [t('china')]: [t('beijing'), t('shanghai'), t('guangzhou'), t('shenzhen')],
    [t('usa')]: [t('newYork'), t('losAngeles'), t('chicago'), t('houston')]
}))

// 5. 对象数据格式
const value5 = ref('')
const columns5 = computed<PickerColumnVo[][]>(() => [
    [
        { label: t('nameSnow'), value: 2021 },
        { label: t('nameColdRain'), value: 804 },
        { label: t('nameBreeze'), value: 305 }
    ]
])

// 6. 自定义弹窗位置
const show6 = ref(false)
const value6 = ref('')
const columns6 = computed(() => [[t('option1'), t('option2'), t('option3')]])

// 7. 自定义工具栏按钮
const show7 = ref(false)
const value7 = ref('')
const columns7 = computed(() => [[t('optionA'), t('optionB'), t('optionC')]])

// 8. 自定义输入框样式
const value8 = ref('')
const columns8 = computed(() => [[t('option1'), t('option2'), t('option3')]])

// 9. 默认选中项
const value9 = ref(['B', '4'])
const columns9 = computed(() => [
    ['A', 'B', 'C', 'D'],
    ['1', '2', '3', '4']
])

// 10. 禁用遮罩关闭
const show10 = ref(false)
const value10 = ref('')
const columns10 = computed(() => [[t('option1'), t('option2'), t('option3')]])

// 11. 自定义插槽
const value11 = ref('')
const columns11 = computed(() => [[t('option1'), t('option2'), t('option3')]])

const onConfirm1 = (e: any) => {
    console.log('基础使用:', e.value)
    value1.value = e.value.join('')
    show1.value = false
}

const onConfirm2 = (e: any) => {
    console.log('输入框模式:', e.value)
}

const onConfirm3 = (e: any) => {
    console.log('多列模式:', e.value)
}

const changeHandler = (e: any) => {
    const { columnIndex, value } = e
    if (columnIndex === 0) {
        const selectedCountry: string = value[0]
        pickerRef.value && pickerRef.value.setColumnValues(1, cityData.value[selectedCountry])
    }
}

const onConfirm4 = (e: any) => {
    console.log('联动选择:', e.value)
}

const onConfirm5 = (e: any) => {
    console.log('对象数据:', e.value)
}

const onConfirm6 = (e: any) => {
    console.log('居中弹窗:', e.value)
    value6.value = e.value.join('')
    show6.value = false
}

const onConfirm7 = (e: any) => {
    console.log('自定义按钮:', e.value)
    value7.value = e.value.join('')
    show7.value = false
}

const onCancel7 = () => {
    console.log('取消选择')
    show7.value = false
}

const onConfirm9 = (e: any) => {
    console.log('默认选中:', e.value)
    value9.value = e.value.join(' / ')
}

const onConfirm10 = (e: any) => {
    console.log('禁用遮罩:', e.value)
    value10.value = e.value.join('')
    show10.value = false
}

const onCellClick = (name: string | number) => {
    if (name === 'show1') show1.value = true
    else if (name === 'show6') show6.value = true
    else if (name === 'show7') show7.value = true
    else if (name === 'show10') show10.value = true
}

const handleSave = () => {
    console.log('保存:', value11.value)
    if (pickerRef11.value) {
        pickerRef11.value.onConfirm()
    }
}

useShareButton()
</script>

<style scoped lang="scss"></style>
