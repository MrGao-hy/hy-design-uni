import type { PropType } from 'vue'
import type HyBadgeProps from '../hy-badge/typing'

const tabBarProps = {
    modelValue: {
        type: Number,
        default: 0
    },
    list: {
        type: Array,
        default: () => []
    },
    color: {
        type: String,
        default: ''
    },
    baseBgColor: {
        type: String,
        default: ''
    },
    barBgColor: {
        type: String,
        default: ''
    },
    activeColor: {
        type: String,
        default: ''
    },
    badge: {
        type: Object as PropType<HyBadgeProps>
    }
}

export default tabBarProps
