import type { CSSProperties, PropType } from 'vue'

const cellProps = {
    /** 是否显示cell下边框 */
    border: {
        type: Boolean,
        default: true
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
    /**
     * 内容是否垂直居中(主要是针对右侧的value部分)
     * @values left,center,right
     * */
    arrange: {
        type: String,
        default: 'right'
    },
    /** 是否展示右侧图标 */
    isRightIcon: {
        type: Boolean,
        default: true
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
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}

export default cellProps
