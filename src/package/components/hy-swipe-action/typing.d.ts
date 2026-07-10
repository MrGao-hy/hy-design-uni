import type { CSSProperties } from 'vue'

export interface SwipeActionOptionsVo {
    text: string
    style?: CSSProperties
    icon?: string
    iconSize?: string | number
}
export type SwipeActionStatus = 'close' | 'left' | 'right'
// 点击关闭按钮、滑动关闭按钮、通过控制value关闭按钮
export type SwipeActionReason = 'click' | 'swipe' | 'value'
export type SwipeActionPosition = SwipeActionStatus | 'inside'
export type SwipeActionBeforeClose = (
    reason: SwipeActionReason,
    position: SwipeActionPosition
) => void

export interface ISwipeActionEmits {
    /** 当滑动按钮打开时，点击整个滑动操作容器触发 click 事件 */
    click: [value: SwipeActionPosition]
    /** 点击动作执行函数 */
    clickAction: [temp: any, index: number]
    /** 点击动作 */
    'update:modelValue': [value: SwipeActionStatus]
}
