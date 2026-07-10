export type IPlacementVo =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'
export type IOffset = number | number[] | Record<'x' | 'y', number>

export type IPopoverExpose = {
    open: () => void
    close: () => void
}
export interface PopoverContentVo {
    iconClass: string
    content: string
    icon: string
}

export type PopoverParamsVo = {
    show: boolean
}
export type PopoverItemParamsVo = {
    item: Record<string, any>
    index: number
}
export interface IPopoverEmits {
    /** 点击菜单项触发 */
    menuClick: [params: PopoverItemParamsVo]
    /** 气泡框状态变化时触发 */
    change: [params: PopoverParamsVo]
    /** 打开气泡框时触发 */
    open: []
    /** 关闭气泡框时触发 */
    close: []
    /** 手动更新显示隐藏 */
    'update:modelValue': [value: boolean]
}
