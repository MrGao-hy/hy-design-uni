import type { DateModeEnum } from './enum'
import type { CheckboxColumnsVo } from '../../../components/hy-check-button/typing'
import {
    HyInputProps,
    HyTextareaProps,
    HySwitchProps,
    HyPickerProps,
    HyRadioProps,
    HyCheckButtonProps,
    FormRule
} from '../../index'
import { HyInputInstance } from '@/package/components/hy-form-group/typing'

/**
 * 类型
 * */
export enum FormTypeEnum {
    /**
     * 上传文件
     * */
    UPLOAD = 'upload',
    /**
     * 普通输入框
     * */
    TEXT = 'text',
    /**
     * 数字输入框，整数
     * */
    NUMBER = 'number',
    /**
     * 数字输入框，带有小数点
     * */
    DIGIT = 'digit',
    /**
     * 密码输入框
     * */
    PASSWORD = 'safe-password',
    /**
     * 身份证id输入框
     * */
    ID_CARD = 'idcard',
    /**
     * 单选
     * */
    RADIO = 'radio',
    /**
     * 选择按钮（单选/多选）
     * */
    CHECK_BUTTON = 'checkButton',
    /**
     * 时间选择器
     * */
    DATE = 'date',
    /**
     * 选择器
     * */
    SELECT = 'select',
    /**
     * 地址选择器
     * */
    ADDRESS = 'address',
    /**
     * 开关
     * */
    SWITCH = 'switch',
    /**
     * 详情
     * */
    DETAIL = 'detail',
    /**
     * 文本域
     * */
    TEXTAREA = 'textarea',
    /**
     * 自定义
     * */
    CUSTOM = 'custom'
}

export interface FormColumnsType {
    /**
     * 标题
     * */
    label: string
    /**
     * 字段
     * */
    field: string
    /**
     * 必填
     * */
    required?: boolean
    /**
     * 右固定
     * */
    right?: boolean
    /**
     * 表单类型
     * */
    type: FormTypeEnum
    /**
     * 文件最大上传数据
     * */
    maxCount?: number
    /**
     * 是否禁用
     * */
    disabled?: boolean

    /**
     * type = select时候必填
     * */
    select?: string[][] | { text: string; id: string }[][]
    /**
     * type = radio时候必填
     * */
    actions?: CheckboxColumnsVo[]
    /**
     * 输入框属性api集合
     * */
    input?: Partial<HyInputInstance>
    /**
     * 文本域属性api集合
     * */
    textarea?: Partial<HyTextareaProps>
    /**
     * 开关属性api集合
     * */
    switchItem?: Partial<HySwitchProps>
    /**
     * 选择器属性api集合
     * */
    picker?: Partial<HyPickerProps>
    /**
     * 单选属性api集合
     * */
    radio?: Partial<HyRadioProps>
    /**
     * 选择按钮属性api集合
     * */
    checkButton?: Partial<HyCheckButtonProps>
    /**
     * 日期展示的格式
     * */
    mode?: DateModeEnum
    /**
     * 规则校验
     * */
    rules?: FormRule | FormRule[]
}
