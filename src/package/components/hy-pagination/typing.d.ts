import type { CSSProperties } from 'vue'

export default interface HyPaginationProps {
  /**
   * @description 当前页
   */
  modelValue: number
  /**
   * @description 总页数，如果有total，则优先使用total计算页数
   */
  totalPage?: number
  /**
   * @description 是否展示分页为Icon图标
   */
  showIcon?: boolean
  /**
   * @desc 是否展示总条数
   */
  showMessage?: boolean
  /**
   * @description 总条数
   */
  total?: number
  /**
   * @description 每页条数
   */
  pageSize?: number
  /**
   * @description 上一页文本
   */
  prevText?: string
  /**
   * @description 下一页文本
   */
  nextText?: string
  /**
   * @description 总页数只有一页时是否隐藏
   */
  hideIfOnePage?: boolean
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties
}
type PaginationVo = {
  value: number
}
export interface IPaginationEmits {
  /** 改变值触发 */
  (e: 'change', param: PaginationVo): void
  /** 改变值触发 */
  (e: 'update:modelValue', value: PaginationVo['value']): void
}
