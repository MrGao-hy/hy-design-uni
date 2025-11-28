import type checkboxGroupProps from '../hy-checkbox-group/props'
import type { ExtractPropTypes, ToRefs } from 'vue'

export interface ICheckboxGroupContext extends ToRefs<ExtractPropTypes<typeof checkboxGroupProps>> {
    /** 设置check的状态 */
    setCheckedStatus: (name: string | number) => void
}
