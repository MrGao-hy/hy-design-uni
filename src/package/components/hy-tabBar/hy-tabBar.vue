<template>
    <view class="hy-tabBar--placeholder"></view>
    <view class="hy-tabBar">
        <view class="hy-tabBar--box" :style="{ background: barBgColor }">
            <view class="hy-tabBar--container">
                <view
                    :class="[
                        'hy-tabBar--container__item',
                        'list',
                        current === i ? 'is-active' : ''
                    ]"
                    v-for="(item, i) in list"
                    :key="i"
                    @click="checkItem(i)"
                >
                    <view class="hy-tabBar--container__item--bar">
                        <view class="icon">
                            <hy-badge
                                :value="item?.badge"
                                absolute
                                :offset="[-13, 25]"
                                :max="badge?.max"
                                :is-dot="badge?.isDot"
                                :inverted="badge?.inverted"
                                :bg-color="badge?.bgColor"
                                :type="badge?.type"
                                :number-type="badge?.numberType"
                                :shape="badge?.shape"
                                :show-zero="badge?.showZero"
                                :show="!!item?.badge"
                            ></hy-badge>
                            <hy-icon :name="item.icon" :color="color" size="25"></hy-icon>
                        </view>
                        <text class="text" :style="[{ color: color }]">{{ item.name }}</text>
                        <text class="circle"></text>
                    </view>
                </view>
                <view
                    class="hy-tabBar--indicator"
                    :style="{
                        '--num': `translateX(calc(((100vw - 110rpx - ${list.length} * 70rpx) / ${list.length - 1} + 70rpx) * ${current}))`,
                        background: activeColor
                    }"
                ></view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-switch',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import defaultProps from './props'
import type { HyTabBarProps, ITabBarEmits } from './typing'

// 组件
import HyIcon from '../hy-icon/hy-icon.vue'
import HyBadge from '../hy-badge/hy-badge.vue'

/**
 * 一般用于导航轮播，广告展示等场景,可开箱即用
 * @displayName hy-swiper
 */
defineOptions({})

const props = defineProps(tabBarProps)
const emit = defineEmits<ITabBarEmits>()

const baseBackgroundColor = props.baseBgColor ? props.baseBgColor : 'var(--hy-background)'
const current = ref(0)
watch(
    () => props.modelValue,
    (newVal) => {
        current.value = newVal
    }
)

const checkItem = (index: number) => {
    if (current.value !== index) {
        current.value = index
        emit('change', index)
        emit('update:modelValue', index)
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
.hy-tabBar {
    background: v-bind(baseBackgroundColor);
    &--indicator {
        border: 12rpx solid v-bind(baseBackgroundColor);
        &::before {
            box-shadow: 1px -15rpx 0 v-bind(baseBackgroundColor);
        }
        &::after {
            box-shadow: -1px -15rpx 0 v-bind(baseBackgroundColor);
        }
    }
}
</style>
