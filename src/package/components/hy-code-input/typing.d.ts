import type { CSSProperties } from 'vue'

export default interface HyCodeInputProps {
  modelValue: string | number
  /**
   * @description 键盘弹起时，是否自动上推页面（默认 true ）
   * */
  adjustPosition?: boolean
  /**
   * @description 最大输入长度（默认 6 ）
   * */
  maxlength?: number
  /**
   * @description 显示border
   * */
  border?: boolean
  /**
   * @description 是否用圆点填充（默认 false ）
   * */
  dot?: boolean
  /**
   * @description 显示模式，box-盒子模式，line-底部横线模式 （默认 'box' ）
   * */
  mode?: 'box' | string
  /**
   * @description 是否细边框 （默认 false ）
   * */
  hairline?: boolean
  /**
   * @description 字符间的距离 （默认 10 ）
   * */
  space?: number
  /**
   * @description 是否自动获取焦点 （默认 false ）
   * */
  focus?: boolean
  /**
   * @description 字体是否加粗 （默认 false ）
   * */
  bold?: boolean
  /**
   * @description 字体颜色 （默认 '#606266' ）
   * */
  color?: string
  /**
   * @description 字体大小，单位px （默认 18 ）
   * */
  fontSize?: number
  /**
   * @description 输入框的大小，宽等于高 （默认 35 ）
   * */
  size?: number | string
  /**
   * @description 是否隐藏原生键盘，如果想用自定义键盘的话，需设置此参数为true （默认 false ）
   * */
  disabledKeyboard?: boolean
  /**
   * @description 边框和线条颜色 （默认 '#c9cacc' ）
   * */
  borderColor?: string
  /**
   * @description 是否禁止输入"."符号 （默认 true ）
   * */
  disabledDot?: boolean
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties
}

export interface ICodeInputEmits {
  /** 输入内容发生改变时触发 */
  (e: 'change', value: string | number): void
  /** 输入字符个数达maxlength值时触发确认 */
  (e: 'finish', value: string | number): void
  /** 更新值 */
  (e: 'update:modelValue', value: string | number): void
}
