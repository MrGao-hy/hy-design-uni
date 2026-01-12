<template>
    <view :class="[`hy-steps--${direction}`, 'hy-steps']">
        <template v-for="(item, i) in list" :key="i">
            <view ref="hy-steps-item" :class="[`hy-steps-item--${direction}`, 'hy-steps-item']">
                <!--	线条	-->
                <view
                    v-if="i + 1 < list.length"
                    :class="[
                        `hy-steps-item__line--${direction}`,
                        'hy-steps-item__line',
                        statusClass(i + 1, list[i + 1].error)
                    ]"
                    :style="lineStyle(item, i)"
                ></view>
                <!--	线条	-->

                <!-- 步骤状态 -->
                <view
                    :class="[
                        `hy-steps-item__wrapper--${direction}`,
                        dot ? `hy-steps-item__wrapper--dot` : statusClass(i, item.error),
                        'hy-steps-item__wrapper'
                    ]"
                    :style="itemStyleInner"
                >
                    <slot v-if="$slots.icon" name="icon" :error="item?.error" :index="i"></slot>
                    <template v-else>
                        <view
                            :class="[
                                'hy-steps-item__wrapper--dot__item',
                                `hy-steps-item__wrapper--dot__${statusClass(i, item.error)}`
                            ]"
                            v-if="dot"
                            :style="{
                                backgroundColor: statusColor(i, item?.error)
                            }"
                        ></view>
                        <view
                            class="hy-steps-item__wrapper__icon"
                            v-else-if="activeIcon || inactiveIcon"
                        >
                            <hy-icon
                                :name="i <= current ? activeIcon : inactiveIcon"
                                :size="iconSize"
                                :color="i <= current ? activeColor : inactiveColor"
                            ></hy-icon>
                        </view>
                        <view
                            v-else
                            :style="{
                                backgroundColor:
                                    statusClass(i, item.error) === 'process'
                                        ? activeColor
                                        : 'transparent',
                                borderColor: statusColor(i, item?.error)
                            }"
                            class="hy-steps-item__wrapper__circle"
                        >
                            <text
                                v-if="
                                    statusClass(i, item.error) === 'process' ||
                                    statusClass(i, item.error) === 'wait'
                                "
                                class="hy-steps-item__wrapper__circle__text"
                                :style="{
                                    color: textColor(i)
                                }"
                            >
                                {{ i + 1 }}
                            </text>
                            <hy-icon
                                v-else
                                :color="
                                    statusClass(i, item.error) === 'error' ? 'error' : activeColor
                                "
                                :size="iconSize"
                                :name="
                                    statusClass(i, item.error) === 'error'
                                        ? IconConfig.CLOSE
                                        : IconConfig.CHECK_MASK
                                "
                            ></hy-icon>
                        </view>
                    </template>
                </view>
                <!-- 步骤状态 -->

                <!-- 内容区域 -->
                <view
                    class="hy-steps-item__content"
                    :class="[`hy-steps-item__content--${direction}`]"
                    :style="[contentStyle]"
                >
                    <slot v-if="$slots.content" name="content" :record="item" :index="i"></slot>
                    <template v-else>
                        <slot
                            v-if="$slots.title"
                            name="title"
                            :title="item.title"
                            :index="i"
                        ></slot>
                        <text v-else :class="titleClass(i, item.error)">
                            {{ item.title }}
                        </text>
                        <slot v-if="$slots.docs" name="docs" :desc="item.docs" :index="i"></slot>
                        <text v-else :style="{ fontSize: '12px', color: '#999' }">{{
                            item.docs
                        }}</text>
                        <text class="hy-steps-item__content--date">{{ item.date }}</text>
                    </template>
                </view>
                <!-- 内容区域 -->
            </view>
        </template>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-steps',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, ref, onMounted, getCurrentInstance, watch } from 'vue'
import type { CSSProperties } from 'vue'
import type { IStepsEmits } from './typing'
import type { StepListVo } from './typing'
import { addUnit, getRect, ColorConfig, IconConfig } from '../../libs'
import stepsProps from './props'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 一般用于完成一个任务要分几个步骤，标识目前处于第几步的场景。
 * @displayName hy-steps
 */
defineOptions({})

const props = defineProps(stepsProps)
const emit = defineEmits<IStepsEmits>()

const itemRect = ref<UniApp.NodeInfo[]>([])
const stepsRects = ref<UniApp.NodeInfo[]>([])
const instance = getCurrentInstance()

watch(
    () => props.current,
    (newVal: number) => {
        if (props.list[newVal - 1]?.error) {
            const index = props.list.findIndex((item) => item.error)
            emit('update:current', index)
            emit('change', index)
        }
    }
)

// 字体标题类名
const titleClass = computed(() => {
    return (index: number, error: boolean) => {
        const classes = ['hy-steps-item__content__title']
        if (props.current === index) {
            classes.push('hy-steps-item__content__title--active')

            if (error) {
                classes.push('hy-steps-item__content__title--error')
            }
        }

        return classes
    }
})
// 字体颜色
const textColor = computed(() => {
    return (index: number) => (index === props.current ? '#ffffff' : props.inactiveColor)
})

/**
 * 线条样式
 * */
const lineStyle = computed(() => {
    return (temp: StepListVo, index: number): CSSProperties => {
        const style: CSSProperties = {}
        if (!stepsRects.value.length) return style
        if (props.direction === 'row') {
            style.width = addUnit(stepsRects.value[index].width! - itemRect.value[index].width!)
            style.left = addUnit(
                stepsRects.value[index].width! / 2 + itemRect.value[index].width! / 2
            )
            style.top = addUnit(itemRect.value[index].height! / 2)
        } else {
            style.height = addUnit(stepsRects.value[index].height! - itemRect.value[index].height!)
            style.left = addUnit(itemRect.value[index].width! / 2)
            style.top = addUnit(itemRect.value[index].height)
        }
        style.backgroundColor = temp.error ? '' : index < props.current ? '' : props.inactiveColor
        return style
    }
})

const itemStyleInner = computed(() => {
    return {}
})
/**
 * 状态类名
 * */
const statusClass = computed(() => {
    return (index: number, error: boolean = false) => {
        if (props.current == index) {
            return error ? 'error' : 'process'
        } else if (props.current > index) {
            return 'finish'
        } else {
            return 'wait'
        }
    }
})
const statusColor = computed(() => {
    return (index: number, error?: boolean) => {
        let colorTmp: string | number
        switch (statusClass.value(index, error)) {
            case 'finish':
                colorTmp = props.activeColor
                break
            case 'error':
                colorTmp = ColorConfig.error
                break
            case 'process':
                colorTmp = props.dot ? props.current : 'transparent'
                break
            default:
                colorTmp = props.inactiveColor
                break
        }
        return colorTmp
    }
})

const contentStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}
    if (props.direction === 'column') {
        style.marginLeft = props.dot ? '2px' : '6px'
        style.marginTop = props.dot ? '0px' : '0px'
    } else {
        style.marginTop = props.dot ? '2px' : '6px'
        style.marginLeft = props.dot ? '0px' : '0px'
    }

    return style
})

onMounted(() => {
    getStepsItemRect()
})

// 获取组件的尺寸，用于设置横线的位置
const getStepsItemRect = () => {
    getRect('.hy-steps-item', true, instance).then((rect) => {
        stepsRects.value = rect as UniApp.NodeInfo[]
    })

    getRect('.hy-steps-item__wrapper', true, instance).then((rect) => {
        itemRect.value = rect as UniApp.NodeInfo[]
    })
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
