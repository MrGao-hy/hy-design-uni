import type { CSSProperties } from "vue";

export default interface HyNavbarProps {
  /**
   * @description 是否开启顶部安全区适配  （默认 true ）
   * */
  safeAreaInsetTop?: boolean;
  /**
   * @description 固定在顶部时，是否生成一个等高元素，以防止塌陷 （默认 false ）
   * */
  placeholder?: boolean;
  /**
   * @description 导航栏是否固定在顶部 （默认 true ）
   * */
  fixed?: boolean;
  /**
   * @description 导航栏底部是否显示下边框 （默认 false ）
   * */
  border?: boolean;
  /**
   * @description 左边返回图标的名称，只能为uview-pls自带的图标 （默认 'left' ）
   * */
  leftIcon?: string;
  /**
   * @description 左边的提示文字
   * */
  leftText?: string;
  /**
   * @description 右边的提示文字
   * */
  rightText?: string;
  /**
   * @description 右边返回图标的名称，只能为uview-plus自带的图标
   * */
  rightIcon?: string;
  /**
   * @description 导航栏标题，如设置为空字符，将会隐藏标题占位区域
   * */
  title?: string;
  /**
   * @description 导航栏副标题
   * */
  sub?: string;
  /**
   * @description 文字颜色 （默认 '' ）
   * */
  titleColor?: string;
  /**
   * @description 导航栏背景设置 （默认 '#ffffff' ）
   * */
  bgColor?: string;
  /**
   * @description 导航栏标题的最大宽度，内容超出会以省略号隐藏 （默认 '400rpx' ）
   * */
  titleWidth?: string | number;
  /**
   * @description 导航栏高度(不包括状态栏高度在内，内部自动加上)（默认 '44px' ）
   * */
  height?: string | number;
  /**
   * @description 左侧返回图标的大小（默认 20px ）
   * */
  leftIconSize?: string | number;
  /**
   * @description 左侧返回图标的颜色（默认 #303133 ）
   * */
  leftIconColor?: string;
  /**
   * @description 点击左侧区域(返回图标)，是否自动返回上一页（默认 false ）
   * */
  autoBack?: boolean;
  /**
   * @description 标题的样式，对象或字符串
   * */
  titleStyle?: CSSProperties;
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties;
}

export interface INavbarEmits {
  /** 点击导航栏左边 */
  (e: "leftClick"): void;
  /** 点击导航栏右边 */
  (e: "rightClick"): void;
}
