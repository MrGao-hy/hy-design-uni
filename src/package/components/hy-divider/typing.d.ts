import type { CSSProperties } from 'vue'

export default interface HyDividerProps {
    /**
     * @description 是否虚线 （默认 false ）
     * */
    dashed?: boolean
    /**
     * @description 是否细线 （默认  true ）
     * */
    hairline?: boolean
    /**
     * @description 是否以点替代文字，优先于text字段起作用 （默认 false ）
     * */
    dot?: boolean
    /**
     * @description 内容文本的位置，left-左边，center-中间，right-右边 （默认 'center' ）
     * */
    textPosition?: HyApp.RowCenterType
    /**
     * @description 文本内容
     * */
    text?: string | 'loadMore' | 'loading' | 'noMore'
    /**
     * @description 文本大小 （默认 14）
     * */
    textSize?: string | number
    /**
     * @description 文本颜色 （默认 '#909399' ）
     * */
    textColor?: string
    /**
     * @description 线条颜色 （默认 '#dcdfe6' ）
     * */
    lineColor?: string
    /**
     * @description 加载图标（默认 'loading' ）
     * */
    loadingIcon?: string
    /**
     * @description 加载前的提示语（默认 '加载更多' ）
     * */
    loadMoreText?: string
    /**
     * @description 加载中提示语（默认 '正在加载...' ）
     * */
    loadingText?: string
    /**
     * @description 没有更多的提示语（默认 '没有更多了' ）
     * */
    noMoreText?: string
    /**
     * @description 上边距 （默认 0 ）
     * */
    marginTop?: string | number
    /**
     * @description 下边距 （默认 0 ）
     * */
    marginBottom?: string | number
    /**
     * @description 定义需要用到的外部样式
     * */
    customStyle?: CSSProperties
}
