import type { CSSProperties } from 'vue'

export default interface HyTransitionProps {
  /**
   * @description 是否展示组件
   * */
  show: boolean
  /**
   * @description 使用的动画模式（默认：fade）
   * */
  mode?: HyApp.TransitionMode
  /**
   * @description 动画的执行时间，单位ms
   * */
  duration?: number
  /**
   * @description 使用的动画过渡函数（默认：ease-out）
   * */
  timingFunction?: string
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties
  /**
   * @description 定义组件的类名
   * */
  customClass?: string
}

export interface ITransitionEmits {
  /** 进入中触发 */
  (e: 'enter'): void
  /** 离开中触发 */
  (e: 'leave'): void
  /** 点击触发 */
  (e: 'click'): void
  /** 进入后触发 */
  (e: 'afterEnter'): void
  /** 离开后触发 */
  (e: 'afterLeave'): void
  /** 进入前触发 */
  (e: 'beforeEnter'): void
  /** 离开前触发 */
  (e: 'beforeLeave'): void
}
