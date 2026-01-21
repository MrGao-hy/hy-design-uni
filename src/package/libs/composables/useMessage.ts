import { ref, reactive, provide, inject, type Ref } from 'vue'
import type { HyModalProps } from '../../components/hy-modal/typing'

interface UseMessageOptions extends Partial<HyModalProps> {
    confirm?: () => void | Promise<void>
    cancel?: () => void
    close?: () => void
}

interface UseMessageReturn {
    alert: (options: UseMessageOptions | string) => Promise<boolean>
    confirm: (options: UseMessageOptions | string) => Promise<boolean>
}

interface IMessageConfig {
    showModal: Ref<boolean>
    loading: Ref<boolean>
    modalOptions: UseMessageOptions
    confirmHandler: () => void
    cancelHandler: () => void
    closeHandler: () => void
}

// 注入键
const UseMessageKey = 'hy-message'

export function useMessage(): UseMessageReturn {
    const showModal = ref(false)
    const loading = ref(false)
    const modalOptions = reactive<UseMessageOptions>({})
    let resolveFn: ((value: boolean) => void) | null = null

    const normalizeOptions = (options: UseMessageOptions | string): UseMessageOptions => {
        if (typeof options === 'string') {
            return {
                title: options
            }
        }
        return options
    }

    const confirmHandler = async () => {
        if (loading.value) return

        if (modalOptions.confirm) {
            const result = modalOptions.confirm()
            if (result instanceof Promise) {
                loading.value = true
                await result
                loading.value = false
            }
        }

        if (resolveFn) {
            resolveFn(true)
            resolveFn = null
        }
        showModal.value = false
    }

    const cancelHandler = () => {
        modalOptions.cancel?.()
        if (resolveFn) {
            resolveFn(false)
            resolveFn = null
        }
        showModal.value = false
    }

    const closeHandler = () => {
        modalOptions.close?.()
        if (resolveFn) {
            resolveFn(false)
            resolveFn = null
        }
        showModal.value = false
    }

    const createMessage = (options: UseMessageOptions): Promise<boolean> => {
        return new Promise((resolve) => {
            resolveFn = resolve

            // 重置选项
            Object.assign(modalOptions, {
                title: undefined,
                content: undefined,
                confirmText: undefined,
                cancelText: undefined,
                showConfirmButton: undefined,
                showCancelButton: undefined,
                confirmColor: undefined,
                cancelColor: undefined,
                buttonReverse: undefined,
                zoom: undefined,
                round: undefined,
                autoClose: undefined,
                loading: undefined,
                closeOnClickOverlay: undefined,
                negativeTop: undefined,
                width: undefined,
                confirmButtonShape: undefined,
                contentTextAlign: undefined,
                confirm: undefined,
                cancel: undefined,
                close: undefined
            })

            // 应用新选项
            Object.assign(modalOptions, options)

            loading.value = options.loading || false
            showModal.value = true
        })
    }

    // 提供状态给子组件
    provide(UseMessageKey, {
        showModal,
        loading,
        modalOptions,
        confirmHandler,
        cancelHandler,
        closeHandler
    })

    return {
        alert: (options) => {
            const normalized = normalizeOptions(options)
            return createMessage({
                showConfirmButton: true,
                showCancelButton: false,
                ...normalized
            })
        },
        confirm: (options) => {
            const normalized = normalizeOptions(options)
            return createMessage({
                showConfirmButton: true,
                showCancelButton: true,
                ...normalized
            })
        }
    }
}

// 注入函数，供 hy-modal 组件使用
export function useMessageInject() {
    return inject<IMessageConfig | null>(UseMessageKey, null)
}
