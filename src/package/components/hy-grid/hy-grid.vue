<template>
    <view class="hy-grid" ref="hy-grid" :style="gridStyle">
        <template v-for="(item, i) in list" :key="i">
            <view
                :class="getItemClass(i)"
                hover-class="hy-grid__item--hover-class"
                :hover-stay-time="200"
                @tap="childClick(item)"
                :style="itemStyle"
            >
                <slot v-if="$slots.default" :record="item"></slot>
                <hy-icon
                    v-else
                    :name="item[customKeys?.icon]"
                    label-pos="bottom"
                    :label="item[customKeys?.name]"
                    :space="item?.iconProps?.space || iconProps?.space || 8"
                    :color="item?.iconProps?.color || iconProps?.color"
                    :size="item?.iconProps?.size || iconProps?.size || size"
                    :bold="item?.iconProps?.bold || iconProps?.bold"
                    :customPrefix="item?.iconProps?.customPrefix"
                    :imgMode="item?.iconProps?.imgMode || iconProps?.imgMode"
                    :width="item?.iconProps?.width || iconProps?.width"
                    :height="item?.iconProps?.height || iconProps?.height"
                    :top="item?.iconProps?.top || iconProps?.top"
                    :stop="item?.iconProps?.stop || iconProps?.stop"
                    :round="item?.iconProps?.round || iconProps?.round || 6"
                    :customStyle="item?.iconProps?.customStyle || iconProps?.customStyle"
                ></hy-icon>
            </view>
        </template>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-grid',
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
import type { GridItemVo, IGridEmits } from './typing'
import { addUnit } from '../../libs'
import gridProps from './props'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 宫格组件一般用于同时展示多个同类项目的场景，可以给宫格的项目设置徽标组件(badge)，或者图标等，也可以扩展为左右滑动的轮播形式
 * @displayName hy-grid
 */
defineOptions({})

const props = defineProps(gridProps)
const emit = defineEmits<IGridEmits>()

/**
 * 宫格对齐方式
 * */
const gridStyle = computed<CSSProperties>(() => {
    let style: CSSProperties = {
        gap: addUnit(props.gap),
        gridTemplateColumns: `repeat(${props.col}, 1fr)`
    }
    switch (props.align) {
        case 'left':
            style.justifyContent = 'flex-start'
            break
        case 'center':
            style.justifyContent = 'center'
            break
        case 'right':
            style.justifyContent = 'flex-end'
            break
        default:
            style.justifyContent = 'flex-start'
    }
    return Object.assign(style, props.customStyle)
})

const itemStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {
        background: props.bgColor,
        height: addUnit(props.itemHeight),
        width: '100%'
    }
    return style
})

/**
 * 获取宫格项的类名
 * @param index 当前项的索引
 * @returns 类名数组
 */
const getItemClass = computed(() => {
    return (index: number): string[] => {
        const classes: string[] = ['hy-grid__item']
        if (props.border) {
            classes.push('hy-grid__item--border')
            // 判断是否为最后一列
            if (index % props.col === props.col - 1) {
                classes.push('hy-grid__item--border__last-col')
            }
            // 判断是否为最后一行
            if (index >= props.list.length - props.col) {
                classes.push('hy-grid__item--border__last-row')
            }
        }
        return classes
    }
})

/**
 * 点击事件
 * */
const childClick = (temp: string | GridItemVo) => {
    emit('click', temp)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
