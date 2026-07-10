export type ConfirmParams = {
    /** 选中值 */
    value: string
}
export interface IAddressPickerEmits {
    /** 关闭选择器时触发 */
    close: []
    /** 点击取消按钮触发 */
    cancel: []
    /** 点击确认按钮触发 */
    confirm: [params: ConfirmParams]
    /** 当选择值变化时触发 */
    change: [args: any]
    /** 当选择值变化时触发 */
    'update:modelValue': [value: ConfirmParams['value']]
}
