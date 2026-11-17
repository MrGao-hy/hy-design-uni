import type { ExtractPropTypes } from 'vue'
import type indexAnchorProps from './props'

export interface HyIndexAnchorProps extends ExtractPropTypes<typeof indexAnchorProps> {}

export interface IIndexAnchorExpose {
    /**
     * 锚点距离视口顶部的偏移
     */
    top: number
}
