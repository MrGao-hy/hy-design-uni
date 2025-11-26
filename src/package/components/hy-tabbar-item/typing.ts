import type { TabBarGroupProps } from '../hy-tabbar-group/typing'

export interface ITabbarConfig extends TabBarGroupProps {
    /**
     * 子项状态变更触发父方法
     * */
    setChange: (option: string | number) => void
    /** 获取默认唯一值，递增 */
    getIndex: () => number
}

// ITabBarItemEmits 接口定义组件的自定义事件
export interface ITabBarItemEmits {
    // 点击事件
    (e: 'click', value: number): void
    // 激活事件
    (e: 'active', value: number): void
    // 变化事件
    (e: 'change', value: number): void
    // 更新激活状态事件
    (e: 'update:active', active: boolean): void
}
