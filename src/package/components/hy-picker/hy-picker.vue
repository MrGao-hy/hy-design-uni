<template>
    <view class="hy-picker">
        <view v-if="hasInput" class="hy-picker-input cursor-pointer" @click="onShowByClickInput">
            <slot v-if="$slots.default"></slot>
            <template v-else>
                <hy-input
                    v-model="inputLabelValue"
                    :disabled="input?.disabled"
                    :disabledColor="input?.disabledColor"
                    :shape="input?.shape"
                    :border="input?.border"
                    :prefixIcon="input?.prefixIcon"
                    :suffixIcon="input?.suffixIcon"
                    :color="input?.color"
                    :fontSize="input?.fontSize"
                    :inputAlign="input?.inputAlign"
                    :placeholder="input?.placeholder || t('placeholder')"
                    :placeholderStyle="input?.placeholderStyle"
                    :placeholderClass="input?.placeholderClass"
                    :customStyle="Object.assign({ 'pointer-events': 'none' }, input?.customStyle)"
                ></hy-input>
                <view class="input-cover"></view>
            </template>
        </view>
        <hy-popup
            :show="show || (hasInput && showByClickInput)"
            :mode="popupMode"
            :zIndex="zIndex"
            @close="closeHandler"
        >
            <view class="hy-picker">
                <!-- 头部内容 -->
                <view class="hy-picker__title" v-if="showToolbar">
                    <view
                        class="hy-picker__title--left"
                        :style="{ color: cancelColor }"
                        @tap="cancel"
                    >
                        {{ cancelText }}
                    </view>
                    <view class="hy-picker__title--center">
                        {{ title }}
                    </view>
                    <view
                        class="hy-picker__title--right"
                        :style="{ color: confirmColor }"
                        @tap="onConfirm"
                    >
                        <slot v-if="$slots['toolbar-right']" name="toolbar-right"></slot>
                        <text v-else>{{ confirmText }}</text>
                    </view>
                </view>
                <!-- 头部内容 -->

                <slot name="toolbar-bottom"></slot>

                <!-- 加载loading -->
                <hy-loading
                    v-if="loading"
                    mode="circle"
                    custom-class="hy-picker__loading"
                    :custom-style="{
                        height: `${addUnit(visibleItemCount * itemHeight)}`
                    }"
                ></hy-loading>
                <!-- 加载loading -->

                <!-- 选择器内容 -->
                <picker-view
                    v-else
                    class="hy-picker--view"
                    :indicatorStyle="`height: ${addUnit(itemHeight)}`"
                    :value="innerIndex"
                    :immediateChange="immediateChange"
                    :style="{
                        height: `${addUnit(visibleItemCount * itemHeight)}`
                    }"
                    mask-class="hy-picker--view__mask"
                    @change="changeHandler"
                >
                    <picker-view-column
                        v-for="(item, index) in innerColumns"
                        :key="index"
                        class="hy-picker--view__column"
                    >
                        <view
                            v-if="Array.isArray(item)"
                            :class="[
                                'hy-picker--view__column__item',
                                index1 === innerIndex[index] &&
                                    'hy-picker--view__column__item--selected'
                            ]"
                            v-for="(item1, index1) in item"
                            :key="index1"
                            :style="{
                                height: addUnit(itemHeight),
                                lineHeight: addUnit(itemHeight),
                                fontWeight: index1 === innerIndex[index] ? 'bold' : 'normal',
                                display: 'block'
                            }"
                        >
                            {{ getItemText(item1) }}
                        </view>
                    </picker-view-column>
                </picker-view>
                <!-- 选择器内容 -->
            </view>
        </hy-popup>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-picker',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { addUnit, isArray, useTranslate } from '../../libs'
import type { IPickerEmits, IPickerExpose, PickerColumnVo } from './typing'
import pickerProps from './props'
// 组件
import HyInput from '../hy-input/hy-input.vue'
import HyLoading from '../hy-loading/hy-loading.vue'
import HyPopup from '../hy-popup/hy-popup.vue'

/**
 * 此选择器用于单列，多列，多列联动的选择场景。
 * @displayName hy-picker
 */
defineOptions({})

const props = defineProps(pickerProps)
const emit = defineEmits<IPickerEmits>()

const { t } = useTranslate('picker')
// 上一次选择的列索引
const lastIndex = ref<number[]>([])
// 索引值 ，对应picker-view的value
const innerIndex = ref<number[]>([])
// 各列的值
const innerColumns = ref<any[][]>([])
// 上一次的变化列索引
const columnIndex = ref<number>(0)
const showByClickInput = ref<boolean>(false)
// 当前用户选中，但是还没确认的值，用户没做change操作时候，点击确认可以默认选中第一个
const currentActiveValue = ref<number[]>([])

/**
 * 设置整体各列的columns的值
 * */
const setColumns = (columns: any[]) => {
    innerColumns.value = columns
    // 如果在设置各列数据时，没有被设置默认的各列索引defaultIndex，那么用0去填充它，数组长度为列的数量
    if (innerIndex.value.length === 0) {
        innerIndex.value = new Array(columns.length).fill(0)
    }
}

/**
 * 监听默认索引的变化，重新设置对应的值
 * */
watch(
    () => props.defaultIndex,
    (newValue) => {
        setIndexs(newValue)
    },
    { immediate: true }
)

/**
 * 解析 modelValue 为数组形式
 * @param value 原始值
 * @returns 解析后的数组
 */
const parseModelValue = (value: string | number | any[]): any[] => {
    if (isArray(value)) {
        return value
    }
    const strValue = String(value)
    return strValue.includes(props.separator) ? strValue.split(props.separator) : [value]
}

/**
 * 根据值查找对应列的索引
 * @param values 值数组
 * @returns 索引数组
 */
const findColumnIndexs = (values: any[]): number[] => {
    return values.map((item, columnIndex) => {
        const column = props.columns[columnIndex]
        if (!column) return 0

        const index = column.findIndex((option) => {
            const optionValue = typeof option === 'object' ? option[props.valueKey] : option
            return optionValue === item
        })
        // 未找到时默认返回 0
        return index < 0 ? 0 : index
    })
}

/**
 * 监听默认值，给索引赋值
 * */
watch(
    () => props.modelValue,
    (value) => {
        const values = parseModelValue(value)
        const indexs = findColumnIndexs(values)
        setIndexs(indexs)
    },
    { immediate: true }
)

/**
 * 监听columns参数的变化
 * */
watch(
    () => props.columns,
    (newValue) => {
        setColumns(newValue)
    },
    { deep: true, immediate: true }
)

/**
 * 已选&&已确认的值显示在input上面的文案
 * */
const inputLabelValue = computed((): string => {
    const firstItem = innerColumns.value[0]?.[0]
    if (!isObjectOption(firstItem)) {
        // 非对象数组，直接返回值
        return isArray(props.modelValue)
            ? props.modelValue.join(props.separator)
            : String(props.modelValue || '')
    }

    // 对象数组，查找匹配项并返回label
    const labels: string[] = []
    const values = isArray(props.modelValue) ? props.modelValue : [props.modelValue]

    innerColumns.value.forEach((column) => {
        column?.forEach((item) => {
            if (values.includes(getItemValue(item))) {
                labels.push(getItemText(item))
            }
        })
    })

    return labels.join(props.separator)
})

/**
 * 已选，待确认的值
 * */
const inputValue = computed(() => {
    return innerColumns.value.map((column, index) => {
        const item = column[innerIndex.value[index]]
        return getItemValue(item)
    })
})

/**
 * 显示
 * */
const onShowByClickInput = () => {
    if (!props.input?.disabled) {
        showByClickInput.value = !showByClickInput.value
    }
}

/**
 * 判断选项是否为对象类型
 * */
const isObjectOption = (item: any): boolean => {
    return item && Object.prototype.toString.call(item) === '[object Object]'
}

/**
 * 获取item需要显示的文字，判别为对象还是文本
 * */
const getItemText = (item: any) => {
    return isObjectOption(item) && props.labelKey ? item[props.labelKey] : item
}

/**
 * 获取选项的值
 * */
const getItemValue = (item: any) => {
    return isObjectOption(item) ? item[props.valueKey] : item
}

/**
 * 关闭选择器的公共逻辑
 * */
const closePicker = () => {
    if (props.hasInput) {
        showByClickInput.value = false
    }
    emit('update:show', false)
}

/**
 * 关闭选择器
 * */
const closeHandler = () => {
    if (props.closeOnClickOverlay) {
        closePicker()
        emit('close')
    }
}

/**
 * 点击工具栏的取消按钮
 * */
const cancel = () => {
    closePicker()
    emit('cancel')
}

/**
 * 点击工具栏的确定按钮
 * */
const onConfirm = () => {
    // 如果用户还没有触发过change，使用默认索引
    if (!currentActiveValue.value.length) {
        const defaultIndexs =
            Array.isArray(props.defaultIndex) &&
            props.defaultIndex.length === innerColumns.value.length
                ? [...props.defaultIndex]
                : Array(innerColumns.value.length).fill(0)
        setIndexs(defaultIndexs, true)
    }

    emit('update:modelValue', inputValue.value)
    closePicker()
    emit('confirm', {
        indexs: innerIndex.value,
        value: innerColumns.value.map((item, index) => item[innerIndex.value[index]]),
        values: innerColumns.value
    })
}

/**
 * 选择器某一列的数据发生变化时触发
 * */
const changeHandler = (e: any) => {
    const { value } = e.detail
    // 找出变化的列
    const changedIndex = value.findIndex((newValue, i) => newValue !== (lastIndex.value[i] ?? 0))

    if (changedIndex === -1) return

    currentActiveValue.value = value
    columnIndex.value = changedIndex

    const params = {
        value: innerColumns.value.map((item, idx) => item[value[idx]]),
        index: value[changedIndex],
        indexs: value,
        values: innerColumns.value,
        columnIndex: changedIndex
    }

    setIndexs(value, true)

    // 如果是非自带输入框才会在change时候触发v-model绑值的变化
    if (!props.hasInput) {
        emit('update:modelValue', inputValue.value)
    }
    emit('change', params)
}

/**
 * 设置index索引，此方法可被外部调用设置
 * */
function setIndexs(index: number[], isSetLastIndex?: boolean) {
    innerIndex.value = index
    if (isSetLastIndex) {
        lastIndex.value = index
    }
}

/**
 * 设置对应列选项的所有值
 * */
const setColumnValues = (columnI: number, values: Array<string | PickerColumnVo>) => {
    innerColumns.value.splice(columnI, 1, values)
    // 重置当前列之后的索引为0
    const tmpIndex = innerIndex.value.map((_, i) =>
        i > columnIndex.value ? 0 : innerIndex.value[i]
    )
    setIndexs(tmpIndex, true)
}

defineExpose<IPickerExpose>({
    setColumnValues,
    onConfirm,
    cancel
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
