export interface INumberStepEmits {
    /** 输入框得到焦点触发 */
    focus: [value: string]
    /** 输入框失去焦点时触发 */
    blur: [value: string]
    /** 超过范围阈值时触发 */
    overLimit: [type: 'minus' | 'plus']
    /** 输入框内容发生变化时触发 */
    change: [value: string | number]
    /** 点击增加按钮触发 */
    plus: [value: string | number]
    /** 点击减少按钮触发 */
    minus: [value: string | number]
    /** 值更新触发 */
    'update:modelValue': [value: string | number]
}
