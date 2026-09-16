import type { PropType } from 'vue'
import { useTranslate } from '../../libs'
import type { MonthData, MonthModeType } from './typing'

// 模块级翻译函数：props 默认值在运行时才会调用，避免 defineProps 引用 setup 内局部变量
const { t } = useTranslate('calendar')

const monthProps = {
    /** 是否显示月份背景水印 */
    showMark: {
        type: Boolean,
        default: true
    },
    /** 选中日期的颜色 */
    color: {
        type: String,
        default: '#3c9cff'
    },
    /** 需要展示的月份数据 */
    months: {
        type: Array as PropType<MonthData[]>,
        default: () => []
    },
    /** 日期选择模式 */
    mode: {
        type: String as PropType<MonthModeType>,
        default: 'single'
    },
    /** 日期行高度，单位px */
    rowHeight: {
        type: [String, Number],
        default: 58
    },
    /** multiple 模式下最多可选日期数 */
    maxCount: {
        type: Number,
        default: Infinity
    },
    /** 范围选择时，开始日期的提示文字 */
    startText: {
        type: String,
        default: () => t('startTime')
    },
    /** 范围选择时，结束日期的提示文字 */
    endText: {
        type: String,
        default: () => t('endTime')
    },
    /** 默认选中的日期 */
    defaultDate: {
        type: [String, Array, Date] as PropType<string | string[] | Date | null>,
        default: null
    },
    /** 最小可选日期 */
    minDate: {
        type: [String, Number],
        default: 0
    },
    /** 最大可选日期 */
    maxDate: {
        type: [String, Number],
        default: 0
    },
    /** 默认展示的月份数 */
    maxMonth: {
        type: Number,
        default: 2
    },
    /** 是否只读 */
    readonly: {
        type: Boolean,
        default: false
    },
    /** range 模式下最多可选天数 */
    maxRange: {
        type: Number,
        default: Infinity
    },
    /** 超出可选范围时的提示文案 */
    rangePrompt: {
        type: String,
        default: ''
    },
    /** 超出可选范围时是否弹出提示 */
    showRangePrompt: {
        type: Boolean,
        default: true
    },
    /** 是否允许起止日期为同一天 */
    allowSameDay: {
        type: Boolean,
        default: false
    },
    /** 禁止选择的日期列表 */
    forbidDays: {
        type: Array as PropType<string[]>,
        default: () => []
    },
    /** 选择禁止日期时的提示文案 */
    forbidDaysToast: {
        type: String,
        default: ''
    }
}

export default monthProps
