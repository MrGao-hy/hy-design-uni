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
