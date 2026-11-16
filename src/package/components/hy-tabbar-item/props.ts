import type { CSSProperties, PropType } from 'vue'

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
        type: [String, Number],
        default: ''
    },
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}

export default tabBarItemProps
