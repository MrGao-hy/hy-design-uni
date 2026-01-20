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

export interface IMonthProps {
    showMark?: boolean
    color?: string
    months?: MonthData[]
    mode?: 'single' | 'multiple' | 'range'
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
    (e: 'confirm', selected: string[]): void
    /** 日历关闭时触发 */
    (e: 'close'): void
}
