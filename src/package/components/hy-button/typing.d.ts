import type { ExtractPropTypes } from 'vue'
import type buttonProps from './props'

export interface HyButtonProps extends ExtractPropTypes<typeof buttonProps> {}

export interface IButtonEmits {
    /**
     * 点击按钮事件
     * */
    click: [event: Event]
    /**
     * 仅限微信小程序，当使用开放能力时，发生错误的回调
     * */
    error: [event: Event]
    /**
     * 微信小程序获取手机号
     * */
    getphonenumber: [event: Event]
    /**
     * 微信小程序用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同uni.getUserInfo
     * */
    getuserinfo: [event: Event]
    /**
     * 仅限微信小程序，在打开授权设置页并关闭后回调
     * */
    opensetting: [event: Event]
    /**
     * 仅限微信小程序，打开 APP 成功的回调
     * */
    launchapp: [event: Event]
    /**
     * 仅限微信小程序，用户同意隐私协议事件回调，open-type="agreePrivacyAuthorization"时有效
     * */
    agreeprivacyauthorization: [event: Event]
    /**
     * 获取用户头像回调
     * */
    chooseavatar: [event: Event]
    /**
     * 客服消息回调
     * */
    contact: [event: Event]
}
