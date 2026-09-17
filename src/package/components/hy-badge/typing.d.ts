import type { ExtractPropTypes } from 'vue'
import type badgeProps from './props'

export interface HyBadgeProps extends ExtractPropTypes<typeof badgeProps> {}

export interface IBadgeEmits {
    /** 点击触发 */
    click: [event: Event]
}
