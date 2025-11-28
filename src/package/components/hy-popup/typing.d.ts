export interface IPopupEmits {
    /** 弹出层打开触发 */
    (e: 'open'): void
    /** 弹出层关闭触发 */
    (e: 'close'): void
    /** 弹出层点击触发 */
    (e: 'click'): void
    /** 显示隐藏触发 */
    (e: 'update:show', visible: boolean): void
}
