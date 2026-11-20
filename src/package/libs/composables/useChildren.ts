import {
    provide,
    reactive,
    getCurrentInstance,
    type VNode,
    type InjectionKey,
    type VNodeNormalizedChildren,
    type ComponentPublicInstance,
    type ComponentInternalInstance
} from 'vue'

/**
 * 判断是否为 VNode 节点
 * @param value 待判断的值
 */
function isVNode(value: unknown): value is VNode {
    // __v_isVNode 为 VNode 内部标识，未暴露在类型声明中，需断言访问
    return value ? (value as { __v_isVNode?: boolean }).__v_isVNode === true : false
}

/**
 * 扁平化 VNode 树（深入组件 subTree），用于获取子组件的真实渲染顺序
 * @param children VNode 节点
 * @returns 扁平化后的 VNode 数组
 */
export function flattenVNodes(children: VNode): VNode[] {
    const result: VNode[] = []

    const traverse = (children: VNode | VNodeNormalizedChildren) => {
        const vNode = Array.isArray(children) ? children : [children]
        vNode.forEach((child) => {
            if (Array.isArray(child)) {
                traverse(child)
            } else if (isVNode(child) && child.component?.subTree) {
                result.push(child)
                traverse(child.component.subTree)
            } else if (isVNode(child) && Array.isArray(child.children)) {
                traverse(child.children)
            } else if (isVNode(child)) {
                result.push(child)
            }
        })
    }

    traverse(children)

    return result
}

/**
 * 在扁平化 VNode 列表中查找指定 VNode 的索引（优先精确引用匹配，其次按 key + type 匹配）
 * @param vnodes VNode 数组
 * @param vnode 目标 VNode
 * @returns 索引值，未找到返回 -1
 */
const findVNodeIndex = (vnodes: VNode[], vnode: VNode) => {
    const index = vnodes.indexOf(vnode)
    if (index === -1) {
        return vnodes.findIndex((item) => vnode.key !== undefined && vnode.key !== null && item.type === vnode.type && item.key === vnode.key)
    }
    return index
}

/**
 * 按父组件模板中的书写顺序对子组件实例进行排序
 * @param parent 父组件内部实例
 * @param publicChildren 子组件公开实例列表
 * @param internalChildren 子组件内部实例列表
 */
export function sortChildren(
    parent: ComponentInternalInstance,
    publicChildren: ComponentPublicInstance[],
    internalChildren: ComponentInternalInstance[]
) {
    const vnodes = parent && parent.subTree && parent.subTree.children ? flattenVNodes(parent.subTree) : []
    internalChildren.sort((a, b) => findVNodeIndex(vnodes, a.vnode) - findVNodeIndex(vnodes, b.vnode))

    const orderedPublicChildren = internalChildren.map((item) => item.proxy!)

    publicChildren.sort((a, b) => {
        const getIndex = (comp: ComponentPublicInstance) => {
            const uid = comp.$.uid
            return orderedPublicChildren.findIndex((i) => i.$.uid === uid)
        }

        const indexA = getIndex(a)
        const indexB = getIndex(b)
        return indexA - indexB
    })
}

/**
 * 父子组件联动：父组件侧 hook
 *
 * 收集子组件实例并按模板顺序排序，同时向子组件 provide 上下文。
 * 配合 useParent 使用，适用于步骤条、索引栏等需要感知子组件顺序的场景。
 *
 * @param key 注入标识
 * @returns children: 子组件公开实例列表（响应式）；linkChildren: 提供上下文并建立关联
 */
export function useChildren<
    // eslint-disable-next-line
    Child extends ComponentPublicInstance = ComponentPublicInstance<{}, any>,
    ProvideValue = never
>(key: InjectionKey<ProvideValue>) {
    const publicChildren: Child[] = reactive([])
    const internalChildren: ComponentInternalInstance[] = reactive([])
    const parent = getCurrentInstance()!

    const linkChildren = (value?: ProvideValue) => {
        const link = (child: ComponentInternalInstance) => {
            if (child.proxy) {
                if (internalChildren.indexOf(child) === -1) {
                    // #ifdef MP-ALIPAY
                    // 支付宝小程序子组件挂载顺序与模板顺序相反，头部插入保证排序正确
                    internalChildren.unshift(child)
                    publicChildren.unshift(child.proxy as Child)
                    // #endif
                    // #ifndef MP-ALIPAY
                    internalChildren.push(child)
                    publicChildren.push(child.proxy as Child)
                    // #endif
                    sortChildren(parent, publicChildren, internalChildren)
                }
            }
        }

        const unlink = (child: ComponentInternalInstance) => {
            const index = internalChildren.indexOf(child)
            publicChildren.splice(index, 1)
            internalChildren.splice(index, 1)
        }

        provide(
            key,
            Object.assign(
                {
                    link,
                    unlink,
                    children: publicChildren,
                    internalChildren
                },
                value
            )
        )
    }

    return {
        children: publicChildren,
        linkChildren
    }
}
