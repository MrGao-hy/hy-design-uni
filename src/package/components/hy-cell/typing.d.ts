/**
 * 箭头方向类型
 * left-向左
 * up-向上
 * down-向下
 * right-向右
 */
export type ArrowDirectionType = 'left' | 'up' | 'down' | 'right'

export interface ICellEmits {
    /** 点击单元格触发 */
    click: [name: string | number]
}
