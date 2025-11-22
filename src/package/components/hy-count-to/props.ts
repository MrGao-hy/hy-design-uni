import type { CSSProperties, PropType } from 'vue'

const countToProps = {
    /** 开始的数值，默认从0增长到某一个数 */
    startVal: {
        type: Number,
        default: 0
    },
    /** 要滚动的目标数值，必须 */
    endVal: {
        type: Number,
        default: 0,
        required: true
    },
    /** 滚动到目标数值的动画持续时间，单位为毫秒（ms） */
    duration: {
        type: Number,
        default: 2000
    },
    /** 设置数值后是否自动开始滚动 */
    autoplay: {
        type: Boolean,
        default: true
    },
    /** 要显示的小数位数 */
    decimals: {
        type: Number,
        default: 0
    },
    /** 滚动结束时，是否缓动结尾 */
    useEasing: {
        type: Boolean,
        default: true
    },
    /** 十进制分割 */
    decimal: {
        type: String,
        default: '.'
    },
    /** 字体颜色 */
    color: String,
    /** 字体大小，单位px */
    fontSize: {
        type: [Number, String],
        default: 22
    },
    /** 字体是否加粗 */
    bold: {
        type: Boolean,
        default: false
    },
    /** 千位分隔符 */
    separator: String,
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 自定义外部类名 */
    customClass: String
}

export default countToProps
