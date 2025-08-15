import type { CSSProperties } from "vue";

export default interface HyLineProgressProps {
  /**
   * @description 激活部分的颜色 ( 默认 '#19be6b' )
   * */
  activeColor?: string;
  /**
   * @description 背景色 ( 默认 '#ececec' )
   * */
  inactiveColor?: string;
  /**
   * @description 进度百分比，数值 ( 默认 0 )
   * */
  percentage: number;
  /**
   * @description 是否在进度条内部显示百分比的值 ( 默认 true )
   * */
  showText?: boolean;
  /**
   * @description 进度条的高度，单位px ( 默认 12 )
   * */
  height?: string | number;
  /**
   * @description 字体大小，单位px ( 默认 10 )
   * */
  fontSize?: string | number;
  /**
   * @description 自定义样式
   * */
  customStyle?: CSSProperties;
}
