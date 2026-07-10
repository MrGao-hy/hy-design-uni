import type {
    InputOnBlurEvent,
    InputOnConfirmEvent,
    InputOnFocusEvent
} from '@uni-helper/uni-types'
import type { ExtractPropTypes } from 'vue'
import type textareaProps from './props'

export interface HyTextareaProps extends ExtractPropTypes<typeof textareaProps> {}

export interface ITextareaEmits {
    /** 输入框失去焦点时触发 */
    blur: [event: InputOnBlurEvent]
    /** 输入框聚焦时触发 */
    focus: [event: InputOnFocusEvent]
    /** 当键盘输入时，触发 input 事件 */
    change: [value: string]
    /** 点击完成时， 触发 confirm 事件 */
    confirm: [event: InputOnConfirmEvent]
    /** 输入框行数变化时调用 */
    lineChange: [event: any]
    /** 当键盘输入时，触发 input 事件 */
    'update:modelValue': [value: string]
    /** 键盘高度发生变化的时候触发此事件 */
    keyboardheightchange: [event: InputOnKeyboardheightchangeEvent]
}
