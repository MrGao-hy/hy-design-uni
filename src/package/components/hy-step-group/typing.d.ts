import type { ExtractPropTypes } from 'vue'
import type stepGroupProps from './props'

/** 步骤组组件 Props 类型 */
export type IStepGroupProps = ExtractPropTypes<typeof stepGroupProps>

/**
 * hy-step-group 向 hy-step-item 注入的上下文
 * props 为父组件 defineProps 返回的响应式代理，子组件读取时可保持响应性
 */
export interface IStepGroupContext {
    props: Partial<IStepGroupProps>
}
