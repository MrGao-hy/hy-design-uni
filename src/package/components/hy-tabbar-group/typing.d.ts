import type { ExtractPropTypes, ToRefs } from 'vue'
import type tabbarGroupProps from './props'
import { ShapeType } from '@/package'

export type TabBarGroupProps = ToRefs<ExtractPropTypes<typeof tabbarGroupProps>>

export type ParamType = {
    value: string | number
}

export type TabbarShapeType = ShapeType | 'round'

// ITabBarGroupEmits 接口定义组件的自定义事件
export interface ITabBarGroupEmits {
    /** 更新选中索引 */
    'update:modelValue': [value: string | number]
    /** 变化事件 */
    change: [param: ParamType]
}
