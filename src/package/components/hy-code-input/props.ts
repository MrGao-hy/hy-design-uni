import type IProps from './typing'
import type { CSSProperties, PropType } from 'vue'

const codeInputProps = {
    /** 获取值 */
    modelValue: {
        type: [String, Number],
        required: true
    },
    /** 键盘弹起时，是否自动上推页面 */
    adjustPosition: {
        type: Boolean,
        default: true
    },
    /** 最大输入长度 */
    maxlength: {
        type: Number,
        default: 6
    },
    /** 显示border */
    border: {
        type: Boolean,
        default: true
    },
    /** 是否用圆点填充 */
    dot: {
        type: Boolean,
        default: false
    },
    /**
     * 示模式，box-盒子模式，line-底部横线模式
     * @values box,line
     * */
    mode: {
        type: String,
        default: 'box'
    },
    /** 是否细边框 */
    hairline: {
        type: Boolean,
        default: false
    },
    /** 字符间的距离 */
    space: {
        type: Number,
        default: 10
    },
    /** 是否自动获取焦点 */
    focus: {
        type: Boolean,
        default: false
    },
    /** 字体是否加粗 */
    bold: {
        type: Boolean,
        default: false
    },
    /** 字体颜色 */
    color: String,
    /** 字体大小，单位px */
    fontSize: {
        type: [String, Number],
        default: 18
    },
    /** 输入框的大小，宽等于高 */
    size: {
        type: [String, Number],
        default: 35
    },
    /** 是否隐藏原生键盘，如果想用自定义键盘的话，需设置此参数为true */
    disabledKeyboard: {
        type: Boolean,
        default: false
    },
    /** 边框和线条颜色 */
    borderColor: String,
    /** 是否禁止输入"."符号  */
    disabledDot: {
        type: Boolean,
        default: true
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    }
}

export default codeInputProps
