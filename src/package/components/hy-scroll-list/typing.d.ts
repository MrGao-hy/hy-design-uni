import type { CSSProperties } from 'vue'

export default interface HyScrollListProps {
  /**
   * @description 指示器的整体宽度 (默认 50 )
   * */
  indicatorWidth?: number
  /**
   * @description 滑块的宽度 (默认 20 )
   * */
  indicatorBarWidth?: number
  /**
   * @description 是否显示面板指示器 (默认 true )
   * */
  indicator?: boolean
  /**
   * @description 指示器非激活颜色 (默认 '#f2f2f2' )
   * */
  indicatorColor?: string
  /**
   * @description 指示器的激活颜色 (默认 '#3c9cff' )
   * */
  indicatorActiveColor?: string
  /**
   * @description 指示器样式，可通过bottom，left，right进行定位
   * */
  indicatorStyle?: CSSProperties
}

export interface IScrollListEmits {
  /** 滑动到左边时触发 */
  (e: 'scrollLeft'): void
  /** 滑动到右边时触发 */
  (e: 'scrollRight'): void
}
