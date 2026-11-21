import type { PropType } from 'vue'

/**
 * hy-rich-text 基于 mp-html v2.5.2 的解析器与 node 递归渲染，
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
    /** 是否允许外部链接被点击时自动复制 */
    copyLink: {
        type: Boolean,
        default: true
    },
    /** 主域名，用于拼接链接 */
    domain: {
        type: String,
        default: ''
    },
    /** 图片出错时的占位图链接 */
    errorImg: {
        type: String,
        default: ''
    },
    /** 是否开启图片懒加载 */
    lazyLoad: {
        type: Boolean,
        default: false
    },
    /** 图片加载过程中的占位图链接 */
    loadingImg: {
        type: String,
        default: ''
    },
    /** 是否在播放一个视频时自动暂停其他视频 */
    pauseVideo: {
        type: Boolean,
        default: true
    },
    /** 是否允许图片被点击时自动预览 */
    previewImg: {
        type: Boolean,
        default: true
    },
    /** 是否给每个表格添加一个滚动层使其能单独横向滚动 */
    scrollTable: {
        type: Boolean,
        default: false
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
    /** 是否允许图片被长按时显示菜单 */
    showImgMenu: {
        type: Boolean,
        default: true
    },
    /** 标签的默认样式 */
    tagStyle: {
        type: Object as PropType<Record<string, string>>,
        default: () => ({})
    },
    /** 是否使用锚点链接（传入数字可作为跳转偏移量） */
    useAnchor: {
        type: [Boolean, Number] as PropType<boolean | number>,
        default: false
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
