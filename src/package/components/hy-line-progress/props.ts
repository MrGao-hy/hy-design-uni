import type { CSSProperties, PropType } from 'vue'

const lineProgressProps = {
    /** 激活部分的颜色 */
    activeColor: String,
    /** 背景色 */
    inactiveColor: String,
    /** 进度百分比，数值 */
    percentage: {
        type: Number,
        default: 0
    },
    /** 是否在进度条内部显示百分比的值 */
    showText: {
        type: Boolean,
        default: true
    },
    /** 进度条的高度，单位px */
    height: {
        type: [String, Number],
        default: 8
    },
    /** 字体大小，单位px */
    fontSize: [String, Number],
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 自定义外部类名 */
    customClass: String
}

export default lineProgressProps
