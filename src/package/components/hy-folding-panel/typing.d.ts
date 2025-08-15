import type { CSSProperties } from 'vue'
import type { CellContentVo } from '../hy-cell/typing'

export interface PanelVo extends CellContentVo {
  /**
   * @description 是否展示
   * */
  spread?: boolean
  /**
   * @description 展示面板里自定义值
   * */
  content?: string
}
export default interface HyFoldingPanelProps {
  /**
   * @description 数据集
   * */
  list: PanelVo[]
  /**
   * @description 是否手风琴模式（ 默认 false ）
   * */
  accordion?: boolean
  /**
   * @description 头部标题
   * */
  title?: string
  /**
   * @description 是否显示头部底部边框
   * */
  titleBorder?: boolean
  /**
   * @description 是否显示cell下边框 (默认 true )
   * */
  border?: boolean
  /**
   * @description 标题前缀竖线颜色
   * */
  verticalColor?: string
  /**
   * @description 是否显示标题前缀竖线
   * */
  showVertical?: boolean
  /**
   * @description 是否禁用（默认false）
   * */
  disabled?: boolean
  /**
   * @description 单元的大小，可选值为 large，medium，small
   * */
  size?: HyApp.SizeType
  /**
   * @description 内容面板高度
   * */
  contentHeight?: string | number
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties
}

export interface IFoldingPanel {
  /** 打开面板触发 */
  (e: 'open', temp: PanelVo, index: number): void
  /** 关闭面板触发 */
  (e: 'close', temp: PanelVo, index: number): void
  /** 改成面板开关状态触发 */
  (e: 'change', temp: PanelVo, index: number): void
}
