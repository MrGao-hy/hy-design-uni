import type { CSSProperties } from 'vue'
import type HyIconProps from '../hy-icon/typing'

export default interface HyTagProps {
  /**
   * @description 标签的文字内容
   * */
  text: string | number
  /**
   * @description 点击需要传得值
   * */
  name?: string | number
  /**
   * @description 标签类型info、primary、success、warning、error （默认 'primary' ）
   * */
  type?: HyApp.ThemeType
  /**
   * @description 禁用（默认 false ）
   * */
  disabled?: boolean
  /**
   * @description 标签的大小，large，medium，small （默认 'medium' ）
   * */
  size?: HyApp.SizeType
  /**
   * @description tag的形状，circle（两边半圆形）, square（方形，带圆角）（默认 'square' ）
   * */
  shape?: HyApp.ShapeType
  /**
   * @description 背景颜色，默认为空字符串，即不处理
   * */
  bgColor?: string
  /**
   * @description 标签字体颜色，默认为空字符串，即不处理
   * */
  color?: string
  /**
   * @description 镂空形式标签的边框颜色
   * */
  borderColor?: string
  /**
   * @description 关闭按钮图标的颜色（默认 #C6C7CB）
   * */
  closeColor?: string
  /**
   * @description 镂空时是否填充背景色（默认 false ）
   * */
  plainFill?: boolean
  /**
   * @description 是否镂空（默认 false ）
   * */
  plain?: boolean
  /**
   * @description 是否可关闭，设置为true，文字右边会出现一个关闭图标（默认 false ）
   * */
  closable?: boolean
  /**
   * @description 标签显示与否（默认 true ）
   * */
  show?: boolean
  /**
   * @description 组件内置图标，或绝对路径的图片
   * */
  icon?: Partial<HyIconProps>
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties
}

type TagParamsVo = { value: string; name: string | number }
export interface ITagEmits {
  /** 点击标签触发 */
  (e: 'click', params: TagParamsVo): void
  /** 关闭标签触发 */
  (e: 'close', value: string): void
}
