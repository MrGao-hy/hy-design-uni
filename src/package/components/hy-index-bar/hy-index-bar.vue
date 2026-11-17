<template>
    <view class="hy-index-bar" :class="customClass" :style="indexBarStyle">
        <scroll-view
            class="hy-index-bar__content"
            scroll-y
            :scroll-into-view="scrollIntoViewId"
            @scroll="handleScroll"
        >
            <slot></slot>
        </scroll-view>

        <view class="hy-index-bar__sidebar" :class="[`hy-index-bar__sidebar--${position}`]">
            <view class="hy-index-bar__index--list">
                <view
                    v-for="(item, index) in renderList"
                    :key="index"
                    class="hy-index-bar__index--list__item"
                    :class="{ 'is-active': modelValue === indexValue(item) }"
                    :style="getIndexItemStyle(indexValue(item))"
                    @click="handleIndexClick(indexValue(item), $event)"
                    @touchstart="handleTouchStart($event)"
                    @touchmove="handleTouchMove($event)"
                    @touchend="handleTouchEnd"
                >
                    {{ indexValue(item) }}
                </view>

                <!-- 索引字母提示 -->
                <view v-if="showToast && isTouching" :style="toastStyle">
                    <view class="hy-index-bar__toast">
                        <text class="hy-index-bar__toast--text">{{ modelValue }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-index-bar',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import {
    computed,
    reactive,
    ref,
    watch,
    onMounted,
    onBeforeUnmount,
    getCurrentInstance,
    nextTick,
    provide,
    toRefs
} from 'vue'
import type { CSSProperties } from 'vue'
import type {
    IIndexBarContext,
    IIndexBarEmits,
    IIndexAnchorRecord,
    IIndexItem
} from './typing'
import { addUnit, getRect, isObject } from '../../libs'
import indexBarProps from './props'

/**
 * 索引栏组件，用于快速定位列表内容，支持点击和滑动两种交互方式。
 * 内容通过默认插槽传入，索引分组标题需使用hy-index-anchor标记，
 * 组件内部接管滚动容器并在滚动时同步激活索引与锚点吸顶状态。
 * @displayName hy-index-bar
 */
defineOptions({})

const props = defineProps(indexBarProps)
const emit = defineEmits<IIndexBarEmits>()

// 获取当前组件实例
const instance = getCurrentInstance()

// 插槽内锚点注册表，按挂载顺序即文档顺序排列
const anchors = reactive<IIndexAnchorRecord[]>([])
// 锚点相对视口顶部的位置缓存（uid -> top），锚点挂载时上报一次
const anchorTops = new Map<number, number>()
// 滚动容器相对视口顶部的位置，用于把锚点视口坐标换算为容器内滚动偏移
let contentOffsetTop = 0

const isTouching = ref<boolean>(false)
const lastIndex = ref<string | number>('')
const toastStyle = ref<CSSProperties>({
    position: 'absolute',
    left: '-150rpx',
    zIndex: 10
})
// 缓存索引栏高度和索引项高度
const indexBarRect = ref<UniNamespace.NodeInfo>()
const itemHeight = ref<number>(0)
// scroll-into-view 锚点id，用于点击/滑动索引时定位到对应分组
const scrollIntoViewId = ref<string>('')
// 程序化滚动期间锁定scroll事件驱动的激活计算，避免索引抖动
let touchLock = false
let lockTimer: ReturnType<typeof setTimeout> | null = null

/**
 * 提供给hy-index-anchor注入的上下文
 * */
const indexBarContext: IIndexBarContext = {
    ...toRefs(props),
    register(uid: number, index: string | number) {
        if (!anchors.some((item) => item.uid === uid)) {
            anchors.push({ uid, index })
        }
    },
    unregister(uid: number) {
        const idx = anchors.findIndex((item) => item.uid === uid)
        if (idx > -1) {
            anchors.splice(idx, 1)
        }
        anchorTops.delete(uid)
    },
    updateIndex(uid: number, index: string | number) {
        const anchor = anchors.find((item) => item.uid === uid)
        if (anchor) {
            anchor.index = index
        }
    },
    reportTop(uid: number, top: number) {
        anchorTops.set(uid, top)
    }
}

provide('hy-index-bar', indexBarContext)

// 锚点注册完成后，若外部未指定激活索引，默认激活第一个锚点
watch(
    () => anchors.length,
    (len) => {
        if (len > 0 && props.modelValue !== 0 && !props.modelValue) {
            emit('update:modelValue', anchors[0].index)
        }
    }
)

const indexBarStyle = computed<CSSProperties>(() => {
    return {
        height: addUnit(props.height),
        ...props.customStyle
    }
})

const indexValue = computed(() => {
    return (item: IIndexItem) => {
        return typeof item === 'object' && item !== null ? item.index : item
    }
})

// 实际渲染的索引列表：优先使用props，未传时自动收集插槽内锚点的索引值
const renderList = computed<IIndexItem[]>(() => {
    return props.indexList.length ? props.indexList : anchors.map((item) => item.index)
})

// 缓存索引项样式，避免重复计算
const indexItemStyles = computed(() => {
    // 计算通用样式部分
    const commonStyle = {
        width: addUnit(props.width),
        height: addUnit(props.width),
        fontSize: addUnit(props.indexSize)
    } as CSSProperties

    // 为每个索引项创建样式对象并缓存
    return renderList.value.reduce(
        (styles: Record<string, CSSProperties>, item: IIndexItem) => {
            const isActive = props.modelValue === indexValue.value(item)
            styles[indexValue.value(item)] = {
                ...commonStyle,
                color: isActive ? props.activeIndexColor : props.indexColor,
                backgroundColor: isActive ? props.activeIndexBgColor : props.indexBgColor
            }
            return styles
        },
        {}
    )
})

// 获取索引项样式的便捷方法
const getIndexItemStyle = (index: string | number) => {
    return indexItemStyles.value[index] || {}
}

// toast 隐藏定时器
let toastTimer: ReturnType<typeof setTimeout> | null = null

const resetToastTimer = () => {
    if (toastTimer) {
        clearTimeout(toastTimer)
        toastTimer = null
    }
}

const startToastTimer = () => {
    resetToastTimer()
    toastTimer = setTimeout(() => {
        isTouching.value = false
        toastTimer = null
    }, 1000)
}

/**
 * 滚动到指定索引锚点
 * */
const scrollToAnchor = async (index: string | number) => {
    const id = `hy-index-anchor-${index}`
    // scroll-into-view 重复设置相同值不会触发滚动，先重置再定位
    if (scrollIntoViewId.value === id) {
        scrollIntoViewId.value = ''
        await nextTick()
    }
    scrollIntoViewId.value = id
    lockScroll()
}

/**
 * 程序化滚动期间短暂锁定scroll驱动的激活计算
 * */
const lockScroll = () => {
    touchLock = true
    if (lockTimer) {
        clearTimeout(lockTimer)
    }
    lockTimer = setTimeout(() => {
        touchLock = false
    }, 200)
}

const handleIndexClick = (index: string | number, event: any) => {
    // H5 鼠标点击不会触发 touchstart，需要在这里管理 toast 显隐
    resetToastTimer()
    isTouching.value = true
    emit('update:modelValue', index)
    emit('click', index, event)
    scrollToAnchor(index)
    startToastTimer()
}

const handleTouchStart = (event: any) => {
    resetToastTimer()
    isTouching.value = true
    handleTouchMove(event)
}

// 触摸移动事件处理
const handleTouchMove = (event: any) => {
    // 获取触摸点坐标
    const touch = event.touches ? event.touches[0] : event
    const touchY = (touch.clientY || touch.y) - indexBarRect.value?.top!

    // 计算当前触摸的索引位置
    const index = Math.min(
        Math.max(Math.floor(touchY / (itemHeight.value || 1)), 0),
        renderList.value.length - 1
    )

    const clickedIndex = isObject(renderList.value[index])
        ? renderList.value[index].index
        : renderList.value[index]
    if (clickedIndex) {
        // 只有当索引发生变化时才更新activeIndex
        if (clickedIndex !== props.modelValue) {
            emit('update:modelValue', clickedIndex)
            emit('scroll', clickedIndex)
            scrollToAnchor(clickedIndex)
        }

        // 只有当索引发生变化时才更新toast
        if (clickedIndex !== lastIndex.value) {
            lastIndex.value = clickedIndex

            // 计算Toast的位置 - 使其与当前索引项对齐
            let toastTop =
                indexBarRect.value?.top! + index * itemHeight.value - 25 + itemHeight.value / 2
            // #ifdef H5
            toastTop = toastTop + 44 // h5需要加上导航栏高度
            // #endif
            toastStyle.value.top = addUnit(toastTop)
        }
    }
}

const handleTouchEnd = () => {
    startToastTimer()
}

/**
 * 滚动事件处理：根据滚动位置同步激活索引
 * */
const handleScroll = (e: any) => {
    if (touchLock) return
    const { scrollTop } = e.detail
    // 取最后一个顶部已滚过滚动位置的锚点，天然兼容顶部与底部边界
    let activeIndex: string | number = ''
    anchors.forEach((anchor) => {
        const top = anchorTops.get(anchor.uid)
        if (top === undefined) return
        if (top - contentOffsetTop <= Math.floor(scrollTop) + 1) {
            activeIndex = anchor.index
        }
    })
    if (activeIndex !== '' && activeIndex !== props.modelValue) {
        emit('update:modelValue', activeIndex)
    }
}

/**
 * 获取列表元素属性值
 * */
const init = () => {
    nextTick(() => {
        getRect('.hy-index-bar__index--list', false, instance)
            .then((rect) => {
                indexBarRect.value = rect
                itemHeight.value = rect.height! / (renderList.value.length || 1)
            })
            .catch(() => {
                // 节点未就绪时静默跳过，触摸交互降级为点击
            })
        getRect('.hy-index-bar__content', false, instance)
            .then((rect) => {
                contentOffsetTop = rect.top || 0
            })
            .catch(() => {
                // 节点未就绪时静默跳过，滚动同步延迟到锚点上报后仍可用
            })
    })
}

onMounted(() => {
    init()
})

onBeforeUnmount(() => {
    resetToastTimer()
    if (lockTimer) {
        clearTimeout(lockTimer)
    }
})
</script>

<style lang="scss">
@use './index.scss';
</style>
