import type { CSSProperties } from "vue";

export type TextMode = "text" | "price" | "phone" | "name" | "date" | "link";

export default interface HyTextProps {
  /**
   * @description 显示的值
   * */
  text: string | number;
  /**
   * @description 主题颜色
   * */
  type?: HyApp.ThemeType | "";
  /**
   * @description 是否显示（默认 true ）
   * */
  show?: boolean;
  /**
   * @description 前置图标
   * */
  prefixIcon?: string;
  /**
   * @description 后置图标
   * */
  suffixIcon?: string;
  /**
   * @description 文本处理的匹配模式 text-普通文本，price-价格，phone-手机号，name-姓名，date-日期，link-超链接
   * */
  mode?: TextMode;
  /**
   * @description mode=link下，配置的链接
   * */
  href?: string;
  /**
   * @description 格式化规则
   * */
  format?: Function | string;
  /**
   * @description mode=phone时，点击文本是否拨打电话（默认 false ）
   * */
  call?: boolean;
  /**
   * @description 小程序的打开方式
   * */
  openType?: string;
  /**
   * @description 是否粗体，默认normal（默认 false ）
   * */
  bold?: boolean;
  /**
   * @description 是否块状（默认 false ）
   * */
  block?: boolean;
  /**
   * @description 文本显示的行数，如果设置，超出此行数，将会显示省略号
   * */
  lines?: string | number;
  /**
   * @description 文本颜色（默认 '#303133' ）
   * */
  color?: string;
  /**
   * @description 字体大小（默认 15 ）
   * */
  size?: number | string;
  /**
   * @description 图标的样式 （默认 {fontSize: '15px'} ）
   * */
  iconStyle?: CSSProperties;
  /**
   * @description 文字装饰，下划线，中划线等，可选值 none|underline|line-through（默认 'none' ）
   * */
  decoration?: "" | "none" | "underline" | "line-through";
  /**
   * @description 外边距，对象、字符串，数值形式均可（默认 0 ）
   * */
  margin?: string;
  /**
   * @description 文本行高
   * */
  lineHeight?: string | number;
  /**
   * @description 文本对齐方式，可选值left|center|right（默认 'left' ）
   * */
  align?: HyApp.RowCenterType;
  /**
   * @description 文字换行，可选值break-word|normal|anywhere（默认 'normal' ）
   * */
  wordWrap?: "normal" | "break-word" | "anywhere";
  /**
   * @description 是否占满剩余空间（默认：true）
   * */
  flex?: boolean;
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties;
}

export interface ITextEmits {
  /** 点击触发 */
  (e: "click", event: any): void;
}
