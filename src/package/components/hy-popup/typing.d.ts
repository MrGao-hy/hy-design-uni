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
