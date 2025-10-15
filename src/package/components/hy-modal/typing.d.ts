import { RowCenterType } from "hy-app/typing/modules/common";

export default interface HyModalProps {
  /**
   * @description 是否显示模态框，请赋值给show （默认 false ）
   * */
  modelValue: boolean;
  /**
   * @description 标题内容
   * */
  title?: string;
  /**
   * @description 模态框内容，如传入slot内容，则此参数无效
   * */
  content?: string;
  /**
   * @description 确认按钮的文字 （默认 '确认' ）
   * */
  confirmText?: string;
  /**
   * @description 取消按钮的文字 （默认 '取消' ）
   * */
  cancelText?: string;
  /**
   * @description 是否显示确认按钮 （默认 true ）
   * */
  showConfirmButton?: boolean;
  /**
   * @description 是否显示取消按钮 （默认 false ）
   * */
  showCancelButton?: boolean;
  /**
   * @description 确认按钮的颜色 （默认 '#2979ff' ）
   * */
  confirmColor?: string;
  /**
   * @description 取消按钮的颜色 （默认 '#606266' ）
   * */
  cancelColor?: string;
  /**
   * @description 对调确认和取消的位置 （默认 false ）
   * */
  buttonReverse?: boolean;
  /**
   * @description 是否开启缩放模式 （默认 true ）
   * */
  zoom?: boolean;
  /**
   * @description 弹窗的圆角 （默认 16 ）
   * */
  round?: string | number;
  /**
   * @description 是否异步关闭，只对确定按钮有效，见上方说明 （默认 false ）
   * */
  asyncClose?: boolean;
  /**
   * @description 是否允许点击遮罩关闭Modal （默认 false ）
   * */
  closeOnClickOverlay?: boolean;
  /**
   * @description 往上偏移的值，给一个负的margin-top，往上偏移，避免和键盘重合的情况，单位任意，数值则默认为px单位 （默认 0 ）
   * */
  negativeTop?: number;
  /**
   * @description modal宽度，不支持百分比，可以数值，px，rpx单位 （默认 '650rpx' ）
   * */
  width?: string | number;
  /**
   * @description 确认按钮的样式,如设置，将不会显示取消按钮
   * */
  confirmButtonShape?: HyApp.ShapeType | "";
  /**
   * @description 文案对齐方式
   * */
  contentTextAlign?: HyApp.RowCenterType;
}

export interface IModalEmits {
  /** 点击确认按钮时触发 */
  (e: "confirm"): void;
  /** 点击取消按钮时触发 */
  (e: "cancel"): void;
  /** 点击遮罩关闭时触发 */
  (e: "close"): void;
  /** 更新值触发 */
  (e: "update:modelValue", show: boolean): void;
  (e: "update:loading", show: boolean): void;
}
