<template>
    <view class="hy-tabs">
        <view class="hy-tabs__wrapper">
            <slot name="left" />
            <view class="hy-tabs__wrapper--scroll-view__wrapper">
                <scroll-view
                    :scroll-x="scrollable"
                    :scroll-left="scrollLeft"
                    :scroll-with-animation="true"
                    class="hy-tabs__wrapper--scroll-view"
                    :show-scrollbar="false"
                    ref="hy-tabs__wrapper--scroll-view"
                >
                    <view class="hy-tabs__wrapper--nav" ref="hy-tabs__wrapper__nav">
                        <view
                            v-for="(item, index) in list"
                            :key="index"
                            @tap="clickHandler(item, index)"
                            @longpress="longPressHandler(item, index)"
                            :ref="`u-tabs__wrapper--nav__item-${index}`"
                            :style="[itemStyle, { flex: scrollable ? '' : 1 }]"
                            :class="[
                                'hy-tabs__wrapper--nav__item',
                                `hy-tabs__wrapper--nav__item-${index}`,
                                item.disabled && 'hy-tabs__wrapper--nav__item--disabled',
                                innerCurrent == index ? 'hy-tabs__wrapper--nav__item--active' : ''
                            ]"
                        >
                            <slot v-if="$slots.icon" name="icon" :record="item" :index="index" />
                            <template v-else>
                                <view
                                    class="hy-tabs__wrapper--nav__item--prefix-icon"
                                    v-if="item.icon"
                                >
                                    <HyIcon :name="item.icon" :customStyle="iconStyle"></HyIcon>
                                </view>
                            </template>
                            <slot
                                v-if="$slots.content"
                                name="content"
                                :record="item"
                                :index="index"
                            />
                            <text
                                v-else
                                :class="[
                                    'hy-tabs__wrapper--nav__item--text',
                                    item.disabled && 'hy-tabs__wrapper--nav__item--text__disabled'
                                ]"
                                :style="[textStyle(index)]"
                            >
                                {{ item[keyName] }}
                            </text>
                            <hy-badge
                                :show="
                                    !!(
                                        item?.badge &&
                                        (item?.badge?.show ||
                                            item?.badge?.isDot ||
                                            item?.badge?.value)
                                    )
                                "
                                :isDot="(item?.badge && item?.badge?.isDot) || propsBadge?.isDot"
                                :value="(item?.badge && item?.badge?.value) || propsBadge?.value"
                                :max="(item?.badge && item?.badge?.max) || propsBadge?.max"
                                :type="(item?.badge && item?.badge?.type) || propsBadge?.type"
                                :showZero="
                                    (item?.badge && item?.badge?.showZero) || propsBadge?.showZero
                                "
                                :bgColor="
                                    (item?.badge && item?.badge?.bgColor) || propsBadge?.bgColor
                                "
                                :color="(item?.badge && item?.badge?.color) || propsBadge?.color"
                                :shape="(item?.badge && item?.badge?.shape) || propsBadge?.shape"
                                :numberType="
                                    (item?.badge && item?.badge?.numberType) ||
                                    propsBadge?.numberType
                                "
                                :inverted="
                                    (item?.badge && item?.badge?.inverted) || propsBadge?.inverted
                                "
                                :customStyle="{
                                    marginLeft: '4px'
                                }"
                            ></hy-badge>
                        </view>
                        <!-- #ifndef APP-NVUE -->
                        <view
                            class="hy-tabs__wrapper--nav__line"
                            ref="hy-tabs__wrapper--nav__line"
                            :style="[
                                {
                                    width: addUnit(lineWidth),
                                    transform: `translate(${lineOffsetLeft}px)`,
                                    transitionDuration: `${firstTime ? 0 : duration}ms`,
                                    height: addUnit(lineHeight),
                                    background: lineColor,
                                    backgroundSize: lineBgSize
                                }
                            ]"
                        ></view>
                        <!-- #endif -->
                    </view>
                </scroll-view>
            </view>
            <slot name="right" />
        </view>

        <!-- 内容轮播图	-->
        <slot name="main">
            <swiper
                :current="innerCurrent"
                @animationfinish="animationFinish"
                :style="{ height: swiperHeight }"
            >
                <swiper-item class="swiper-item" v-for="(item, i) in list" :key="i">
                    <slot :record="item.content" />
                </swiper-item>
            </swiper>
        </slot>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-tabs',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted, getCurrentInstance } from 'vue'
import type { CSSProperties } from 'vue'
import type { ITabsEmits, TabsItemVo } from './typing'
import { addUnit, getPx, getRect, sleep } from '../../libs'
import tabsProps from './props'
// 组件
import HyBadge from '../hy-badge/hy-badge.vue'
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 该组件是一个tabs标签组件，在标签多的时候，可以配置为左右滑动，标签少的时候，可以禁止滑动。 该组件的一个特点是配置为滚动模式时，激活的tab会自动移动到组件的中间位置。
 * @displayName hy-tabs
 */
defineOptions({})

const props = defineProps(tabsProps)
const emit = defineEmits<ITabsEmits>()

const instance = getCurrentInstance()
const firstTime = ref<boolean>(true)
const scrollLeft = ref<number>(0)
const scrollViewWidth = ref<number>(0)
const lineOffsetLeft = ref<number>(0)
const tabsRect = ref<UniApp.NodeInfo>({
    left: 0
})
const innerCurrent = ref<number>(0)

watch(
    () => props.current,
    (newValue: number) => {
        // 内外部值不相等时，才尝试移动滑块
        if (newValue !== innerCurrent.value) {
            innerCurrent.value = newValue
            nextTick(() => {
                resize()
            })
        }
    },
    { immediate: true }
)
watch(
    () => props.list,
    () => resize()
)

const textStyle = computed(() => {
    return (index: number): CSSProperties => {
        const style: CSSProperties = {}
        // 取当期是否激活的样式
        const customStyle_1 = index == innerCurrent.value ? props.activeStyle : props.inactiveStyle
        // 如果当前菜单被禁用，则加上对应颜色，需要在此做处理，是因为nvue下，无法在style样式中通过!import覆盖标签的内联样式
        if (props.list[index]?.disabled) {
            style.color = '#c8c9cc'
        }
        return Object.assign(customStyle_1, style)
    }
})

onMounted(() => {
    resize()
})

/**
 * @description 设置线左边距离
 */
const setLineLeft = () => {
    const tabItem = props.list[innerCurrent.value]
    if (!tabItem) {
        return
    }
    // 获取滑块该移动的位置
    let lineOffsetLeft_1 = props.list
        .slice(0, innerCurrent.value)
        .reduce((total, curr) => total + curr.rect.width, 0)
    // 获取下划线的数值px表示法
    lineOffsetLeft.value = lineOffsetLeft_1 + (tabItem.rect.width - getPx(props.lineWidth)) / 2

    // 如果是第一次执行此方法，让滑块在初始化时，瞬间滑动到第一个tab item的中间
    // 这里需要一个定时器，因为在非nvue下，是直接通过style绑定过渡时间，需要等其过渡完成后，再设置为false(非第一次移动滑块)
    if (firstTime.value) {
        sleep().then(() => {
            firstTime.value = false
        })
    }
}
// 点击某一个标签
const clickHandler = (item: TabsItemVo, index: number) => {
    // 因为标签可能为disabled状态，所以click是一定会发出的，但是change事件是需要可用的状态才发出
    emit('click', {
        ...item,
        index
    })
    // 如果disabled状态，返回
    if (item.disabled) return
    innerCurrent.value = index
    resize()
    emit('update:current', index)
    emit('change', item, index)
}
// 长按事件
const longPressHandler = (item: TabsItemVo, index: number) => {
    emit('longPress', {
        ...item,
        index
    })
}
const setScrollLeft = () => {
    // 当前活动tab的布局信息，有tab菜单的width和left(为元素左边界到父元素左边界的距离)等信息
    if (innerCurrent.value < 0) {
        innerCurrent.value = 0
    }
    const tabRect = props.list[innerCurrent.value]
    // 累加得到当前item到左边的距离
    const offsetLeft = props.list.slice(0, innerCurrent.value).reduce((total: number, curr) => {
        return total + curr.rect.width
    }, 0)
    // 此处为屏幕宽度
    const windowWidth = uni.getWindowInfo().windowWidth
    // 将活动的tabs-item移动到屏幕正中间，实际上是对scroll-view的移动
    let scrollLeft_1 =
        offsetLeft -
        ((tabsRect.value.width || 0) - tabRect.rect.width) / 2 -
        (windowWidth - (tabsRect.value.right || 0)) / 2 +
        (tabsRect.value.left || 0) / 2
    // 这里做一个限制，限制scrollLeft的最大值为整个scroll-view宽度减去tabs组件的宽度
    scrollLeft_1 = Math.min(scrollLeft_1, scrollViewWidth.value - (tabsRect.value.width || 0))
    scrollLeft.value = Math.max(0, scrollLeft_1)
}
/**
 * @description 获取所有标签的尺寸
 * */
const resize = () => {
    // 如果不存在list，则不处理
    if (props.list.length === 0) {
        return
    }
    Promise.all([getTabsRect(), getAllItemRect()]).then(
        ([tabsRect_1, itemRect = []]: (UniApp.NodeInfo | any)[]) => {
            // 兼容在swiper组件中使用
            if (
                tabsRect_1.left &&
                tabsRect_1.width &&
                tabsRect_1.right &&
                tabsRect_1.left > tabsRect_1.width
            ) {
                tabsRect_1.right =
                    tabsRect_1.right -
                    Math.floor(tabsRect_1.left / tabsRect_1.width) * tabsRect_1.width
                tabsRect_1.left = tabsRect_1.left % tabsRect_1.width
            }
            // console.log(tabsRect)
            tabsRect.value = tabsRect_1
            scrollViewWidth.value = 0
            itemRect.map((item: UniApp.NodeInfo, index: number) => {
                // 计算scroll-view的宽度，这里
                scrollViewWidth.value += item.width || 0
                // 另外计算每一个item的中心点X轴坐标
                props.list[index].rect = item
            })
            // 获取了tabs的尺寸之后，设置滑块的位置
            setLineLeft()
            setScrollLeft()
        }
    )
}
/**
 * @description 获取导航菜单的尺寸
 * */
const getTabsRect = () => {
    return new Promise((resolve) => {
        getRect('.hy-tabs__wrapper--scroll-view', false, instance).then((size) => resolve(size))
    })
}
/**
 * @description 获取所有标签的尺寸
 * */
const getAllItemRect = () => {
    return new Promise((resolve) => {
        const promiseAllArr = props.list.map((item, index) =>
            getRect(`.hy-tabs__wrapper--nav__item-${index}`, false, instance)
        )
        Promise.all(promiseAllArr).then((sizes) => resolve(sizes))
    })
}

/**
 * 滑动页面改变当前值
 * */
const animationFinish = (e: any) => {
    // 轮播图选项值
    innerCurrent.value = e.detail.current
    resize()
    if (e.detail.source === 'touch') {
        emit('change', props.list[props.current], props.current)
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
