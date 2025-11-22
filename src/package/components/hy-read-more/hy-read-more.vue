<template>
    <view class="hy-read-more">
        <view
            class="hy-read-more__content"
            :style="{
                height:
                    isLongContent && status === 'close'
                        ? addUnit(showHeight)
                        : addUnit(contentHeight),
                textIndent: textIndent
            }"
        >
            <view
                class="hy-read-more__content__inner"
                ref="hy-read-more__content__inner"
                :class="[elId]"
            >
                <slot></slot>
            </view>
        </view>
        <view
            :class="['hy-read-more__toggle', status !== 'open' && 'hy-read-more__toggle--mask']"
            :style="[innerShadowStyle]"
            v-if="isLongContent"
        >
            <slot v-if="$slots.toggle" name="toggle"></slot>
            <view v-else class="hy-read-more__toggle--content" @tap="toggleReadMore">
                <text
                    class="hy-read-more__toggle--content__text"
                    :style="{
                        color: color,
                        fontSize: addUnit(fontSize),
                        lineHeight: addUnit(fontSize)
                    }"
                >
                    {{ status === 'close' ? closeText : openText }}
                </text>
                <view class="hy-read-more__toggle--icon">
                    <hy-icon
                        :color="color"
                        :size="fontSize + 2"
                        :name="status === 'close' ? IconConfig.DOWN : IconConfig.UP"
                    ></hy-icon>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-read-more',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, ref, onMounted, getCurrentInstance } from 'vue'
import type { CSSProperties } from 'vue'
import type { IReadMoreEmits } from './typing'
import { getRect, guid, sleep, addUnit, IconConfig } from '../../libs'
import readMoreProps from './props'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 该组件一般用于内容较长，预先收起一部分，点击展开全部内容的场景。
 * @displayName hy-read-more
 */
defineOptions({})

const props = defineProps(readMoreProps)
const emit = defineEmits<IReadMoreEmits>()

const isLongContent = ref<boolean>(false) // 是否需要隐藏一部分内容
const status = ref<'close' | 'open'>('close') // 当前隐藏与显示的状态，close-收起状态，open-展开状态
const elId = ref<string>(guid()) // 生成唯一class
const contentHeight = ref<number>(100) // 内容高度

const innerShadowStyle = computed<CSSProperties>(() => {
    let style: CSSProperties = {}

    if (status.value !== 'open') {
        style = props.shadowStyle
    }
    return style
})

onMounted(() => {
    getContentHeight()
})

/**
 * @description 获取内容的高度
 * */
const getContentHeight = async () => {
    const instance = getCurrentInstance()
    // 延时一定时间再获取节点
    await sleep(30)
    getRect('.' + elId.value, false, instance).then((res: any) => {
        contentHeight.value = res.height || 0
        // 判断高度，如果真实内容高度大于占位高度，则显示收起与展开的控制按钮
        if (res.height && res.height > props.showHeight / 2) {
            isLongContent.value = true
            status.value = 'close'
        } else {
            isLongContent.value = false
            status.value = 'close'
        }
    })
}
/**
 * @description 展开或者收起
 * */
const toggleReadMore = () => {
    status.value = status.value === 'close' ? 'open' : 'close'
    // 如果toggle为false，隐藏"收起"部分的内容
    if (!props.toggle) isLongContent.value = false
    // 发出打开或者收齐的事件
    emit(status.value, props.name)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
