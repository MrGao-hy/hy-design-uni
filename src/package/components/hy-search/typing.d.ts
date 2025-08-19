import type { CSSProperties } from "vue";
import type HyIconProps from "../hy-icon/typing";
import type { InputOnConfirmEvent } from "@uni-helper/uni-types";

export default interface HySearchProps {
  /**
   * @description 输入框初始值
   * */
  modelValue: string;
  /**
   * @description 搜索框形状，circle-圆形，square-方形（默认 'circle' ）
   * */
  shape?: HyApp.ShapeType;
  /**
   * @description 搜索框背景颜色（默认 '#f2f2f2' ）
   * */
  bgColor?: string;
  /**
   * @description 占位文字内容（默认 '请输入关键字' ）
   * */
  placeholder?: string;
  /**
   * @description 是否启用清除控件（默认 true ）
   * */
  clear?: boolean;
  /**
   * @description 是否自动获得焦点（默认 false ）
   * */
  focus?: boolean;
  /**
   * @description 是否显示右侧控件（默认 true ）
   * */
  showAction?: boolean;
  /**
   * @description 右侧控件的样式，对象形式
   * */
  actionStyle?: CSSProperties;
  /**
   * @description 右侧控件文字（默认 '搜索' ）
   * */
  actionText?: string;
  /**
   * @description 输入框内容水平对齐方式 （默认 'left' ）
   * */
  inputAlign?: HyApp.RowCenterType;
  /**
   * @description 自定义输入框样式，对象形式
   * */
  inputStyle?: CSSProperties;
  /**
   * @description 是否启用输入框（默认 false ）
   * */
  disabled?: boolean;
  /**
   * @description 边框颜色，配置了颜色，才会有边框 (默认 'transparent' )
   * */
  borderColor?: string;
  /**
   * @description 输入框字体颜色（默认 '#606266' ）
   * */
  color?: string;
  /**
   * @description placeholder的颜色（默认 '#909399' ）
   * */
  placeholderColor?: string;
  /**
   * @description 输入框左边的图标属性集合，可以为图标名称或图片路径  (默认 'search' )
   * */
  searchIcon?: Partial<HyIconProps>;
  /**
   * @description 组件与其他上下左右之间的距离，带单位的字符串形式，如"30px"   (默认 '0' )
   * */
  margin?: string;
  /**
   * @description 是否开启动画，见上方说明（默认 false ）
   * */
  animation?: boolean;
  /**
   * @description 输入框最大能输入的长度，-1为不限制长度  (默认 '-1' )
   * */
  maxlength?: string | number;
  /**
   * @description 输入框高度，单位px（默认 64 ）
   * */
  height?: number;
  /**
   * @description 搜索框左边显示内容
   * */
  label?: string | null;
  /**
   * @description 键盘弹起时，是否自动上推页面
   * */
  adjustPosition?: boolean;
  /**
   * @description 键盘收起时，是否自动失去焦点
   * */
  autoBlur?: boolean;
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties;
}

export interface ISearchEmits {
  /** disabled为true时，点击输入框，发出此事件，用于跳转搜索页 */
  (e: "click"): void;
  /** 输入框内容发生变化时触发 */
  (e: "change", value: string): void;
  /** 左侧icon点击时候时触发 */
  (e: "clickIcon", keyword: string): void;
  /** 用户确定搜索时触发，用户按回车键，或者手机键盘右下角的"搜索"键时触发 */
  (e: "search", event: InputOnConfirmEvent, value: string): void;
  /** 配置了clearabled后，清空内容时会发出此事件 */
  (e: "clear"): void;
  /** 用户点击右侧控件时触发 */
  (e: "confirm", value: string): void;
  /** 输入框获得焦点时触发 */
  (e: "focus", e: InputOnFocusEvent, keyword: string): void;
  /** 输入框失去焦点时触发 */
  (e: "blur", e: InputOnBlurEvent, keyword: string): void;
  /** 输入框内容发生变化时触发 */
  (e: "update:modelValue", value: string): void;
}
