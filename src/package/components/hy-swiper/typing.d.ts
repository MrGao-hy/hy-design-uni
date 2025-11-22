import type { CSSProperties } from 'vue'

export default interface HySwiperProps {
    /**
     * @description 轮播图数据
     * */
    list: (string | Record<string, unknown>)[]
    /**
     * @description list数组中指定对象的目标属性名（默认 'url' ）
     * */
    keyName?: string
    /**
     * @description 是否显示面板指示器（默认 false ）
     * */
    indicator?: boolean
    /**
     * @description 指示器非激活颜色（默认 '#FFFFFF' ）
     * */
    indicatorActiveColor?: string
    /**
     * @description 指示器的激活颜色（默认 'rgba(255, 255, 255, 0.35)' ）
     * */
    indicatorInactiveColor?: string
    /**
     * @description 指示器样式，可通过bottom，left，right进行定位
     * */
    indicatorStyle?: CSSProperties
    /**
     * @description 指示器模式（默认 'line' ）
     * */
    indicatorMode?: HyApp.SwiperIndicatorModeType
    /**
     * @description 是否自动切换（默认 true ）
     * */
    autoplay?: boolean
    /**
     * @description 当前所在滑块的 index（默认 0 ）
     * */
    current?: number | string
    /**
     * @description 当前所在滑块的 item-id ，不能与 current 被同时指定
     * */
    currentItemId?: string
    /**
     * @description 滑块自动切换时间间隔（ms）（默认 3000 ）
     * */
    interval?: number
    /**
     * @description 滑块切换过程所需时间（ms）（默认 300 ）
     * */
    duration?: number
    /**
     * @description 播放到末尾后是否重新回到开头（默认 false ）
     * */
    circular?: boolean
    /**
     * @description 前边距，可用于露出前一项的一小部分，nvue和支付宝不支持（默认 0 ）
     * */
    previousMargin?: number | string
    /**
     * @description 后边距，可用于露出后一项的一小部分，nvue和支付宝不支持（默认 0 ）
     * */
    nextMargin?: number | string
    /**
     * @description 当开启时，会根据滑动速度，连续滑动多屏，支付宝不支持（默认 false ）
     * */
    acceleration?: boolean
    /**
     * @description 同时显示的滑块数量，nvue、支付宝小程序不支持（默认 1 ）
     * */
    displayMultipleItems?: number
    /**
     * @description 指定swiper切换缓动动画类型， 只对微信小程序有效（默认 'default' ）
     * */
    easingFunction?: string
    /**
     * @description 图片的裁剪模式（默认 'aspectFill' ）
     * */
    imgMode?: HyApp.ImageModeVo
    /**
     * @description 组件高度（默认 130 ）
     * */
    height?: number
    /**
     * @description 背景颜色（默认 	'#f3f4f6' ）
     * */
    bgColor?: string
    /**
     * @description 组件圆角，数值或带单位的字符串（默认 4 ）
     * */
    radius?: number | string
    /**
     * @description 是否加载中（默认 false ）
     * */
    loading?: boolean
    /**
     * @description 是否显示标题，要求数组对象中有title属性（默认 false ）
     * */
    showTitle?: boolean
}

export interface SwiperList {
    [key: string]: any
    /** 线上地址 */
    url?: string
    /** 标题 */
    title?: string
    /** 海报，为视频必填 */
    poster?: string
    /** 轮播图展示类型 */
    type?: 'image' | 'video'
}

export interface SwiperVo {
    detail: {
        current: number
    }
}

export interface ISwiperEmits {
    /** 点击轮播图触发 */
    (e: 'click', index: number): void
    /** 滑动轮播图触发 */
    (e: 'change', temp: SwiperVo['detail']): void
    /** 滑动轮播图触发 */
    (e: 'update:current', value: string | number): void
}
