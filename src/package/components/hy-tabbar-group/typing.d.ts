import type { ExtractPropTypes, ToRefs } from 'vue'
import type tabbarGroupProps from './props'

export type TabBarGroupProps = ToRefs<ExtractPropTypes<typeof tabbarGroupProps>>

export type ParamType = {
    value: string | number
}

// ITabBarGroupEmits 接口定义组件的自定义事件
export interface ITabBarGroupEmits {
    /** 更新选中索引 */
    (e: 'update:modelValue', value: string | number): void
    /** 变化事件 */
    (e: 'change', param: ParamType): void
}
