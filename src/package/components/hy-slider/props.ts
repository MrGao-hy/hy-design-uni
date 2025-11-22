import type { CSSProperties, PropType } from 'vue'

const sliderProps = {
    /** 滑块默认值 */
    modelValue: {
        type: Number,
        default: 0
    },
    /** 滑块的大小，取值范围为 12 - 28 */
    blockSize: {
        type: [String, Number],
        default: 18
    },
    /** 最小值 */
    min: {
        type: Number,
        default: 0
    },
    /** 最大值 */
    max: {
        type: Number,
        default: 100
    },
    /** 步长 */
    step: {
        type: Number,
        default: 1
    },
    /** 底部选择部分的背景颜色 */
    activeColor: String,
    /** 底部条背景颜色 */
    inactiveColor: String,
    /** 滑块颜色 */
    blockColor: String,
    /** 是否显示当前的选择值 */
    showValue: {
        type: Boolean,
        default: false
    },
    /** 是否禁用滑块 */
    disabled: {
        type: Boolean,
        default: false
    },
    /** 是否渲染uni-app框架内置组件 */
    useNative: {
        type: Boolean,
        default: false
    },
    /** 滑块条高度，单位rpx */
    height: {
        type: [String, Number],
        default: 2
    },
    /** 双滑块时值 */
    rangeValue: {
        type: Array as PropType<number[]>,
        default: [0, 0]
    },
    /** 是否区间的模式 */
    isRange: {
        type: Boolean,
        default: false
    },
    /** 给滑块自定义样式，对象形式 */
    blockStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 自定义外部类名 */
    customClass: String
}

export default sliderProps
