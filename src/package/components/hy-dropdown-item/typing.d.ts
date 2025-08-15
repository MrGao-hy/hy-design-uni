export interface DropdownMenuItem {
  /**
   * @description 展示标题
   * */
  label: string
  /**
   * @description 值
   * */
  value: string | number
}

export default interface HyDropdownItemProps {
  /**
   * @description 获取值
   * */
  modelValue: string | number
  /**
   * @description 标题
   * */
  title: string
  /**
   * @description 下拉选择值
   * */
  menus?: DropdownMenuItem[]
  /**
   * @description 禁用组件点击
   * */
  disabled?: boolean
}

export interface IDropdownItemEmits {
  /** 选中值触发 */
  (e: 'change', item: DropdownMenuItem): void
  /** 选中值触发 */
  (e: 'update:modelValue', item: DropdownMenuItem): void
}
