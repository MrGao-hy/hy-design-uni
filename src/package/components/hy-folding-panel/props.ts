import type { SizeType } from '../../libs'
import type { PropType } from 'vue'

const foldingPanelProps = {
    /**
     * 当前展开的面板索引：手风琴模式为单个索引，普通模式为索引数组，支持v-model
     */
    modelValue: {
        type: [Number, String, Array] as PropType<number | string | Array<number | string>>,
        default: () => []
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
        type: String as PropType<SizeType>,
        default: 'medium'
    }
}

export default foldingPanelProps
