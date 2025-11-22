import type { CSSProperties, PropType } from 'vue'

const popupProps = {
    /** 是否展示弹窗 */
    show: {
        type: Boolean,
        default: false
    },
    /** 是否显示遮罩 */
    overlay: {
        type: Boolean,
        default: true
    },
    /**
     * 弹出方向
     * @values left,right,top,bottom,center
     * */
    mode: {
        type: String,
        default: 'bottom'
    },
    /** 动画时长，单位ms */
    duration: {
        type: Number,
        default: 300
    },
    /** 是否显示关闭图标 */
    closeable: {
        type: Boolean,
        default: false
    },
    /** 自定义遮罩的样式 */
    overlayStyle: Object as PropType<CSSProperties>,
    /** 遮罩透明度，0-1之间 */
    overlayOpacity: {
        type: Number,
        default: 0.5
    },
    /** 点击遮罩是否关闭弹窗 */
    closeOnClickOverlay: {
        type: Boolean,
        default: true
    },
    /** 弹窗层级 */
    zIndex: {
        type: Number,
        default: 10086
    },
    /** 是否为iPhoneX留出底部安全距离 */
    safeAreaInsetBottom: {
        type: Boolean,
        default: true
    },
    /** 是否留出顶部安全距离 */
    safeAreaInsetTop: {
        type: Boolean,
        default: false
    },
    /**
     * 自定义关闭图标位置
     * @values top-left,top-right
     * */
    closeIconPos: {
        type: String,
        default: 'top-right'
    },
    /** 圆角值 */
    round: [String, Number],
    /** 当mode=center时 是否开启缩放 */
    zoom: {
        type: Boolean,
        default: true
    },
    /** 背景颜色 */
    bgColor: String,
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => {}
    },
    /** 自定义外部类名 */
    customClass: String
}

export default popupProps
