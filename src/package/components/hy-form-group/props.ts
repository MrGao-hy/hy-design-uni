import type { FormColumnsType } from '../../libs'
import type HyInputProps from '../hy-input/typing'
import type HyTextareaProps from '../hy-textarea/typing'
import type HySwitchProps from '../hy-switch/typing'
import type HyPickerProps from '../hy-picker/typing'
import type HyRadioProps from '../hy-radio/typing'
import type HyCheckButtonProps from '../hy-check-button/typing'
import type { PropType } from 'vue'

const formGroupProps = {
    /**
     * 表单域提示文字的位置
     * @values left, top
     * */
    labelPosition: {
        type: String,
        default: 'left'
    },
    /**
     * label宽度
     * */
    labelWidth: {
        type: [String, Number],
        default: 'auto'
    },
    /**
     * 是否右对齐
     * */
    right: {
        type: Boolean,
        default: false
    },
    /**
     * label字体的对齐方式
     * @values left,center,right
     * */
    labelAlign: {
        type: String,
        default: 'left'
    },
    /**
     * 显示底部下划线
     * */
    border: {
        type: Boolean,
        default: false
    },
    /**
     * 是否全部禁用
     * */
    disabled: {
        type: Boolean,
        default: false
    },
    /**
     * 输入框属性api集合
     * */
    input: {
        type: Object as PropType<Partial<HyInputProps>>
    },
    /**
     * 文本域属性api集合
     * */
    textarea: {
        type: Array as PropType<Partial<HyTextareaProps>>
    },
    /**
     * 选择器属性api集合
     * */
    picker: {
        type: Array as PropType<Partial<HyPickerProps>>
    },
    /**
     * 开关属性api集合
     * */
    switchItem: {
        type: Array as PropType<Partial<HySwitchProps>>
    },
    /**
     * 单选属性api集合
     * */
    radio: {
        type: Array as PropType<Partial<HyRadioProps>>
    },
    /**
     * 选择按钮属性api集合
     * */
    checkButton: {
        type: Array as PropType<Partial<HyCheckButtonProps>>
    },
    /**
     * 表单配置
     * */
    columns: {
        type: Array as PropType<FormColumnsType[]>
    },
    /**
     * 表单值
     * */
    formData: {
        type: Object as PropType<Record<string, any>>
    }
}

export default formGroupProps
