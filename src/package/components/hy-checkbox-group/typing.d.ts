export interface ICheckBoxGroupEmits {
    /** 选择触发 */
    change: [temp: CheckboxColumnsVo]
    /** 更新值触发 */
    'update:modelValue': [value: any]
}
