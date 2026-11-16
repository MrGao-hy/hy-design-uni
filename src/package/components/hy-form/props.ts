import type { CSSProperties, PropType } from 'vue'
import type { FieldRuleMap } from './typing'
import { LabelPosition, RowCenterType } from '../../libs'

const formProps = {
    /** 表单数据对象 */
    model: Object as PropType<AnyObject>,
    /** 表单校验规则 */
    rules: Object as PropType<Partial<FieldRuleMap>>,
    /** 表单底部边框 */
    border: {
        type: Boolean,
        default: false
    },
    /** label标签的宽度，单位rpx */
    labelWidth: {
        type: [String, Number],
        default: 'auto'
    },
    /**
     * 标签位置
     * @values left,top
     * */
    labelPosition: {
        type: String as PropType<LabelPosition>,
        default: 'left'
    },
    /**
     * 标签位置
     * @values left,center,right
     * */
    labelAlign: {
        type: String as PropType<RowCenterType>,
        default: 'left'
    },
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}

export default formProps
