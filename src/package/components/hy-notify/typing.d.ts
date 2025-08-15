import type { CSSProperties } from "vue";

export default interface HyNotifyProps {
  /**
   * @description 到顶部的距离 ( 默认 0 )
   * */
  top?: number;
  /**
   * @description 主题，primary，success，warning，error ( 默认 'primary' )
   * */
  type?: HyApp.ThemeType;
  /**
   * @description 字体颜色 ( 默认 '#ffffff' )
   * */
  color?: string;
  /**
   * @description 背景颜色
   * */
  bgColor?: string;
  /**
   * @description 图标名称
   * */
  icon?: string;
  /**
   * @description 展示的文字内容
   * */
  message?: string;
  /**
   * @description 展示时长，为0时不消失，单位ms ( 默认 3000 )
   * */
  duration?: number;
  /**
   * @description 字体大小 ( 默认 15 )
   * */
  fontSize?: number;
  /**
   * @description 是否留出顶部安全距离（状态栏高度） ( 默认 false )
   * */
  safeAreaInsetTop?: boolean;
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties;
}
