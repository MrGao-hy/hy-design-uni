import type { CSSProperties } from 'vue'
import type { CheckboxColumnsVo, IFieldNames } from '../hy-check-button/typing'

export default interface HyCheckboxProps {
    /**
     * @description 双向绑定值，数组类型
     * */
    modelValue: (string | number)[] | boolean
    /**
     * @description 接收数组值
     * */
    columns: CheckboxColumnsVo[]
    /**
     * @description 自定义接收columns的键
     * */
    fieldNames?: IFieldNames
    /**
     * @description 形状，square为方形，circle为圆型
     * */
    shape?: HyApp.ShapeType
    /**
     * @description 复选框大小
     * */
    size?: HyApp.SizeType | string | number
    /**
     * @description 是否禁用
     * */
    disabled?: boolean
    /**
     * @description 选中状态下的颜色
     * */
    activeColor?: string
    /**
     * @description 未选中的颜色
     * */
    inactiveColor?: string
    /**
     * @description 图标的大小，单位px
     * */
    iconSize?: string | number
    /**
     * @description 图标颜色
     * */
    iconColor?: string
    /**
     * @description label的字体大小，px单位
     * */
    labelSize?: string | number
    /**
     * @description label的颜色
     * */
    labelColor?: string
    /**
     * @description 勾选图标的对齐方式，left-左边，right-右边
     * */
    iconPlacement?: HyApp.LeftRightType
    /**
     * @description 竖向配列时，是否显示下划线
     * */
    borderBottom?: boolean
    /**
     * @description 是否禁止点击提示语选中复选框
     * */
    labelDisabled?: boolean
    /**
     * @description 定义需要用到的外部样式
     * */
    customStyle?: CSSProperties
    /**
     * @description 排列方式，row-横向，column-纵向
     * */
    placement?: HyApp.DirectionType
}

export interface ICheckBoxEmits {
    /** 选择触发 */
    (e: 'change', temp: CheckboxColumnsVo): void
    /** 更新值触发 */
    (e: 'update:modelValue', value: any): void
}
