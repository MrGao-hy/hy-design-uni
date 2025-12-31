<template>
    <view class="hy-index-bar" :class="indexBarClass" :style="indexBarStyle">
        <view class="hy-index-bar__index--list">
            <view
                v-for="(item, index) in indexList"
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
            <hy-transition :show="showToast && isTouching" :customStyle="toastStyle">
                <view class="hy-index-bar__toast">
                    <text class="hy-index-bar__toast--text">{{ modelValue }}</text>
                </view>
            </hy-transition>
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
import { computed, ref, onMounted, getCurrentInstance, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
import type { IIndexBarEmits, IIndexItem } from './typing'
import { addUnit, getRect, sleep } from '../../libs'
import indexBarProps from './props'
// 组件
import HyTransition from '../hy-transition/hy-transition.vue'

/**
 * 索引栏组件,用于快速定位列表内容的索引栏组件，支持点击和滑动两种交互方式
 * @displayName hy-index-bar
 */
defineOptions({})

const props = defineProps(indexBarProps)
const emit = defineEmits<IIndexBarEmits>()

// 获取当前组件实例
const instance = getCurrentInstance()

// 使用props中的activeIndex，同时保持内部状态用于点击事件
const isTouching = ref<boolean>(false)
const lastIndex = ref<string>('')
const toastStyle = ref<CSSProperties>({
    position: 'absolute',
    left: '-150rpx',
    zIndex: 10
})
// 缓存索引栏高度和索引项高度
const indexBarRect = ref<UniNamespace.NodeInfo>()
const itemHeight = ref<number>(0)

const indexBarClass = computed<string[]>(() => {
    return [`hy-index-bar--${props.position}`]
})

const indexBarStyle = computed<CSSProperties>(() => {
    return {
        width: addUnit(props.width),
        height: addUnit(props.height),
        ...props.customStyle
    }
})

const indexValue = computed(() => {
    return (item: IIndexItem) => {
        return typeof item === 'object' && item !== null ? item.index : item
    }
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
    return props.indexList.reduce((styles: Record<string, CSSProperties>, item: IIndexItem) => {
        const isActive = props.modelValue === indexValue.value(item)
        styles[indexValue.value(item)] = {
            ...commonStyle,
            color: isActive ? props.activeIndexColor : props.indexColor,
            backgroundColor: isActive ? props.activeIndexBgColor : props.indexBgColor
        }
        return styles
    }, {})
})

// 获取索引项样式的便捷方法
const getIndexItemStyle = (index: string) => {
    return indexItemStyles.value[index] || {}
}

const handleIndexClick = (index: string, event: any) => {
    emit('update:modelValue', index)
    emit('click', index, event)
}

const handleTouchStart = (event: any) => {
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
        Math.max(Math.floor(touchY / itemHeight.value), 0),
        props.indexList.length - 1
    )

    const clickedIndex = props.indexList[index]?.index || props.indexList[index]
    if (clickedIndex) {
        // 只有当索引发生变化时才更新activeIndex
        if (clickedIndex !== props.modelValue) {
            emit('update:modelValue', clickedIndex)
            emit('scroll', clickedIndex)
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

const handleTouchEnd = async () => {
    await sleep(1000)
    isTouching.value = false
}

/**
 * 获取列表元素属性值
 * */
const init = () => {
    nextTick(() => {
        getRect('.hy-index-bar__index--list', false, instance).then((rect) => {
            indexBarRect.value = rect
            itemHeight.value = rect.height! / props.indexList.length
        })
    })
}

onMounted(() => {
    init()
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
