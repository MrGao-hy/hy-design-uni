/**
 * 触发模式类型
 *
 * 用于控制组件显示或操作的触发方式。
 *
 * @values
 * longpress-长按触发
 * click-点击触发
 */
export type TriggerModeType = 'longpress' | 'click'

export interface ITooltipEmits {
    /** 点击菜单按钮触发 */
    click: [index: number]
}
