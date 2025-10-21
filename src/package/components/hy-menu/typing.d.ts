import type { CSSProperties } from "vue";
import type HyBadgeProps from "../hy-badge/typing";
import type HyIconProps from "../hy-icon/typing";

export type ModelValueVo = string | number;
export interface MenusType {
  /**
   *  唯一id
   * */
  id: string | number;
  /**
   *  标题
   * */
  title: string;
  /**
   *  是否禁用
   * */
  disabled?: boolean;
  /**
   *  icon
   * */
  icon?: string;
  /**
   *  徽标值
   * */
  badge?: number;
  /**
   *  键值
   * */
  [key: string]: string | number;
}

export default interface HyMenuProps {
  /**
   *  当前值
   * */
  modelValue: string | number;
  /**
   *  菜单数据集
   * */
  list: MenusType[];
  /**
   *  侧边菜单栏宽度
   * */
  width?: string | number;
  /**
   *  选中颜色
   * */
  color?: string;
  /**
   *  图标属性值
   * */
  icon?: Partial<HyIconProps>;
  /**
   *  徽标属性值
   * */
  badge?: Partial<HyBadgeProps>;
  /**
   *  定义需要用到的外部样式
   * */
  customStyle?: CSSProperties;
}

export interface IMenuEmits {
  /** 选中触发 */
  (e: "change", temp: MenusType): void;
  /** 选中触发 */
  (e: "update:modelValue", id: MenusType["id"]): void;
}
