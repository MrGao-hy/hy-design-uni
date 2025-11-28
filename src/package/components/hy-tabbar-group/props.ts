import type { CSSProperties, PropType } from 'vue'
import type { HyBadgeProps } from '../hy-badge/typing'

const tabbarGroupProps = {
    /** 选中项的索引值 */
    modelValue: {
        type: Number,
        default: 0
    },
    /** 是否固定在底部 */
    fixed: {
        type: Boolean,
        default: false
    },
    /** 是否显示顶部边框 */
    border: {
        type: Boolean,
        default: true
    },
    /** 是否显示占位元素 */
    placeholder: {
        type: Boolean,
        default: true
    },
    /**
     * 导航栏的形状
     * @values square, circle
     * */
    shape: {
        type: String,
        default: 'square'
    },
    /** 背景颜色 */
    bgColor: {
        type: String,
        default: ''
    },
    /** 激活颜色 */
    activeColor: {
        type: String,
        default: ''
    },
    /** 非激活颜色 */
    inactiveColor: {
        type: String,
        default: ''
    },
    /** 底部安全区域适配 - 主要用于iPhone X及以上机型 */
    safeAreaInsetBottom: {
        type: Boolean,
        default: true
    },
    /** 图标大小 */
    iconSize: {
        type: [String, Number],
        default: ''
    },
    /** 文字大小 */
    fontSize: {
        type: [String, Number],
        default: ''
    },
    /** 徽标部分属性 */
    badgeProps: {
        type: Object as PropType<HyBadgeProps>
    },
    /** z-index层级 */
    zIndex: {
        type: Number,
        default: 10086
    },
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
} as const

export default tabbarGroupProps
