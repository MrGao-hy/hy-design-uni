/** 内容大小和位置 */
export interface HyRichTextRect {
    left: number
    right: number
    top: number
    bottom: number
    width: number
    height: number
}

/** 图片被点击时携带的属性 */
export interface HyRichTextImgAttrs {
    [key: string]: unknown
}

/** 链接被点击时携带的属性 */
export interface HyRichTextLinkAttrs {
    /** 链接地址 */
    href?: string
    /** 链接内的文本内容 */
    innerText?: string
    [key: string]: unknown
}

/** 媒体加载出错信息 */
export interface HyRichTextError {
    /** 出错来源（img/video/audio） */
    source: string
    /** 出错节点的属性 */
    attrs: Record<string, unknown>
    /** 错误信息 */
    errMsg?: string
}

/**
 * @description 组件事件声明（接口名遵循库内 I{Component}Emits 惯例，供文档生成链路匹配）
 */
export interface IRichTextEmits {
    /** dom 结构加载完毕时触发 */
    load: []
    /** 渲染高度稳定后触发（图片全部加载完毕或 350ms 内高度无变化） */
    ready: [rect: Partial<HyRichTextRect>]
    /** 图片被点击时触发 */
    imgTap: [attrs: HyRichTextImgAttrs]
    /** 链接被点击时触发 */
    linkTap: [attrs: HyRichTextLinkAttrs]
    /** 音视频播放时触发 */
    play: []
    /** 媒体加载出错时触发 */
    error: [err: HyRichTextError]
    /** 容器被点击时触发 */
    tap: []
    /** 容器被点击时触发 */
    click: []
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
    /**
     * 锚点跳转（需开启 useAnchor）
     * @param id 要跳转的锚点 id
     * @param offset 跳转位置的偏移量
     */
    navigateTo: (id: string, offset?: number) => Promise<void>
    /** 暂停播放所有媒体 */
    pauseMedia: () => void
    /**
     * 设置媒体播放速率
     * @param rate 播放速率
     */
    setPlaybackRate: (rate: number) => void
    /**
     * 将锚点跳转的范围限定在一个 scroll-view 内
     * @param page scroll-view 所在页面的实例
     * @param selector scroll-view 的选择器
     * @param scrollTop scroll-view scroll-top 属性绑定的变量名
     */
    in: (page: Record<string, unknown>, selector: string, scrollTop: string) => void
}
