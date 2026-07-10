import type { ExtractPropTypes } from 'vue'
import type radioProps from './props'
import type { CheckboxColumnsVo } from '../../index'

export interface HyRadioProps extends ExtractPropTypes<typeof radioProps> {}

export interface IRadioEmits {
    /** 选择触发 */
    change: [temp: CheckboxColumnsVo]
    /** 更新值触发 */
    'update:modelValue': [temp: any]
}
