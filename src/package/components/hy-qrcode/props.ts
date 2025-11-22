import { random } from '../../libs'

const qrCodeProps = {
    /** 实例ID字符串(如果有多个二维码组件必须设置不一样的cid) */
    cid: {
        type: String,
        default: 'hy-qrcode-canvas_' + random(1, 1000)
    },
    /** 二维码大小 */
    size: {
        type: Number,
        default: 200
    },
    /** 二维码内容 */
    text: String,
    /** 是否显示二维码 */
    show: {
        type: Boolean,
        default: true
    },
    /** 二维码背景色 */
    background: {
        type: String,
        default: '#ffffff'
    },
    /** 二维码颜色 */
    foreground: {
        type: String,
        default: '#000000'
    },
    /** 定位角点颜色 */
    pdGround: {
        type: String,
        default: '#000000'
    },
    /** 是否是自定义组件 */
    usingComponents: {
        type: Boolean,
        default: true
    },
    /** 容错级别 */
    lv: {
        type: Number,
        default: 3
    },
    /** 二维码中间图标 */
    icon: String,
    /** 二维码中间图标大小 */
    iconSize: {
        type: Number,
        default: 40
    },
    /** 显示加载状态 */
    showLoading: {
        type: Boolean,
        default: true
    },
    /** 加载中提示语 */
    loadingText: {
        type: String,
        default: '二维码生成中...'
    },
    /** 是否预览 */
    allowPreview: {
        type: Boolean,
        default: false
    }
}

export default qrCodeProps
