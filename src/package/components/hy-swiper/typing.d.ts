export interface SwiperList {
    /** 线上地址 */
    url?: string
    /** 标题 */
    title?: string
    /** 海报，为视频必填 */
    poster?: string
    /** 轮播图展示类型 */
    type?: 'image' | 'video'
    [key: string]: any
}

export type IndicatorMode = 'line' | 'dot'

export interface SwiperVo {
    detail: {
        current: number
    }
}

export interface ISwiperEmits {
    /** 点击轮播图触发 */
    click: [index: number]
    /** 滑动轮播图触发 */
    change: [temp: SwiperVo['detail']]
    /** 滑动轮播图触发 */
    'update:current': [value: number]
}

export interface ISwiperSlots {
    /**
     * 自定义轮播内容
     * record 为当前项数据，对象项携带自定义字段（如 subtitleKey）时可直接访问
     */
    default: (props: { record: SwiperList; index: number }) => any
    /** 自定义指示器 */
    indicator: (props: { current: number; length: number }) => any
}
