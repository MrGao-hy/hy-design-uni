import type { CellContentVo } from './typing'
import type { CSSProperties, PropType } from 'vue'
import type HyIconProps from '@/package/components/hy-icon/typing'

const cellProps = {
    /** cell列表数据 */
    list: {
        type: Array as PropType<Array<CellContentVo>>,
        default: () => [],
        required: true
    },
    /** 头部标题 */
    title: String,
    /** 是否显示标题前缀竖线 */
    showVertical: {
        type: Boolean,
        default: true
    },
    /** 是否显示cell下边框 */
    border: {
        type: Boolean,
        default: true
    },
    /** 圆角 */
    borderRadius: {
        type: [String, Number],
        default: '5px'
    },
    /** 是否禁用cell */
    disabled: {
        type: Boolean,
        default: false
    },
    /** 是否开启点击反馈(表现为点击时加上灰色背景)  */
    clickable: {
        type: Boolean,
        default: false
    },
    /**
     * 单元的大小
     * @values large,medium,small
     * */
    size: {
        type: [String, Number],
        default: 'medium'
    },
    /** 右侧的内容 */
    value: String,
    /**
     * 内容是否垂直居中(主要是针对右侧的value部分)
     * @values left,center,right
     * */
    arrange: {
        type: String,
        default: 'right'
    },
    /** cell列表数据 */
    rightIcon: {
        type: Object as PropType<HyIconProps>
    },
    /**
     * 右侧箭头的方向
     * @values left,up,down
     * */
    arrowDirection: {
        type: String,
        default: 'right'
    },
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>
}

export default cellProps
