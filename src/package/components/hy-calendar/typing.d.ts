export default interface HyCalendarProps {
    /**
     * @description 是否显示日历弹窗 (默认 false )
     * */
    show: boolean
    /**
     * @description 标题内容 (默认 日期选择 )
     * */
    title?: string

    /**
     * @description 是否显示标题  (默认 true )
     * */
    showTitle?: boolean
    /**
     * @description 是否显示副标题	(默认 true )
     * */
    showSubtitle?: boolean
    /**
     * @description 日期类型选择  single-选择单个日期，multiple-可以选择多个日期，range-选择日期范围 （ 默认 'single' )
     * */
    mode?: 'single' | 'range' | 'multiple'
    /**
     * @description mode=range时，第一个日期底部的提示文字  (默认 '开始' )
     * */
    startText?: string
    /**
     * @description mode=range时，最后一个日期底部的提示文字 (默认 '结束' )
     * */
    endText?: string
    /**
     * @description 自定义列表
     * */
    customList?: any[]
    /**
     * @description 主题色，对底部按钮和选中日期有效  (默认 ‘#3c9cff' )
     * */
    color?: string
    /**
     * @description 最小的可选日期	 (默认 0 )
     * */
    minDate?: number | string
    /**
     * @description 最大可选日期  (默认 0 )
     * */
    maxDate?: number | string
    /**
     * @description 默认选中的日期，mode为multiple或range是必须为数组格式
     * */
    defaultDate?: Date | string | string[] | null
    /**
     * @description mode=multiple时，最多可选多少个日期  (默认 	Number.MAX_SAFE_INTEGER  )
     * */
    maxCount?: number
    /**
     * @description 日期行高 (默认 56 )
     * */
    rowHeight?: number
    /**
     * @description 日期格式化函数
     * */
    formatter?: ((date: Date) => string) | null
    /**
     * @description 是否显示农历  (默认 false )
     * */
    showLunar?: boolean
    /**
     * @description 是否显示月份背景色 (默认 true )
     * */
    showMark?: boolean
    /**
     * @description 确定按钮的文字 (默认 '确定' )
     * */
    confirmText?: string
    /**
     * @description 确认按钮处于禁用状态时的文字 (默认 '确定' )
     * */
    confirmDisabledText?: string
    /**
     * @description 是否允许点击遮罩关闭日历 (默认 false )
     * */
    closeOnClickOverlay?: boolean
    /**
     * @description 是否为只读状态，只读状态下禁止选择日期 (默认 false )
     * */
    readonly?: boolean
    /**
     * @description 是否展示确认按钮
     * */
    showConfirm?: boolean
    /**
     * @description 日期区间最多可选天数，默认无限制，mode = range时有效
     * */
    maxRange?: number
    /**
     * @description 范围选择超过最多可选天数时的提示文案，mode = range时有效
     * */
    rangePrompt?: string | null
    /**
     * @description 范围选择超过最多可选天数时，是否展示提示文案，mode = range时有效 (默认 true )
     * */
    showRangePrompt?: boolean
    /**
     * @description 是否允许日期范围的起止时间为同一天，mode = range时有效 (默认 false )
     * */
    allowSameDay?: boolean
    /**
     * @description 圆角值，默认无圆角  (默认 0 )
     * */
    round?: number
    /**
     * @description 最多展示的月份数量  (默认 3 )
     * */
    monthNum?: number
    /**
     * @description 星期文案  (默认 ['一', '二', '三', '四', '五', '六', '日'] )
     * */
    weekText?: string[]
    /**
     * @description 单选与多选禁止选中的日期列表，mode!=range时有效。
     * */
    forbidDays?: Date[]
    /**
     * @description 单选与多选禁止选中的日期选择时提示
     * */
    forbidDaysToast?: string
}

export interface ICalendarEmits {
    /** 日期选择完成后触发，则点击确认按钮后触发 */
    (e: 'confirm', selected: string[]): void
    /** 日历关闭时触发 */
    (e: 'close'): void
}
