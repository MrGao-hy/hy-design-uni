import type { CSSProperties, PropType } from 'vue'
import type { IPlacementVo } from '@/package/components/hy-popover/typing'

const tooltipProps = {
    /** 需要显示的提示文字 */
    text: {
        type: String,
        default: ''
    },
    /** 点击复制按钮时，复制的文本，为空则使用text值 */
    copyText: {
        type: String,
        default: ''
    },
    /**
     * 触发模式
     * @values longpress,click
     * */
    triggerMode: {
        type: String,
        default: 'longpress'
    },
    /**
     * 指定 popover 的放置位置
     * @values top,top-start,top-end,bottom,bottom-start,bottom-end,left,left-start,left-end,right,right-start,right-end
     * */
    placement: {
        type: String,
        default: 'bottom'
    },
    /** 文本大小 */
    size: {
        type: [String, Number],
        default: 14
    },
    /** 字体颜色 */
    color: String,
    /** 字体粗细 */
    bold: {
        type: Boolean,
        default: false
    },
    /** 弹出提示框时，文本的背景色 */
    bgColor: {
        type: String,
        default: 'transparent'
    },
    /** 弹出提示的z-index，nvue无效 */
    zIndex: {
        type: Number,
        default: 10071
    },
    /** 是否显示复制按钮 */
    showCopy: {
        type: Boolean,
        default: true
    },
    /** 扩展的按钮组 */
    buttons: {
        type: Array,
        default: () => []
    },
    /** 是否显示透明遮罩以防止触摸穿透 */
    overlay: {
        type: Boolean,
        default: true
    },
    /** 是否显示提示 */
    showToast: {
        type: Boolean,
        default: true
    },
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}

export default tooltipProps
