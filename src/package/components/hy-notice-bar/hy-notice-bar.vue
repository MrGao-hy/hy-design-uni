<template>
    <view
        class="hy-notice-bar"
        v-if="show"
        :style="[
            {
                backgroundColor: bgColor
            },
            customStyle
        ]"
    >
        <template v-if="direction === 'column' || (direction === 'row' && step)">
            <HyColumnNotice
                :color="color"
                :bgColor="bgColor"
                :text="text"
                :mode="mode"
                :step="step"
                :icon="icon"
                :disable-touch="disableTouch"
                :fontSize="fontSize"
                :duration="duration"
                :justifyContent="justifyContent"
                @close="close"
                @click="click"
            ></HyColumnNotice>
        </template>
        <template v-else>
            <HyRowNotice
                :color="color"
                :bgColor="bgColor"
                :text="text"
                :mode="mode"
                :fontSize="fontSize"
                :speed="speed"
                :url="url"
                :linkType="linkType"
                :icon="icon"
                @close="close"
                @click="click"
            ></HyRowNotice>
        </template>
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
// 组件
import HyRowNotice from './hy-row-notice.vue'
import HyColumnNotice from './hy-column-notice.vue'

/**
 * 该组件用于滚动通告场景，有多种模式可供选择
 * @displayName hy-notice-bar
 */
defineOptions({})

const show = ref(true)

const props = defineProps(noticeBarProps)
const emit = defineEmits<INoticeBarEmits>()

/**
 * @description 点击通告栏
 * */
const click = (index: number) => {
    emit('click', index)
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
