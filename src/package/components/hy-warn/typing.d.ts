import type { CSSProperties } from "vue";

export default interface HyWarnProps {
  /**
   * @description 显示的文字
   * */
  title: string;
  /**
   * @description 使用预设的颜色  （默认 'warning' ）
   * */
  type?: HyApp.ThemeType;
  /**
   * @description 辅助性文字，颜色比title浅一点，字号也小一点，可选
   * */
  description?: string;
  /**
   * @description 关闭按钮(默认为叉号icon图标)  （默认 false ）
   * */
  closable?: boolean;
  /**
   * @description 是否显示左边的辅助图标   （ 默认 false ）
   * */
  showIcon?: boolean;
  /**
   * @description 显示的暗色或者亮色  （默认 'light' ）
   * */
  theme?: HyApp.ThemeVo;
  /**
   * @description 文字是否居中  （默认 false ）
   * */
  center?: boolean;
  /**
   * @description 字体大小  （默认 14 ）
   * */
  fontSize?: number;
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties;
}

export interface IWarnEmits {
  /** 点击触发 */
  (e: "click"): void;
  /** 关闭触发 */
  (e: "close"): void;
}
