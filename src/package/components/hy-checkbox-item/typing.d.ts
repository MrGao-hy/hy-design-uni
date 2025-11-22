import type HyCheckboxGroupProps from '../hy-checkbox-group/typing'
import type { ToRefs } from 'vue'

export interface ICheckboxGroupContext extends ToRefs<HyCheckboxGroupProps> {
    /** 设置check的状态 */
    setCheckedStatus: (name: string | number) => void
}
