/**
 * 输入框显示模式类型
 *
 * 用于控制输入框的外观样式。
 *
 * @values
 * box-盒子模式，有完整边框样式
 * line-底部横线模式，仅显示底部边框
 */
export type CodeInputModeType = 'box' | 'line'

export interface ICodeInputEmits {
    /** 输入内容发生改变时触发 */
    change: [value: string | number]
    /** 输入字符个数达maxlength值时触发确认 */
    finish: [value: string | number]
    /** 更新值 */
    'update:modelValue': [value: string | number]
    /** 输入框获取焦点时触发 */
    focus: []
    /** 输入框失去焦点时触发 */
    blur: []
}
