interface MenusVo {
    /**
     * @description 显示菜单文本
     * */
    label?: string
    /**
     * @description 跳转路径
     * */
    url?: string
}

export type MenusType = MenusVo | string
export type IGap = {
    left?: number
    right?: number
    top?: number
    bottom?: number
}

export type FloatPositionVo =
    | 'left-top'
    | 'left-bottom'
    | 'right-top'
    | 'right-bottom'
    | 'left-center'
    | 'right-center'
    | 'top-center'
    | 'bottom-center'

export interface IFloatButtonEmits {
    /** 点击悬浮按钮触发 */
    (e: 'click'): void
    /** 点击菜单按钮触发 */
    (e: 'clickItem', item: MenusType, index: number): void
}
