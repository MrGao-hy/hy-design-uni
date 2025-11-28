export interface IAvatarEmit {
    /** 点击头像触发 */
    (e: 'click', name: string, e: Event): void
}
