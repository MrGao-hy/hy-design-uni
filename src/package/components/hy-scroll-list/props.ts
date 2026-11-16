import type { CSSProperties, PropType } from 'vue'

const scrollListProps = {
    /** 指示器的整体宽度，单位px */
    indicatorWidth: {
        type: Number,
        default: 50
    },
    /** 滑块的宽度，单位px */
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
    indicatorActiveColor: String,
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}
export default scrollListProps
