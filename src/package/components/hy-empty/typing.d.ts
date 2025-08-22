import type { CSSProperties } from "vue";
import type HyButtonProps from "../hy-button/typing";

type EmptyModeType =
  | "car"
  | "page"
  | "search"
  | "address"
  | "wifi"
  | "order"
  | "coupon"
  | "favor"
  | "permission"
  | "history"
  | "message"
  | "image"
  | "video"
  | "comment"
  | "integral"
  | "subscribe"
  | "earnings"
  | "announcement"
  | "signIn";

export type IEmptyIcon = {
  [key: string]: {
    /**
     * 提示信息
     * */
    desc: string;
    /**
     * 空状态图片地址
     * */
    icon: string;
  };
};

export default interface HyEmptyProps {
  /**
   * @description 是否显示空状态
   * */
  show?: boolean;
  /**
   * @description 缺省页内容
   * */
  mode?: EmptyModeType;
  /**
   * @description 空状态图片
   * */
  imageUrl?: string;
  /**
   * @description 组件层级
   * */
  zIndex?: number;
  /**
   * @description icon宽度
   * */
  width?: number | string;
  /**
   * @description icon高度
   * */
  height?: number | string;
  /**
   * @description 提示信息
   * */
  description?: string;
  /**
   * @description 提示信息大小
   * */
  desSize?: string | number;
  /**
   * @description 提示信息颜色
   * */
  desColor?: string;
  /**
   * @description 图片margin
   * */
  imgMargin?: string;
  /**
   * @description 按钮属性只
   * */
  button?: HyButtonProps;
  /**
   * @description 跳转地址
   * */
  navigateUrl?: string;
  /**
   * @description 自定义输入框外部样式
   * */
  customStyle?: CSSProperties;
}

export interface IEmptyEmits {
  /** 点击按钮触发 */
  (e: "click"): void;
}
