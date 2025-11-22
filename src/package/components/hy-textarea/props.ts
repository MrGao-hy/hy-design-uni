import type { CSSProperties, PropType } from 'vue'

const textareaProps = {
    /** 输入框的内容 */
    modelValue: {
        type: String,
        default: ''
    },
    /** 输入框为空时占位符 */
    placeholder: String,
    /** 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/ */
    placeholderClass: {
        type: String,
        default: 'textarea-placeholder'
    },
    /** 指定placeholder的样式，对象形式 */
    placeholderStyle: Object as PropType<CSSProperties>,
    /** 输入框高度 */
    height: {
        type: [String, Number],
        default: 70
    },
    /** 设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效 */
    confirmType: {
        type: String,
        default: 'done'
    },
    /** 是否禁用 */
    disabled: {
        type: Boolean,
        default: false
    },
    /** 是否显示统计字数 */
    count: {
        type: Boolean,
        default: false
    },
    /** 是否自动获取焦点，nvue不支持，H5取决于浏览器的实现 */
    focus: {
        type: Boolean,
        default: false
    },
    /** 是否自动增加高度 */
    autoHeight: {
        type: Boolean,
        default: false
    },
    /** 如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true */
    fixed: {
        type: Boolean,
        default: false
    },
    /** 指定光标与键盘的距离 */
    cursorSpacing: {
        type: Number,
        default: 0
    },
    /** 指定focus时的光标位置 */
    cursor: [String, Number],
    /** 是否显示键盘上方带有”完成“按钮那一栏 */
    showConfirmBar: {
        type: Boolean,
        default: true
    },
    /** 光标起始位置，自动聚焦时有效，需与selection-end搭配使用， */
    selectionStart: {
        type: Number,
        default: -1
    },
    /** 光标结束位置，自动聚焦时有效，需与selection-start搭配使用 */
    selectionEnd: {
        type: Number,
        default: -1
    },
    /** 键盘弹起时，是否自动上推页面 */
    adjustPosition: {
        type: Boolean,
        default: true
    },
    /** 是否去掉 iOS 下的默认内边距，只微信小程序有效 */
    disableDefaultPadding: {
        type: Boolean,
        default: false
    },
    /** focus时，点击页面的时候不收起键盘，只微信小程序有效 */
    holdKeyboard: {
        type: Boolean,
        default: false
    },
    /** 最大输入长度，设置为 -1 的时候不限制最大长度 */
    maxlength: {
        type: Number,
        default: 140
    },
    /**
     * 边框类型
     * @values surround,none,bottom
     * */
    border: {
        type: String,
        default: 'surround'
    },
    /** 内容式化函数 */
    formatter: Function,
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 自定义外部类名 */
    customClass: String
}

export default textareaProps
