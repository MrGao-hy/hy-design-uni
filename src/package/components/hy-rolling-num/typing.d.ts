/**
 * 滚动方向类型
 *
 * 用于控制滚动内容的移动方向。
 *
 * @values
 * up-向上滚动
 * down-向下滚动
 * alternate-上下交替滚动
 */
export type RollingScrollDirectionType = 'up' | 'down' | 'alternate'

/**
 * 滚动停止顺序类型
 *
 * 用于控制滚动内容停止时的排列方向。
 *
 * @values
 * ltr-从左到右（Left To Right）
 * rtl-从右到左（Right To Left）
 */
export type RollingStopOrderType = 'ltr' | 'rtl'

export interface HyRollingNum {}
