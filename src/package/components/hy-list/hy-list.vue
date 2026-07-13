<template>
    <scroll-view
        ref="scrollContainer"
        @scroll="onScroll"
        @scrolltolower="onNativeScrollToLower"
        :lower-threshold="lowerThreshold"
        :scroll-y="true"
        class="hy-virtual-container"
    >
        <view class="hy-virtual-container__phantom" :style="{ height: totalHeight + 'px' }">
            <view
                class="hy-virtual-container__list"
                :style="{ transform: 'translate3d(0,' + offsetTop + 'px,0)' }"
            >
                <!-- ====== 默认插槽：用户完全接管渲染 ====== -->
                <slot :record="line === 1 ? visibleData : waterfall"></slot>

                <!-- ====== 单列模式（无默认插槽时才走组件内置渲染） ====== -->
                <template v-if="!slotDefault && line === 1">
                    <view
                        v-for="item in visibleData"
                        :key="item[keyField]"
                        class="hy-virtual-container__list--item"
                        :style="getItemStyle(item)"
                        @click="handleClick(item)"
                    >
                        <slot name="content" :record="item"></slot>
                    </view>
                </template>

                <!-- ====== 双列瀑布流模式（无默认插槽时才走组件内置渲染） ====== -->
                <template v-else-if="!slotDefault && line === 2">
                    <view class="hy-virtual-container__list--left hy-virtual-container__list--box">
                        <slot v-if="!$slots.left" name="left-list" :record="waterfallLeft"></slot>
                        <view
                            v-else
                            v-for="item in waterfallLeft"
                            :key="item[keyField]"
                            class="hy-virtual-container__list--box-item"
                            :style="getItemStyle(item)"
                            @click="handleClick(item)"
                        >
                            <slot name="left" :record="item"></slot>
                        </view>
                    </view>
                    <view class="hy-virtual-container__list--right hy-virtual-container__list--box">
                        <slot
                            v-if="!$slots.right"
                            name="right-list"
                            :record="waterfallRight"
                        ></slot>
                        <view
                            v-else
                            v-for="item in waterfallRight"
                            :key="item[keyField]"
                            class="hy-virtual-container__list--box-item"
                            :style="getItemStyle(item)"
                            @click="handleClick(item)"
                        >
                            <slot name="right" :record="item"></slot>
                        </view>
                    </view>
                </template>
            </view>

            <view
                v-if="$slots.footer || showDivider"
                class="hy-virtual-container__footer"
                :style="{ top: totalHeight + 'px' }"
            >
                <slot v-if="$slots.footer" name="footer"></slot>
                <hy-divider v-else-if="showDivider" :text="load"></hy-divider>
            </view>
        </view>
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
import { computed, getCurrentInstance, nextTick, onMounted, ref, useSlots, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { addUnit, getPx, getRect } from '../../libs'
import type { IListEmits } from './typing'
import listProps from './props'
import HyDivider from '../hy-divider/hy-divider.vue'

const props = defineProps(listProps)
const emit = defineEmits<IListEmits>()
const slots = useSlots()

const slotDefault = computed(() => !!slots.default)

const realScrollTop = ref(0)
const scrollContainer = ref<UniApp.NodeInfo | null>(null)
const viewHeight = ref(0)
const lowerThreshold = 100
const heightCache = ref<Record<number, number>>({})

const listHeight = addUnit(props.containerHeight)
const arrange = computed(() => (props.line === 1 ? 'column' : 'row'))
const instance = getCurrentInstance()

const estimatedItemHeight = computed(() => getPx(props.itemHeight) + getPx(props.marginBottom))

const getCachedHeight = (index: number): number => {
    return heightCache.value[index] || estimatedItemHeight.value
}

const rowCount = computed(() => Math.ceil(props.list.length / props.line))

const getRowHeight = (row: number): number => {
    let maxH = 0
    for (let col = 0; col < props.line; col++) {
        const idx = row * props.line + col
        if (idx < props.list.length) {
            maxH = Math.max(maxH, getCachedHeight(idx))
        }
    }
    return maxH
}

const cumulativeToRow = (row: number): number => {
    let total = 0
    const maxRow = Math.min(row, rowCount.value)
    for (let r = 0; r < maxRow; r++) {
        total += getRowHeight(r)
    }
    return total
}

const totalHeight = computed(() => cumulativeToRow(rowCount.value))

const visibleStartRow = computed(() => {
    if (props.list.length === 0) return 0
    let cum = 0
    for (let r = 0; r < rowCount.value; r++) {
        cum += getRowHeight(r)
        if (cum > realScrollTop.value) {
            return Math.max(0, r - 2)
        }
    }
    return 0
})

const visibleEndRow = computed(() => {
    if (props.list.length === 0) return 0
    const effectiveViewHeight = viewHeight.value || uni.getSystemInfoSync().windowHeight
    const targetHeight = realScrollTop.value + effectiveViewHeight + 200
    let cum = cumulativeToRow(visibleStartRow.value)
    for (let r = visibleStartRow.value; r < rowCount.value; r++) {
        cum += getRowHeight(r)
        if (cum > targetHeight) {
            return Math.min(rowCount.value, r + 3)
        }
    }
    return rowCount.value
})

const offsetTop = computed(() => cumulativeToRow(visibleStartRow.value))

const startIndex = computed(() => visibleStartRow.value * props.line)
const endIndex = computed(() => Math.min(props.list.length, visibleEndRow.value * props.line))

const visibleData = computed(() => props.list.slice(startIndex.value, endIndex.value))

const waterfallLeft = computed(() => {
    const data = visibleData.value
    const left: AnyObject[] = []
    for (let i = 0; i < data.length; i++) {
        const originalIndex = startIndex.value + i
        if (originalIndex % 2 === 0) {
            left.push(data[i] as AnyObject)
        }
    }
    return left
})

const waterfallRight = computed(() => {
    const data = visibleData.value
    const right: AnyObject[] = []
    for (let i = 0; i < data.length; i++) {
        const originalIndex = startIndex.value + i
        if (originalIndex % 2 === 1) {
            right.push(data[i] as AnyObject)
        }
    }
    return right
})

const waterfall = computed(() => ({
    left: waterfallLeft.value,
    right: waterfallRight.value
}))

const getItemStyle = (): CSSProperties => {
    return {
        height: addUnit(props.itemHeight),
        padding: addUnit(props.padding),
        marginBottom: addUnit(props.marginBottom),
        borderRadius: addUnit(props.borderRadius),
        background: props.background,
        border: props.border ? '1px solid #dadbde' : ''
    }
}

let emittedListLen = -1

const tryEmit = () => {
    if (props.load === 'loading') return
    if (props.load === 'noMore') return
    if (emittedListLen === props.list.length) return
    emittedListLen = props.list.length
    emit('scrollToLower')
}

const onScroll = (e: any) => {
    realScrollTop.value = e.detail.scrollTop || 0
    const effViewH = viewHeight.value || uni.getSystemInfoSync().windowHeight
    const distToBottom = totalHeight.value - realScrollTop.value - effViewH
    if (distToBottom <= lowerThreshold) {
        tryEmit()
    }
}

const onNativeScrollToLower = () => {
    tryEmit()
}

const handleClick = (item: unknown) => {
    emit('click', item)
}

const getScroller = (): HTMLElement | null => {
    const root = (instance?.proxy as any)?.$el
    if (!root) return null
    return (
        root.querySelector?.('.uni-scroll-view[style*="overflow"]') ||
        root.querySelector?.('.uni-scroll-view') ||
        null
    )
}

const scrollToIndex = async (index: number, offset: number = 0) => {
    if (index < 0 || index >= props.list.length) return
    const row = Math.floor(index / props.line)
    const pos = cumulativeToRow(row) + offset
    await nextTick()
    const scroller = getScroller()
    if (scroller) scroller.scrollTop = pos
    realScrollTop.value = pos
}

const scrollToTop = async () => {
    await nextTick()
    const scroller = getScroller()
    if (scroller) scroller.scrollTop = 0
    realScrollTop.value = 0
}

const refreshHeightCache = () => {
    heightCache.value = {}
}

onMounted(() => {
    const measureHeight = async (retries = 3) => {
        for (let i = 0; i < retries; i++) {
            await nextTick()
            try {
                const res = await getRect('.hy-virtual-container', false, instance)
                if (res.height && res.height > 0) {
                    viewHeight.value = res.height
                    return
                }
            } catch (error) {
                console.warn('hy-list: getRect failed, retry', i)
            }
            await new Promise((r) => setTimeout(r, 100))
        }
        viewHeight.value = uni.getSystemInfoSync().windowHeight
    }
    measureHeight()
})

watch(
    () => props.list.length,
    (newLen, oldLen) => {
        if (newLen < oldLen) {
            emittedListLen = -1
            refreshHeightCache()
        }
    }
)

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
        flex-direction: v-bind(arrange);
    }
}
</style>

<!-- <style>
uni-scroll-view.hy-virtual-container .uni-scroll-view,
uni-scroll-view.hy-virtual-container .uni-scroll-view-content,
uni-scroll-view.hy-virtual-container {
    overflow-anchor: none;
}
</style> -->
