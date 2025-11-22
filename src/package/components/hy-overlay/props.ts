import type { CSSProperties, PropType } from 'vue'

const overlayProps = {
    /** 是否显示遮罩 */
    show: {
        type: Boolean,
        default: false
    },
    /** zIndex 层级 */
    zIndex: {
        type: Number,
        default: 10070
    },
    /** 动画时长，单位毫秒 */
    duration: {
        type: Number,
        default: 300
    },
    /** 不透明度值，当做rgba的第四个参数 */
    opacity: {
        type: Number,
        default: 0.5
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => {}
    },
    /** 自定义外部类名 */
    customClass: String
}

export default overlayProps
