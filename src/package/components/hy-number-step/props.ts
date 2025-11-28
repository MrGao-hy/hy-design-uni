import type { HyIconProps } from '../hy-icon/typing'
import type { PropType } from 'vue'

const numberStepProps = {
    /** 用于双向绑定的值，初始化时设置设为默认min值(最小值) */
    modelValue: {
        type: Number,
        default: 0,
        required: true
    },
    /** 最小值 */
    min: {
        type: Number,
        default: 1
    },
    /** 最大值 */
    max: {
        type: Number,
        default: Number.MAX_SAFE_INTEGER
    },
    /** 加减的步长，可为小数 */
    step: {
        type: Number,
        default: 1
    },
    /** 是否只允许输入整数 */
    integer: {
        type: Boolean,
        default: false
    },
    /** 是否禁用，包括输入框，加减按钮 */
    disabled: {
        type: Boolean,
        default: false
    },
    /** 是否禁用输入框 */
    disabledInput: {
        type: Boolean,
        default: false
    },
    /** 是否开启异步变更，开启后需要手动控制输入值 */
    asyncChange: {
        type: Boolean,
        default: false
    },
    /** 输入框宽度，单位为px */
    inputWidth: {
        type: [String, Number],
        default: 35
    },
    /** 是否显示减少按钮 */
    showMinus: {
        type: Boolean,
        default: true
    },
    /** 是否显示增加按钮 */
    showPlus: {
        type: Boolean,
        default: true
    },
    /** 显示的小数位数 */
    decimalLength: Number,
    /** 是否开启长按加减手势 */
    longPress: {
        type: Boolean,
        default: true
    },
    /** 输入框文字和加减按钮图标的颜色 */
    color: String,
    /** 按钮宽度 */
    buttonWidth: {
        type: [String, Number],
        default: 30
    },
    /** 按钮大小，宽高等于此值，单位px，输入框高度和此值保持一致 */
    buttonSize: {
        type: [String, Number],
        default: 30
    },
    /** 按钮圆角 */
    buttonRadius: [String, Number],
    /** 输入框和按钮的背景颜色 */
    bgColor: String,
    /** 输入框背景颜色 */
    inputBgColor: String,
    /** 指定光标于键盘的距离，避免键盘遮挡输入框，单位px */
    cursorSpacing: {
        type: Number,
        default: 100
    },
    /** 是否禁用减少按钮 */
    disableMinus: {
        type: Boolean,
        default: false
    },
    /** 是否禁用增加按钮 */
    disablePlus: {
        type: Boolean,
        default: false
    },
    /** 减号按钮图标 */
    minusIcon: Object as PropType<HyIconProps>,
    /** 加号按钮图标 */
    plusIcon: Object as PropType<HyIconProps>,
    /** 迷你模式 */
    miniMode: {
        type: Boolean,
        default: false
    }
}

export default numberStepProps
