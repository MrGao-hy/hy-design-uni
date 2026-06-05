export type KeyboardMode = 'default' | 'custom' | 'car' | 'idcard'
export type KeyType = '' | 'delete' | 'extra' | 'close'
export type CarKeyboardLang = 'zh' | 'en'

export interface Key {
  text?: number | string
  type?: KeyType
  wider?: boolean
}

export interface IKeyboardEmits {
  (e: 'update:show', value: boolean): void
  (e: 'input', value: string): void
  (e: 'close'): void
  (e: 'delete'): void
  (e: 'update:modelValue', value: string): void
  (e: 'update:carLang', value: CarKeyboardLang): void
}