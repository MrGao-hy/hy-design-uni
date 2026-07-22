// --- 类型定义 ---
export interface DateItem {
    date: string | number | Date
    day: number | string
    week: number
    disabled?: boolean
    dot?: boolean
    bottomInfo?: string
    [key: string]: any
}

export interface MonthData {
    year: number | string
    month: number | string
    date: DateItem[]
}

/**
 * 月份选择模式类型
 *
 * 用于 MonthPicker 组件设置日期选择方式。
 *
 * @values
 * single-单个月份选择
 * multiple-多个月份选择
 * range-月份范围选择
 */
export type MonthModeType = 'single' | 'multiple' | 'range'

export interface IMonthProps {
    showMark?: boolean
    color?: string
    months?: MonthData[]
    mode?: MonthMode
    rowHeight?: string | number
    maxCount?: number
    startText?: string
    endText?: string
    defaultDate?: string | string[] | Date | null
    minDate?: string | number
    maxDate?: string | number
    maxMonth?: number
    readonly?: boolean
    maxRange?: number
    rangePrompt?: string
    showRangePrompt?: boolean
    allowSameDay?: boolean
    forbidDays?: string[]
    forbidDaysToast?: string
}

export interface ICalendarEmits {
    /** 日期选择完成后触发，则点击确认按钮后触发 */
    confirm: [selected: string[]]
    /** 日历关闭时触发 */
    close: []
    /** 触发关闭属性 */
    'update:show': [value: boolean]
}

/** HyCalendar 组件实例暴露的方法 */
export interface ICalendarExpose {
    /**
     * 设置日期格式化函数
     * @param formatter 格式化函数，接收日期字符串参数，返回格式化后的值
     */
    setFormatter: (formatter: (value: string) => string) => void
}

export interface IMonthExpose {
    /**
     * 获取元素
     */
    initLayout: () => void
}
