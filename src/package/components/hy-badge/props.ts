import type { CSSProperties, PropType } from 'vue'

const badgeProps = {
    /** 是否显示圆点 */
    isDot: {
        type: Boolean,
        default: false
    },
    /** 显示的内容 */
    value: {
        type: [String, Number],
        default: 0
    },
    /** 是否显示 */
    show: {
        type: Boolean,
        default: true
    },
    /** 最大值，超过最大值会显示 '{max}+' */
    max: {
        type: Number,
        default: 999
    },
    /** 层级 */
    zIndex: {
        type: Number,
        default: 999
    },
    /**
     * 主题类型
     * @values error,warning,success,primary,info
     * */
    type: {
        type: String,
        default: 'error'
    },
    /** 当数值为 0 时，是否展示 Badge */
    showZero: {
        type: Boolean,
        default: false
    },
    /** 背景颜色，优先级比type高，如设置，type参数会失效 */
    bgColor: String,
    /** 字体颜色 */
    color: String,
    /**
     * 徽标形状
     * @values circle,horn
     * */
    shape: {
        type: String,
        default: 'circle'
    },
    /**
     * 设置数字的显示方式
     * @values overflow,ellipsis,limit
     * */
    numberType: {
        type: String,
        default: 'overflow'
    },
    /** 设置badge的位置偏移，格式为 \[x, y\]，也即设置的为top和right的值，absolute为true时有效 */
    offset: Array,
    /** 是否反转背景和字体颜色 */
    inverted: {
        type: Boolean,
        default: false
    },
    /** 是否绝对定位 */
    absolute: {
        type: Boolean,
        default: false
    },
    /** 自定义输入框外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 自定义外部类名 */
    customClass: String
}

export default badgeProps
