import type { StepListVo } from './typing'
import type { PropType } from 'vue'

const stepsProps = {
    /** 设置当前处于第几步 */
    current: {
        type: Number,
        default: 0
    },
    /** 步骤条的数据集 */
    list: {
        type: Array as PropType<StepListVo[]>,
        default: []
    },
    /**
     * 方向
     * @values row,column
     * */
    direction: {
        type: String,
        default: 'row'
    },
    /** 激活状态颜色 */
    activeColor: {
        type: String,
        default: ''
    },
    /** 未激活状态颜色 */
    inactiveColor: {
        type: String,
        default: ''
    },
    /** 激活状态的图标 */
    activeIcon: String,
    /** 未激活状态图标 */
    inactiveIcon: String,
    /** 是否显示点类型 */
    dot: {
        type: Boolean,
        default: false
    },
    /** 图标大小 */
    iconSize: {
        type: [String, Number],
        default: 17
    }
}

export default stepsProps
