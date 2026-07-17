import type { ExtractPropTypes, ToRefs } from 'vue'
import type cellProps from '../hy-cell/props'
import { HyIconProps } from '../../'

export interface ICellContext extends ToRefs<ExtractPropTypes<typeof cellProps>> {
    /** 点击事件 */
    onClick: (name: string | number) => void
}

export interface ICellItemSlots {
    /** 图标插槽 */
    icon: () => void
    /** 标题插槽 */
    title: () => void
    /** 小标题插槽 */
    sub: () => void
    /** 值插槽 */
    value: () => void
    /** 小标题插槽 */
    'right-icon': () => void
}
