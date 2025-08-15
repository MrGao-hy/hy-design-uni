import type { CSSProperties } from 'vue'

export default interface HyReadMoreProps {
  /**
   * @description 内容超出此高度才会显示展开全文按钮，单位px（默认 400 ）
   * */
  showHeight?: number
  /**
   * @description 展开后是否显示收起按钮（默认 false ）
   * */
  toggle?: boolean
  /**
   * @description 关闭时的提示文字（默认 '展开阅读全文' ）
   * */
  closeText?: string
  /**
   * @description 展开时的提示文字（默认 '收起' ）
   * */
  openText?: string
  /**
   * @description 提示文字的颜色（默认 '#2979ff' ）
   * */
  color?: string
  /**
   * @description 提示文字的大小，单位px （默认 14 ）
   * */
  fontSize?: number
  /**
   * @description 段落首行缩进的字符个数 （默认 '2em' ）
   * */
  textIndent?: string
  /**
   * @description 用于在 open 和 close 事件中当作回调参数返回
   * */
  name?: string
  /**
   * @description 显示阴影的样式
   * */
  shadowStyle?: CSSProperties
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties
}

export interface IReadMoreEmits {
  /** 打开触发 */
  (e: 'open', name: string): void
  /** 关闭触发 */
  (e: 'close', name: string): void
}
