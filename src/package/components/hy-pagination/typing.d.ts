type PaginationVo = {
    value: number
}

export interface IPaginationEmits {
    /** 改变值触发 */
    (e: 'change', param: PaginationVo): void
    /** 改变值触发 */
    (e: 'update:modelValue', value: PaginationVo['value']): void
}
