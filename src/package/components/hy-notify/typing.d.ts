export interface NotifyOptions {
    /** 到顶部的距离 */
    top?: number
    /** 主题类型 */
    type?: NotifyType
    /** 字体颜色 */
    color?: string
    /** 背景颜色 */
    bgColor?: string
    /** 自定义图标 */
    icon?: string
    /** 展示的文字内容 */
    message?: string
    /** 展示时长，为0时不消失 */
    duration?: number
    /** 字体大小 */
    fontSize?: number | string
    /** 是否留出顶部安全距离 */
    safeAreaInsetTop?: boolean
    /** 关闭后的回调函数 */
    complete?: () => void
}
