type PaginationVo = {
    value: number
}

export interface IPaginationEmits {
    /** 改变值触发 */
    change: [param: PaginationVo]
    /** 改变值触发 */
    'update:modelValue': [value: PaginationVo['value']]
}
