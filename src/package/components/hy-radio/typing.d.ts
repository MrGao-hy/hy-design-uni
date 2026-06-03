import type { ExtractPropTypes } from 'vue'
import type radioProps from './props'
import type { CheckboxColumnsVo } from '../../index'

export interface HyRadioProps extends ExtractPropTypes<typeof radioProps> {}

export interface IRadioEmits {
    /** 选择触发 */
    (e: 'change', temp: CheckboxColumnsVo): void
    /** 更新值触发 */
    (e: 'update:modelValue', temp: any): void
}
