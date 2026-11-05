<template>
    <swiper
        :disable-touch="disableTouch"
        :vertical="!step"
        :circular="true"
        :interval="duration"
        :autoplay="true"
        class="hy-notice__swiper"
        @change="noticeChange"
    >
        <swiper-item
            v-for="(item, index) in text"
            :key="index"
            class="hy-notice__swiper--item"
            :style="{ justifyContent: justifyContent }"
        >
            <text class="hy-notice__swiper--item__text" :style="[textStyle]">{{ item }}</text>
        </swiper-item>
    </swiper>
</template>

<script lang="ts">
export default {
    name: 'hy-column-notice',
    options: {
        addGlobalClass: true,
        // 微信小程序中开启虚拟节点，避免组件宿主节点破坏父级flex布局
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { type CSSProperties, toRefs, computed, watch } from 'vue'
import noticeBarProps from './props'
import { addUnit, error } from '../../libs'

const props = defineProps(noticeBarProps)
const { text, fontSize, color } = toRefs(props)
const emit = defineEmits(['change'])

watch(
    () => text.value,
    (newVal) => !Array.isArray(newVal) && error('传入值必须是数组'),
    { immediate: true }
)

/**
 * @description 文字内容的样式
 * */
const textStyle = computed<CSSProperties>(() => {
    let style: CSSProperties = {}
    style.color = color.value
    style.fontSize = addUnit(fontSize.value)
    return style
})

const noticeChange = (e: any) => {
    emit('change', e.detail.current)
}
</script>

<style lang="scss">
@use './index.scss';
</style>
