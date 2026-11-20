import type { ExtractPropTypes } from 'vue'
import type stepItemProps from './props'

/**
 * 步骤状态
 * finished: 已完成 process: 进行中 error: 失败 wait: 未开始
 */
export type StepStatus = 'finished' | 'process' | 'error' | 'wait'

/** 步骤项组件 Props 类型 */
export type IStepItemProps = ExtractPropTypes<typeof stepItemProps>
