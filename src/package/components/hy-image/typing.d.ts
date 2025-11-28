import type { ImageOnErrorEvent, ImageOnLoadEvent } from '@uni-helper/uni-types'

export interface IImageEmits {
    /** 点击触发 */
    (e: 'click'): void
    /** 图片加载错误触发 */
    (e: 'error', err: ImageOnErrorEvent): void
    /** 图片加载中触发 */
    (e: 'load', event: ImageOnLoadEvent): void
}
