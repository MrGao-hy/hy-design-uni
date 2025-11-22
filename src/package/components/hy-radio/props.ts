import type { CSSProperties, PropType } from 'vue'
import type { CheckboxColumnsVo, IFieldNames } from '../hy-check-button/typing'

const radioProps = {
    /** 双向绑定值，数组类型 */
    modelValue: {
        type: [String, Number],
        required: true
    },
    /** 选择列表数据 */
    columns: {
        type: Array as PropType<Array<CheckboxColumnsVo>>,
        default: () => [],
        required: true
    },
    /** 自定义接收columns的键 */
    fieldNames: {
        type: Object as PropType<IFieldNames>,
        default: {
            label: 'label',
            value: 'value',
            checked: 'checked'
        }
    },
    /**
     * 标签的大小
     * @values small,medium,large
     * */
    size: {
        type: String,
        default: 'medium'
    },
    /**
     * 标签的形状
     * @values circle,square
     * */
    shape: {
        type: String,
        default: 'square'
    },
    /** 是否禁用 */
    disabled: {
        type: Boolean,
        default: false
    },
    /** 选中状态下的颜色 */
    activeColor: String,
    /** 未选中的颜色 */
    inactiveColor: {
        type: String,
        default: '#c8c9cc'
    },
    /** 图标的大小，单位px */
    iconSize: {
        type: [String, Number],
        default: '20'
    },
    /** 图标颜色 */
    iconColor: String,
    /**
     * 勾选图标的对齐方式
     * @values left,right
     * */
    iconPlacement: {
        type: String,
        default: 'left'
    },
    /** 竖向配列时，是否显示下划线 */
    borderBottom: {
        type: Boolean,
        default: false
    },
    /** label的字体大小，px单位 */
    labelSize: [String, Number],
    /** label的颜色 */
    labelColor: String,
    /** 是否禁止点击提示语选中复选框 */
    labelDisabled: {
        type: Boolean,
        default: false
    },
    /**
     * 排列方式
     * @values row,column
     * */
    placement: {
        type: String,
        default: 'row'
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>,
        default: () => {}
    }
}

export default radioProps
