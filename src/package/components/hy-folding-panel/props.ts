import type { PropType } from 'vue'

const foldingPanelProps = {
    /**
     * 当前激活的面板索引，支持v-model
     */
    modelValue: {
        type: [Number, String],
        default: -1
    },
    /**
     * 是否手风琴模式，默认false
     */
    accordion: {
        type: Boolean,
        default: false
    },
    /**
     * 是否禁用整个折叠面板组
     */
    disabled: {
        type: Boolean,
        default: false
    },
    /**
     * 是否显示边框
     */
    border: {
        type: Boolean,
        default: true
    },
    /**
     * 面板头部大小 large, medium, small
     * @values large, medium, small
     */
    size: {
        type: String as PropType<HyApp.SizeType>,
        default: 'medium'
    }
} as const

export default foldingPanelProps
