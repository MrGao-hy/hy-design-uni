import type { TabBarGroupProps } from '../hy-tabbar-group/typing'

export interface ITabbarConfig extends TabBarGroupProps {
    /**
     * 子项状态变更触发父方法
     * */
    setChange: (option: string | number) => void
    /** 获取默认唯一值，递增 */
    getIndex: () => number
}
