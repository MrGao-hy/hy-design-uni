<template>
    <view
        :class="['hy-swiper', customClass]"
        :style="{
            ...rootStyle,
            ...customStyle
        }"
    >
        <view class="hy-swiper__loading" v-if="loading">
            <hy-loading mode="circle"></hy-loading>
        </view>
        <swiper
            v-else
            class="hy-swiper__wrapper"
            :style="swiperStyle"
            @change="change"
            :circular="circular"
            :interval="interval"
            :duration="duration"
            :autoplay="autoplay"
            :current="currentIndex"
            :currentItemId="currentItemId"
            :previousMargin="margins.previous"
            :nextMargin="margins.next"
            :acceleration="acceleration"
            :displayMultipleItems="list.length > 0 ? displayMultipleItems : 0"
            :easingFunction="easingFunction"
        >
            <swiper-item
                class="hy-swiper__wrapper--item"
                v-for="(item, index) in list"
                :key="getItemKey(item, index)"
                :style="{
                    backgroundColor: bgColor
                }"
            >
                <!-- 注意：小程序端父级若用 v-if 动态控制插槽内容，$slots 仍恒为 true，会导致默认渲染分支失效 -->
                <slot v-if="$slots.default" :record="asRecord(item)" :index="index"> </slot>
                <view v-else class="hy-swiper__wrapper--item__wrapper" :style="[itemStyle(index)]">
                    <!-- 在nvue中，image图片的宽度默认为屏幕宽度，需要通过flex:1撑开，另外必须设置高度才能显示图片 -->
                    <image
                        class="hy-swiper__wrapper--item__wrapper--image"
                        v-if="getItemType(item) === 'image'"
                        :src="getSource(item)"
                        :mode="imgMode"
                        @tap="clickHandler(index)"
                        :style="mediaStyle"
                    ></image>
                    <video
                        class="hy-swiper__wrapper--item__wrapper--video"
                        v-if="getItemType(item) === 'video'"
                        :id="`video-${index}`"
                        :enable-progress-gesture="false"
                        :src="getSource(item)"
                        :poster="getPoster(item)"
                        :title="showTitle ? hasTitle(item) : ''"
                        :style="videoStyle"
                        controls
                        @tap="clickHandler(index)"
                    ></video>
                    <view
                        v-if="showTitle && hasTitle(item)"
                        class="hy-swiper__wrapper--item__wrapper--title"
                    >
                        <text class="hy-line-1">{{ hasTitle(item) }}</text>
                    </view>
                </view>
            </swiper-item>
        </swiper>
        <view class="hy-swiper__indicator" :style="[indicatorStyle]">
            <!-- 注意：同默认插槽，小程序端 v-if 包裹的指示器插槽仍会被识别为存在 -->
            <slot
                v-if="$slots.indicator"
                name="indicator"
                :current="currentIndex"
                :length="list.length"
            >
            </slot>
            <hy-swiper-indicator
                v-else-if="!loading && indicator && !showTitle"
                :indicatorActiveColor="indicatorActiveColor"
                :indicatorInactiveColor="indicatorInactiveColor"
                :length="list.length"
                :current="currentIndex"
                :indicatorMode="indicatorMode"
            ></hy-swiper-indicator>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-swiper',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, ref, watch, getCurrentInstance } from 'vue'
import type { CSSProperties } from 'vue'
import { addUnit, isVideo } from '../../libs'
import type { ISwiperEmits, ISwiperSlots, SwiperList, SwiperVo } from './typing'
import swiperProps from './props'
// 组件
import HyLoading from '../hy-loading/hy-loading.vue'
import HySwiperIndicator from './hy-swiper-indicator.vue'

/**
 * 一般用于导航轮播，广告展示等场景,可开箱即用
 * @displayName hy-swiper
 */
defineOptions({})

const props = defineProps(swiperProps)
const emit = defineEmits<ISwiperEmits>()
defineSlots<ISwiperSlots>()

const instance = getCurrentInstance()
const currentIndex = ref<number>(0)

watch(
    () => props.current,
    (newVal) => {
        currentIndex.value = newVal
    },
    // immediate 保证外部传入初始 current 时同步到内部状态，swiper 与指示器始终同源
    { immediate: true }
)

/**
 * 根节点样式：高度与圆角（customStyle 在模板中后展开，可覆盖默认值）
 * */
const rootStyle = computed<CSSProperties>(() => ({
    height: addUnit(props.height),
    borderRadius: addUnit(props.radius)
}))

/**
 * swiper 容器样式
 * */
const swiperStyle = computed<CSSProperties>(() => ({
    flex: '1',
    height: addUnit(props.height)
}))

/**
 * 图片媒体样式
 * */
const mediaStyle = computed<CSSProperties>(() => ({
    height: addUnit(props.height),
    borderRadius: addUnit(props.radius)
}))

/**
 * 视频样式
 * */
const videoStyle = computed<CSSProperties>(() => ({
    height: addUnit(props.height)
}))

/**
 * 前后边距（露出前后项的留白），转换为带单位值
 * */
const margins = computed(() => ({
    previous: addUnit(props.previousMargin),
    next: addUnit(props.nextMargin)
}))

/**
 * 列表项 key：优先取对象项 id/url 或字符串值，避免刷新时索引复用错乱
 * */
const getItemKey = (item: string | SwiperList, index: number): string | number => {
    if (typeof item === 'object') {
        if (item.id != null) return item.id
        if (item.url) return item.url
        return index
    }
    return item || index
}

const hasTitle = computed(() => {
    return (item: string | Record<string, any>) => {
        if (typeof item === 'object') {
            return item.title || ''
        } else {
            return ''
        }
    }
})

/**
 * 自定义插槽按对象项暴露数据，字符串项访问自定义字段时得到 undefined
 * */
const asRecord = (item: string | SwiperList): SwiperList => item as SwiperList

/**
 * 轮播图3D效果
 * */
const itemStyle = computed(() => {
    return (index: number): CSSProperties => {
        const style: CSSProperties = {}
        // #ifndef APP-NVUE || MP-TOUTIAO
        // 左右流出空间的写法不支持nvue和头条
        // 只有配置了此二值，才加上对应的圆角，以及缩放
        if (props.nextMargin && props.previousMargin) {
            style.borderRadius = addUnit(props.radius)
            if (index !== currentIndex.value) style.transform = 'scale(0.92)'
        }
        // #endif
        return style
    }
})

/**
 * 获取目标路径，可能数组中为字符串，对象的形式，额外可指定对象的目标属性名keyName
 * */
const getSource = (item: string | Record<string, any>): string => {
    if (typeof item === 'string') return item
    if (typeof item === 'object' && props.keyName) return item[props.keyName]
    return ''
}

/**
 * 轮播切换事件
 */
const change = (e: SwiperVo) => {
    // 当前的激活索引
    const { current } = e.detail
    pauseVideo(currentIndex.value)
    currentIndex.value = current
    emit('update:current', currentIndex.value)
    emit('change', e.detail)
}

/**
 * 切换轮播时，暂停视频播放
 * */
const pauseVideo = (index: number | string) => {
    const lastItem = getSource(props.list[Number(index)])
    if (isVideo(lastItem)) {
        // 当视频隐藏时，暂停播放
        // #ifdef MP-WEIXIN
        const video = uni.createVideoContext(`video-${index}`, instance)
        video.pause()
        // #endif
    }
}

/**
 * 当一个轮播item为视频时，获取它的视频海报
 * */
const getPoster = (item: string | SwiperList): string => {
    return typeof item === 'object' && item.poster ? item.poster : ''
}

/**
 * 点击某个item
 * */
const clickHandler = (index: number) => {
    emit('click', index)
}

/**
 * 判断链接是视频还是图片
 * */
const getItemType = computed(() => {
    return (item: string | Record<string, unknown>) => {
        if (typeof item === 'string') return isVideo(item) ? 'video' : 'image'
        if (typeof item === 'object' && props.keyName) {
            if (!item.type) return isVideo(item[props.keyName] as string) ? 'video' : 'image'
            if (item.type === 'image') return 'image'
            if (item.type === 'video') return 'video'
            return 'image'
        }
    }
})
</script>

<style lang="scss">
@use './index.scss';
</style>
