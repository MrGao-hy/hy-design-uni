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
    }
}

export default stickyProps
