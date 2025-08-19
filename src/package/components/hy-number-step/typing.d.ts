import type { CSSProperties } from "vue";
import type HyIconProps from "../hy-icon/typing";

export default interface HyNumberStepProps {
  /**
   * @description 用于双向绑定的值，初始化时设置设为默认min值(最小值)  （默认 0 ）
   * */
  modelValue: number;
  /**
   * @description 最小值 （默认 1 ）
   * */
  min?: number;
  /**
   * @description 最大值 （默认 Number.MAX_SAFE_INTEGER ）
   * */
  max?: number;
  /**
   * @description 加减的步长，可为小数 （默认 1 ）
   * */
  step?: number;
  /**
   * @description 是否只允许输入整数 （默认 false ）
   * */
  integer?: boolean;
  /**
   * @description 是否禁用，包括输入框，加减按钮 （默认 false ）
   * */
  disabled?: boolean;
  /**
   * @description 是否禁用输入框 （默认 false ）
   * */
  disabledInput?: boolean;
  /**
   * @description 是否开启异步变更，开启后需要手动控制输入值 （默认 false ）
   * */
  asyncChange?: boolean;
  /**
   * @description 输入框宽度，单位为px （默认 35 ）
   * */
  inputWidth?: number;
  /**
   * @description 是否显示减少按钮 （默认 true ）
   * */
  showMinus?: boolean;
  /**
   * @description 是否显示增加按钮 （默认 true ）
   * */
  showPlus?: boolean;
  /**
   * @description 显示的小数位数
   * */
  decimalLength?: number | null;
  /**
   * @description 是否开启长按加减手势 （默认 true ）
   * */
  longPress?: boolean;
  /**
   * @description 输入框文字和加减按钮图标的颜色 （默认 '#323233' ）
   * */
  color?: string;
  /**
   * @description 按钮宽度（默认 '30' ）
   * */
  buttonWidth?: number | string;
  /**
   * @description 按钮大小，宽高等于此值，单位px，输入框高度和此值保持一致 （默认 30 ）
   * */
  buttonSize?: number | string;
  /**
   * @description 按钮圆角 （默认 '0px' ）
   * */
  buttonRadius?: number | string;
  /**
   * @description 输入框和按钮的背景颜色 （默认 '#EBECEE' ）
   * */
  bgColor?: string;
  /**
   * @description 输入框背景颜色 （默认 '#EBECEE' ）
   * */
  inputBgColor?: string;
  /**
   * @description 指定光标于键盘的距离，避免键盘遮挡输入框，单位px （默认 100 ）
   * */
  cursorSpacing?: number;
  /**
   * @description 是否禁用减少按钮 （默认 false ）
   * */
  disableMinus?: boolean;
  /**
   * @description 是否禁用增加按钮 （默认 false ）
   * */
  disablePlus?: boolean;
  /**
   * @description 减号按钮图标
   * */
  minusIcon?: Partial<HyIconProps>;
  /**
   * @description 加号按钮图标
   * */
  plusIcon?: Partial<HyIconProps>;
  /**
   * @description 迷你模式（默认 false ）
   * */
  miniMode?: boolean;
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties;
}

export interface INumberStepEmits {
  /** 输入框得到焦点触发 */
  (e: "focus", value: string): void;
  /** 输入框失去焦点时触发 */
  (e: "blur", value: string): void;
  /** 超过范围阈值时触发 */
  (e: "overLimit", type: "minus" | "plus"): void;
  /** 输入框内容发生变化时触发 */
  (e: "change", value: string | number): void;
  /** 点击增加按钮触发 */
  (e: "plus", value: string): void;
  /** 点击减少按钮触发 */
  (e: "minus", value: string): void;
  /** 值更新触发 */
  (e: "update:modelValue", value: string | number): void;
}
