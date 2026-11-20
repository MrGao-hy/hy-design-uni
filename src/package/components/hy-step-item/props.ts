import type { CSSProperties, PropType } from 'vue'
import type { StepStatus } from './typing'

export default {
    /**
     * 步骤标题
     * 不传时根据状态显示默认文案（已完成/失败/进行中/未开始）
     */
    title: {
        type: String,
        default: ''
    },
    /** 步骤描述 */
    description: {
        type: String,
        default: ''
    },
    /** 步骤图标，传入后指示器显示为图标 */
    icon: {
        type: String,
        default: ''
    },
    /**
     * 步骤状态
     * 传入后覆盖根据 current 自动计算的状态
     */
    status: {
        type: String as PropType<StepStatus>,
        default: undefined
    },
    /** 自定义样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => ({})
    },
    /** 自定义类名 */
    customClass: {
        type: String,
        default: ''
    }
}
