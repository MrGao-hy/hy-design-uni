export type KeyboardMode = 'default' | 'custom' | 'car' | 'idcard'
export type KeyType = '' | 'delete' | 'extra' | 'close'
export type CarKeyboardLang = 'zh' | 'en'

export interface Key {
  text?: number | string
  type?: KeyType
  wider?: boolean
}

export interface IKeyboardEmits {
  'update:show': [value: boolean]
  input: [value: string]
  close: []
  delete: []
  'update:modelValue': [value: string]
  'update:carLang': [value: CarKeyboardLang]
}