import type { CSSProperties, PropType } from 'vue'

const rollingNumProps = {
    /** 要显示的数字或字符串值 */
    value: {
        type: [String, Number],
        default: 0
    },
    /** 数字字体大小 */
    size: {
        type: [String, Number],
        default: '32rpx'
    },
    /** 数字颜色 */
    color: {
        type: String,
        default: '#333'
    },
    /** 字体粗细 */
    fontWeight: {
        type: [String, Number],
        default: 'normal'
    },
    /** 单个数字的高度 */
    height: {
        type: [String, Number],
        default: '40rpx'
    },
    /** 滚动动画持续时间（秒） */
    duration: {
        type: Number,
        default: 1.5
    },
    /** 数字间距 */
    letterSpacing: {
        type: [String, Number],
        default: 0
    },
    /**
     * 滚动方向：向上、向下或交替
     * @values up,down,alternate
     * */
    scrollDirection: {
        type: String,
        default: 'up'
    },
    /**
     * 滚动停止顺序：从左到右或从右到左
     * @values ltr,rtl
     * */
    stopOrder: {
        type: String,
        default: 'ltr'
    },
    /** 每个数字滚动的延迟时间间隔（秒） */
    delayStep: {
        type: Number,
        default: 0.1
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 自定义外部类名 */
    customClass: String
}

export default rollingNumProps
