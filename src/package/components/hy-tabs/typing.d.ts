import type { CSSProperties } from 'vue'
import BadgeProps from '../hy-badge/typing'
export interface TabsItemVo extends AnyObject {
  /**
   * @description tab名称
   * */
  name: string
  /**
   * @description 徽标接收的props
   * */
  badge?: BadgeProps
  /**
   * @description 是否禁用
   * */
  disabled?: boolean
  /**
   * @description swiper内容值
   * */
  content?: any
}
export default interface HyTabsProps {
  /**
   * @description 标签数组，元素为对象，如[{name: '推荐'}]
   * */
  list: TabsItemVo[]
  /**
   * @description 当前选中标签的索引
   * */
  current?: number
  /**
   * @description 从list元素对象中读取的键名
   * */
  keyName?: string
  /**
   * @description 滑块移动一次所需的时间，单位秒（默认 200 ）
   * */
  duration?: number
  /**
   * @description 滑块颜色
   * */
  lineColor?: string
  /**
   * @description 菜单选择中时的样式
   * */
  activeStyle?: CSSProperties
  /**
   * @description 菜单非选中时的样式
   * */
  inactiveStyle?: CSSProperties
  /**
   * @description 滑块长度（默认20）
   * */
  lineWidth?: number | string
  /**
   * @description 滑块高度（默认3）
   * */
  lineHeight?: number | string
  /**
   * @description 滑块背景显示大小，当滑块背景设置为图片时使用
   * */
  lineBgSize?: number | string
  /**
   * @description 菜单item的样式
   * */
  itemStyle?: CSSProperties
  /**
   * @description 菜单是否可滚动
   * */
  scrollable?: boolean
  /**
   * @description 徽标props全局定义
   * */
  propsBadge?: BadgeProps
  /**
   * @description 轮播图高度
   * */
  swiperHeight?: string | number
  /**
   * @description 标签左侧图标样式自定义
   * */
  iconStyle?: CSSProperties
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties
}

export interface TabsParamsVo extends TabsParamsVo {
  index: number
}
export interface ITabsEmits {
  /** 点击标签时触发 */
  (e: 'click', params: TabsParamsVo): void
  /** 标签索引改变时触发 */
  (e: 'change', item: TabsItemVo, index: number): void
  /** 长按标签时触发 */
  (e: 'longPress', params: TabsParamsVo): void
  /** 标签索引改变时触发 */
  (e: 'update:current', index: number): void
}
