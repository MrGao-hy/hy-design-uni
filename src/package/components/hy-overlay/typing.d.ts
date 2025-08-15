import type { CSSProperties } from 'vue'

export default interface HyOverlayProps {
  /**
   * @description 是否显示遮罩（默认 false ）
   * */
  show: boolean
  /**
   * @description zIndex 层级（默认 10070 ）
   * */
  zIndex?: number
  /**
   * @description 动画时长，单位毫秒（默认 300 ）
   * */
  duration?: number
  /**
   * @description 不透明度值，当做rgba的第四个参数 （默认 0.5 ）
   * */
  opacity?: number
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties
}

export interface IOverlayEmits {
  /** 点击遮罩框触发 */
  (e: 'click'): void
}
