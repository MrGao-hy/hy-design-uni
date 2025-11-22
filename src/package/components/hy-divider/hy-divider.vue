<template>
    <view :class="['hy-divider', customClass]" :style="dividerStyle">
        <hy-line
            :color="lineColor"
            :customStyle="leftLineStyle"
            :style="leftLineStyle"
            :hairline="hairline"
            :dashed="dashed"
        ></hy-line>
        <hy-loading :show="text === 'loading'" size="18" mode="spinner"></hy-loading>
        <text v-if="dot" class="hy-divider__dot">●</text>
        <text v-else-if="text" class="hy-divider__text" :style="textStyle">{{ content }}</text>
        <hy-line
            :color="lineColor"
            :customStyle="rightLineStyle"
            :style="rightLineStyle"
            :hairline="hairline"
            :dashed="dashed"
        ></hy-line>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-divider',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import { addUnit } from '../../libs'
import dividerProps from './props'
// 组件
import HyLine from '../hy-line/hy-line.vue'
import HyLoading from '../hy-loading/hy-loading.vue'

/**
 * 区隔内容的分割线，一般用于页面底部"没有更多"的提示
 * @displayName hy-divider
 */
defineOptions({})

const props = defineProps(dividerProps)

const isLoad = ['loadMore', 'loading', 'noMore'].includes(props.text)

/**
 * @description 分割线样式
 * */
const dividerStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}
    style.marginTop = addUnit(props.marginTop) || isLoad ? '20px' : addUnit(props.marginTop)
    style.marginBottom =
        addUnit(props.marginBottom) || isLoad ? '20px' : addUnit(props.marginBottom)
    return Object.assign(style, props.customStyle)
})
/**
 * @description 文本内容
 * */
const content = computed(() => {
    let text
    switch (props.text) {
        case 'loadMore':
            text = props.loadMoreText
            break
        case 'loading':
            text = props.loadingText
            break
        case 'noMore':
            text = props.noMoreText
            break
        default:
            text = props.text
            break
    }
    return text
})
/**
 * @description 文本内容样式
 * */
const textStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}
    style.fontSize = addUnit(props.textSize)
    style.color = props.textColor
    return style
})

/**
 * @description 左边线条的的样式
 * */
const leftLineStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {
        marginRight: '20rpx'
    }
    // 如果是在左边，设置左边的宽度为固定值
    if (isLoad) {
        style.width = '80px'
    } else if (props.textPosition === 'left') {
        style.width = '80rpx'
    } else {
        style.flex = 1
    }
    return style
})
/**
 * @description 右边线条的的样式
 * */
const rightLineStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {
        marginLeft: '20rpx'
    }
    // 如果是在右边，设置右边的宽度为固定值
    if (isLoad) {
        style.width = '80px'
    } else if (props.textPosition === 'right') {
        style.width = '80rpx'
    } else {
        style.flex = 1
    }
    return style
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
