import type { ExtractPropTypes } from 'vue'
import type badgeProps from './props'

export interface HyBadgeProps extends ExtractPropTypes<typeof badgeProps> {}

export interface IBadgeEmit {
    /** 点击触发 */
    click: [event: Event]
}
