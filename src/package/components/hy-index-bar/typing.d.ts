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
    click: [index: string, event: Event]
    /**
     * 滚动到指定索引时触发的事件
     */
    scroll: [index: string]
    /**
     * 改变索引值
     */
    'update:modelValue': [index: string]
}
