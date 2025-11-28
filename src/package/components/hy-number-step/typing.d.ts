export interface INumberStepEmits {
    /** 输入框得到焦点触发 */
    (e: 'focus', value: string): void
    /** 输入框失去焦点时触发 */
    (e: 'blur', value: string): void
    /** 超过范围阈值时触发 */
    (e: 'overLimit', type: 'minus' | 'plus'): void
    /** 输入框内容发生变化时触发 */
    (e: 'change', value: string | number): void
    /** 点击增加按钮触发 */
    (e: 'plus', value: string): void
    /** 点击减少按钮触发 */
    (e: 'minus', value: string): void
    /** 值更新触发 */
    (e: 'update:modelValue', value: string | number): void
}
