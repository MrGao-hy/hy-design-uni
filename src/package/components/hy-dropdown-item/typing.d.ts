export interface DropdownMenuItem {
    /**
     * @description 展示标题
     * */
    label: string
    /**
     * @description 值
     * */
    value: string | number
}

export interface IDropdownItemEmits {
    /** 选中值触发 */
    change: [item: DropdownMenuItem, index: number]
    /** 值改变触发 */
    'update:modelValue': [value: DropdownMenuItem['value']]
}
