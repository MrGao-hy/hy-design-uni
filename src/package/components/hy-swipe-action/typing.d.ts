import type { CSSProperties, PropType } from 'vue'

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

export default interface SwipeActionProps {
    /**
     * @description 滑动按钮的状态，使用v-model进行双向绑定。
     * 选值为：'left'（左滑）、'close'（关闭状态）、'right'（右滑）。
     * */
    modelValue?: SwipeActionStatus
    /**
     * @description 是否禁用滑动操作
     * */
    disabled?: boolean
    /**
     * @description 是否自动关闭其他swipe按钮组（默认 true ）
     * */
    autoClose?: boolean
    /**
     * @description 显示底部边框
     * */
    borderBottom?: boolean
    /**
     * @description 右侧按钮内容
     * */
    options?: SwipeActionOptionsVo[]
    /**
     * @description 动画过渡时间，单位ms（默认 350 ）
     * */
    duration?: number
    /**
     * @description 在关闭滑动按钮前调用的钩子函数
     * @desc 可以在此函数中执行一些关闭前的操作，如确认提示等。
     * */
    beforeClose?: funtion | PropType<SwipeActionBeforeClose>
    /**
     * @description 定义需要用到的外部样式
     * */
    customStyle?: CSSProperties
}

export interface ISwipeActionEmits {
    /** 当滑动按钮打开时，点击整个滑动操作容器触发 click 事件 */
    (e: 'click', value: SwipeActionPosition): void
    /** 点击动作执行函数 */
    (e: 'clickAction', temp: any, index: number): void
    /** 点击动作 */
    (e: 'update:modelValue', value: SwipeActionStatus): void
}
