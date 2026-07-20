import type { ExtractPropTypes } from 'vue'
import iconProps from '@/package/components/hy-icon/props.ts'

export interface HyIconProps extends ExtractPropTypes<typeof iconProps> {}

export interface IIconEmits {
    /** 点击图标触发 */
    click: [index: string, e: Event]
}
