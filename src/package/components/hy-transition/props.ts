import type { CSSProperties, PropType } from 'vue'

const transitionProps = {
    /** 是否展示组件 */
    show: {
        type: Boolean,
        default: false
    },
    /** 使用的动画模式 */
    mode: {
        type: String,
        default: 'fade'
    },
    /** 动画的执行时间，单位ms */
    duration: {
        type: Number,
        default: 300
    },
    /** 使用的动画过渡函数 */
    timingFunction: {
        type: String,
        default: 'ease-out'
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 自定义外部类名 */
    customClass: String
}

export default transitionProps
