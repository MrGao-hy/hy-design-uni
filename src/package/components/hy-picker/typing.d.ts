import type { CSSProperties } from "vue";
import type HyInputProps from "../hy-input/typing";

export interface PickerColumnVo extends AnyObject {
  /**
   * @description id必填
   * */
  id: string;
  /**
   * @description 显示文本
   * */
  text?: string;
}

export default interface HyPickerProps {
  /**
   * @description 显示到输入框值
   * */
  modelValue?: string | string[];
  /**
   * @description 对象数组，设置每一列的数据
   * */
  columns: (string | PickerColumnVo)[][];
  /**
   * @description 是否显示弹窗（默认 false ）
   * */
  show?: boolean;
  /**
   * @description 弹窗弹出模式
   * */
  popupMode?: HyApp.LayoutType;
  /**
   * @description 分割数组条件
   * */
  separator?: string;
  /**
   * @description 是否显示顶部的操作栏（默认 true ）
   * */
  showToolbar?: boolean;
  /**
   * @description 顶部标题
   * */
  title?: string;
  /**
   * @description 是否显示加载中状态（默认 false ）
   * */
  loading?: boolean;
  /**
   * @description 各列中，单个选项的高度（默认 44 ）
   * */
  itemHeight?: number;
  /**
   * @description 取消按钮的文字（默认 '取消' ）
   * */
  cancelText?: string;
  /**
   * @description 确认按钮的文字（默认 '确定' ）
   * */
  confirmText?: string;
  /**
   * @description 取消按钮的颜色（默认 '#909193' ）
   * */
  cancelColor?: string;
  /**
   * @description 确认按钮的颜色（默认 '#3c9cff' ）
   * */
  confirmColor?: string;
  /**
   * @description 每列中可见选项的数量（默认 5 ）
   * */
  visibleItemCount?: number;
  /**
   * @description 选项对象中，需要展示的属性键名（默认 'text' ）
   * */
  keyName?: string;
  /**
   * @description 是否允许点击遮罩关闭选择器（默认 false ）
   * */
  closeOnClickOverlay?: boolean;
  /**
   * @description 各列的默认索引
   * */
  defaultIndex?: number[];
  /**
   * @description 是否在手指松开时立即触发change事件（默认 true ）
   * */
  immediateChange?: boolean;
  /**
   * @description 最高层级
   * */
  zIndex?: number;
  /**
   * @description 是否显示输入框（默认 false ）
   * */
  hasInput?: boolean;
  /**
   * @description 输入框集合属性
   * */
  input?: Partial<HyInputProps>;
  /**
   * @description 是否自定义选择器nav左边内容
   * */
  toolbarRightSlot?: boolean;
  /**
   * @description 自定义输入框外部样式
   * */
  customStyle?: CSSProperties;
}

export type SelectValueVo = {
  value: string[];
  index?: number;
  indexs?: number[];
  // values为当前变化列的数组内容
  values?: Array<any>;
  columnIndex?: Array<number>;
};
export interface IPickerEmits {
  /** 关闭选择器时触发 */
  (e: "close"): void;
  /** 点击取消按钮 */
  (e: "cancel"): void;
  /** 点击确定按钮，返回当前选择的值	 */
  (e: "confirm", params: SelectValueVo): void;
  /** 当选择值变化时触发 */
  (e: "change", params: SelectValueVo): void;
  /** 显示隐藏触发 */
  (e: "update:show", show: boolean): void;
  /** 选中值触发 */
  (e: "update:modelValue", value: any): void;
}
