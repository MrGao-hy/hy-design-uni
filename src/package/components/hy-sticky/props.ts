import type { CSSProperties, PropType } from 'vue'

const stickyProps = {
    /** 吸顶时距离顶部的偏移量（单位：px） */
    zIndex: {
        type: [String, Number],
        default: 99
    },
    /** 吸顶时的层级 */
    offsetTop: {
        type: [String, Number],
        default: 0
    },
    /** 是否启用吸顶功能 */
    enable: {
        type: Boolean,
        default: true
    },
    /** 在scroll-view内使用时，指定scroll-view的类名（不含点） */
    scrollSelector: {
        type: String,
        default: ''
    },
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}

export default stickyProps
