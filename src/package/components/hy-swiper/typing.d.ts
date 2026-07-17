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
    'update:current': [value: string | number]
}
