import type { CSSProperties, PropType } from 'vue'

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
    rules: Object as PropType<any>,
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}

export default formItemProps
