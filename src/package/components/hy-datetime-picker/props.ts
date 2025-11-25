import { DateModeEnum } from '../../libs'
import type { CSSProperties, PropType } from 'vue'
import type HyInputProps from '../hy-input/typing'

const datetimePickerProps = {
    /** 用于控制选择器的弹出和收起 */
    show: {
        type: Boolean,
        default: false
    },
    /**
     * 弹出层弹出方向
     * @values bottom,top
     * */
    popupMode: {
        type: String,
        default: 'bottom'
    },
    /** 是否显示顶部的操作栏 */
    showToolbar: {
        type: Boolean,
        default: true
    },
    /** 绑定值 */
    modelValue: {
        type: [String, Number, Date],
        default: ''
    },
    /** 顶部标题 */
    title: String,
    /**
     * 展示格式 mode=date为日期选择，mode=time为时间选择，mode=year-month为年月选择，mode=datetime为日期时间选择
     * @values date,time,year-month,datetime
     * */
    mode: {
        type: String,
        default: DateModeEnum.DATETIME
    },
    /** 可选的最大时间  默认值为后10年 */
    maxDate: {
        type: Number,
        default: new Date(new Date().getFullYear() + 10, 0, 1).getTime()
    },
    /** 可选的最小时间  默认值为前10年 */
    minDate: {
        type: Number,
        default: new Date(new Date().getFullYear() - 10, 0, 1).getTime()
    },
    /** 可选的最小小时，仅mode=time有效 */
    minHour: {
        type: Number,
        default: 0
    },
    /** 可选的最大小时，仅mode=time有效 */
    maxHour: {
        type: Number,
        default: 23
    },
    /** 可选的最小分钟，仅mode=time有效 */
    minMinute: {
        type: Number,
        default: 0
    },
    /** 可选的最大分钟，仅mode=time有效 */
    maxMinute: {
        type: Number,
        default: 59
    },
    /** 选项过滤函数 */
    filter: Function,
    /** 选项格式化函数 */
    formatter: Function,
    /** 是否显示加载中状态 */
    loading: {
        type: Boolean,
        default: false
    },
    /** 各列中，单个选项的高度 */
    itemHeight: {
        type: Number,
        default: 44
    },
    /** 取消按钮的文字 */
    cancelText: {
        type: String,
        default: '取消'
    },
    /** 确认按钮的文字 */
    confirmText: {
        type: String,
        default: '确认'
    },
    /** 取消按钮的颜色 */
    cancelColor: {
        type: String,
        default: '#909193'
    },
    /** 确认按钮的颜色 */
    confirmColor: {
        type: String,
        default: '#3c9cff'
    },
    /** 每列中可见选项的数量 */
    visibleItemCount: {
        type: Number,
        default: 5
    },
    /** 是否允许点击遮罩关闭选择器 */
    closeOnClickOverlay: {
        type: Boolean,
        default: false
    },
    /** 各列的默认索引 */
    defaultIndex: {
        type: Array,
        default: () => []
    },
    /** 输入框是否显示边框 */
    hasInput: {
        type: Boolean,
        default: false
    },
    /** 输入框集合属性 */
    input: {
        type: Object as PropType<HyInputProps>
    },
    /** 自定义时间格式 */
    format: String,
    /** 右边插槽 */
    toolbarRightSlot: {
        type: Boolean,
        default: false
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 自定义外部类名 */
    customClass: String
}

export default datetimePickerProps
