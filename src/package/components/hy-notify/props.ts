import type { CSSProperties, PropType } from 'vue'

const notifyProps = {
    /** 到顶部的距离 */
    top: {
        type: Number,
        default: 0
    },
    /**
     * 主题
     * @values primary,success,warning,error,info
     * */
    type: {
        type: String,
        default: 'primary'
    },
    /** 字体颜色 */
    color: {
        type: String,
        default: '#FFFFFF'
    },
    /** 背景颜色 */
    bgColor: String,
    /** 图标名称 */
    icon: String,
    /** 展示的文字内容 */
    message: String,
    /** 展示时长，为0时不消失，单位ms */
    duration: {
        type: Number,
        default: 3000
    },
    /** 字体大小 */
    fontSize: {
        type: [Number, String],
        default: 15
    },
    /** 是否留出顶部安全距离 */
    safeAreaInsetTop: {
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

export default notifyProps
