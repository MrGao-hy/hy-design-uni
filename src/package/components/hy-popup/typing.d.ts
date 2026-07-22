/**
 * 关闭图标位置类型
 *
 * 用于控制关闭图标在组件中的显示位置。
 *
 * @values
 * top-left-顶部左侧
 * top-right-顶部右侧
 */
export type CloseIconPositionType = 'top-left' | 'top-right'

export interface IPopupEmits {
    /** 弹出层打开触发 */
    open: []
    /** 弹出层关闭触发 */
    close: []
    /** 弹出层点击触发 */
    click: []
    /** 显示隐藏触发 */
    'update:show': [visible: boolean]
}
