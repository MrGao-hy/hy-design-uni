import type { CSSProperties } from "vue";
import type HyIconProps from "../hy-icon/typing";
import type {
  InputOnBlurEvent,
  InputOnConfirmEvent,
  InputOnFocusEvent,
  InputOnKeyboardheightchange,
} from "@uni-helper/uni-types";

export default interface HyInputProps {
  /**
   * @description 输入的值
   * */
  modelValue: string | number;
  /**
   * @description 输入框类型，见上方说明 （ 默认 'text' ）
   * */
  type?: HyApp.InputType;
  /**
   * @description 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true，兼容性：微信小程序、百度小程序、字节跳动小程序、QQ小程序 （ 默认 false ）
   * */
  fixed?: boolean;
  /**
   * @description 是否禁用输入框 （ 默认 false ）
   * */
  disabled?: boolean;
  /**
   * @description 禁用状态时的背景色（ 默认 '#f5f7fa' ）
   * */
  disabledColor?: string;
  /**
   * @description 是否显示清除控件 （ 默认 false ）
   * */
  clearable?: boolean;
  /**
   * @description 是否密码类型 （ 默认 false ）
   * */
  password?: boolean;
  /**
   * @description 最大输入长度，设置为 -1 的时候不限制最大长度 （ 默认 -1 ）
   * */
  maxlength?: number;
  /**
   * @description 输入框为空时的占位符
   * */
  placeholder?: string | null;
  /**
   * @description 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/ （ 默认 'input-placeholder' ）
   * */
  placeholderClass?: string;
  /**
   * @description 指定placeholder的样式，字符串/对象形式，如"color: red;"
   * */
  placeholderStyle?: CSSProperties;
  /**
   * @description 是否显示输入字数统计，只在 type ="text"或type ="textarea"时有效 （ 默认 false ）
   * */
  showWordLimit?: boolean;
  /**
   * @description 设置右下角按钮的文字，兼容性详见uni-app文档 （ 默认 'done' ）
   * */
  confirmType?: string;
  /**
   * @description 点击键盘右下角按钮时是否保持键盘不收起，H5无效 （ 默认 false ）
   * */
  confirmHold?: boolean;
  /**
   * @description focus时，点击页面的时候不收起键盘，微信小程序有效 （ 默认 false ）
   * */
  holdKeyboard?: boolean;
  /**
   * @description 自动获取焦点，在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点 （ 默认 false ）
   * */
  focus?: boolean;
  /**
   * @description 键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效 （ 默认 false ）
   * */
  autoBlur?: boolean;
  /**
   * @description 是否去掉 iOS 下的默认内边距，仅微信小程序，且type=textarea时有效 （ 默认 false ）
   * */
  disableDefaultPadding?: boolean;
  /**
   * @description 指定focus时光标的位置（ 默认 140 ）
   * */
  cursor?: number;
  /**
   * @description 输入框聚焦时底部与键盘的距离 （ 默认 30 ）
   * */
  cursorSpacing?: number;
  /**
   * @description 光标起始位置，自动聚集时有效，需与selection-end搭配使用 （ 默认 -1 ）
   * */
  selectionStart?: number;
  /**
   * @description 光标结束位置，自动聚集时有效，需与selection-start搭配使用 （ 默认 -1 ）
   * */
  selectionEnd?: number;
  /**
   * @description 键盘弹起时，是否自动上推页面 （ 默认 true ）
   * */
  adjustPosition?: boolean;
  /**
   * @description 输入框内容对齐方式（ 默认 'left' ）
   * */
  inputAlign?: HyApp.RowCenterType;
  /**
   * @description 输入框字体的大小 （ 默认 '15px' ）
   * */
  fontSize?: string | number;
  /**
   * @description 输入框字体颜色	（ 默认 '#303133' ）
   * */
  color?: string;
  /**
   * @description 输入框前置图标
   * */
  prefixIcon?: Partial<HyIconProps>;
  /**
   * @description 输入框后置图标
   * */
  suffixIcon?: Partial<HyIconProps>;
  /**
   * @description 边框类型，surround-四周边框，bottom-底部边框，none-无边框 （ 默认 'surround' ）
   * */
  border?: HyApp.BorderType;
  /**
   * @description 是否只读，与disabled不同之处在于disabled会置灰组件，而readonly则不会 （ 默认 false ）
   * */
  readonly?: boolean;
  /**
   * @description 输入框形状，circle-圆形，square-方形 （ 默认 'square' ）
   * */
  shape?: HyApp.ShapeType;
  /**
   * @description 内容式化函数
   * */
  formatter?: Function | null;
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties;
  /**
   * @description 值变化事件
   * */
  onChange?: Function;
  /**
   * @description 失去焦点事件
   * */
  onBlur?: Function;
  /**
   * @description 是否忽略组件内对文本合成系统事件的处理。
   * */
  ignoreCompositionEvent?: boolean;
}

export interface IInputEmits {
  /** 输入框失去焦点时触发 */
  (e: "blur", event: InputOnBlurEvent, value: string | number): void;
  /** 输入框聚焦时触发 */
  (e: "focus", event: InputOnFocusEvent): void;
  /** 点击完成按钮时触发 */
  (e: "confirm", event: InputOnConfirmEvent, value: string | number): void;
  /** 键盘高度发生变化的时候触发此事件 */
  (e: "keyboardheightchange", event: InputOnKeyboardheightchange): void;
  /** 内容发生变化触发此事件 */
  (e: "change", value: string | number): void;
  /** 内容发生变化触发此事件 */
  (e: "update:modelValue", value: string | number): void;
  /** 点击清空内容 */
  (e: "clear"): void;
  /** 点击前缀触发 */
  (e: "onPrefix"): void;
  /** 点击后缀触发 */
  (e: "onSuffix"): void;
}
