<template>
    <view class="hy-tabbar" :style="tabBarStyle">
        <view v-if="placeholder" class="hy-tabbar--placeholder"></view>

        <view class="hy-tabbar--box" :style="{ background: bgColor }">
            <view class="hy-tabbar--container">
                <view
                    :class="[
                        'hy-tabbar--container__item',
                        'list',
                        current === i ? 'is-active' : ''
                    ]"
                    v-for="(item, i) in list"
                    :key="i"
                    ref="itemRef"
                    @click="checkItem(i)"
                >
                    <view class="hy-tabbar--container__item--bar">
                        <view class="icon">
                            <hy-badge
                                :value="item?.badge"
                                absolute
                                :offset="[-13, 25]"
                                :max="badgeProps?.max"
                                :is-dot="badgeProps?.isDot"
                                :inverted="badgeProps?.inverted"
                                :bg-color="badgeProps?.bgColor"
                                :type="badgeProps?.type"
                                :number-type="badgeProps?.numberType"
                                :shape="badgeProps?.shape"
                                :show-zero="badgeProps?.showZero"
                                :show="!!item?.badge"
                            ></hy-badge>
                            <!-- 图标插槽 -->
                            <slot v-if="$slots.icon" name="icon"></slot>
                            <hy-icon v-else :name="item.icon" :color="color" size="25"></hy-icon>
                        </view>
                        <text class="text" :style="[{ color: color }]">{{ item.name }}</text>
                        <text class="circle"></text>
                    </view>
                </view>
                <view
                    class="hy-tabbar--indicator"
                    :style="{
                        '--num': `translateX(${rectList[current]?.left}px)`,
                        background: activeColor
                    }"
                ></view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-tabbar',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import tabBarProps from './props'
import type { ITabBarEmits } from './typing'

// 组件
import HyIcon from '../hy-icon/hy-icon.vue'
import HyBadge from '../hy-badge/hy-badge.vue'
import { getRect } from '@/package'

/**
 * 底部导航栏，用于在不同页面之间进行切换。
 * @displayName hy-tabbar
 */
defineOptions({})

const props = defineProps(tabBarProps)
const emit = defineEmits<ITabBarEmits>()

const instance = getCurrentInstance()
const rectList = ref<UniNamespace.NodeInfo[]>([])
const baseBackgroundColor = props.baseBgColor ? props.baseBgColor : 'var(--hy-background)'
const current = ref<number>(props.modelValue)
watch(
    () => props.modelValue,
    (newVal) => {
        current.value = newVal
    }
)

onMounted(() => {
    nextTick(() => {
        getRect('.list', true, instance).then((res) => {
            console.log(res, current.value)
            rectList.value = res
        })
    })
})

// tabbar属性值
const tabBarStyle = computed(() => {
    const style = {
        position: props.fixed ? 'fixed' : '',
        zIndex: props.zIndex
    }

    return Object.assign(style, props.customStyle)
})

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
.hy-tabbar {
    background: v-bind(baseBackgroundColor);
    &--indicator {
        border: 5px solid v-bind(baseBackgroundColor);
        &::before {
            box-shadow: 1px -15rpx 0 v-bind(baseBackgroundColor);
        }
        &::after {
            box-shadow: -1px -15rpx 0 v-bind(baseBackgroundColor);
        }
    }
}
</style>
