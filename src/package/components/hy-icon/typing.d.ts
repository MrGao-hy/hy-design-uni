import type { ExtractPropTypes } from 'vue'
import iconProps from './props'

export interface HyIconProps extends ExtractPropTypes<typeof iconProps> {}

export interface IIconEmits {
    /** 点击图标触发 */
    (e: 'click', index: string, e: Event): void
}
