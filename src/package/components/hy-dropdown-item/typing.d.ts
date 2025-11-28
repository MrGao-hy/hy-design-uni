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
    (e: 'change', item: DropdownMenuItem, index: number): void
    /** 值改变触发 */
    (e: 'update:modelValue', item: DropdownMenuItem): void
}
