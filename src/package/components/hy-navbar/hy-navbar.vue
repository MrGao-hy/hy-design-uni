<template>
    <view :class="['hy-navbar', customClass]" :style="customStyle">
        <view
            class="hy-navbar__placeholder"
            v-if="fixed && placeholder"
            :style="{
                height: addUnit(getPx(height) + statusBarHeight)
            }"
        ></view>
        <view :class="[fixed && 'hy-navbar__fixed']">
            <hy-status-bar v-if="safeAreaInsetTop" :bgColor="bgColor"></hy-status-bar>
            <view
                :class="[border && 'hy-border__bottom', 'hy-navbar__content']"
                :style="{
                    height: addUnit(height),
                    backgroundColor: bgColor
                }"
            >
                <!-- 左边 -->
                <slot v-if="$slots.left" name="left"></slot>
                <view
                    v-else
                    class="hy-navbar__content__left"
                    hover-class="hy-navbar__content__left--hover"
                    hover-start-time="150"
                    @tap="leftClick"
                >
                    <hy-icon
                        v-if="leftIcon"
                        :name="leftIcon"
                        :size="leftIconSize"
                        :color="leftIconColor"
                    ></hy-icon>
                    <text
                        v-if="leftText"
                        :style="{
                            color: leftIconColor
                        }"
                        class="hy-navbar__content__left--text"
                    >
                        {{ leftText }}
                    </text>
                </view>
                <!-- 左边 -->

                <!-- 中间 -->
                <slot v-if="$slots.center" name="center"></slot>
                <view v-else class="hy-navbar__content__center">
                    <text
                        class="hy-navbar__content__center--title"
                        :style="[
                            {
                                width: addUnit(titleWidth),
                                color: titleColor
                            },
                            titleStyle
                        ]"
                    >
                        {{ title }}
                    </text>
                    <text
                        class="hy-navbar__content__center--sub"
                        :style="[
                            {
                                width: addUnit(titleWidth),
                                color: titleColor
                            },
                            titleStyle
                        ]"
                    >
                        {{ sub }}
                    </text>
                </view>
                <!-- 中间 -->

                <!-- 右边 -->
                <slot v-if="$slots.right" name="right"></slot>
                <view class="hy-navbar__content__right" v-else @tap="rightClick">
                    <hy-icon v-if="rightIcon" :name="rightIcon" size="20"></hy-icon>
                    <text v-if="rightText" class="hy-navbar__content__right--text">{{
                        rightText
                    }}</text>
                </view>
                <!-- 右边 -->
            </view>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-navbar',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import type { INavbarEmits } from './typing'
import { addUnit, getPx, getWindowInfo } from '../../libs'
import navbarProps from './props'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'
import HyStatusBar from '../hy-status-bar/hy-status-bar.vue'

/**
 * 一般用于在特殊情况下，需要自定义导航栏的时候用到，一般建议使用uni-app带的导航栏。
 * @displayName hy-navbar
 */
defineOptions({})

const props = defineProps(navbarProps)
const emit = defineEmits<INavbarEmits>()

// 获取状态栏高度
const { statusBarHeight } = getWindowInfo()

/**
 * @description 点击左侧区域
 * */
const leftClick = () => {
    // 如果配置了autoBack，自动返回上一页
    emit('leftClick')
    if (props.autoBack) {
        uni.navigateBack()
    }
}
/**
 * @description 点击右侧区域
 * */
const rightClick = () => {
    emit('rightClick')
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
