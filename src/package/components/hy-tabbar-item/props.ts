const tabBarItemProps = {
    /** 图标 */
    icon: {
        type: String,
        default: ''
    },
    /** 标题 */
    title: {
        type: String,
        default: ''
    },
    /** 唯一标识 */
    name: {
        type: [String, Number],
        default: ''
    },
    /** 徽标显示值，当为徽标为点时候，必须要value设置true或者有值 */
    value: {
        type: [String, Number, Boolean],
        default: ''
    }
}

export default tabBarItemProps
