import type { InputOnConfirmEvent } from '@uni-helper/uni-types'

export interface ISearchEmits {
    /** disabled为true时，点击输入框，发出此事件，用于跳转搜索页 */
    (e: 'click'): void
    /** 输入框内容发生变化时触发 */
    (e: 'change', value: string): void
    /** 左侧icon点击时候时触发 */
    (e: 'clickIcon', keyword: string): void
    /** 用户确定搜索时触发，用户按回车键，或者手机键盘右下角的"搜索"键时触发 */
    (e: 'search', event: InputOnConfirmEvent, value: string): void
    /** 配置了clearabled后，清空内容时会发出此事件 */
    (e: 'clear'): void
    /** 用户点击右侧控件时触发 */
    (e: 'confirm', value: string): void
    /** 输入框获得焦点时触发 */
    (e: 'focus', e: InputOnFocusEvent, keyword: string): void
    /** 输入框失去焦点时触发 */
    (e: 'blur', e: InputOnBlurEvent, keyword: string): void
    /** 输入框内容发生变化时触发 */
    (e: 'update:modelValue', value: string): void
}
