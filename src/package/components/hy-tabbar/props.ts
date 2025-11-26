import type { CSSProperties, PropType } from 'vue'
import type HyBadgeProps from '../hy-badge/typing'

const tabBarProps = {
    /** 选中项的索引值 */
    modelValue: {
        type: Number,
        default: 0
    },
    /** 导航栏数据集合 */
    list: {
        type: Array,
        default: () => []
    },
    /** 是否固定在底部 */
    fixed: {
        type: Boolean,
        default: true
    },
    /** 是否显示占位元素 */
    placeholder: {
        type: Boolean,
        default: false
    },
    zIndex: {
        type: Number,
        default: 10086
    },
    /** 图标和字体颜色 */
    color: {
        type: String,
        default: ''
    },
    /** 轨道颜色 */
    baseBgColor: {
        type: String,
        default: ''
    },
    /** 背景颜色 */
    bgColor: {
        type: String,
        default: ''
    },
    /** 激活圆形背景颜色 */
    activeColor: {
        type: String,
        default: ''
    },
    /** 徽标部分属性 */
    badgeProps: {
        type: Object as PropType<HyBadgeProps>
    },
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}

export default tabBarProps
