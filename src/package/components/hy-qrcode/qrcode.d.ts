/** QRCode 构造函数选项 */
export interface QRCodeOptions {
    /** 二维码内容文本 */
    text?: string
    /** 二维码尺寸，默认 256 */
    size?: number
    /** 纠错等级，默认 3 (1:L / 2:M / 3:Q / 4:H) */
    correctLevel?: number
    /** 背景色，默认 '#ffffff' */
    background?: string
    /** 前景色，默认 '#000000' */
    foreground?: string
    /** 定位角点颜色，默认 '#000000' */
    pdground?: string
    /** 二维码中心图片路径 */
    image?: string
    /** 中心图片尺寸，默认 30 */
    imageSize?: number
    /** canvas-id */
    canvasId: string
    /** nvue 上下文 */
    nvueContext?: any
    /** 组件实例上下文 */
    context?: any
    /** 是否使用组件 */
    usingComponents?: any
    /** 是否显示加载提示 */
    showLoading?: boolean
    /** 加载提示文字 */
    loadingText?: string
    /** 导出图片宽度 */
    width?: number
    /** 导出图片高度 */
    height?: number
    /** 生成结果回调 */
    cbResult?: (res: string | any) => void
}

/** QRCode 实例 */
declare class QRCode {
    constructor(opt: QRCodeOptions | string)
    options: QRCodeOptions
    /** 清除画布 */
    clear(fn?: () => void): void
}

export default QRCode
