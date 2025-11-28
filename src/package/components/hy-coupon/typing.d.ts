import type { CSSProperties } from 'vue'

export type CouponStatus = 'unused' | 'used' | 'expired' | 'redeemed'
/**
 * moneyOff：满减券，discount：折扣券，fixedAmount：无门槛券
 * */
export type CouponType = 'moneyOff' | 'discount' | 'fixedAmount'

export interface ICouponEmits {
    /** 点击优惠券 */
    (e: 'click'): void
    /** 点击使用优惠券 */
    (e: 'used'): void
}
