<template>
    <hy-popup
        :show="show"
        mode="bottom"
        closeable
        @close="close"
        :round="round"
        :closeOnClickOverlay="closeOnClickOverlay"
    >
        <view class="hy-calendar">
            <HyHeader
                :title="title"
                :subtitle="subtitle"
                :showSubtitle="showSubtitle"
                :showTitle="showTitle"
                :weekText="weekText"
            ></HyHeader>
            <scroll-view
                :style="{
                    height: addUnit(listHeight)
                }"
                scroll-y
                @scroll="onScroll"
                :scroll-top="scrollTop"
                :scrollIntoView="scrollIntoView"
            >
                <HyMount
                    :color="color"
                    :rowHeight="rowHeight"
                    :showMark="showMark"
                    :months="months"
                    :mode="mode"
                    :maxCount="maxCount"
                    :startText="startText"
                    :endText="endText"
                    :defaultDate="defaultDate"
                    :minDate="innerMinDate"
                    :maxDate="innerMaxDate"
                    :maxMonth="monthNum"
                    :readonly="readonly"
                    :maxRange="maxRange"
                    :rangePrompt="rangePrompt"
                    :showRangePrompt="showRangePrompt"
                    :allowSameDay="allowSameDay"
                    :forbidDays="forbidDays"
                    :forbidDaysToast="forbidDaysToast"
                    ref="month"
                    @monthSelected="monthSelected"
                    @updateMonthTop="updateMonthTop"
                ></HyMount>
            </scroll-view>
            <slot name="footer" v-if="showConfirm">
                <view class="hy-calendar__confirm">
                    <HyButton
                        shape="circle"
                        :text="buttonDisabled ? confirmDisabledText : confirmText"
                        :color="color"
                        @click="confirm"
                        :disabled="buttonDisabled"
                    ></HyButton>
                </view>
            </slot>
        </view>
    </hy-popup>
</template>

<script lang="ts">
export default {
    name: 'hy-calendar',
    options: {
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import type { ICalendarEmits } from './typing'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import {
    addUnit,
    error,
    formatTime,
    isArray,
    isNumericString,
    padZero,
    range,
    useTranslate
} from '../../libs'
import Calendar from '../../libs/utils/calendar.js'
import calendarProps from './props'
import dayjs from 'dayjs/esm'
// 组件
import HyMount from './month.vue'
import HyHeader from './header.vue'
import HyPopup from '../hy-popup/hy-popup.vue'
import HyButton from '../hy-button/hy-button.vue'

/**
 * 用于单个选择日期，范围选择日期等，日历被包裹在底部弹起的容器中。
 * @displayName hy-calendar
 */
defineOptions({})

const props = defineProps(calendarProps)
const emit = defineEmits<ICalendarEmits>()

const { t } = useTranslate('calendar')
// 需要显示的月份的数组
const months = ref<any[]>([])
// 在月份滚动区域中，当前视图中月份的index索引
const monthIndex = ref(0)
// 月份滚动区域的高度
const listHeight = ref(0)
// month组件中选择的日期数组
const selected = ref<string[]>([])
const scrollIntoView = ref('')
const scrollIntoViewScroll = ref('')
const scrollTop = ref(0)
// 过滤处理方法
let innerFormatter = (value: string) => value

// 由于maxDate和minDate可以为字符串(2021-10-10)，或者数值(时间戳)，但是dayjs如果接受字符串形式的时间戳会有问题，这里进行处理
const innerMaxDate = computed(() => {
    return isNumericString(props.maxDate) ? Number(props.maxDate) : props.maxDate
})
const innerMinDate = computed(() => {
    return isNumericString(props.minDate) ? Number(props.minDate) : props.minDate
})

/**
 * 多个条件的变化，会引起选中日期的变化，这里统一管理监听
 * */
const selectedChange = computed(() => {
    return [innerMinDate.value, innerMaxDate.value, props.defaultDate]
})

/**
 * 获得两个日期之间的月份数
 * @param minDate 最小日期
 * @param maxDate 最大日期
 * */
const getMonths = (minDate: number | string, maxDate: number | string) => {
    const minYear = dayjs(minDate).year()
    const minMonth = dayjs(minDate).month() + 1
    const maxYear = dayjs(maxDate).year()
    const maxMonth = dayjs(maxDate).month() + 1
    return (maxYear - minYear) * 12 + (maxMonth - minMonth) + 1
}

/**
 * 设置月份数据
 * */
const setMonth = () => {
    // 最小日期的毫秒数
    const minDate = innerMinDate.value || dayjs().valueOf()
    // 如果没有指定最大日期，则往后推3个月
    const maxDate =
        innerMaxDate.value ||
        dayjs(minDate)
            .add(props.monthNum - 1, 'month')
            .valueOf()
    // 最大最小月份之间的共有多少个月份，
    const monthList = range(1, props.monthNum, getMonths(minDate, maxDate))
    // 先清空数组
    months.value = []
    for (let i = 0; i < monthList; i++) {
        months.value.push({
            date: new Array(dayjs(minDate).add(i, 'month').daysInMonth())
                .fill(1)
                .map((item, index) => {
                    // 日期，取值1-31
                    let day = index + 1
                    // 星期，0-6，0为周日
                    const week = dayjs(minDate).add(i, 'month').date(day).day()
                    const date = dayjs(minDate).add(i, 'month').date(day).format('YYYY-MM-DD')
                    let bottomInfo = ''
                    if (props.showLunar) {
                        // 将日期转为农历格式
                        const lunar = Calendar.solar2lunar(
                            dayjs(date).year(),
                            dayjs(date).month() + 1,
                            dayjs(date).date()
                        )
                        bottomInfo = lunar.IDayCn
                    }
                    let config = {
                        day,
                        week,
                        // 小于最小允许的日期，或者大于最大的日期，则设置为disabled状态
                        disabled:
                            dayjs(date).isBefore(dayjs(minDate).format('YYYY-MM-DD')) ||
                            dayjs(date).isAfter(dayjs(maxDate).format('YYYY-MM-DD')),
                        // 返回一个日期对象，供外部的formatter获取当前日期的年月日等信息，进行加工处理
                        date: new Date(date),
                        bottomInfo,
                        dot: false,
                        month: dayjs(minDate).add(i, 'month').month() + 1
                    }
                    const format = props.formatter || innerFormatter
                    return format(config as any)
                }),
            // 当前所属的月份
            month: dayjs(minDate).add(i, 'month').month() + 1,
            // 当前年份
            year: dayjs(minDate).add(i, 'month').year()
        })
    }
}

watch(
    () => selectedChange.value,
    () => setMonth(),
    { immediate: true }
)

watch(
    () => props.show,
    (newVal: boolean) => {
        if (newVal) {
            setMonth()
        } else {
            // 关闭时重置scrollIntoView，否则会出现二次打开日历，当前月份数据显示不正确。
            // scrollIntoView需要有一个值变动过程，才会产生作用。
            scrollIntoView.value = ''
        }
    },
    { immediate: true }
)

const subtitle = computed(() => {
    // 初始化时，this.months为空数组，所以需要特别判断处理
    if (months.value.length) {
        return formatTime(
            `${months.value[monthIndex.value].year}-${months.value[monthIndex.value].month}`,
            t('monthFormat')
        )
    } else {
        return ''
    }
})

const buttonDisabled = computed(() => {
    // 如果为range类型，且选择的日期个数不足1个时，让底部的按钮出于disabled状态
    if (props.mode === 'range') {
        return selected.value.length <= 1
    } else {
        return false
    }
})

onMounted(() => {
    // start.value = Date.now();
    init()
})

// 在微信小程序中，不支持将函数当做props参数，故只能通过ref形式调用
const setFormatter = (e: (value: string) => string) => {
    innerFormatter = e
}

/**
 * month组件内部选择日期后，通过事件通知给父组件
 */
const monthSelected = (e: string[], scene = 'init') => {
    selected.value = e
    if (!props.showConfirm) {
        // 在不需要确认按钮的情况下，如果为单选，或者范围多选且已选长度大于2，则直接进行返还
        if (
            props.mode === 'multiple' ||
            props.mode === 'single' ||
            (props.mode === 'range' && selected.value.length >= 2)
        ) {
            if (scene === 'init') {
                return
            }
            if (scene === 'tap') {
                emit('confirm', selected.value)
            }
        }
    }
}

const init = () => {
    // 校验maxDate，不能小于minDate。
    if (
        innerMaxDate.value &&
        innerMinDate.value &&
        new Date(innerMaxDate.value).getTime() < new Date(innerMinDate.value).getTime()
    ) {
        return error('maxDate不能小于minDate时间')
    }
    // 滚动区域的高度
    listHeight.value = props.rowHeight * 5 + 30
    setMonth()
}

const close = () => {
    emit('close')
}

/**
 * 点击确定按钮
 * */
const confirm = () => {
    if (!buttonDisabled.value) {
        emit('confirm', selected.value)
    }
}

/**
 * 滚动到默认设置的月份
 * @param selected 日期
 * */
const scrollIntoDefaultMonth = (selected: string) => {
    // 查询默认日期在可选列表的下标
    const _index = months.value.findIndex(({ year, month }) => {
        month = padZero(month)
        return `${year}-${month}` === selected
    })
    if (_index !== -1) {
        // #ifndef MP-WEIXIN
        nextTick(() => {
            scrollIntoView.value = `month-${_index}`
            scrollIntoViewScroll.value = scrollIntoView.value
        })
        // #endif
        // #ifdef MP-WEIXIN
        scrollTop.value = months.value[_index].top || 0
        // #endif
    }
}
// scroll-view滚动监听
const onScroll = (event: any) => {
    // 不允许小于0的滚动值，如果scroll-view到顶了，继续下拉，会出现负数值
    const scrollTop = Math.max(0, event.detail.scrollTop)
    // 将当前滚动条数值，除以滚动区域的高度，可以得出当前滚动到了哪一个月份的索引
    for (let i = 0; i < months.value.length; i++) {
        if (scrollTop >= (months.value[i].top || listHeight.value)) {
            monthIndex.value = i
            scrollIntoViewScroll.value = `month-${i}`
        }
    }
}
// 更新月份的top值
const updateMonthTop = (topArr = []) => {
    // 设置对应月份的top值，用于onScroll方法更新月份
    topArr.map((item, index) => {
        months.value[index].top = item
    })
    // 如果没有设置默认日期，则将当天日期设置为默认选中的日期
    let selected = dayjs().format('YYYY-MM')

    // 获取默认日期的下标
    if (!props.defaultDate) {
        scrollIntoDefaultMonth(selected)
        return
    }
    // 单选模式，可以是字符串或数组，Date对象等
    if (!isArray(props.defaultDate)) {
        selected = dayjs(props.defaultDate).format('YYYY-MM')
    } else {
        selected = dayjs(props.defaultDate[0]).format('YYYY-MM')
    }
    scrollIntoDefaultMonth(selected)
}

defineExpose({
    setFormatter
})
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
