import type { InjectionKey, CSSProperties } from 'vue'
import type { IStepGroupContext } from './typing'
import { addUnit } from '../../libs'

/** hy-step-group 与 hy-step-item 之间的注入标识 */
export const STEP_GROUP_KEY: InjectionKey<IStepGroupContext> = Symbol('hy-step-group')

/**
 * 把颜色/尺寸 props 映射为 hy-step-item 的组件级 CSS 变量
 * @param options 激活色、未激活色与指示器大小
 */
export const createStepItemCssVars = (options: {
    activeColor?: string
    inactiveColor?: string
    iconSize?: string | number
}): CSSProperties => {
    const style: CSSProperties = {}
    const { activeColor, inactiveColor, iconSize } = options
    if (activeColor) {
        style['--hy-step-item-circle-process-bg'] = activeColor
        style['--hy-step-item-circle-text-finished-color'] = activeColor // 已完成状态的实心圆图标颜色
        style['--hy-step-item-dot-process-bg'] = activeColor
        style['--hy-step-item-dot-finished-bg'] = activeColor
        style['--hy-step-item-line-active-color'] = activeColor
        style['--hy-step-item-title-active-color'] = activeColor
    }
    if (inactiveColor) {
        style['--hy-step-item-circle-text-color'] = inactiveColor
        style['--hy-step-item-line-color'] = inactiveColor
    }
    if (iconSize !== '' && iconSize !== undefined) {
        const size = addUnit(iconSize)
        style['--hy-step-item-indicator-size'] = size
        style['--hy-step-item-icon-size'] = size
    }
    return style
}
