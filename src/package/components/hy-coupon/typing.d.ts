import type { CSSProperties } from 'vue'

export type CouponStatus = 'unused' | 'used' | 'expired' | 'redeemed'
/**
 * moneyOff：满减券，discount：折扣券，fixedAmount：无门槛券
 * */
export type CouponType = 'moneyOff' | 'discount' | 'fixedAmount'

export interface HyCouponProps {
    /**
     * 优惠券金额
     * @type {string}
     */
    amount: string

    /**
     * 优惠券标题
     * @type {string}
     */
    title: string

    /**
     * 优惠券副标题
     * @type {string}
     * @default ''
     */
    subTitle?: string

    /**
     * 优惠券状态
     * @type {'normal' | 'disabled' | 'used' | 'expired'}
     * @default 'normal'
     */
    status?: CouponStatus

    /**
     * 最小消费金额限制
     * @type {number}
     * @default 0
     */
    minSpend?: number

    /**
     * 有效期
     * @type {string}
     * @default ''
     */
    validity?: string

    /**
     * 是否显示左边界装饰
     * @type {boolean}
     * @default true
     */
    showLeftBorder?: boolean

    /**
     * 是否显示右边界装饰
     * @type {boolean}
     * @default true
     */
    showRightBorder?: boolean

    /**
     * 自定义样式
     * @type {CSSProperties}
     * @default {}
     */
    customStyle?: CSSProperties

    /**
     * 自定义类名
     * @type {string}
     * @default ''
     */
    customClass?: string

    /**
     * 提示文本
     * @type {string}
     * @default ''
     */
    tooltip?: string

    /**
     * 是否显示操作按钮
     * @type {boolean}
     * @default false
     */
    showActionButton?: boolean

    /**
     * 自定义按钮文本
     * @type {string}
     * @default ''
     */
    customButtonText?: string

    /**
     * 是否为专属优惠券
     * @type {boolean}
     * @default false
     */
    isExclusive?: boolean

    /**
     * 每用户限领数量
     * @type {number}
     * @default 0
     */
    limitPerUser?: number

    /**
     * 使用日期（已使用状态时显示）
     * @type {string}
     * @default ''
     */
    usedDate?: string

    /**
     * 过期日期（已过期状态时显示）
     * @type {string}
     * @default ''
     */
    expireDate?: string

    /**
     * 禁用原因（已禁用状态时显示）
     * @type {string}
     * @default ''
     */
    disabledReason?: string

    /**
     * 点击时是否触发receive事件
     * @type {boolean}
     * @default true
     */
    triggerReceiveOnClick?: boolean
}

export interface ICouponEmits {
    /** 点击优惠券 */
    (e: 'click'): void
    /** 点击使用优惠券 */
    (e: 'used'): void
}
