import type { CSSProperties } from 'vue'
import type BadgeProps from '../hy-badge/props'

export interface IconMenus {
  /**
   * @description icon图标
   * */
  icon: string
  /**
   * @description 文本
   * */
  text: string
  /**
   * @description 徽标值
   * */
  badge?: BadgeProps['badge']
}

export default interface HySubmitBarProps {
  /**
   * @description 左边菜单栏
   * */
  menus?: IconMenus[]
  /**
   * @description 绝对定位
   * */
  fixed?: boolean
  /**
   * @description 是否显示边框
   * */
  border?: boolean
  /**
   * @description 加载左边按钮loading
   * */
  leftLoading?: boolean
  /**
   * @description 加载右边按钮loading
   * */
  rightLoading?: boolean
  /**
   * @description 左边icon的颜色
   * */
  iconColor?: string
  /**
   * @description 左边文字的颜色
   * */
  iconLabelColor?: string
  /**
   * @description 右边按钮文字颜色
   * */
  textColor?: string
  /**
   * @description 显示左边按钮
   * */
  showLeftBtn?: boolean
  /**
   * @description 显示右边按钮
   * */
  showRightBtn?: boolean
  /**
   * @description 左边按钮文字
   * */
  leftBtnText?: string
  /**
   * @description 右边按钮文字
   * */
  rightBtnText?: string
  /**
   * @description 左边按钮颜色，支持渐变色
   * */
  leftBtnColor?: string
  /**
   * @description 有边按钮颜色，支持渐变色
   * */
  rightBtnColor?: string
  /**
   * @description 按钮的形状
   * */
  shape?: HyApp.ShapeType
  /**
   * @description 按钮点击等待时长（运用了节流方法）
   * */
  warn?: number
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties
}

export interface ISubmitBarEmits {
  /** 点击按钮触发 */
  (e: 'click', index: number): void
  /** 点击左侧小菜单图标触发 */
  (e: 'menuClick', index: number): void
}
