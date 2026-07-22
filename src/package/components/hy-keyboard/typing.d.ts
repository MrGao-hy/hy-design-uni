/**
 * 键盘类型
 *
 * 用于 Keyboard 组件选择不同的输入键盘模式。
 *
 * @values
 * default-默认数字键盘
 * custom-自定义键盘
 * car-车牌号键盘
 * idcard-身份证键盘
 */
export type KeyboardModeType = 'default' | 'custom' | 'car' | 'idcard'

/**
 * 键盘按键类型
 *
 * 用于定义特殊功能按键。
 *
 * @values
 * ''-普通按键
 * delete-删除按键
 * extra-扩展功能按键
 * close-关闭键盘按键
 */
export type KeyType = '' | 'delete' | 'extra' | 'close'

/**
 * 车牌键盘语言类型
 *
 * 用于车牌号输入键盘选择语言。
 *
 * @values
 * zh-中文键盘
 * en-英文键盘
 */
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
