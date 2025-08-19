import type { CSSProperties } from "vue";
import { HyApp } from "@/package/typing/modules/common";

export interface SubSectionItemVo extends AnyObject {
  name: string;
  value: string | number;
}

export type SubSectionVo = string | number | SubSectionItemVo;

export default interface HySubsectionProps {
  /**
   * @description 接收值
   * */
  modelValue: string | number;
  /**
   * @description 默认值 (默认0)
   * */
  current?: number;
  /**
   * @description tab的数据
   * */
  list: SubSectionVo[];
  /**
   * @description list的键值
   * */
  customKeys?: HyApp.IFieldNames;
  /**
   * @description 激活时的颜色（默认 '#3c9cff' ）
   * */
  activeColor?: string;
  /**
   * @description 未激活时的颜色（默认 '#303133' ）
   * */
  inactiveColor?: string;
  /**
   * @description 模式选择，mode=button为按钮形式，mode=subsection时为分段模式（默认 'button' ）
   * */
  mode?: "button" | "subsection";
  /**
   * @description 字体大小，单位px（默认 12 ）
   * */
  fontSize?: number | string;
  /**
   * @description 激活选项的字体是否加粗（默认 true ）
   * */
  bold?: boolean;
  /**
   * @description 组件背景颜色，mode为button时有效（默认 '#eeeeef' ）
   * */
  bgColor?: string;
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties;
}

export interface ISubsectionEmits {
  /** 改变触发 */
  (e: "change", index: number): void;
  /** 改变触发 */
  (e: "update:modelValue", value: any): void;
}
