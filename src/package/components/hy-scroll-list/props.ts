const scrollListProps = {
    /** 指示器的整体宽度 */
    indicatorWidth: {
        type: Number,
        default: 50
    },
    /** 滑块的宽度 */
    indicatorBarWidth: {
        type: Number,
        default: 20
    },
    /** 是否显示面板指示器 */
    indicator: {
        type: Boolean,
        default: true
    },
    /** 指示器非激活颜色 */
    indicatorColor: String,
    /** 指示器的激活颜色 */
    indicatorActiveColor: String
}
export default scrollListProps
