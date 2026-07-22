/**
 * 空状态展示类型
 *
 * 用于 Empty 组件根据业务场景展示不同的空状态插画。
 *
 * card-暂无银行卡
 * content-页面暂无数据
 * search-搜索无结果
 * address-暂无地址
 * network-网络异常
 * order-暂无订单
 * coupon-暂无优惠券
 * history-暂无历史记录
 * message-暂无消息
 * comment-暂无评论
 * integral-暂无积分
 * notification-暂无通知
 * shop-暂无购物车
 * activity-暂无活动
 * loading-加载中
 */
export type EmptyModeType =
    | 'card'
    | 'content'
    | 'search'
    | 'address'
    | 'network'
    | 'order'
    | 'coupon'
    | 'history'
    | 'message'
    | 'comment'
    | 'integral'
    | 'notification'
    | 'shop'
    | 'activity'
    | 'loading'

export type IEmptyIcon = {
    [key: string]: {
        /**
         * 提示信息
         * */
        desc: string
        /**
         * 空状态图片地址
         * */
        icon: string
    }
}

export interface IEmptyEmits {
    /** 点击按钮触发 */
    click: []
}
