export interface IAvatarClickConfig {
    /** 组件标识符 */
    name: string
    /** 头像图片url */
    url?: string
}

export interface IAvatarEmits {
    /** 点击头像触发 */
    click: [config: IAvatarClickConfig, e: Event]
}
