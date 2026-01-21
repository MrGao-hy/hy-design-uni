import type { ExtractPropTypes } from 'vue'
import modalProps from '@/package/components/hy-modal/props'

export interface HyModalProps extends ExtractPropTypes<typeof modalProps> {}

export interface IModalEmits {
    /** 点击确认按钮时触发 */
    (e: 'confirm'): void
    /** 点击取消按钮时触发 */
    (e: 'cancel'): void
    /** 点击遮罩关闭时触发 */
    (e: 'close'): void
    /** 更新值触发 */
    (e: 'update:modelValue', show: boolean): void
    (e: 'update:loading', show: boolean): void
}
