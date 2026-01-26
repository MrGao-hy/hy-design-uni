<template>
    <view :class="`hy-icon ${customClass} hy-icon--${labelPos}`" @tap="clickHandler">
        <image
            class="hy-icon__img"
            v-if="isImg"
            :src="name"
            :mode="imgMode"
            :style="[imgStyle, customStyle]"
        ></image>
        <text v-else :class="iconClass" :style="[iconStyle, customStyle]"></text>
        <!-- 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示 -->
        <text
            v-if="label"
            class="hy-icon__label"
            :style="{
                color: labelColor,
                fontSize: addUnit(labelSize),
                marginLeft: labelPos == 'right' ? addUnit(space) : 0,
                marginTop: labelPos == 'bottom' ? addUnit(space) : 0
            }"
        >
            {{ label }}
        </text>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-icon',
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
import { addUnit } from '../../libs'
import type { IIconEmits } from './typing'
import iconProps from './props'

/**
 * 基于字体的图标集，包含了大多数常见场景的图标，使用简单，开箱即用，无需自己再写每个图标的样式，直接简单配置即可。支持自定义图标。
 * @displayName hy-icon
 */
defineOptions({})

const props = defineProps(iconProps)
const emit = defineEmits<IIconEmits>()

const iconClass = computed(() => {
    let classes: string | string[] = [
        'hy-icon__icon',
        props.customPrefix,
        `${props.customPrefix}-${props.name}`
    ]
    if (props.isRotate) classes.push('hy-rotate')
    if (props.color)
        // 主题色，通过类配置
        classes.push('hy-icon__icon--' + props.color)
    // 阿里，头条，百度小程序通过数组绑定类名时，无法直接使用[a, b, c]的形式，否则无法识别
    // 故需将其拆成一个字符串的形式，通过空格隔开各个类名
    //#ifdef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU
    classes = classes.join(' ')
    //#endif
    return classes
})
const iconStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {
        fontSize: addUnit(props.size),
        lineHeight: addUnit(props.size),
        fontWeight: props.bold ? 'bold' : 'normal',
        // 某些特殊情况需要设置一个到顶部的距离，才能更好地垂直居中
        top: addUnit(props.top),
        borderRadius: addUnit(props.round),
        color: props.color
    }

    return style
})

/**
 * 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
 * */
const isImg = computed(() => {
    return props.name?.indexOf('/') !== -1
})
const imgStyle = computed((): CSSProperties => {
    let style: CSSProperties = {}
    // 如果设置width和height属性，则优先使用，否则使用size属性
    style.width = props.width ? addUnit(props.width) : addUnit(props.size)
    style.height = props.height ? addUnit(props.height) : addUnit(props.size)
    style.borderRadius = addUnit(props.round)
    return style
})

/**
 * 点击icon图标执行
 * */
const clickHandler = (e: Event) => {
    emit('click', props.index, e)
    // 是否阻止事件冒泡
    props.stop && e.stopPropagation()
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
