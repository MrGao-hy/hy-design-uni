export type EmptyModeType =
    | 'car'
    | 'page'
    | 'search'
    | 'address'
    | 'wifi'
    | 'order'
    | 'coupon'
    | 'favor'
    | 'permission'
    | 'history'
    | 'message'
    | 'image'
    | 'video'
    | 'comment'
    | 'integral'
    | 'subscribe'
    | 'earnings'
    | 'announcement'
    | 'signIn'

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
    (e: 'click'): void
}
