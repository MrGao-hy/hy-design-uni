import type { ExtractPropTypes } from 'vue'
import type switchProps from './props'

export interface HySwitchProps extends ExtractPropTypes<typeof switchProps> {}
export type SwitchValue = boolean | number | string

export interface ISwitchEmits {
    /** 改变值触发 */
    change: [value: SwitchValue]
    /** 改变值触发 */
    'update:modelValue': [value: SwitchValue]
}
