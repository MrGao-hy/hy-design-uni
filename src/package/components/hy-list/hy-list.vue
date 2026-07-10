<template>
    <scroll-view
        ref="hyVirtualContainer"
        @scroll="onScroll"
        @scrolltolower="scrollToLower"
        :lower-threshold="showDivider ? 100 : 50"
        :scroll-y="true"
        scroll-with-animation
        class="hy-virtual-container"
    >
        <view class="hy-virtual-container__list">
            <slot v-if="slotDefault" :record="line === 1 ? virtualData : waterfall"></slot>
            <template v-else>
                <view
                    v-if="line === 1"
                    class="hy-virtual-container__list--item"
                    v-for="(item, i) in virtualData"
                    :key="typeof item === 'string' ? i : item[keyField]"
                    :style="itemStyle"
                    @click="handleClick(item)"
                >
                    <slot style="height: 100%" name="content" :record="item"></slot>
                </view>

                <view
                    v-if="line === 2"
                    class="hy-virtual-container__list--left hy-virtual-container__list--box"
                >
                    <view
                        v-if="slots.left"
                        class="hy-virtual-container__list--box-item"
                        v-for="item in waterfall.left"
                        :key="item[keyField]"
                        :style="itemStyle"
                        @click="handleClick(item)"
                    >
                        <slot name="left" :record="item"></slot>
                    </view>
                    <slot v-else name="left-list" :record="waterfall.left"></slot>
                </view>
                <view
                    v-if="line === 2"
                    class="hy-virtual-container__list--right hy-virtual-container__list--box"
                >
                    <view
                        v-if="slots.right"
                        class="hy-virtual-container__list--box-item"
                        v-for="item in waterfall.right"
                        :key="item[keyField]"
                        :style="itemStyle"
                        @click="handleClick(item)"
                    >
                        <slot name="right" :record="item"></slot>
                    </view>
                    <slot v-else name="right-list" :record="waterfall.right"></slot>
                </view>
            </template>
            <!--加载更多样式-->
        </view>
        <slot v-if="$slots.footer" name="footer"></slot>
        <hy-divider :text="load" v-else-if="showDivider"></hy-divider>
    </scroll-view>
</template>

<script lang="ts">
export default {
    name: 'hy-list',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script lang="ts" setup>
import {
    computed,
    getCurrentInstance,
    nextTick,
    onMounted,
    onUnmounted,
    reactive,
    ref,
    useSlots,
    watch
} from 'vue'
import type { CSSProperties } from 'vue'
import { addUnit, getPx, getRect, throttle } from '../../libs'
import type { IListEmits } from './typing'
import listProps from './props'
// 组件
import HyDivider from '../hy-divider/hy-divider.vue'

/**
 * 实现只展示可视内容的dom，减少dom创建，优化滚动性能
 * @displayName hy-list
 */
defineOptions({})

const props = defineProps(listProps)
const emit = defineEmits<IListEmits>()

const slots = useSlots()
// 滚动容器引用
const hyVirtualContainer = ref<UniApp.NodeInfo | null>(null)
// 滚动条距离顶部距离
const scrollTop = ref(0)
// 可视区域的高度
const viewHeight = ref(0)
// 瀑布流数据
const waterfall: {
    left: AnyObject[]
    right: AnyObject[]
} = reactive({
    left: [],
    right: []
})
// 排列方式
const arrange = computed(() => (props.line === 1 ? 'column' : 'row'))
const listHeight = addUnit(props.containerHeight)
const instance = getCurrentInstance()
// 高度缓存映射表（支持动态高度）
const heightCache = reactive<Record<number, number>>({})
// 预估高度（用于首屏渲染）
const estimatedHeight = computed(() => getPx(props.itemHeight) + getPx(props.marginBottom))

/**
 * 节流函数（返回新函数版本）
 */
const throttleFn = <T extends (...args: any[]) => void>(fn: T, wait: number = 16): T => {
    let lastTime = 0
    return ((...args: any[]) => {
        const now = Date.now()
        if (now - lastTime >= wait) {
            lastTime = now
            fn(...args)
        }
    }) as T
}

onMounted(() => {
    nextTick(async () => {
        const res = await getRect('.hy-virtual-container', false, instance)
        viewHeight.value = (res as UniApp.NodeInfo).height || 0
    })
})

/**
 * 获取指定索引的实际高度（优先从缓存获取）
 */
const getItemHeight = (index: number): number => {
    return heightCache[index] || estimatedHeight.value
}

/**
 * 计算从0到指定索引对应的视觉累计高度
 * line=2 时，两个 item 占同一行，高度按行计算
 */
const getCumulativeHeight = (endIndex: number): number => {
    if (props.line <= 1) {
        let total = 0
        for (let i = 0; i < endIndex && i < props.list.length; i++) {
            total += getItemHeight(i)
        }
        return total
    }
    // 多列：每 line 个 item 为一行，取每行中的最大高度
    let total = 0
    for (let row = 0; row * props.line < endIndex && row * props.line < props.list.length; row++) {
        let maxRowHeight = 0
        for (let col = 0; col < props.line; col++) {
            const idx = row * props.line + col
            if (idx < endIndex && idx < props.list.length) {
                maxRowHeight = Math.max(maxRowHeight, getItemHeight(idx))
            }
        }
        total += maxRowHeight
    }
    return total
}

/**
 * 计算虚拟列表的总高度
 */
const totalHeight = computed(() => {
    return getCumulativeHeight(props.list.length)
})
const itemStyle = computed((): CSSProperties => {
    return {
        height: addUnit(props.itemHeight),
        padding: addUnit(props.padding),
        marginBottom: addUnit(props.marginBottom),
        borderRadius: addUnit(props.borderRadius),
        background: props.background,
        border: props.border ? '1px solid #dadbde' : ''
    }
})

/**
 * 虚拟列表真实展示数据：起始下标（支持动态高度）
 */
const start = computed(() => {
    if (props.list.length === 0) return 0

    let cumulativeHeight = 0
    let startIndex = 0

    // 向后查找第一个累计高度超过scrollTop的位置
    for (let i = 0; i < props.list.length; i++) {
        cumulativeHeight += getItemHeight(i)
        if (cumulativeHeight > scrollTop.value) {
            startIndex = i
            break
        }
    }

    // 向上多取几个作为缓冲，避免快速滚动时出现空白
    const buffer = props.line * 2
    return Math.max(0, startIndex - buffer)
})

/**
 * 虚拟列表真实展示数据：结束下标（支持动态高度）
 */
const over = computed(() => {
    if (props.list.length === 0) return 0

    const targetHeight = scrollTop.value + viewHeight.value + 100 // 额外缓冲高度
    let cumulativeHeight = 0

    // 从start开始查找第一个累计高度超过targetHeight的位置
    for (let i = start.value; i < props.list.length; i++) {
        cumulativeHeight += getItemHeight(i)
        if (cumulativeHeight > targetHeight) {
            // 多取几个作为缓冲
            return Math.min(props.list.length, i + props.line * 2)
        }
    }

    return props.list.length
})

/**
 * 计算虚拟列表的padding(保持列表高度完整且滚动条能正常滚动)
 */
const paddingAttr = computed(() => {
    const paddingTop = getCumulativeHeight(start.value)
    const paddingBottom = Math.max(0, totalHeight.value - getCumulativeHeight(over.value))
    return `${paddingTop}px 0 ${paddingBottom}px`
})

/**
 * 虚拟列表真实展示数据
 */
const virtualData = computed<(string | Record<string, any>)[]>(() => {
    return props.list.slice(start.value, over.value) as (string | Record<string, any>)[]
})

/**
 * 更新瀑布流数据
 */
const updateWaterfall = (data: (string | Record<string, any>)[]) => {
    // 使用splice替代length=0，性能更好
    waterfall.left.splice(0, waterfall.left.length)
    waterfall.right.splice(0, waterfall.right.length)

    if (props.line === 2 && data.length > 0 && typeof data[0] !== 'string') {
        // 优化：使用push批量添加
        const leftItems: AnyObject[] = []
        const rightItems: AnyObject[] = []

        for (let i = 0; i < data.length; i++) {
            if (i % 2 === 0) {
                leftItems.push(data[i] as AnyObject)
            } else {
                rightItems.push(data[i] as AnyObject)
            }
        }

        waterfall.left.push(...leftItems)
        waterfall.right.push(...rightItems)
    }
}

watch(
    () => virtualData.value,
    (newVal) => {
        updateWaterfall(newVal)
    },
    { immediate: true }
)

// 触底锁，防止连续触发
const isLowerLocked = ref(false)

/**
 * 监听滚动条距离顶部距离，实时更新（带节流）
 */
const onScroll = throttleFn((e: any) => {
    scrollTop.value = e.detail.scrollTop || 0
    // 滚动离开底部区域后解锁
    if (isLowerLocked.value) {
        const scrollHeight = e.detail.scrollHeight || 0
        if (scrollTop.value + viewHeight.value < scrollHeight - 10) {
            isLowerLocked.value = false
        }
    }
}, 16)

/**
 * 滚动底部函数
 * */
const scrollToLower = () => {
    if (isLowerLocked.value) return
    isLowerLocked.value = true
    emit('scrollToLower')
}

/**
 * 点击行触发函数
 * */
const handleClick = (temp: string | AnyObject) => {
    emit('click', temp)
}

/**
 * 获取默认插槽
 */
const slotDefault = useSlots().default

/**
 * 滚动到指定索引位置
 * @param index 目标索引
 * @param offset 偏移量（可选）
 */
const scrollToIndex = (index: number, offset: number = 0) => {
    if (index < 0 || index >= props.list.length) {
        console.warn(`hy-list: scrollToIndex index ${index} out of bounds`)
        return
    }

    const scrollPosition = getCumulativeHeight(index) + offset
    scrollTop.value = scrollPosition
}

/**
 * 滚动到顶部
 */
const scrollToTop = () => {
    scrollTop.value = 0
}

/**
 * 刷新高度缓存（当列表内容变化时调用）
 */
const refreshHeightCache = () => {
    // 清除缓存，下次渲染时重新计算
    Object.keys(heightCache).forEach((key) => {
        delete heightCache[parseInt(key)]
    })
}

// 暴露方法给父组件
defineExpose({
    scrollToIndex,
    scrollToTop,
    refreshHeightCache
})
</script>

<style lang="scss" scoped>
@import './index.scss';
.hy-virtual-container {
    height: v-bind(listHeight);
    &__list {
        padding: v-bind(paddingAttr);
        display: flex;
        flex-direction: v-bind(arrange);
    }
}
</style>
