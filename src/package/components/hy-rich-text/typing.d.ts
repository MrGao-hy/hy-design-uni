/** 内容大小和位置 */
export interface HyRichTextRect {
    left: number
    right: number
    top: number
    bottom: number
    width: number
    height: number
}

/**
 * @description 组件事件声明
 */
export interface HyRichTextEmits {
    /** dom 结构加载完毕时触发 */
    onLoad: () => void
    /** 渲染高度稳定后触发（350ms 内高度无变化） */
    onReady: (rect: Partial<HyRichTextRect>) => void
    /** 容器被点击时触发 */
    onTap: () => void
    /** 容器被点击时触发 */
    onClick: () => void
}

/**
 * @description 通过 ref 暴露的实例方法
 */
export interface HyRichTextInstance {
    /**
     * 设置内容
     * @param content html 内容
     * @param append 是否在尾部追加
     */
    setContent: (content: string, append?: boolean) => void
    /** 获取文本内容 */
    getText: (nodes?: any[]) => string
    /** 获取内容大小和位置 */
    getRect: () => Promise<HyRichTextRect>
}
