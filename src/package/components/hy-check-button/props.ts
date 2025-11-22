import type { CheckboxColumnsVo, IFieldNames } from './typing'
import type { PropType } from 'vue'

const checkButtonProps = {
    /** 选中得值，selectTypeW为radio是字符串，为checkbox是数组 */
    modelValue: {
        type: [String, Number, Array<string | number>],
        required: true
    },
    /** 选择列表数据 */
    columns: {
        type: Array as PropType<Array<CheckboxColumnsVo>>,
        default: [],
        required: true
    },
    /** columns对应得键 */
    fieldNames: {
        type: Object as PropType<IFieldNames>,
        default: {
            label: 'label',
            value: 'value',
            checked: 'checked'
        }
    },
    /**
     * 选择单选框还是复选框
     * @values checkbox, radio
     * */
    selectType: {
        type: String,
        default: 'checkbox'
    },
    /** 禁用 */
    disabled: {
        type: Boolean,
        default: false
    },
    /** 每行几列，每列等宽 */
    col: {
        type: String,
        default: 'repeat(3, 1fr)'
    },
    /** 设置每行间距,需要加单位 */
    gap: {
        type: String,
        default: '10px'
    },
    /**
     * 标签类型
     * @values info,primary,success,warning,error
     * */
    type: {
        type: String,
        default: 'primary'
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
    }
}

export default checkButtonProps
