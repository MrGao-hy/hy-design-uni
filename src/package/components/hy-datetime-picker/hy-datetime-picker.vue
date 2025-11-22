<template>
    <view :class="['hy-datetime-picker', customClass]" :style="customStyle">
        <view v-if="hasInput" class="hy-datetime-picker__has-input" @click="onShowByClickInput">
            <slot name="trigger" :value="inputValue">
                <HyInput
                    v-model="inputValue"
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
                    :placeholder="input?.placeholder || '请选择时间'"
                    :placeholderStyle="input?.placeholderStyle"
                    :placeholderClass="input?.placeholderClass"
                    :customStyle="Object.assign({ 'pointer-events': 'none' }, input?.customStyle)"
                ></HyInput>
                <view class="input-cover"></view>
            </slot>
        </view>
        <HyPicker
            ref="picker"
            :show="show || (hasInput && showByClickInput)"
            :popupMode="popupMode"
            :closeOnClickOverlay="closeOnClickOverlay"
            :columns="columns"
            :title="title"
            :itemHeight="itemHeight"
            :loading="loading"
            :showToolbar="showToolbar"
            :visibleItemCount="visibleItemCount"
            :defaultIndex="innerDefaultIndex"
            :cancelText="cancelText"
            :cancelColor="cancelColor"
            :confirmColor="confirmColor"
            :toolbarRightSlot="toolbarRightSlot"
            @close="close"
            @cancel="cancel"
            @confirm="confirm"
            @change="change"
        >
            <template #toolbar-right>
                <slot name="toolbar-right">
                    {{ confirmText }}
                </slot>
            </template>
            <template #toolbar-bottom>
                <slot name="toolbar-bottom"></slot>
            </template>
        </HyPicker>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-datetime-picker',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import dayjs from 'dayjs/esm'
import { error, padZero, DateModeEnum } from '../../libs'
import type { IDatetimePickerEmits } from './typing'
import datetimePickerProps from './props'
// 组件
import HyInput from '../hy-input/hy-input.vue'
import HyPicker from '../hy-picker/hy-picker.vue'

/**
 * 此选择器用于时间日期选择
 * @displayName hy-datetime-picker
 */
defineOptions({})

const props = defineProps(datetimePickerProps)
const emit = defineEmits<IDatetimePickerEmits>()

// 原来的日期选择器不方便，这里增加一个hasInput选项支持类似element的自带输入框的功能。
const inputValue = ref<string | number>('') // 表单显示值
const innerValue = ref<string | number>('') // 表单显示值
const showByClickInput = ref<boolean>(false) // 是否在hasInput模式下显示日期选择弹唱
const columns = ref<any[]>([])
const innerDefaultIndex = ref<number[]>([])
let innerFormatter = (type: any, value: any) => value
const validModes = new Set([
    DateModeEnum.TIME,
    DateModeEnum.MONTH_DAY,
    DateModeEnum.HOUR_MINUTE,
    DateModeEnum.MINUTE_SECOND
])

/**
 * @description 更新各列的值
 * */
const updateColumns = () => {
    const formatterFn = props.formatter || innerFormatter
    // 获取各列的值，并且map后，对各列的具体值进行补0操作
    columns.value = getOriginColumns().map((column) =>
        column.values.map((value) => formatterFn(column.type, value))
    )
}

/**
 * @description 更新各列的值，进行补0、格式化等操作
 * */
const updateColumnValue = (value: string | number) => {
    innerValue.value = value
    updateColumns()
    // 延迟执行,等待u-picker组件列数据更新完后再设置选中值索引
    setTimeout(() => {
        updateIndexes(value)
    }, 100)
}

const init = () => {
    // 获取当前值
    innerValue.value = correctValue(props.modelValue)
    // 更新列表
    updateColumnValue(innerValue.value)

    // 初始化hasInput展示
    getInputValue(innerValue.value)
}

watch(
    () => props.show,
    (newValue) => {
        if (newValue) {
            updateColumnValue(innerValue.value)
        }
    }
)

watch(
    () => props.modelValue,
    () => init()
)

const propsChange = computed(() => {
    return [
        props.mode,
        props.maxDate,
        props.minDate,
        props.minHour,
        props.maxHour,
        props.minMinute,
        props.maxMinute,
        props.filter
    ]
})

watch(
    () => propsChange.value,
    () => init()
)

onMounted(() => {
    init()
})

const getInputValue = (newValue: string | number) => {
    if (newValue == '' || !newValue) {
        inputValue.value = ''
        return
    }
    if (props.mode === 'time') {
        inputValue.value = newValue
    } else {
        if (props.format) {
            inputValue.value = dayjs(newValue).format(props.format)
        } else {
            let format = ''
            switch (props.mode) {
                case DateModeEnum.DATE:
                    format = 'YYYY-MM-DD'
                    break
                case DateModeEnum.YEAR_MONTH:
                    format = 'YYYY-MM'
                    break
                case DateModeEnum.DATETIME:
                    format = 'YYYY-MM-DD HH:mm:ss'
                    break
                case DateModeEnum.MONTH_DAY:
                    format = 'MM-DD'
                    break
                case DateModeEnum.HOUR_MINUTE:
                    format = 'HH:mm'
                    break
                case DateModeEnum.MINUTE_SECOND:
                    format = 'mm:ss'
                    break
                default:
                    break
            }
            inputValue.value = dayjs(newValue).isValid() ? dayjs(newValue).format(format) : newValue
        }
    }
}
const times = (n: number, iteratee: Function) => {
    let index = -1
    const result = Array(n < 0 ? 0 : n)
    while (++index < n) {
        result[index] = iteratee(index)
    }
    return result
}

/**
 * @description 关闭选择器
 * */
const close = () => {
    if (props.closeOnClickOverlay) {
        if (props.hasInput) {
            showByClickInput.value = false
        }
        emit('close')
    }
}

/**
 * @description 点击工具栏的取消按钮
 * */
const cancel = () => {
    if (props.hasInput) {
        showByClickInput.value = false
    }
    emit('cancel')
}

/**
 * @description 点击工具栏的确定按钮
 * */
const confirm = () => {
    emit('update:modelValue', innerValue.value)
    if (props.hasInput) {
        getInputValue(innerValue.value)
        showByClickInput.value = false
    }
    emit('confirm', {
        value: innerValue.value,
        mode: props.mode
    })
}

/**
 * @description 用正则截取输出值,当出现多组数字时,抛出错误
 * */
const intercept = (e: any, type?: string) => {
    let judge = e.match(/\d+/g)
    //判断是否掺杂数字
    if (judge.length > 1) {
        error('请勿在过滤或格式化函数时添加数字')
        return 0
    } else if (type && judge[0].length == 4) {
        //判断是否是年份
        return judge[0]
    } else if (judge[0].length > 2) {
        error('请勿在过滤或格式化函数时添加数字')
        return 0
    } else {
        return judge[0]
    }
}

/**
 * @description 列发生变化时触发
 * */
const change = (e: any) => {
    const { indexs, values } = e
    let selectValue: string | number = ''
    if (validModes.has(props.mode) && props.mode !== DateModeEnum.MONTH_DAY) {
        // 根据value各列索引，从各列数组中，取出当前时间的选中值
        selectValue = `${intercept(values[0][indexs[0]])}:${intercept(values[1][indexs[1]])}`
    } else if (props.mode === DateModeEnum.MONTH_DAY) {
        // 根据value各列索引，从各列数组中，取出当前时间的选中值
        selectValue = `${intercept(values[0][indexs[0]])}-${intercept(values[1][indexs[1]])}`
    } else {
        // 将选择的值转为数值，比如'03'转为数值的3，'2019'转为数值的2019
        const year = parseInt(intercept(values[0][indexs[0]], 'year'))
        const month = parseInt(intercept(values[1][indexs[1]]))
        let date = parseInt(values[2] ? intercept(values[2][indexs[2]]) : 1)
        let hour = 0,
            minute = 0,
            second = 0
        // 此月份的最大天数
        const maxDate = dayjs(`${year}-${month}`).daysInMonth()
        // 不允许超过maxDate值
        date = Math.min(maxDate, date)
        if (props.mode === DateModeEnum.DATETIME) {
            hour = parseInt(intercept(values[3][indexs[3]]))
            minute = parseInt(intercept(values[4][indexs[4]]))
            second = parseInt(intercept(values[5][indexs[5]]))
        }
        // 转为时间模式
        selectValue = Number(new Date(year, month - 1, date, hour, minute, second))
    }
    // 取出准确的合法值，防止超越边界的情况
    selectValue = correctValue(selectValue)
    innerValue.value = selectValue
    updateColumnValue(selectValue)
    // 发出change时间，value为当前选中的时间戳
    emit('change', {
        value: selectValue,
        mode: props.mode
    })
}

/**
 * @description 更新索引
 * */
const updateIndexes = (value: number | string) => {
    let values: string[] = []
    let timeArr: string[] = []
    const formatterFn = props.formatter || innerFormatter

    switch (props.mode) {
        case DateModeEnum.TIME:
            timeArr = value.toString().split(':')
            // 使用formatter格式化方法进行管道处理
            values = [formatterFn('hour', timeArr[0]), formatterFn('minute', timeArr[1])]
            break
        case DateModeEnum.MONTH_DAY:
            timeArr = value.toString().split('-')
            // 使用formatter格式化方法进行管道处理
            values = [formatterFn('month', timeArr[0]), formatterFn('day', timeArr[1])]
            break
        case DateModeEnum.HOUR_MINUTE:
            timeArr = value.toString().split(':')
            // 使用formatter格式化方法进行管道处理
            values = [formatterFn('hour', timeArr[0]), formatterFn('minute', timeArr[1])]
            break
        case DateModeEnum.MINUTE_SECOND:
            timeArr = value.toString().split(':')
            // 使用formatter格式化方法进行管道处理
            values = [formatterFn('minute', timeArr[0]), formatterFn('second', timeArr[1])]
            break
        default:
            values = [
                formatterFn('year', `${dayjs(value).year()}`),
                // 月份补0
                formatterFn('month', padZero(dayjs(value).month() + 1))
            ]
            if (props.mode === DateModeEnum.DATE) {
                // date模式，需要添加天列
                values.push(formatterFn('day', padZero(dayjs(value).date())))
            }
            if (props.mode === DateModeEnum.DATETIME) {
                // 数组的push方法，可以写入多个参数
                values.push(
                    formatterFn('day', padZero(dayjs(value).date())),
                    formatterFn('hour', padZero(dayjs(value).hour())),
                    formatterFn('minute', padZero(dayjs(value).minute())),
                    formatterFn('second', padZero(dayjs(value).second()))
                )
            }
            break
    }
    // 根据当前各列的所有值，从各列默认值中找到默认值在各列中的索引
    innerDefaultIndex.value = columns.value.map((column, index) => {
        // 通过取大值，可以保证不会出现找不到索引的"-1"情况
        return Math.max(
            0,
            column.findIndex((item: string) => item === values[index])
        )
    })
}

/**
 * @description 获取每列数据
 * */
const getOriginColumns = () => {
    // 生成各列的值
    return getRanges().map(({ type, range }) => {
        let values = times(range[1] - range[0] + 1, (index: number) => {
            let value: string | number = range[0] + index
            value = type === 'year' ? `${value}` : padZero(value)
            return value
        })
        // 进行过滤
        if (props.filter) {
            values = props.filter(type, values)
            if (!values || (values && values.length == 0)) {
                error('日期filter结果不能为空')
            }
        }
        return { type, values }
    })
}

/**
 * @description 得出合法的时间
 * */
const correctValue = (value: number | string | Date): string | number => {
    const isDateMode = props.mode !== DateModeEnum.TIME
    // if (isDateMode && !test.date(value)) {
    if (!isDateMode && !value) {
        // 如果是时间类型，而又没有默认值的话，就用最小时间
        value = `${padZero(props.minHour)}:${padZero(props.minMinute)}`
    }
    // 时间类型
    if (validModes.has(props.mode)) {
        return value as string
    } else {
        // 如果是日期格式，控制在最小日期和最大日期之间
        value = dayjs(value).isBefore(dayjs(props.minDate)) ? props.minDate : value
        value = dayjs(value).isAfter(dayjs(props.maxDate)) ? props.maxDate : value
        return value as string | number
    }
}
/**
 * @description 获取每列的最大和最小值
 * */
const getRanges = () => {
    if (props.mode === DateModeEnum.TIME) {
        return [
            {
                type: 'hour',
                range: [props.minHour, props.maxHour]
            },
            {
                type: 'minute',
                range: [props.minMinute, props.maxMinute]
            }
        ]
    }
    const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = getBoundary('max', innerValue.value)
    const { minYear, minDate, minMonth, minHour, minMinute } = getBoundary('min', innerValue.value)
    const result = [
        {
            type: 'year',
            range: [minYear, maxYear]
        },
        {
            type: 'month',
            range: [minMonth, maxMonth]
        },
        {
            type: 'day',
            range: [minDate, maxDate]
        },
        {
            type: 'hour',
            range: [minHour, maxHour]
        },
        {
            type: 'minute',
            range: [minMinute, maxMinute]
        },
        {
            type: 'second',
            range: [minMinute, maxMinute]
        }
    ]
    let arr = result
    // 截取对应的列数
    if (props.mode === DateModeEnum.DATE) arr = result.splice(0, 3)
    if (props.mode === DateModeEnum.YEAR_MONTH) arr = result.splice(0, 2)
    if (props.mode === DateModeEnum.MONTH_DAY) arr = result.splice(1, 2)
    if (props.mode === DateModeEnum.HOUR_MINUTE) arr = result.splice(3, 2)
    if (props.mode === DateModeEnum.MINUTE_SECOND) arr = result.splice(4, 2)
    return arr
}
/**
 * @description 根据minDate、maxDate、minHour、maxHour等边界值，判断各列的开始和结束边界值
 * */
const getBoundary = (type: string, innerVal: string | number) => {
    const value = new Date(innerVal)
    const boundary = new Date((props as any)[`${type}Date`])
    const year = dayjs(boundary).year()
    let month = 1
    let date = 1
    let hour = 0
    let minute = 0
    if (type === 'max') {
        month = 12
        // 月份的天数
        date = dayjs(value).daysInMonth() || 31
        hour = 23
        minute = 59
    }
    // 获取边界值，逻辑是：当年达到了边界值(最大或最小年)，就检查月允许的最大和最小值，以此类推
    if (dayjs(value).year() === year) {
        month = dayjs(boundary).month() + 1
        if (dayjs(value).month() + 1 === month) {
            date = dayjs(boundary).date()
            if (dayjs(value).date() === date) {
                hour = dayjs(boundary).hour()
                if (dayjs(value).hour() === hour) {
                    minute = dayjs(boundary).minute()
                }
            }
        }
    }
    return {
        [`${type}Year`]: year,
        [`${type}Month`]: month,
        [`${type}Date`]: date,
        [`${type}Hour`]: hour,
        [`${type}Minute`]: minute
    }
}
const onShowByClickInput = () => {
    if (!props.input?.disabled) {
        showByClickInput.value = !showByClickInput.value
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
