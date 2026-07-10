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
    blur: [event: InputOnBlurEvent, value: string | number]
    /** 输入框聚焦时触发 */
    focus: [event: InputOnFocusEvent]
    /** 点击完成按钮时触发 */
    confirm: [event: InputOnConfirmEvent, value: string | number]
    /** 键盘高度发生变化的时候触发此事件 */
    keyboardheightchange: [event: InputOnKeyboardheightchange]
    /** 内容发生变化触发此事件 */
    change: [value: string | number]
    /** 内容发生变化触发此事件 */
    'update:modelValue': [value: string | number]
    /** 点击清空内容 */
    clear: []
    /** 点击前缀触发 */
    onPrefix: []
    /** 点击后缀触发 */
    onSuffix: []
}
