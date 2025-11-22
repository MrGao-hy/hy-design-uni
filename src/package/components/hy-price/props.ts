import type { CSSProperties, PropType } from 'vue'

const priceProps = {
    /** 传入金额值 */
    text: {
        type: [String, Number],
        default: 0,
        required: true
    },
    /** 金额符号 */
    symbol: {
        type: String,
        default: '￥'
    },
    /** 比例大小 */
    ratio: {
        type: Number,
        default: 1.4
    },
    /** 保留小数点后几位数 */
    num: {
        type: Number,
        default: 2
    },
    /** 字体颜色 */
    color: {
        type: String,
        default: '#FE3232'
    },
    /** 字体大小 */
    size: {
        type: [Number, String],
        default: 12
    },
    /** 字体粗细 */
    weight: {
        type: Number,
        default: 500
    },
    /** 是否倾斜 */
    slant: {
        type: Boolean,
        default: false
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => {}
    },
    /** 自定义外部类名 */
    customClass: String
}

export default priceProps
