import type { DateModeEnum } from './enum'
import type { CheckboxColumnsVo } from '../../../components/hy-check-button/typing'
import type HyInputProps from '../../../components/hy-input/typing'
import type HyTextareaProps from '../../../components/hy-textarea/typing'
import type HySwitchProps from '../../../components/hy-switch/typing'
import type HyPickerProps from '../../../components/hy-picker/typing'
import type HyRadioProps from '../../../components/hy-radio/typing'
import type HyCheckButtonProps from '../../../components/hy-check-button/typing'

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
    PASSWORD = 'password',
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
    input?: Partial<HyInputProps>
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
    rules?: RulesVo | RulesVo[]
}

export interface RulesVo {
    /**
     * 是否必填
     * */
    required?: boolean
    /**
     * 校验不通过时的提示信息
     * */
    message?: string
    /**
     * 表单事件校验
     * */
    trigger?: ('blur' | 'change')[]
    /**
     * 最小值
     * */
    min?: number
    /**
     * 最大值
     * */
    max?: number
    /**
     * 基础正则校验
     * phone - 手机号校验
     * email - 邮箱校验
     * password - 复杂密码校验
     * */
    type?: 'phone' | 'email' | 'password'
    /**
     * 自定义校验规则
     * */
    validator?: (rule: any, value: string, callback?: Function) => boolean
}
