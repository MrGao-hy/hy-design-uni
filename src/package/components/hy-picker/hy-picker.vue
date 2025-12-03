<template>
    <view class="hy-picker">
        <view v-if="hasInput" class="hy-picker-input cursor-pointer" @click="onShowByClickInput">
            <slot v-if="$slots.default"></slot>
            <template v-else>
                <hy-input
                    v-model="inputLabelValue"
                    :readonly="true"
                    :disabled="input?.disabled"
                    :disabledColor="input?.disabledColor"
                    :shape="input?.shape"
                    :border="input?.border"
                    :prefixIcon="input?.prefixIcon"
                    :suffixIcon="input?.suffixIcon"
                    :color="input?.color"
                    :fontSize="input?.fontSize"
                    :inputAlign="input?.inputAlign"
                    :placeholder="input?.placeholder || '请选择'"
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
import { deepClone, sleep, addUnit, isArray } from '../../libs'
import type { IPickerEmits } from './typing'
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

// 上一次选择的列索引
const lastIndex = ref<number[]>([])
// 索引值 ，对应picker-view的value
const innerIndex = ref<number[]>([])
// 各列的值
const innerColumns = ref<any[][]>([])
// 上一次的变化列索引
const columnIndex = ref<number>(0)
const showByClickInput = ref<boolean>(false)
const currentActiveValue = ref<number[]>([]) //当前用户选中，但是还没确认的值，用户没做change操作时候，点击确认可以默认选中第一个

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
 * 监听默认值，给索引赋值
 * */
watch(
    () => props.modelValue,
    (newValue: string | unknown[]) => {
        if (newValue) {
            let arr
            if (isArray(newValue)) {
                arr = newValue.map((item, index) => {
                    return props.columns[index].findIndex((val) => item === val)
                })
            } else {
                arr = newValue.split(props.separator).map((item, index) => {
                    return props.columns[index].findIndex((val) => item === val)
                })
            }
            setIndexs(arr)
        }
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
    let firstItem = innerColumns.value[0] && innerColumns.value[0][0]
    // //区分是不是对象数组
    if (firstItem && Object.prototype.toString.call(firstItem) === '[object Object]') {
        let res: Record<string, any>[] = []
        innerColumns.value.map((ite, i) => {
            res.push(
                ...innerColumns.value[i]?.filter((item) => {
                    return isArray(props.modelValue) && props.modelValue.includes(item['id'])
                })
            )
        })
        res = res.map((item) => item[props.keyName])
        return res.join(props.separator)
    } else {
        //用户确定的值，才显示到输入框
        if (props.modelValue.length && isArray(props.modelValue)) {
            return props.modelValue.join(props.separator)
        }
        return props.modelValue as string
    }
})

/**
 * 已选，待确认的值
 * */
const inputValue = computed(() => {
    let items = innerColumns.value.map((item, index) => item[innerIndex.value[index]])
    let res: any[] = []
    //区分是不是对象数组
    if (items[0] && Object.prototype.toString.call(items[0]) === '[object Object]') {
        //对象数组返回id集合
        items.forEach((element) => {
            res.push(element && element['id'])
        })
    } else {
        //非对象数组返回元素集合
        items.forEach((element) => {
            res.push(element)
        })
    }
    return res
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
 * 获取item需要显示的文字，判别为对象还是文本
 * */
const getItemText = (item: any) => {
    if (Object.prototype.toString.call(item) === '[object Object]' && props.keyName) {
        return item[props.keyName]
    } else {
        return item
    }
}

/**
 * 关闭选择器
 * */
const closeHandler = () => {
    if (props.closeOnClickOverlay) {
        if (props.hasInput) {
            showByClickInput.value = false
        }
        emit('update:show', false)
        emit('close')
    }
}

/**
 * 点击工具栏的取消按钮
 * */
const cancel = () => {
    if (props.hasInput) {
        showByClickInput.value = false
    }
    emit('update:show', false)
    emit('cancel')
}

/**
 * 点击工具栏的确定按钮
 * */
const onConfirm = () => {
    //如果用户还没有触发过change
    if (!currentActiveValue.value.length) {
        let arr = [0]
        //如果有默认值&&默认值的数组长度是正确的，就用默认值
        if (
            Array.isArray(props.defaultIndex) &&
            props.defaultIndex.length === innerColumns.value.length
        ) {
            arr = [...props.defaultIndex]
        } else {
            //否则默认都选中第一个
            arr = Array(innerColumns.value.length).fill(0)
        }
        setIndexs(arr, true)
    }
    emit('update:modelValue', inputValue.value)
    if (props.hasInput) {
        showByClickInput.value = false
    }
    emit('update:show', false)
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
    // 优化：使用更高效的方式找出变化的列
    let changedColumnIndex = -1
    let changedItemIndex = 0

    // 记录用户选中但是还没确认的值
    currentActiveValue.value = value

    // 优化循环：使用for...of循环更简洁，并且在找到变化后立即退出
    for (let [i, newValue] of value.entries()) {
        const oldValue = lastIndex.value[i] || 0
        if (newValue !== oldValue) {
            changedColumnIndex = i
            changedItemIndex = newValue
            break
        }
    }

    // 如果有变化的列，才执行后续操作
    if (changedColumnIndex !== -1) {
        columnIndex.value = changedColumnIndex

        // 移除无条件重置索引的代码，仅在数据实际变化时重置

        // 优化：创建params对象时使用更简洁的方式
        const params = {
            value: innerColumns.value.map((item, idx) => item[value[idx]]),
            index: changedItemIndex,
            indexs: value,
            values: innerColumns.value,
            columnIndex: changedColumnIndex
        }

        // 将当前的各项变化索引，设置为"上一次"的索引变化值
        setIndexs(value, true)

        //如果是非自带输入框才会在change时候触发v-model绑值的变化
        if (!props.hasInput) {
            emit('update:modelValue', inputValue.value)
        }
        emit('change', params)
    }
}

/**
 * 设置index索引，此方法可被外部调用设置
 * */
function setIndexs(index: number[], isSetLastIndex?: boolean) {
    innerIndex.value = index
    // 移除调试日志
    if (isSetLastIndex) {
        setLastIndex(index)
    }
}

/**
 * 记录上一次的各列索引位置
 * */
const setLastIndex = (index: number[]) => {
    // 当能进入此方法，意味着当前设置的各列默认索引，即为“上一次”的选中值，需要记录，是因为changeHandler中
    // 需要拿前后的变化值进行对比，得出当前发生改变的是哪一列
    lastIndex.value = index
}

/**
 * 设置对应列选项的所有值
 * */
const setColumnValues = (columnI: number, values: AnyObject[]) => {
    innerColumns.value.splice(columnI, 1, values)
    let tmpIndex = deepClone(innerIndex.value)
    for (let i = 0; i < innerColumns.value.length; i++) {
        if (i > columnIndex.value) {
            tmpIndex[i] = 0
        }
    }
    // 一次性赋值，不能单个修改，否则无效
    setIndexs(tmpIndex, true)
}

/**
 * 获取对应列的所有选项
 * */
const getColumnValues = (columnI: number) => {
    // 进行同步阻塞，因为外部得到change事件之后，可能需要执行setColumnValues更新列的值
    // 索引如果在外部change的回调中调用getColumnValues的话，可能无法得到变更后的列值，这里进行一定延时，保证值的准确性
    ;(async () => {
        await sleep()
    })()
    return innerColumns.value[columnI]
}

defineExpose({
    setColumnValues
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
