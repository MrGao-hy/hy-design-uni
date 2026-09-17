export interface ICheckBoxGroupEmits {
    /** 选择触发，参数为选中的值数组 */
    change: [temp: (string | number)[]]
    /** 更新值触发 */
    'update:modelValue': [value: any]
}
