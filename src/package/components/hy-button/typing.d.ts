export interface IButtonEmits {
    /**
     * 点击按钮事件
     * */
    (e: 'click', event: Event): void
    /**
     * 仅限微信小程序，当使用开放能力时，发生错误的回调
     * */
    (e: 'error', event: Event): void
    /**
     * 微信小程序获取手机号
     * */
    (e: 'getphonenumber', event: Event): void
    /**
     * 微信小程序用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同uni.getUserInfo
     * */
    (e: 'getuserinfo', event: Event): void
    /**
     * 仅限微信小程序，在打开授权设置页并关闭后回调
     * */
    (e: 'opensetting', event: Event): void
    /**
     * 仅限微信小程序，打开 APP 成功的回调
     * */
    (e: 'launchapp', event: Event): void
    /**
     * 仅限微信小程序，用户同意隐私协议事件回调，open-type="agreePrivacyAuthorization"时有效
     * */
    (e: 'agreeprivacyauthorization', event: Event): void
}
