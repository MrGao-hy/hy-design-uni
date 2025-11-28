export interface ICodeInputEmits {
    /** 输入内容发生改变时触发 */
    (e: 'change', value: string | number): void
    /** 输入字符个数达maxlength值时触发确认 */
    (e: 'finish', value: string | number): void
    /** 更新值 */
    (e: 'update:modelValue', value: string | number): void
}
