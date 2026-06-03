export interface IAvatarClickConfig {
    /** 组件标识符 */
    name: string
    /** 头像图片url */
    url?: string
}

export interface IAvatarEmit {
    /** 点击头像触发 */
    (e: 'click', config: IAvatarClickConfig, e: Event): void
}
