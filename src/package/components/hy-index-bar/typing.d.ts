import type { ExtractPropTypes } from 'vue'
import type indexBarProps from './props'

export interface HyIndexBarProps extends ExtractPropTypes<typeof indexBarProps> {}

export interface IndexType {
    /**
     * 索引值
     */
    index: string
    /**
     * 索引对应的内容
     */
    title: string
    /**
     * 索引对应的列表数据
     */
    data?: any[]
}

export interface IIndexItem extends IndexType {}

export interface IIndexBarEmits {
    /**
     * 点击索引时触发的事件
     */
    (e: 'click', index: string, event: Event): void
    /**
     * 滚动到指定索引时触发的事件
     */
    (e: 'scroll', index: string): void
    /**
     * 改变索引值
     */
    (e: 'update:modelValue', index: string): void
}
