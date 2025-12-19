import type { CSSProperties, PropType } from 'vue'
import type { InputConfirmType } from '@uni-helper/uni-types'
import type { HyIconProps } from '../hy-icon/typing'

const inputProps = {
    /** 输入的值 */
    modelValue: {
        type: [String, Number],
        required: true
    },
    /**
     * 输入框类型，见上方说明
     * @values test,idcard,number,digit,safe-password,tel,nickname
     * */
    type: {
        type: String,
        default: 'text'
    },
    /** 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true，兼容性：微信小程序、百度小程序、字节跳动小程序、QQ小程序 */
    fixed: {
        type: Boolean,
        default: false
    },
    /** 是否禁用输入框 */
    disabled: {
        type: Boolean,
        default: false
    },
    /** 禁用状态时的背景色 */
    disabledColor: {
        type: String,
        default: ''
    },
    /** 是否显示清除控件 */
    clearable: {
        type: Boolean,
        default: false
    },
    /** 是否密码类型 */
    password: {
        type: Boolean,
        default: false
    },
    /** 最大输入长度，设置为 -1 的时候不限制最大长度(注：支付宝不支持-1，需要设置其他任意值)  */
    maxlength: {
        type: Number,
        default: -1
    },
    /** 输入框为空时的占位符 */
    placeholder: String,
    /** 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/ */
    placeholderClass: {
        type: String,
        default: 'input-placeholder'
    },
    /** 指定placeholder的样式，字符串/对象形式，如"color: red;" */
    placeholderStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => ({})
    },
    /** 是否显示输入字数统计，只在 type ="test"或type ="textarea"时有效 */
    showWordLimit: {
        type: Boolean,
        default: false
    },
    /** 设置右下角按钮的文字，兼容性详见uni-app文档 */
    confirmType: {
        type: String as PropType<InputConfirmType>,
        default: 'done'
    },
    /** 点击键盘右下角按钮时是否保持键盘不收起，H5无效 */
    confirmHold: {
        type: Boolean,
        default: false
    },
    /** focus时，点击页面的时候不收起键盘，微信小程序有效 */
    holdKeyboard: {
        type: Boolean,
        default: false
    },
    /** 自动获取焦点，在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点 */
    focus: {
        type: Boolean,
        default: false
    },
    /** 键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效 */
    autoBlur: {
        type: Boolean,
        default: false
    },
    /** 是否去掉 iOS 下的默认内边距，仅微信小程序，且type=textarea时有效 */
    disableDefaultPadding: {
        type: Boolean,
        default: false
    },
    /** 指定focus时光标的位置 */
    cursor: {
        type: Number,
        default: 140
    },
    /** 输入框聚焦时底部与键盘的距离 */
    cursorSpacing: {
        type: Number,
        default: 30
    },
    /** 光标起始位置，自动聚集时有效，需与selection-end搭配使用 */
    selectionStart: {
        type: Number,
        default: -1
    },
    /** 光标结束位置，自动聚集时有效，需与selection-start搭配使用 */
    selectionEnd: {
        type: Number,
        default: -1
    },
    /** 键盘弹起时，是否自动上推页面 */
    adjustPosition: {
        type: Boolean,
        default: true
    },
    /**
     * 输入框内容对齐方式
     * @values left,center,right
     * */
    inputAlign: {
        type: String,
        default: 'left'
    },
    /** 输入框字体的大小 */
    fontSize: {
        type: [String, Number],
        default: '15px'
    },
    /** 输入框字体颜色 */
    color: {
        type: String,
        default: ''
    },
    /** 输入框前置图标 */
    prefixIcon: {
        type: Object as PropType<HyIconProps>,
        default: () => {}
    },
    /** 输入框后置图标 */
    suffixIcon: {
        type: Object as PropType<HyIconProps>,
        default: () => {}
    },
    /**
     * 边框类型
     * @values surround,bottom,none
     * */
    border: {
        type: String,
        default: 'surround'
    },
    /** 是否只读，与disabled不同之处在于disabled会置灰组件，而readonly则不会 */
    readonly: {
        type: Boolean,
        default: false
    },
    /**
     * 输入框形状
     * @values circle,square
     * */
    shape: {
        type: String,
        default: 'square'
    },
    /** 是否忽略组件内对文本合成系统事件的处理 */
    ignoreCompositionEvent: {
        type: Boolean,
        default: false
    },
    /** 内容式化函数 */
    formatter: Function,
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => {}
    },
    /** 自定义外部类名 */
    customClass: String
} as const

export default inputProps
