import { CheckboxColumnsVo } from '../hy-check-button/typing'

export interface IRadioEmits {
    /** 选择触发 */
    (e: 'change', temp: CheckboxColumnsVo): void
    /** 更新值触发 */
    (e: 'update:modelValue', temp: any): void
}
