import type { ExtractPropTypes, ToRefs } from 'vue'
import type cellProps from '../hy-cell/props'

export interface ICellContext extends ToRefs<ExtractPropTypes<typeof cellProps>> {
    /** 点击事件 */
    onClick: (name: string | number) => void
}
