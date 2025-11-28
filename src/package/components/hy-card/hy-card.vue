<template>
    <view class="hy-card" @tap.stop="click" :class="cardClass" :style="cardStyle">
        <view
            v-if="showHead"
            class="hy-card__head"
            :style="[{ padding: paddingHead || padding }, headStyle]"
            :class="{
                'hy-border__bottom': headBorderBottom
            }"
            @tap="headClick"
        >
            <!-- @slot 头部插槽 -->
            <slot v-if="$slots.header" name="header" />
            <view v-else class="hy-card__head--flex">
                <view class="hy-card__head--left">
                    <hy-icon
                        v-if="thumb"
                        :name="thumb"
                        custom-class="hy-card__head--left__thumb"
                        :height="thumbWidth"
                        :width="thumbWidth"
                        :round="thumbCircle ? '50%' : '4px'"
                    ></hy-icon>
                    <view>
                        <view
                            v-if="title"
                            class="hy-card__head--left__title"
                            :style="{
                                fontSize: addUnit(titleSize),
                                color: titleColor
                            }"
                        >
                            {{ title }}
                        </view>
                        <text
                            v-if="subTitle"
                            class="hy-card__head--left__sub"
                            :style="{
                                fontSize: addUnit(subTitleSize),
                                color: subTitleColor
                            }"
                        >
                            {{ subTitle }}
                        </text>
                    </view>
                </view>
                <view class="hy-card__head--right" v-if="subTitle">
                    <text
                        class="hy-card__head--right__text"
                        :style="{
                            fontSize: addUnit(rightTextSize),
                            color: rightTextColor
                        }"
                    >
                        {{ rightText }}
                    </text>
                </view>
            </view>
        </view>
        <view
            @tap="bodyClick"
            class="hy-card__body"
            :style="[{ padding: paddingBody || padding }, bodyStyle]"
        >
            <!-- @slot 中间内容插槽 -->
            <slot name="body" />
        </view>
        <view
            v-if="showFoot"
            class="hy-card__foot"
            @tap="footClick"
            :style="[{ padding: $slots.footer ? paddingFoot || padding : 0 }, footStyle]"
            :class="{
                'hy-border__top': footBorderTop
            }"
        >
            <!-- @slot 底部插槽 -->
            <slot name="footer" />
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-card',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import type { ICardEmits } from './typing'
import { addUnit, getPx } from '../../libs'
import cardProps from './props'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 卡片组件一般用于多个列表条目，且风格统一的场景。
 * @displayName hy-card
 */
defineOptions({})

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps(cardProps)
const emit = defineEmits<ICardEmits>()

const cardClass = computed(() => {
    const hasBorder = getPx(props.borderRadius) > 0
    return [
        props.border && 'hy-border',
        props.full && 'hy-card__full',
        hasBorder && 'hy-card--border',
        props.customClass
    ].filter(Boolean)
})
const cardStyle = computed(() => {
    return Object.assign(
        {
            borderRadius: addUnit(props.borderRadius),
            margin: props.margin,
            boxShadow: props.boxShadow
                ? typeof props.boxShadow === 'boolean'
                    ? '0 0 10rpx 4rpx rgba(0, 0, 0, 0.16)'
                    : props.boxShadow
                : ''
        },
        props.customStyle
    )
})

const click = () => {
    emit('click', props.index)
}
/**
 * @description 点击头部
 * */
const headClick = () => {
    emit('head-click', props.index)
}
/**
 * @description 点击身体
 * */
const bodyClick = () => {
    emit('body-click', props.index)
}
/**
 * @description 点击尾部
 * */
const footClick = () => {
    emit('foot-click', props.index)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
