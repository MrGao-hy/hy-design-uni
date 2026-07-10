import type { ImageOnErrorEvent, ImageOnLoadEvent } from '@uni-helper/uni-types'

export interface IImageEmits {
    /** 点击触发 */
    click: []
    /** 图片加载错误触发 */
    error: [err: ImageOnErrorEvent]
    /** 图片加载中触发 */
    load: [event: ImageOnLoadEvent]
}
