import { CSSProperties } from 'vue'
import type HyIconProps from '../hy-icon/typing'

export interface GridItemVo {
  /**
   * @description 图标名称或图片地址
   * */
  icon?: string
  /**
   * @description 名称
   * */
  name?: string
  /**
   * @description 图标属性api配置
   * */
  iconConfig?: Partial<HyIconProps>
  /**
   * @description 自定义内容键值对
   * */
  [key: string]: any
}
export interface CustomKeysVo {
  /**
   * @description 自定义标题键名
   * */
  name: string
  /**
   * @description 自定义icon键名
   * */
  icon: string
}

export default interface HyGridProps {
  /**
   * @description 数据集
   * */
  list: GridItemVo[]
  /**
   * @description 自定义键值
   * */
  customKeys?: CustomKeysVo
  /**
   * @description 宫格的列数（默认 3 ）
   * */
  col?: number
  /**
   * @description 是否显示宫格的边框（默认 false ）
   * */
  border?: boolean
  /**
   * @description 单个宫格高度（默认 60px ）
   * */
  itemHeight?: number | string
  /**
   * @description 宫格对齐方式，表现为数量少的时候，靠左，居中，还是靠右 （默认 'left' ）
   * */
  align?: 'center' | HyApp.LeftRightType
  /**
   * @description 间隔（默认 0px）
   * */
  gap?: number | string
  /**
   * @description 宫格的背景颜色 （默认 'transparent' ）
   * */
  bgColor?: string
  /**
   * @description 图标属性api配置集合
   * */
  iconConfig?: Partial<HyIconProps>
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties
}

export interface IGridEmits {
  /** 点击小菜单触发 */
  (e: 'click', name: string | Record<string, any>): void
}
