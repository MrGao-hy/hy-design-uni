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

export type PopoverExpose = {
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
    (e: 'menuClick', params: PopoverItemParamsVo): void
    (e: 'change', params: PopoverParamsVo): void
    (e: 'open'): void
    (e: 'close'): void
    (e: 'update:modelValue', value: boolean): void
}
