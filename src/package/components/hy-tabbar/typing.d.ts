export interface TabListVo {
    /**
     * @description 标题
     * */
    name: string
    /**
     * @description icon图标或者图片
     * */
    icon: string
    /**
     * @description 徽标值
     * */
    badge?: number
}

export interface ITabBarEmits {
    /** 更新选中索引 */
    (e: 'update:modelValue', index: number): void
    /** 变化事件 */
    (e: 'change', index: number): void
}
