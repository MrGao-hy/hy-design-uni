import type {
    InputOnBlurEvent,
    InputOnConfirmEvent,
    InputOnFocusEvent,
    InputOnKeyboardheightchange
} from '@uni-helper/uni-types'
import type { ExtractPropTypes } from 'vue'
import type inputProps from './props'

export interface HyInputProps extends ExtractPropTypes<typeof inputProps> {}

export interface IInputEmits {
    /** 输入框失去焦点时触发 */
    (e: 'blur', event: InputOnBlurEvent, value: string | number): void
    /** 输入框聚焦时触发 */
    (e: 'focus', event: InputOnFocusEvent): void
    /** 点击完成按钮时触发 */
    (e: 'confirm', event: InputOnConfirmEvent, value: string | number): void
    /** 键盘高度发生变化的时候触发此事件 */
    (e: 'keyboardheightchange', event: InputOnKeyboardheightchange): void
    /** 内容发生变化触发此事件 */
    (e: 'change', value: string | number): void
    /** 内容发生变化触发此事件 */
    (e: 'update:modelValue', value: string | number): void
    /** 点击清空内容 */
    (e: 'clear'): void
    /** 点击前缀触发 */
    (e: 'onPrefix'): void
    /** 点击后缀触发 */
    (e: 'onSuffix'): void
}
