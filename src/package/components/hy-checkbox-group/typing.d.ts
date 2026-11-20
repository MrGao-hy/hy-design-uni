import type { ExtractPropTypes } from 'vue'
import type checkboxGroupProps from './props'

export interface ICheckBoxGroupEmits {
    /** 选择触发，参数为选中的值数组 */
    change: [temp: (string | number)[]]
    /** 更新值触发 */
    'update:modelValue': [value: any]
}

/** 复选框组 Props 类型 */
export type ICheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>

/**
 * hy-checkbox-group 向 hy-checkbox-item 注入的上下文
 * props 为父组件 defineProps 返回的响应式代理，子组件读取时可保持响应性
 */
export interface ICheckboxGroupContext {
    props: Partial<ICheckboxGroupProps>
    /** 切换某项选中状态 */
    setCheckedStatus: (name: string | number) => void
}
