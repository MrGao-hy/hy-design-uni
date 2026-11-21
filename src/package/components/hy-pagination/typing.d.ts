/** 分页模式：simple 简单模式，multi 页码模式 */
export type PaginationMode = 'simple' | 'multi'

/** 页码项：page 页码，ellipsis 省略号 */
export type PaginationItem =
    | { type: 'page'; value: number; key: string }
    | { type: 'ellipsis'; key: string }

/** page 插槽参数 */
export interface IPaginationPageSlotProps {
    /** 页码数字 */
    number: number
    /** 页码显示文本 */
    text: string
    /** 是否为当前选中页 */
    active: boolean
}

export interface IPaginationSlots {
    /** 自定义页码 */
    page: (props: IPaginationPageSlotProps) => any
    /** 自定义上一页按钮文字 */
    'prev-text': () => any
    /** 自定义下一页按钮文字 */
    'next-text': () => any
}

type PaginationVo = {
    value: number
}

export interface IPaginationEmits {
    /** 改变值触发 */
    change: [param: PaginationVo]
    /** 改变值触发 */
    'update:modelValue': [value: PaginationVo['value']]
}
