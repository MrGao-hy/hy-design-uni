<template>
    <view
        :class="`hy-notice-bar ${customClass}`"
        v-if="show"
        :style="[
            {
                backgroundColor: bgColor
            },
            customStyle
        ]"
    >
        <view class="hy-notice" @tap="clickHandler">
            <!-- 左侧图标 -->
            <slot name="icon">
                <view class="hy-notice__left-icon" v-if="icon">
                    <hy-icon
                        :name="icon?.name || icon"
                        :color="icon?.color || color"
                        :size="icon?.size || 19"
                    ></hy-icon>
                </view>
            </slot>
            
            <!-- 中间内容区域 -->
            <template v-if="direction === 'column' || (direction === 'row' && step)">
                <hy-column-notice
                    :color="color"
                    :text="text"
                    :fontSize="fontSize"
                    :duration="duration"
                    :justifyContent="justifyContent"
                    :disable-touch="disableTouch"
                    :step="step"
                    @change="noticeChange"
                ></hy-column-notice>
            </template>
            <template v-else>
                <hy-row-notice
                    :color="color"
                    :text="text"
                    :fontSize="fontSize"
                    :speed="speed"
                    @change="noticeChange"
                ></hy-row-notice>
            </template>
            
            <!-- 右侧图标 -->
            <view class="hy-notice__right-icon" v-if="['link', 'closable'].includes(mode)">
                <hy-icon
                    v-if="mode === 'link'"
                    :name="IconConfig.RIGHT"
                    :size="17"
                    :color="color"
                ></hy-icon>
                <hy-icon
                    v-if="mode === 'closable'"
                    @click.stop="close"
                    :name="IconConfig.CLOSE"
                    :size="16"
                    :color="color"
                ></hy-icon>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-notice-bar',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import type { INoticeBarEmits } from './typing'
import noticeBarProps from './props'
import { IconConfig } from '../../libs'
// 组件
import HyRowNotice from './hy-row-notice.vue'
import HyColumnNotice from './hy-column-notice.vue'
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 该组件用于滚动通告场景，有多种模式可供选择
 * @displayName hy-notice-bar
 */
defineOptions({})

const show = ref(true)
const currentIndex = ref(0)

const props = defineProps(noticeBarProps)
const emit = defineEmits<INoticeBarEmits>()

/**
 * @description 通告内容变化
 * */
const noticeChange = (index: number) => {
    currentIndex.value = index
}

/**
 * @description 点击通告栏
 * */
const clickHandler = () => {
    emit('click', currentIndex.value)
    if (props.url && props.linkType && props.mode === 'link') {
        ;(uni as any)[props.linkType]({ url: props.url })
    }
}

/**
 * @description 点击关闭按钮
 * */
const close = () => {
    show.value = false
    emit('close')
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
