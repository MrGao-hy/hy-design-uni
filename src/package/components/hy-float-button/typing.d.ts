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

/**
 * 浮动位置类型
 *
 * 用于控制浮动元素在容器中的显示位置。
 * left-top-左上角
 * left-bottom-左下角
 * right-top-右上角
 * right-bottom-右下角
 * left-center-左侧居中
 * right-center-右侧居中
 * top-center-顶部居中
 * bottom-center-底部居中
 */
export type FloatPositionType =
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
    click: []
    /** 点击菜单按钮触发 */
    clickItem: [item: MenusType, index: number]
}
