import type { ExtractPropTypes, Ref } from 'vue'
import type indexBarProps from './props'

export interface HyIndexBarProps extends ExtractPropTypes<typeof indexBarProps> {}

export interface IndexType {
    /**
     * 索引值
     */
    index: string | number
    /**
     * 索引对应的内容
     */
    title: string
    /**
     * 索引对应的列表数据
     */
    data?: any[]
}

export type IIndexItem = IndexType | string | number

export interface IIndexBarEmits {
    /**
     * 点击索引时触发的事件
     */
    click: [index: string | number, event: Event]
    /**
     * 滚动到指定索引时触发的事件
     */
    scroll: [index: string | number]
    /**
     * 改变索引值
     */
    'update:modelValue': [index: string | number]
}

/**
 * 插槽内 hy-index-anchor 的注册记录
 */
export interface IIndexAnchorRecord {
    /**
     * 锚点组件实例uid
     */
    uid: number
    /**
     * 锚点索引值
     */
    index: string | number
}

/**
 * 提供给 hy-index-anchor 注入的索引栏上下文
 */
export interface IIndexBarContext {
    /**
     * 当前激活的索引
     */
    modelValue?: Ref<string | number>
    /**
     * 锚点是否自动吸顶
     */
    sticky?: Ref<boolean>
    /**
     * 注册锚点
     */
    register: (uid: number, index: string | number) => void
    /**
     * 注销锚点
     */
    unregister: (uid: number) => void
    /**
     * 更新锚点索引值
     */
    updateIndex: (uid: number, index: string | number) => void
    /**
     * 上报锚点相对视口顶部的位置，供滚动联动计算
     */
    reportTop: (uid: number, top: number) => void
}
