import type { CSSProperties } from "vue";

export default interface HyStatusBarProps {
  /**
   * @description 背景色 (默认 'transparent' )
   * */
  bgColor?: string;
  /**
   * @description 自定义样式
   * */
  customStyle?: CSSProperties;
}
