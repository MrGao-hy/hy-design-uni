export type FlexAlign = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'

export type FlexJustify = HyApp.JustifyContentType
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'

export interface FlexProps {
  /** 主轴方向，等价于 flex-direction */
  vertical?: boolean
  direction?: FlexDirection
  /** justify-content */
  justify?: FlexJustify
  /** align-items */
  align?: FlexAlign
  /** flex-wrap */
  wrap?: FlexWrap
  /** flex 属性，支持数字或字符串。如 1 或 'none' */
  flex?: number | string
  /** 子元素间距，支持数字（px）、字符串或数组 [row, column] */
  gap?: number | string | [number | string, number | string]
  /** flex-basis */
  basis?: number | string
}
