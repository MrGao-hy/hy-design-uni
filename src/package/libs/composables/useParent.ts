import {
    ref,
    shallowRef,
    inject,
    computed,
    onUnmounted,
    type InjectionKey,
    type Ref,
    getCurrentInstance,
    type ComponentPublicInstance,
    type ComponentInternalInstance,
    onMounted
} from 'vue'

type ParentProvide<T> = T & {
    link(child: ComponentInternalInstance): void
    unlink(child: ComponentInternalInstance): void
    children: ComponentPublicInstance[]
    internalChildren: ComponentInternalInstance[]
}

type UseParentResult<T> = {
    parent: Ref<ParentProvide<T> | null>
    index: Ref<number>
}

/**
 * 父子组件联动：子组件侧 hook
 *
 * 向父组件注册自身并计算在兄弟组件中的索引。
 * 配合 useChildren 使用，索引会随兄弟组件的挂载/卸载自动更新。
 *
 * @param key 注入标识
 * @returns parent: 父组件注入的上下文；index: 当前子组件在兄弟中的索引
 */
export function useParent<T>(key: InjectionKey<ParentProvide<T>>): UseParentResult<T> {
    const result: UseParentResult<T> = {
        parent: shallowRef<ParentProvide<T> | null>(null),
        index: ref<number>(-1)
    }
    // #ifdef MP-TOUTIAO
    onMounted(() => {
        // #endif
        result.parent.value = inject(key, null)

        if (result.parent.value) {
            const instance = getCurrentInstance()!
            const { link, unlink, internalChildren } = result.parent.value

            link(instance)
            onUnmounted(() => unlink(instance))

            result.index = computed(() => internalChildren.indexOf(instance))
        }
        // #ifdef MP-TOUTIAO
    })
    // #endif

    return result
}
