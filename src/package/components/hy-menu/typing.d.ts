import type { CSSProperties } from 'vue'
import type HyBadgeProps from '../hy-badge/typing'
import type HyIconProps from '../hy-icon/typing'

export interface MenusType {
  /**
   * @description 唯一id
   * */
  id: string | number
  /**
   * @description 标题
   * */
  title: string
  /**
   * @description 是否禁用
   * */
  disabled?: boolean
  /**
   * @description icon
   * */
  icon?: string
  /**
   * @description 徽标值
   * */
  badge?: number
}

export default interface HyMenuProps {
  /**
   * @description 当前值
   * */
  modelValue: string | number
  /**
   * @description 菜单数据集
   * */
  list: MenusType[]
  /**
   * @description 侧边菜单栏宽度
   * */
  width?: string | number
  /**
   * @description 选中颜色
   * */
  color?: string
  /**
   * @description 图标属性值
   * */
  icon?: Partial<HyIconProps>
  /**
   * @description 徽标属性值
   * */
  badge?: Partial<HyBadgeProps>
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties
}

export interface IMenuEmits {
  /** 选中触发 */
  (e: 'change', temp: MenusType): void
  /** 选中触发 */
  (e: 'update:modelValue', id: MenusType['id']): void
}
