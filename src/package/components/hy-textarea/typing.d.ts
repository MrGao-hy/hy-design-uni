import type { CSSProperties } from 'vue'

export default interface HyTextareaProps {
  modelValue: string
  placeholder?: string | null
  placeholderClass?: string
  placeholderStyle?: CSSProperties
  height?: number
  confirmType?: 'done' | 'send' | 'search' | 'next' | 'go'
  disabled?: boolean
  count?: boolean
  focus?: boolean
  autoHeight?: boolean
  fixed?: boolean
  cursorSpacing?: number
  cursor?: string
  showConfirmBar?: boolean
  selectionStart?: number
  selectionEnd?: number
  adjustPosition?: boolean
  disableDefaultPadding?: boolean
  holdKeyboard?: boolean
  maxlength?: number
  border?: HyApp.BorderType
  formatter?: ((value: string) => string) | null
  customStyle?: CSSProperties
}

export interface ITextareaEmits {
  /** 输入框失去焦点时触发 */
  (e: 'blur', event: any): void
  /** 输入框聚焦时触发 */
  (e: 'focus', event: any): void
  /** 当键盘输入时，触发 input 事件 */
  (e: 'change', value: string): void
  /** 点击完成时， 触发 confirm 事件 */
  (e: 'confirm', event: any): void
  /** 输入框行数变化时调用 */
  (e: 'lineChange', event: any): void
  /** 当键盘输入时，触发 input 事件 */
  (e: 'update:modelValue', value: string): void
  /** 键盘高度发生变化的时候触发此事件 */
  (e: 'keyboardheightchange', event: any): void
}
