import type { PropType } from 'vue'
import type { FormItemRule } from './typing'

const formProps = {
    /** 表单数据对象 */
    model: Object as PropType<AnyObject>,
    /** 表单校验规则 */
    rules: Object as PropType<FormItemRule>,
    /** 表单底部边框 */
    border: {
        type: Boolean,
        default: false
    },
    /** label标签的宽度，单位rpx */
    labelWidth: {
        type: String,
        default: 'auto'
    },
    /**
     * 标签位置
     * @values left,top
     * */
    labelPosition: {
        type: String,
        default: 'left'
    },
    /**
     * 标签位置
     * @values left,center,right
     * */
    labelAlign: {
        type: String,
        default: 'left'
    }
}

export default formProps
