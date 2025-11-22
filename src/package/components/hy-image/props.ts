import { IconConfig } from '../../libs/config'
import type { CSSProperties, PropType } from 'vue'

const imageProps = {
    /** 图片地址 */
    src: {
        type: String,
        default: '',
        required: true
    },
    /**
     * 裁剪模式，见官网说明
     * @values scaleToFill,aspectFit,aspectFill,widthFix,heightFix,top,bottom,center,left,right,top left,top right,bottom left,bottom right
     * */
    mode: {
        type: String,
        default: 'aspectFill'
    },
    /** 宽度，单位任意，如果为数值，则为px单位 */
    width: {
        type: [String, Number],
        default: ''
    },
    /** 高度，单位任意，如果为数值，则为px单位 */
    height: {
        type: [String, Number],
        default: ''
    },
    /**
     * 图片形状
     * @values circle,square
     * */
    shape: {
        type: String,
        default: 'square'
    },
    /** 圆角值，单位任意，如果为数值，则为px单位 */
    radius: {
        type: [Number, String],
        default: 0
    },
    /** 是否懒加载，仅微信小程序、App、百度小程序、字节跳动小程序有效 */
    lazyLoad: {
        type: Boolean,
        default: true
    },
    /** 是否开启长按图片显示识别小程序码菜单，仅微信小程序有效 */
    showMenuByLongPress: {
        type: Boolean,
        default: true
    },
    /** 加载中的图标，或者小图片 */
    loadingIcon: {
        type: String,
        default: IconConfig.LOADING
    },
    /** 加载失败的图标，或者小图片 */
    errorIcon: {
        type: String,
        default: IconConfig.NOTICE
    },
    /** 是否显示加载中的图标或者自定义的slot */
    showLoading: {
        type: Boolean,
        default: true
    },
    /** 是否显示加载错误的图标或者自定义的slot */
    showError: {
        type: Boolean,
        default: true
    },
    /** 是否需要淡入效果 */
    fade: {
        type: Boolean,
        default: true
    },
    /** 只支持网络资源，只对微信小程序有效 */
    webp: {
        type: Boolean,
        default: false
    },
    /** 搭配fade参数的过渡时间，单位ms */
    duration: {
        type: Number,
        default: 500
    },
    /** 背景颜色，用于深色页面加载图片时，为了和背景色融合 */
    bgColor: String,
    /** 是否模糊图片 */
    indistinct: {
        type: Boolean,
        default: false
    },
    /** 是否预览图片 */
    previewImage: {
        type: Boolean,
        default: false
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 自定义外部类名 */
    customClass: String
}

export default imageProps
