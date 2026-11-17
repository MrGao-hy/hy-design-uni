<template>
    <view
        :id="`hy-index-anchor-${index}`"
        class="hy-index-anchor"
        :class="[isSticky && 'is-sticky', isActive && 'is-active', customClass]"
        :style="[anchorStyle, customStyle]"
    >
        <slot>{{ index }}</slot>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-index-anchor',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import {
    computed,
    onMounted,
    onUnmounted,
    ref,
    watch,
    getCurrentInstance,
    nextTick,
    inject
} from 'vue'
import type { CSSProperties } from 'vue'
import type { IIndexBarContext } from '../hy-index-bar/typing'
import { addUnit, getRect } from '../../libs'
import indexAnchorProps from './props'

/**
 * 索引锚点组件，需搭配hy-index-bar索引栏一起使用，用于标记每个分组的索引标题。
 * 放入hy-index-bar默认插槽后自动注册，激活索引与吸顶开关均跟随索引栏（sticky、active属性仅独立使用时生效）。
 * @displayName hy-index-anchor
 */
defineOptions({})

const props = defineProps(indexAnchorProps)

// 获取当前组件实例
const instance = getCurrentInstance()

// 注入索引栏上下文；未处于hy-index-bar插槽内时为独立使用模式
const indexBar = inject<IIndexBarContext>('hy-index-bar')

// 以组件实例uid作为注册标识
const uid = instance?.uid ?? -1

// 锚点距离视口顶部的位置，供索引栏做滚动联动计算
const top = ref<number>(0)

// 是否为当前激活锚点：配合索引栏时由其v-model驱动，独立使用时由active驱动
const isActive = computed<boolean>(() => {
    if (indexBar) {
        return indexBar.modelValue?.value === props.index
    }
    return props.active
})

// 是否处于吸顶状态：开启吸顶且为当前激活索引时生效
const isSticky = computed<boolean>(() => {
    const stickyEnabled = indexBar ? indexBar.sticky?.value !== false : props.sticky
    return stickyEnabled && isActive.value
})

const anchorStyle = computed<CSSProperties>(() => {
    if (!isSticky.value) return {}
    return {
        top: addUnit(props.offsetTop),
        zIndex: props.zIndex
    }
})

/**
 * 测量锚点节点位置并上报给索引栏
 * */
const init = () => {
    nextTick(() => {
        getRect(`#hy-index-anchor-${props.index}`, false, instance)
            .then((rect) => {
                top.value = Math.floor(rect.top || 0)
                indexBar?.reportTop(uid, top.value)
            })
            .catch(() => {
                // 节点未就绪时静默跳过，不影响标题渲染
            })
    })
}

onMounted(() => {
    // vue-tsc对数组类型required的props会误推导出undefined，此处收窄回真实类型
    indexBar?.register(uid, props.index as string | number)
    init()
})

onUnmounted(() => {
    indexBar?.unregister(uid)
})

// 索引值变化时同步注册表并重新测量
watch(
    () => props.index,
    (index) => {
        indexBar?.updateIndex(uid, index as string | number)
        init()
    }
)

defineExpose({
    top
})
</script>

<style lang="scss">
@use './index.scss';
</style>
