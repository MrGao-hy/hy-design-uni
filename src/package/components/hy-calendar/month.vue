<template>
    <view class="hy-calendar--month__wrapper" ref="wrapperRef">
        <view
            v-for="(item, index) in months"
            :key="index"
            :class="[`hy-calendar--month__${index}`]"
            :id="`month-${index}`"
        >
            <!-- 月份标题 -->
            <text v-if="index !== 0" class="hy-calendar--month__title">
                {{ formatTime(`${item.year}-${item.month}`, t('monthFormat')) }}
            </text>

            <view class="hy-calendar--month__days">
                <!-- 月份背景水印 -->
                <view v-if="showMark" class="hy-calendar--month__days__month-mark-wrapper">
                    <text class="hy-calendar--month__days__month-mark-wrapper__text">{{
                        item.month
                    }}</text>
                </view>

                <!-- 每一天 -->
                <view
                    class="hy-calendar--month__days__day"
                    v-for="(item1, index1) in item.date"
                    :key="index1"
                    :style="getDayStyle(index1, item1)"
                    @tap="clickHandler(item1)"
                >
                    <view :class="getDaySelectClass(item1)" :style="getDaySelectStyle(item1)">
                        <!-- 日期文字 -->
                        <text
                            class="hy-calendar--month__days__day__select__info"
                            :class="[
                                item1.disabled || isForbid(item1)
                                    ? 'hy-calendar--month__days__day__select__info--disabled'
                                    : ''
                            ]"
                            :style="getTextStyle(item1)"
                        >
                            {{ item1.day }}
                        </text>

                        <!-- 底部提示文字 (开始/结束) -->
                        <text
                            v-if="getBottomInfoText(item1)"
                            class="hy-calendar--month__days__day__select__button-info"
                            :class="[
                                item1.disabled || isForbid(item1)
                                    ? 'hy-calendar--month__days__day__select__button-info--disabled'
                                    : ''
                            ]"
                            :style="getTextStyle(item1)"
                        >
                            {{ getBottomInfoText(item1) }}
                        </text>

                        <!-- 打点标记 -->
                        <text
                            v-if="item1.dot"
                            class="hy-calendar--month__days__day__select__dot"
                        ></text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    options: {
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted, getCurrentInstance, type CSSProperties } from 'vue'
import dayjs from 'dayjs'
import {
    addUnit,
    colorGradient,
    deepClone,
    getRect,
    sleep,
    formatTime,
    useTranslate
} from '../../libs'
import type { DateItem, IMonthProps } from './typing'

const props = withDefaults(defineProps<IMonthProps>(), {
    showMark: true,
    color: '#3c9cff',
    months: () => [],
    mode: 'single',
    rowHeight: 58,
    maxCount: Infinity,
    startText: '开始',
    endText: '结束',
    defaultDate: null,
    minDate: 0,
    maxDate: 0,
    maxMonth: 2,
    readonly: false,
    maxRange: Infinity,
    rangePrompt: '',
    showRangePrompt: true,
    allowSameDay: false,
    forbidDays: () => [],
    forbidDaysToast: ''
})
const emit = defineEmits(['monthSelected', 'updateMonthTop'])

const { t } = useTranslate('calendar')
// --- 响应式变量 ---
const wrapperWidth = ref(0)
const selected = ref<string[]>([])
const instance = getCurrentInstance()

// --- 逻辑计算 ---

// 日期格子的样式
const getDayStyle = (index2: number, item: DateItem): CSSProperties => {
    const style: CSSProperties = {}
    let week = item.week
    const dayWidth = Number(
        parseFloat(String(wrapperWidth.value / 7))
            .toFixed(3)
            .slice(0, -1)
    )

    style.width = `${dayWidth}px`
    style.height = addUnit(props.rowHeight)

    if (index2 === 0) {
        week = (week === 0 ? 7 : week) - 1
        style.marginLeft = `${week * dayWidth}px`
    }

    if (props.mode === 'range') {
        style.padding = '0'
    }
    return style
}

// 选中状态的 Class
const getDaySelectClass = (item: DateItem) => {
    const dateStr = dayjs(item.date).format('YYYY-MM-DD')
    const classes = ['hy-calendar--month__days__day__select']

    if (selected.value.some((d) => dateSame(d, dateStr))) {
        classes.push('hy-calendar--month__days__day__select--selected')
        if (selected.value.length >= 2) {
            const len = selected.value.length - 1
            if (!dateSame(dateStr, selected.value[0]) && !dateSame(dateStr, selected.value[len])) {
                classes.push('hy-calendar--month__days__day__select--selected--center')
            }
        }
    }
    return classes
}

// 选中状态的 Inline Style
const getDaySelectStyle = (item: DateItem): CSSProperties => {
    const dateStr = dayjs(item.date).format('YYYY-MM-DD')
    const style: CSSProperties = {}
    const isIncluded = selected.value.some((d) => dateSame(d, dateStr))

    if (isIncluded) {
        style.backgroundColor = props.color
    }

    if (props.mode === 'single') {
        if (dateStr === selected.value[0]) {
            style.borderRadius = '3px'
        }
    } else if (props.mode === 'range') {
        if (selected.value.length >= 2) {
            const len = selected.value.length - 1
            if (dateSame(dateStr, selected.value[0])) {
                style.borderTopLeftRadius = '3px'
                style.borderBottomLeftRadius = '3px'
            }
            if (dateSame(dateStr, selected.value[len])) {
                style.borderTopRightRadius = '3px'
                style.borderBottomRightRadius = '3px'
            }
            // 区间中间部分
            if (
                dayjs(dateStr).isAfter(dayjs(selected.value[0])) &&
                dayjs(dateStr).isBefore(dayjs(selected.value[len]))
            ) {
                style.backgroundColor = colorGradient(props.color, '#ffffff', 100)[90]
                style.opacity = 0.7
            }
        } else if (selected.value.length === 1) {
            style.borderTopLeftRadius = '3px'
            style.borderBottomLeftRadius = '3px'
        }
    } else {
        if (isIncluded) style.borderRadius = '3px'
    }
    return style
}

// 文字颜色样式
const getTextStyle = (item: DateItem): CSSProperties => {
    const dateStr = dayjs(item.date).format('YYYY-MM-DD')
    const style: CSSProperties = {}

    if (selected.value.some((d) => dateSame(d, dateStr))) {
        style.color = '#ffffff'
    }

    if (props.mode === 'range' && selected.value.length >= 2) {
        const len = selected.value.length - 1
        if (
            dayjs(dateStr).isAfter(dayjs(selected.value[0])) &&
            dayjs(dateStr).isBefore(dayjs(selected.value[len]))
        ) {
            style.color = props.color
        }
    }
    return style
}

// 获取底部提示
const getBottomInfoText = (item: DateItem) => {
    const dateStr = dayjs(item.date).format('YYYY-MM-DD')
    const bottomInfo = item.bottomInfo || ''

    if (props.mode === 'range' && selected.value.length > 0) {
        if (selected.value.length === 1) {
            return dateSame(dateStr, selected.value[0]) ? props.startText : bottomInfo
        } else {
            const len = selected.value.length - 1
            if (
                dateSame(dateStr, selected.value[0]) &&
                dateSame(dateStr, selected.value[1]) &&
                len === 1
            ) {
                return `${props.startText}/${props.endText}`
            } else if (dateSame(dateStr, selected.value[0])) {
                return props.startText
            } else if (dateSame(dateStr, selected.value[len])) {
                return props.endText
            }
        }
    }
    return bottomInfo
}

// --- 方法 ---

const dateSame = (d1: any, d2: any) => dayjs(d1).isSame(dayjs(d2), 'day')

const isForbid = (item: DateItem) => {
    const dateStr = dayjs(item.date).format('YYYY-MM-DD')
    return props.mode !== 'range' && props.forbidDays.includes(dateStr)
}

const getWrapperWidth = async () => {
    const size: any = await getRect('.hy-calendar--month__wrapper', false, instance?.proxy)
    if (size) wrapperWidth.value = size.width
}

const getMonthRect = async () => {
    const promiseAllArr = props.months.map(
        (_, index) =>
            new Promise((resolve) => {
                getRect(`.hy-calendar--month__${index}`, false, instance?.proxy).then(resolve)
            })
    )

    const sizes: any[] = await Promise.all(promiseAllArr)
    let height = 1
    const topArr = []
    for (let i = 0; i < props.months.length; i++) {
        topArr[i] = height
        height += sizes[i]?.height || 0
    }
    emit('updateMonthTop', topArr)
}

const clickHandler = (item: DateItem) => {
    if (props.readonly || item.disabled) return

    const dateStr = dayjs(item.date).format('YYYY-MM-DD')
    if (isForbid(item)) {
        uni.showToast({ title: props.forbidDaysToast, icon: 'none' })
        return
    }

    let newSelected = [...selected.value]

    if (props.mode === 'single') {
        newSelected = [dateStr]
    } else if (props.mode === 'multiple') {
        const idx = newSelected.findIndex((d) => dateSame(d, dateStr))
        if (idx > -1) {
            newSelected.splice(idx, 1)
        } else if (newSelected.length < (props.maxCount as number)) {
            newSelected.push(dateStr)
        }
    } else if (props.mode === 'range') {
        if (newSelected.length === 0 || newSelected.length >= 2) {
            newSelected = [dateStr]
        } else {
            const startDate = newSelected[0]
            if (dayjs(dateStr).isBefore(dayjs(startDate))) {
                newSelected = [dateStr]
            } else if (dayjs(dateStr).isAfter(dayjs(startDate))) {
                // 范围限制校验
                const daysDiff = dayjs(dateStr).diff(dayjs(startDate), 'day')
                if (daysDiff >= (props.maxRange as number) && props.showRangePrompt) {
                    uni.showToast({
                        title: props.rangePrompt || `选择天数不能超过 ${props.maxRange} 天`,
                        icon: 'none'
                    })
                    return
                }

                // 填充中间日期
                const arr = []
                let curr = dayjs(startDate)
                const end = dayjs(dateStr)
                while (curr.isBefore(end)) {
                    arr.push(curr.format('YYYY-MM-DD'))
                    curr = curr.add(1, 'day')
                }
                arr.push(dateStr)
                newSelected = arr
            } else {
                if (!props.allowSameDay) return
                newSelected.push(dateStr)
            }
        }
    }
    setSelected(newSelected)
}

const setSelected = (val: string[], triggerEvent = true) => {
    selected.value = val
    if (triggerEvent) {
        emit('monthSelected', selected.value, 'tap')
    }
}

const setDefaultDate = () => {
    if (!props.defaultDate) {
        const today = dayjs().format('YYYY-MM-DD')
        return setSelected([today], false)
    }

    let dates: string[] = []
    if (props.mode === 'single') {
        dates = Array.isArray(props.defaultDate)
            ? [props.defaultDate[0]]
            : [dayjs(props.defaultDate).format('YYYY-MM-DD')]
    } else {
        if (!Array.isArray(props.defaultDate)) return
        dates = props.defaultDate
    }

    const min = props.minDate || dayjs().format('YYYY-MM-DD')
    const max =
        props.maxDate ||
        dayjs(min)
            .add(props.maxMonth - 1, 'month')
            .format('YYYY-MM-DD')

    const filtered = dates.filter(
        (d) =>
            dayjs(d).isAfter(dayjs(min).subtract(1, 'day')) &&
            dayjs(d).isBefore(dayjs(max).add(1, 'day'))
    )
    setSelected(filtered, false)
}

// --- 监听器 ---
watch(
    () => [props.minDate, props.maxDate, props.defaultDate],
    () => {
        setDefaultDate()
    },
    { immediate: true }
)

// --- 生命周期 ---
onMounted(async () => {
    emit('monthSelected', selected.value)
    await sleep(50)
    await getWrapperWidth()
    await getMonthRect()
})
</script>

<style lang="scss" scoped>
@import './index';
</style>
