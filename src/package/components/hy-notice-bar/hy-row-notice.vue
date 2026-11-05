<template>
    <view class="hy-notice__content" ref="hy-notice__content">
        <view
            ref="hy-notice__content--text"
            class="hy-notice__content--text"
            :style="animationStyle"
        >
            <text v-for="(item, index) in innerText" :key="index" :style="textStyle">{{
                item
            }}</text>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-row-notice',
    options: {
        addGlobalClass: true,
        // 微信小程序中必须开启虚拟节点，否则组件宿主节点会破坏父级flex布局，
        // 导致长文本无法收缩裁剪、滚动动画错乱
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import {
    ref,
    watch,
    toRefs,
    computed,
    onMounted,
    nextTick,
    type CSSProperties,
    getCurrentInstance
} from 'vue'
import noticeBarProps from './props'
import { addUnit, getRect, sleep } from '../../libs'

const props = defineProps(noticeBarProps)
const { text, speed, fontSize, color } = toRefs(props)
const emit = defineEmits(['change'])

const instance = getCurrentInstance()
const animationDuration = ref<string>('10s') // 动画执行时间
const animationPlayState = ref<string>('paused') // 动画的开始和结束执行
// 初始值必须同步初始化，保证首帧渲染就有文字，否则测量出来的文字宽度不准确
const initValue = ref<string>(Array.isArray(text.value) ? text.value.join('') : text.value)

/**
 * @description 查询文字宽度
 * 微信小程序中组件首次渲染未完成时查询会失败，所以失败后需要进行重试
 * */
const queryTextWidth = async (): Promise<number | null> => {
    let retryCount = 3
    while (retryCount-- > 0) {
        try {
            const rect = await getRect('.hy-notice__content--text', false, instance)
            return rect.width || null
        } catch (err) {
            await sleep(50)
        }
    }
    return null
}

/**
 * @description 初始化动画
 * */
const init = async () => {
    // 等待DOM渲染完成后再进行测量
    await nextTick()
    const textWidth = await queryTextWidth()
    // 根据t=s/v(时间=路程/速度)，这里为何不需要加上#u-notice-box的宽度，因为样式中设置了padding-left: 100%
    // 恰巧计算出来的结果中已经包含了容器的宽度
    if (textWidth) {
        animationDuration.value = `${textWidth / speed.value}s`
    }
    // 这里必须这样开始动画，否则在APP上动画速度不会改变
    animationPlayState.value = 'paused'
    await sleep(10)
    animationPlayState.value = 'running'
}

// 挂载后再测量宽度，避免在组件渲染完成前测量失败导致动画不执行（微信小程序渲染是异步的）
onMounted(() => {
    init()
})

// 文案、速度、字号变化时需要重新计算动画时长
watch(
    () => [text.value, speed.value, fontSize.value],
    async () => {
        initValue.value = Array.isArray(text.value) ? text.value.join('') : text.value
        await init()
    }
)

/**
 * @description 文字内容的样式
 * */
const textStyle = computed<CSSProperties>(() => {
    let style: CSSProperties = {}
    style.whiteSpace = 'nowrap !important'
    style.color = color.value
    style.fontSize = addUnit(fontSize.value)
    return style
})

/**
 * @description 动画的样式
 * */
const animationStyle = computed<CSSProperties>(() => {
    let style: CSSProperties = {}
    style.animationDuration = animationDuration.value
    style.animationPlayState = animationPlayState.value
    return style
})

// 内部对用户传入的数据进一步分割，放到多个text标签循环，否则如果用户传入的字符串很长（100个字符以上）
// 放在一个text标签中进行滚动，在低端安卓机上，动画可能会出现抖动现象，需要分割到多个text中可解决此问题
const innerText = computed(() => {
    let result = [],
        // 每组text标签的字符长度
        len = 20
    const textArr = initValue.value.split('')
    for (let i = 0; i < textArr.length; i += len) {
        // 对拆分的后的text进行slice分割，得到的为数组再进行join拼接为字符串
        result.push(textArr.slice(i, i + len).join(''))
    }
    return result
})
</script>

<style lang="scss">
@use './index.scss';
</style>
