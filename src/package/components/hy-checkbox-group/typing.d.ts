export interface ICheckBoxGroupEmits {
    /** 选择触发 */
    (e: 'change', temp: CheckboxColumnsVo): void
    /** 更新值触发 */
    (e: 'update:modelValue', value: any): void
}
