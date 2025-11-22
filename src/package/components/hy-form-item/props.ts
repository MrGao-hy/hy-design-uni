import type { PropType } from 'vue'

const formItemProps = {
    /**
     * 标签文本
     */
    label: String,
    /**
     * 表单字段名
     */
    prop: String,
    /**
     * 是否必填
     */
    required: {
        type: Boolean,
        default: false
    },
    /**
     * 验证规则
     */
    rules: Object as PropType<any>
}

export default formItemProps
