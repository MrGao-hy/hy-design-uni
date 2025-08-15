export default interface HyListProps {
  /**
   * @description 数据列表
   * */
  list: (AnyObject | string)[]
  /**
   * @description 容器高度，必须给个高度，否则加载全部数据
   * */
  containerHeight: string
  /**
   * @description 子容器的高度，必须和内容一致，否则计算有问题
   * */
  itemHeight?: number | string
  /**
   * @description 子容器的内边距
   * */
  padding?: number | string
  /**
   * @description 子容器的底部，会计算到容器内
   * */
  marginBottom?: number | string
  /**
   * @description 子容器的圆角，单位px
   * */
  borderRadius?: number | string
  /**
   * @description 容器背景色
   * */
  background?: string
  /**
   * @description 是否显示边框（默认false）
   * */
  border?: boolean
  /**
   * @description 展示几列
   * */
  line?: number
  /**
   * @description 加载状态
   * */
  load?: 'loadMore' | 'loading' | 'noMore'
  /**
   * @description 每一项的唯一标识key
   * */
  keyField?: string
  /**
   * @description 显示底部加载状态
   * */
  showDivider?: boolean
}

export interface IListEmits {
  /** 点击行触发 */
  (e: 'click', temp: string | AnyObject): void
  /** 滚动底部触发 */
  (e: 'scrollToLower'): void
}
