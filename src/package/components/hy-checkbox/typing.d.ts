import type { CheckboxColumnsVo } from '../hy-check-button/typing'

export interface ICheckBoxEmits {
    /** 选择触发 */
    change: [temp: CheckboxColumnsVo]
    /** 更新值触发 */
    'update:modelValue': [value: any]
}
