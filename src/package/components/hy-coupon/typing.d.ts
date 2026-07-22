import type { CSSProperties } from 'vue'

export type CouponStatus = 'unused' | 'used' | 'expired' | 'redeemed'
/**
 * moneyOff：满减券，discount：折扣券，fixedAmount：无门槛券
 * */
export type CouponType = 'moneyOff' | 'discount' | 'fixedAmount'

/**
 * 按钮显示模式类型
 *
 * 用于控制组件按钮的显示方式。
 *
 * @values
 * text-文本按钮模式
 * button-普通按钮模式
 * none-不显示按钮
 */
export type CouponButtonModeType = 'text' | 'button' | 'none'

export interface ICouponEmits {
    /** 点击优惠券 */
    click: []
    /** 点击使用优惠券 */
    used: []
}
