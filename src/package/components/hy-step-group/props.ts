import type { CSSProperties, PropType } from 'vue'
import type { DirectionType } from '../../libs'

export default {
    /** 设置当前处于第几步 */
    current: {
        type: Number,
        default: 0
    },
    /**
     * 方向
     * @values row,column
     * */
    direction: {
        type: String as PropType<DirectionType>,
        default: 'row'
    },
    /** 是否为点状步骤条样式 */
    dot: {
        type: Boolean,
        default: false
    },
    /** 步骤条之间的间距，默认自动计算 */
    space: {
        type: String,
        default: ''
    },
    /** 是否将步骤条水平居中显示，只对横向步骤条有效 */
    alignCenter: {
        type: Boolean,
        default: false
    },
    /** 激活状态颜色，映射为子步骤项的进行中/已完成相关 CSS 变量 */
    activeColor: {
        type: String,
        default: ''
    },
    /** 未激活状态颜色，映射为子步骤项的等待态文字与连接线 CSS 变量 */
    inactiveColor: {
        type: String,
        default: ''
    },
    /** 指示器大小，映射为子步骤项的指示器尺寸 CSS 变量 */
    iconSize: {
        type: [String, Number],
        default: ''
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
