import type { PropType } from 'vue'

/**
 * hy-rich-text 基于 mp-html v2.5.2 的解析器、原生 rich-text 渲染，
 * Parser 解析器直接读取组件实例上的 props（如 tagStyle、domain 等），
 * 因此本组件保持 Options API 写法，props 通过本文件统一维护。
 */
const props = {
    /** 容器的样式 */
    containerStyle: {
        type: String,
        default: ''
    },
    /** 用于渲染的 html 字符串 */
    content: {
        type: String,
        default: ''
    },
    /** 主域名，用于拼接链接 */
    domain: {
        type: String,
        default: ''
    },
    /** 是否开启长按复制（传入 'force' 可在 iOS 强制开启） */
    selectable: {
        type: [Boolean, String],
        default: false
    },
    /** 是否将 title 标签的内容设置到页面标题 */
    setTitle: {
        type: [Boolean, String],
        default: true
    },
    /** 标签的默认样式 */
    tagStyle: {
        type: Object as PropType<Record<string, string>>,
        default: () => ({})
    },
    /** 自定义外部类名 */
    customClass: {
        type: String,
        default: ''
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: [String, Object] as PropType<string | Record<string, string>>,
        default: ''
    }
}

export default props
