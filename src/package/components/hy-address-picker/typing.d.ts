export type ConfirmParams = {
    /** 选中值 */
    value: string
}
export interface IAddressPickerEmits {
    /** 关闭选择器时触发 */
    (e: 'close'): void
    /** 点击取消按钮触发 */
    (e: 'cancel'): void
    /** 点击确认按钮触发 */
    (e: 'confirm', params: ConfirmParams): void
    /** 当选择值变化时触发 */
    (e: 'change', args: any): void
    /** 当选择值变化时触发 */
    (e: 'update:modelValue', value: ConfirmParams['value']): void
}
