export interface ICalendarEmits {
    /** 日期选择完成后触发，则点击确认按钮后触发 */
    (e: 'confirm', selected: string[]): void
    /** 日历关闭时触发 */
    (e: 'close'): void
}
