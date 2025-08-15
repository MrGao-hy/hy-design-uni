import type { CSSProperties } from 'vue'

export type IPlacementVo =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'
export type IOffset = number | number[] | Record<'x' | 'y', number>

export type PopoverExpose = {
  open: () => void
  close: () => void
}
export interface PopoverContentVo {
  iconClass: string
  content: string
  icon: string
}

export default interface HyOverlayProps {
  /**
   * @description 控制 popover 的显示状态
   * */
  modelValue?: boolean
  /**
   * @description 显示的内容，也可以通过 slot#content 传入
   */
  content?: string | (string | PopoverContentVo)[]
  /**
   * @description 指定 popover 的放置位置：top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end
   */
  placement?: IPlacementVo
  /**
   * @description 控制 popover 的显示状态
   */
  offset?: IOffset
  /**
   * @description 是否禁用 popover
   */
  disabled?: boolean
  /**
   * @description 是否显示关闭按钮
   */
  showClose?: boolean
  /**
   * 当前显示的模式，决定内容的展现形式，可选值：normal（普通模式）/ menu（菜单模式）
   */
  mode?: 'normal' | 'menu'
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties
  /**
   * @description 定义需要用到的类名
   * */
  customClass?: string
}

export type PopoverParamsVo = {
  show: boolean
}
export type PopoverItemParamsVo = {
  item: Record<string, any>
  index: number
}
export interface IPopoverEmits {
  (e: 'menuClick', params: PopoverItemParamsVo): void
  (e: 'change', params: PopoverParamsVo): void
  (e: 'open'): void
  (e: 'close'): void
  (e: 'update:modelValue', value: boolean): void
}
