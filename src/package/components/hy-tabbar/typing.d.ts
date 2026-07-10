/** 导航栏列表项类型 */
export interface TabBarItem {
    /**
     * 标题
     * */
    name: string
    /**
     * icon 图标或者图片
     * */
    icon: string
    /**
     * 徽标值
     * */
    badge?: number
}

export interface ITabBarEmits {
    /** 更新选中索引 */
    'update:modelValue': [index: number]
    /** 变化事件 */
    change: [index: number]
}
