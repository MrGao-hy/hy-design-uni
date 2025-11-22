<template>
    <view
        :class="['hy-submit-bar', border && 'hy-border__top', customClass]"
        :style="submitBarStyle"
    >
        <view class="hy-submit-bar__left">
            <slot v-if="$slots.left" name="left"></slot>
            <view
                v-else-if="menus.length"
                class="hy-submit-bar__left--item"
                v-for="(item, i) in menus"
                :key="i"
                @tap="clickMenuFn(item, i)"
            >
                <hy-icon
                    :name="item.icon"
                    :label="item.text"
                    :color="iconColor"
                    :label-color="iconLabelColor"
                    labelPos="bottom"
                    space="7"
                    :size="20"
                ></hy-icon>
                <hy-badge
                    :value="item?.badge?.value"
                    :absolute="true"
                    :offset="item?.badge?.offset || [-5, 20]"
                    :isDot="item?.badge?.isDot"
                    :type="item?.badge?.type"
                    :color="item?.badge?.color"
                    :shape="item?.badge?.shape"
                    :numberType="item?.badge?.numberType"
                    :inverted="item?.badge?.inverted"
                ></hy-badge>
            </view>
        </view>
        <view class="hy-submit-bar__right">
            <slot v-if="$slots.right" name="right"></slot>
            <template v-else>
                <view
                    class="hy-submit-bar__right--button"
                    v-if="showLeftBtn"
                    :style="leftBtnStyle"
                    @tap.stop="confirmClickFn(0)"
                >
                    <hy-loading
                        :show="leftLoading"
                        size="13"
                        mode="circle"
                        :custom-style="{ marginRight: '10rpx' }"
                    ></hy-loading>
                    {{ leftBtnText }}
                </view>
                <view
                    class="hy-submit-bar__right--button"
                    v-if="showRightBtn"
                    :style="rightBtnStyle"
                    @tap.stop="confirmClickFn(1)"
                >
                    <hy-loading
                        :show="rightLoading"
                        size="13"
                        mode="circle"
                        :custom-style="{ marginRight: '10rpx' }"
                    ></hy-loading>
                    {{ rightBtnText }}
                </view>
            </template>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-submit-bar',
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
import type { SubmitBarIconMenus, ISubmitBarEmits } from './typing'
import submitBarProps from './props'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'
import HyLoading from '../hy-loading/hy-loading.vue'
import HyBadge from '../hy-badge/hy-badge.vue'

/**
 * 该布局一般用于商品详情页底部引导用户快速购买商品的场景，开发者可以根据自己的需求修改布局结构和样式。
 * @displayName hy-submit-bar
 */
defineOptions({})

const props = defineProps(submitBarProps)
const emit = defineEmits<ISubmitBarEmits>()

/**
 * @description 整体样式
 * */
const submitBarStyle = computed(() => {
    const style: CSSProperties = {
        bottom: 0,
        left: 0,
        zIndex: props.zIndex
    }
    if (props.fixed) style.position = 'fixed'
    return Object.assign(style, props.customStyle)
})

/**
 * @description 左边按钮样式
 * */
const leftBtnStyle = computed(() => {
    const style: CSSProperties = {
        background: props.leftBtnColor,
        color: props.textColor
    }
    if (!props.showRightBtn) {
        style.flex = 1
        if (props.shape === 'circle') {
            style.borderRadius = '100px'
        } else {
            style.borderRadius = '2px'
        }
    } else {
        if (props.shape === 'circle') {
            style.borderRadius = '100px 0 0 100px'
        } else {
            style.borderRadius = '2px 0 0 2px'
        }
    }
    return style
})

/**
 * @description 右边按钮样式
 * */
const rightBtnStyle = computed(() => {
    const style: CSSProperties = {
        background: props.rightBtnColor,
        color: props.textColor
    }
    if (!props.showLeftBtn) {
        style.flex = 1
        if (props.shape === 'circle') {
            style.borderRadius = '100px'
        } else {
            style.borderRadius = '2px'
        }
    } else {
        if (props.shape === 'circle') {
            style.borderRadius = '0 100px 100px 0'
        } else {
            style.borderRadius = '0 2px 2px 0'
        }
    }
    return style
})

/**
 * @description 点击左边图标
 * */
const clickMenuFn = (temp: SubmitBarIconMenus, index: number) => {
    emit('menuClick', temp, index)
}

/**
 * @description 点击按钮
 * */
const confirmClickFn = (i: number) => {
    if (
        (!props.leftLoading && !props.rightLoading) ||
        (props.leftLoading && i !== 0) ||
        (props.rightLoading && i !== 1)
    ) {
        emit('click', i)
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
