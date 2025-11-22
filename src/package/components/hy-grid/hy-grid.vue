<template>
    <view class="hy-grid" ref="hy-grid" :style="gridStyle">
        <template v-for="(item, i) in list" :key="i">
            <view
                class="hy-grid__item"
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
                    :space="item?.iconConfig?.space || iconConfig?.space || 8"
                    :color="item?.iconConfig?.color || iconConfig?.color"
                    :size="item?.iconConfig?.size || iconConfig?.size || 30"
                    :bold="item?.iconConfig?.bold || iconConfig?.bold"
                    :customPrefix="item?.iconConfig?.customPrefix"
                    :imgMode="item?.iconConfig?.imgMode || iconConfig?.imgMode"
                    :width="item?.iconConfig?.width || iconConfig?.width"
                    :height="item?.iconConfig?.height || iconConfig?.height"
                    :top="item?.iconConfig?.top || iconConfig?.top"
                    :stop="item?.iconConfig?.stop || iconConfig?.stop"
                    :round="item?.iconConfig?.round || iconConfig?.round || 6"
                    :customStyle="item?.iconConfig?.customStyle || iconConfig?.customStyle"
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
import type { IGridEmits } from './typing'
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
 * @description 宫格对齐方式
 * */
const gridStyle = computed<CSSProperties>(() => {
    let style: CSSProperties = {}
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
        width: '100%',
        border: props.border ? '0.5px solid #c8c7cc66' : ''
    }
    return style
})

/**
 * @description 点击事件
 * */
const childClick = (temp: string | Record<string, any>) => {
    emit('click', temp)
}
</script>

<style lang="scss" scoped>
.hy-grid {
    grid-gap: v-bind(gap);
    grid-template-columns: repeat(v-bind(col), 1fr);
}
@import './index.scss';
</style>
