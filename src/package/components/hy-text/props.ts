import type { CSSProperties, PropType } from 'vue'

const textProps = {
    /** 显示的值 */
    text: {
        type: [String, Number],
        default: '',
        required: true
    },
    /**
     * 主题颜色
     * @values primary,success,error,warning,info
     * */
    type: String,
    /** 是否显示 */
    show: {
        type: Boolean,
        default: true
    },
    /** 前置图标 */
    prefixIcon: String,
    /** 后置图标 */
    suffixIcon: String,
    /**
     * 文本处理的匹配模式
     * @values text,price,phone,name,date,link
     * */
    mode: {
        type: String,
        default: 'text'
    },
    /** mode=link下，配置的链接 */
    href: {
        type: String,
        default: ''
    },
    /** 格式化规则 */
    format: [Function, String],
    /** mode=phone时，点击文本是否拨打电话 */
    call: {
        type: Boolean,
        default: false
    },
    /** 小程序的打开方式 */
    openType: String,
    /** 是否粗体，默认normal */
    bold: {
        type: Boolean,
        default: false
    },
    /** 是否块状 */
    block: {
        type: Boolean,
        default: false
    },
    /** 文本显示的行数，如果设置，超出此行数，将会显示省略号 */
    lines: [String, Number],
    /** 文本颜色 */
    color: String,
    /** 字体大小 */
    size: {
        type: [String, Number],
        default: 15
    },
    /** 图标的样式 */
    iconStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => ({ fontSize: '15px' })
    },
    /**
     * 文字装饰，下划线，中划线等，可选值
     * @values none,underline,line-through
     * */
    decoration: String,
    /** 外边距，对象、字符串，数值形式均可 */
    margin: String,
    /** 文本行高 */
    lineHeight: String,
    /**
     * 文本对齐方式
     * @values left,center,right
     * */
    align: {
        type: String,
        default: 'left'
    },
    /**
     * 文字换行
     * @values normal,break-word,anywhere
     * */
    wordWrap: {
        type: String,
        default: 'normal'
    },
    /** 是否占满剩余空间 */
    flex: {
        type: Boolean,
        default: true
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => {}
    },
    /** 自定义外部类名 */
    customClass: String
}

export default textProps
