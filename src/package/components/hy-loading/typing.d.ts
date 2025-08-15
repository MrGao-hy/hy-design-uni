import type { CSSProperties } from "vue";

export default interface HyLoadingProps {
  /**
   * @description 是否显示组件 (默认 true)
   * */
  show?: boolean;
  /**
   * @description 动画活动区域的颜色，只对 mode = flower 模式有效
   * */
  color?: string;
  /**
   * @description 提示文本的颜色
   * */
  textColor?: string;
  /**
   * @description 文字和图标是否垂直排列 (默认 false )
   * */
  vertical?: boolean;
  /**
   * @description 模式选择，见官网说明（默认 'circle' ）
   * */
  mode?: HyApp.LoadingMode;
  /**
   * @description 加载图标的大小，单位px （默认 24 ）
   * */
  size?: number | string;
  /**
   * @description 文字大小（默认 15 ）
   * */
  textSize?: number | string;
  /**
   * @description 文字内容
   * */
  text?: string;
  /**
   * @description 动画模式 （默认 'ease-in-out' ）
   * */
  timingFunction?: "ease-in-out" | "linear" | "ease-in" | "ease-out" | "ease";
  /**
   * @description 动画执行周期时间（默认 1200）
   * */
  duration?: number;
  /**
   * @description mode=circle时的暗边颜色
   * */
  inactiveColor?: string;
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties;
}
