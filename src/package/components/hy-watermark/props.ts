const watermarkProps = {
    /** 显示主标题 */
    title: {
        type: String,
        default: ''
    },
    /** 主标题颜色 */
    titleColor: {
        type: String,
        default: ''
    },
    /** 主标题字体大小，单位px */
    titleSize: {
        type: Number,
        default: 0
    },
    /** 显示副标题内容 */
    content: {
        type: String,
        default: ''
    },
    /** 显示图片的地址，支持网络图片和base64（钉钉小程序仅支持网络图片） */
    image: {
        type: String,
        default: ''
    },
    /** 图片高度 */
    imageHeight: {
        type: Number,
        default: 50
    },
    /** 图片宽度 */
    imageWidth: {
        type: Number,
        default: 70
    },
    /** X轴间距，单位px */
    gutterX: {
        type: Number,
        default: 0
    },
    /** Y轴间距，单位px */
    gutterY: {
        type: Number,
        default: 0
    },
    /** canvas画布宽度，单位px */
    width: {
        type: Number,
        default: 100
    },
    /** canvas画布高度，单位px */
    height: {
        type: Number,
        default: 100
    },
    /** 是否为全屏水印 */
    fullScreen: {
        type: Boolean,
        default: true
    },
    /** 水印字体颜色 */
    color: {
        type: String,
        default: '#8c8c8c'
    },
    /** 水印字体大小，单位px */
    size: {
        type: Number,
        default: 24
    },
    /** 水印字体样式（仅微信和h5支持） */
    fontStyle: {
        type: String,
        default: ''
    },
    /** 水印字体的粗细 */
    fontWeight: {
        type: String,
        default: ''
    },
    /** 水印字体系列（仅微信和h5支持） */
    fontFamily: {
        type: String,
        default: 'PingFang SC'
    },
    /** 水印旋转角度 */
    rotate: {
        type: Number,
        default: -25
    },
    /** 自定义层级 */
    zIndex: {
        type: Number,
        default: 10086
    },
    /** 自定义透明度，取值 0~1 */
    opacity: {
        type: Number,
        default: 0.5
    }
}

export default watermarkProps
