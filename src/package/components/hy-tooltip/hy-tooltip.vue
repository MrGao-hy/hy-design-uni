<template>
    <view class="hy-tooltip">
        <hy-overlay
            :show="showTooltip && tooltipTop !== -10000 && overlay"
            :customStyle="{ backgroundColor: 'rgba(0, 0, 0, 0)' }"
            @click="closeHandler"
        ></hy-overlay>
        <!-- 文本内容区域 -->
        <view
            :class="`hy-tooltip__content ${customClass}`"
            id="target"
            @longpress.stop="longPressHandler"
            @tap.stop="clickHandler"
            :style="[
                {
                    color: color,
                    fontSize: addUnit(size),
                    fontWeight: bold ? 'bold' : '',
                    backgroundColor:
                        bgColor && showTooltip && tooltipTop !== -10000 ? bgColor : 'transparent'
                },
                customStyle
            ]"
        >
            <slot v-if="$slots.default"></slot>
            <text class="hy-tooltip__content--text" v-else>{{ text }}</text>
        </view>

        <!-- 用于获取弹窗宽高 -->
        <view class="hy-tooltip__popup hy-tooltip__hidden" id="pos">
            <view class="hy-tooltip__container custom-pop">
                <view class="hy-tooltip__container--list">
                    <view
                        v-if="showCopy"
                        class="hy-tooltip__container--list__btn"
                        hover-class="hy-tooltip__container--list__btn--hover"
                        @tap.stop="setClipboardData"
                    >
                        <text class="hy-tooltip__container--list__btn--text">复制</text>
                    </view>
                    <hy-line
                        direction="column"
                        color="#8d8e90"
                        v-if="showCopy && buttons.length > 0"
                        length="18"
                    ></hy-line>
                    <template v-for="(item, index) in buttons" :key="index">
                        <view
                            class="hy-tooltip__container--list__btn"
                            hover-class="hy-tooltip__container--list__btn--hover"
                        >
                            <text
                                class="hy-tooltip__container--list__btn--text"
                                @tap="btnClickHandler(index)"
                            >
                                {{ item }}
                            </text>
                        </view>
                        <hy-line
                            direction="column"
                            color="#8d8e90"
                            v-if="index < buttons.length - 1"
                            length="18"
                        ></hy-line>
                    </template>
                </view>
            </view>
        </view>

        <hy-transition
            mode="fade"
            :show="showTooltip"
            :duration="300"
            custom-class="hy-tooltip__popup"
            :custom-style="{
                ...popover.popStyle.value,
                zIndex: zIndex
            }"
        >
            <view class="hy-tooltip__container">
                <!-- 三角形 -->
                <view
                    :class="`hy-tooltip__arrow ${popover.arrowClass.value}`"
                    :style="popover.arrowStyle.value"
                ></view>
                <!-- 三角形 -->

                <view class="hy-tooltip__container--list">
                    <view
                        v-if="showCopy"
                        class="hy-tooltip__container--list__btn"
                        hover-class="hy-tooltip__container--list__btn--hover"
                        @tap="setClipboardData"
                    >
                        <text class="hy-tooltip__container--list__btn--text">复制</text>
                    </view>
                    <hy-line
                        direction="column"
                        color="#8d8e90"
                        v-if="showCopy && buttons.length > 0"
                        length="18"
                    ></hy-line>
                    <template v-for="(item, index) in buttons" :key="index">
                        <view
                            class="hy-tooltip__container--list__btn"
                            hover-class="hy-tooltip__container--list__btn--hover"
                        >
                            <text
                                class="hy-tooltip__container--list__btn--text"
                                @tap="btnClickHandler(index)"
                            >
                                {{ item }}
                            </text>
                        </view>
                        <hy-line
                            direction="column"
                            color="#8d8e90"
                            v-if="index < buttons.length - 1"
                            length="18"
                        ></hy-line>
                    </template>
                </view>
            </view>
        </hy-transition>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-tooltip',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { ref, onMounted, watch, inject, onBeforeUnmount, getCurrentInstance } from 'vue'
import type { ITooltipEmits } from './typing'
import {
    type Queue,
    queueKey,
    usePopover,
    closeOther,
    removeFromQueue,
    pushToQueue,
    addUnit
} from '../../libs'
import tooltipProps from './props'

// 组件
import HyTransition from '../hy-transition/hy-transition.vue'
import HyLine from '../hy-line/hy-line.vue'
import HyOverlay from '../hy-overlay/hy-overlay.vue'

/**
 * Tooltip组件主要用于长按操作，类似微信的长按气泡
 * @displayName hy-tooltip
 */
defineOptions({})

const props = defineProps(tooltipProps)
const emit = defineEmits<ITooltipEmits>()

const queue = inject<Queue | null>(queueKey, null)
const { proxy } = getCurrentInstance() as any
// 显示三角标
const visibleArrow = ref<boolean>(true)
const popover = usePopover(visibleArrow.value)
const showTooltip = ref<boolean>(false)
const tooltipTop = ref<number>(-10000)
const selector: string = 'tooltip'

watch(
    () => props.placement,
    () => {
        popover.init(props.placement, visibleArrow.value, selector)
    }
)

watch(
    () => showTooltip.value,
    (newValue) => {
        if (newValue) {
            popover.control(props.placement, 0)
            if (queue && queue.closeOther) {
                queue.closeOther(proxy)
            } else {
                closeOther(proxy)
            }
        }
    }
)

onMounted(() => {
    // getElRect();
    popover.init(props.placement, visibleArrow.value, selector)
})

function onBeforeMount(param: () => void) {}

onBeforeMount(() => {
    if (queue && queue.pushToQueue) {
        queue.pushToQueue(proxy)
    } else {
        pushToQueue(proxy)
    }
})

onBeforeUnmount(() => {
    if (queue && queue.removeFromQueue) {
        queue.removeFromQueue(proxy)
    } else {
        removeFromQueue(proxy)
    }
})

// 长按触发事件
const longPressHandler = () => {
    if (props.triggerMode === 'longpress') {
        tooltipTop.value = 0
        showTooltip.value = true
    }
}

// 点击触发事件
const clickHandler = () => {
    if (props.triggerMode === 'click') {
        tooltipTop.value = 0
        showTooltip.value = true
    }
}

// 点击关闭
const closeHandler = () => {
    showTooltip.value = false
}

// 点击操作栏按钮
const btnClickHandler = (index: number) => {
    showTooltip.value = false
    // 如果需要展示复制按钮，此处index需要加1，因为复制按钮在第一个位置
    emit('click', props.showCopy ? index + 1 : index)
}

// 复制文本到粘贴板
const setClipboardData = () => {
    // 关闭组件
    showTooltip.value = false
    emit('click', 0)
    uni.setClipboardData({
        // 优先使用copyText字段，如果没有，则默认使用text字段当做复制的内容
        data: props.copyText || props.text,
        success: () => {
            props.showToast &&
                uni.showToast({
                    title: '复制成功'
                })
        },
        fail: () => {
            props.showToast &&
                uni.showToast({
                    title: '复制失败'
                })
        },
        complete: () => {
            showTooltip.value = false
        }
    })
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
