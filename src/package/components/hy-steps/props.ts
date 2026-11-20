import type { StepListVo } from './typing'
import type { CSSProperties, PropType } from 'vue'
import type { DirectionType } from '../../libs'

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
        type: String as PropType<DirectionType>,
        default: 'row'
    },
    /** 激活状态颜色，映射为 hy-step-item 的进行中/已完成相关 CSS 变量 */
    activeColor: {
        type: String,
        default: ''
    },
    /** 未激活状态颜色，映射为 hy-step-item 的等待态文字与连接线 CSS 变量 */
    inactiveColor: {
        type: String,
        default: ''
    },
    /** 是否显示点类型 */
    dot: {
        type: Boolean,
        default: false
    },
    /** 是否将步骤条水平居中显示，只对横向步骤条有效 */
    alignCenter: {
        type: Boolean,
        default: false
    },
    /** 指示器大小，映射为 hy-step-item 的指示器尺寸 CSS 变量 */
    iconSize: {
        type: [String, Number],
        default: ''
    },
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}

export default stepsProps
