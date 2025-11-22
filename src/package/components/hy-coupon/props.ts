import type { CSSProperties, PropType } from 'vue'
import type { HyButtonProps } from '../hy-button/typing'

const couponProps = {
    /** 优惠券标题 */
    title: {
        type: String,
        default: ''
    },
    /**
     * 优惠券类型：moneyOff：满减券，discount：折扣券，fixedAmount：无门槛券
     * @values moneyOff,discount,fixedAmount
     * */
    type: {
        type: String,
        default: ''
    },
    /** 金额底部优惠券类型文字描述 */
    typeText: {
        type: String,
        default: ''
    },
    /** 优惠券状态 */
    status: {
        type: String,
        default: ''
    },
    /** 优惠券禁用状态 */
    disabledStatus: {
        type: Array,
        default: () => ['']
    },
    /** 优惠券描述备注 */
    description: {
        type: String,
        default: ''
    },
    /** 优惠券金额 */
    amount: {
        type: [String, Number],
        default: ''
    },
    /** 优惠券单位，没有就用默认值 */
    unit: {
        type: String,
        default: ''
    },
    /** 优惠券开始时间 */
    startDate: {
        type: String,
        default: ''
    },
    /** 优惠券结束时间 */
    endDate: {
        type: String,
        default: ''
    },
    /** 时间格式 */
    format: {
        type: String,
        default: 'yyyy-MM-dd'
    },
    /** 日期描述，没有日期描述就用开始时间到结束时间 */
    dateDesc: {
        type: String,
        default: ''
    },
    /** 背景色 */
    bgColor: {
        type: String,
        default: ''
    },
    /** 是否显示阴影 */
    boxShadow: {
        type: Boolean,
        default: false
    },
    /**
     * 按钮类型
     * @values text,button,none
     * */
    btnMode: {
        type: String,
        default: 'button'
    },
    /** 按钮文字 */
    btnText: {
        type: String,
        default: '立即领取'
    },
    buttonProp: {
        type: Object as PropType<HyButtonProps>,
        default: () => ({})
    },
    /** 定义需要用到的外部样式 */
    customStyle: {
        type: Object as PropType<CSSProperties>
    },
    /** 自定义外部类名 */
    customClass: String
}

export default couponProps
