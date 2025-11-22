import type { CSSProperties, PropType } from 'vue'
import type { FlexAlign, FlexJustify, FlexWrap } from './typing'

const flexProps = {
    /** flex 主轴的方向是否垂直，使用 flex-direction: column */
    vertical: {
        type: Boolean,
        default: false
    },
    /**
     * 设置元素在主轴方向上的对齐方式
     * @values flex-start,flex-end,space-between,space-around,space-evenly,center
     * */
    justify: {
        type: String,
        default: 'flex-start'
    },
    /**
     * 设置元素在交叉轴方向上的对齐方式
     * @values flex-start,center,flex-end,stretch,baseline
     * */
    align: {
        type: String,
        default: 'flex-start'
    },
    /**
     * 设置元素单行显示还是多行显示
     * @values nowrap,wrap,wrap-reverse
     * */
    wrap: {
        type: String,
        default: 'nowrap'
    },
    /** flex 属性，支持数字或字符串。如 1 或 'none' */
    flex: {
        type: [String, Number],
        default: 'initial'
    },
    /** 设置网格之间的间隙 */
    gap: {
        type: [String, Number, Array] as PropType<string | number | (string | number)[]>,
        default: 0
    },
    /** 快捷设置 */
    basis: {
        type: [String, Number],
        default: 'auto'
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => {}
    },
    /** 自定义外部类名 */
    customClass: String
}

export default flexProps
