import type { InputOnConfirmEvent } from '@uni-helper/uni-types'

export interface ISearchEmits {
    /** disabled为true时，点击输入框，发出此事件，用于跳转搜索页 */
    click: []
    /** 输入框内容发生变化时触发 */
    change: [value: string]
    /** 左侧icon点击时候时触发 */
    clickIcon: [keyword: string]
    /** 用户确定搜索时触发，用户按回车键，或者手机键盘右下角的"搜索"键时触发 */
    search: [event: InputOnConfirmEvent, value: string]
    /** 配置了clearabled后，清空内容时会发出此事件 */
    clear: []
    /** 用户点击右侧控件时触发 */
    confirm: [value: string]
    /** 输入框获得焦点时触发 */
    focus: [e: InputOnFocusEvent, keyword: string]
    /** 输入框失去焦点时触发 */
    blur: [e: InputOnBlurEvent, keyword: string]
    /** 输入框内容发生变化时触发 */
    'update:modelValue': [value: string]
}
