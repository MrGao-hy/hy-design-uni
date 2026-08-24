<template>
    <view :class="['hy-slider', customClass]" :style="[customStyle]">
        <template v-if="!useNative || isRange">
            <view
                ref="hy-slider__inner"
                class="hy-slider__inner"
                @tap="onClick"
                :class="[disabled ? 'hy-slider__disabled' : '']"
                :style="{
                    height:
                        isRange && showValue ? addUnit(getPx(blockSize) + 24) : addUnit(blockSize)
                }"
            >
                <view
                    ref="hy-slider__base"
                    class="hy-slider__base"
                    :style="[
                        {
                            height: addUnit(height),
                            backgroundColor: inactiveColor
                        }
                    ]"
                ></view>
                <view
                    @tap="onClick"
                    class="hy-slider__gap"
                    :style="[
                        barStyle,
                        {
                            height: addUnit(height),
                            marginTop: '-' + addUnit(height),
                            backgroundColor: activeColor
                        }
                    ]"
                ></view>
                <view
                    v-if="isRange"
                    class="hy-slider__gap hy-slider__gap-0"
                    :style="[
                        barStyle0,
                        {
                            height: addUnit(getPx(height) + 2),
                            marginTop: '-' + addUnit(getPx(height) + 1),
                            backgroundColor: inactiveColor
                        }
                    ]"
                ></view>
                <text
                    v-if="isRange && showValue"
                    class="hy-slider__show-range-value"
                    :style="{
                        left: blockLeft(barStyle0?.width, blockSize)
                    }"
                >
                    {{ rangeValue[0] }}
                </text>
                <text
                    v-if="isRange && showValue"
                    class="hy-slider__show-range-value"
                    :style="{
                        left: blockLeft(barStyle?.width, blockSize)
                    }"
                >
                    {{ rangeValue[1] }}
                </text>
                <template v-if="isRange">
                    <view
                        class="hy-slider__button--wrap hy-slider__button--wrap-0"
                        @touchstart="onTouchStart($event, 0)"
                        @touchmove="onTouchMove($event, 0)"
                        @touchend="onTouchEnd($event, 0)"
                        @touchcancel="onTouchEnd($event, 0)"
                        :style="{
                            left: blockLeft(barStyle0?.width, blockSize)
                        }"
                    >
                        <slot name="min" v-if="$slots.min || $slots.$min" />
                        <view
                            v-else
                            class="hy-slider__button"
                            :style="[
                                blockStyle,
                                {
                                    height: addUnit(blockSize),
                                    width: addUnit(blockSize),
                                    backgroundColor: blockColor
                                }
                            ]"
                        ></view>
                    </view>
                </template>
                <view
                    class="hy-slider__button--wrap"
                    @touchstart="onTouchStart"
                    @touchmove="onTouchMove"
                    @touchend="onTouchEnd"
                    @touchcancel="onTouchEnd"
                    :style="{
                        left: blockLeft(barStyle?.width, blockSize)
                    }"
                >
                    <slot name="max" v-if="isRange && ($slots.max || $slots.$max)" />
                    <slot v-else-if="$slots.default || $slots.$default" />
                    <view
                        v-else
                        class="hy-slider__button"
                        :style="[
                            blockStyle,
                            {
                                height: addUnit(blockSize),
                                width: addUnit(blockSize),
                                backgroundColor: blockColor
                            }
                        ]"
                    ></view>
                </view>
            </view>
            <view class="hy-slider__show-value" v-if="showValue && !isRange">{{ modelValue }}</view>
        </template>
        <slider
            class="hy-slider__native"
            v-else
            :min="min"
            :max="max"
            :step="step"
            :value="modelValue"
            :activeColor="activeColor"
            :backgroundColor="inactiveColor"
            :blockSize="blockSize"
            :blockColor="blockColor"
            :showValue="showValue"
            :disabled="disabled"
            @changing="changingHandler"
            @change="changeHandler"
        ></slider>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-slider',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { addUnit, error, getRect, getPx, sleep } from '../../libs'
import type { ISliderEmits } from './typing'
import type { SliderOnChangingEvent } from '@uni-helper/uni-types'
import sliderProps from './props'

/**
 * 滑动选择器，一般用于表单中，手动选择一个区间范围的场景。
 * @displayName hy-slider
 */
defineOptions({})

const props = defineProps(sliderProps)
const emit = defineEmits<ISliderEmits>()

const startX = ref(0)
const status = ref('end')
const newValue = ref(0)
const distanceX = ref(0)
const startValue0 = ref(0)
const startValue = ref(0)
const barStyle0 = ref<CSSProperties>()
const barStyle = ref<CSSProperties>()
const sliderRect = ref<UniNamespace.NodeInfo>({
    left: 0,
    width: 0
})
const instance = getCurrentInstance()

const blockLeft = computed(() => {
    return (slideWidth: string | number | undefined, blockWidth: string | number): string => {
        if (slideWidth) {
            return addUnit(getPx(slideWidth) + getPx(blockWidth) / 2)
        }
        return '0px'
    }
})

watch(
    () => props.modelValue,
    (newValue) => {
        // 只有在非滑动状态时，才可以通过value更新滑块值，这里监听，是为了让用户触发
        if (status.value === 'end') updateValue(newValue, false)
    }
)

watch(
    () => props.rangeValue,
    (newValue) => {
        if (status.value === 'end') {
            updateValue(newValue[0], false, 0)
            updateValue(newValue[1], false, 1)
        }
    },
    { deep: true }
)

/**
 * 获取滑块条的实际尺寸
 * 弹窗、折叠面板等延迟渲染场景下，元素可能尚未就绪，需在拿到有效宽度后返回
 */
const getSliderRect = async (): Promise<void> => {
    // #ifndef APP-NVUE
    const rect = (await getRect('.hy-slider__base', false, instance)) as UniNamespace.NodeInfo

    if (rect && rect.width) {
        sliderRect.value = rect
    }
    // #endif
}

onMounted(async () => {
    // 获取滑块条的尺寸信息
    if (!props.useNative) {
        // #ifndef APP-NVUE
        await nextTick()
        await getSliderRect()

        if (!sliderRect.value.width) {
            error('在小程序里，如在弹窗等隐藏元素中使用，请使用v-if来显示滑块，否则无法计算长度。')
        }
        init()
        // #endif
    }
})

const init = () => {
    if (props.isRange) {
        updateValue(props.rangeValue[0], false, 0)
        updateValue(props.rangeValue[1], false, 1)
    } else {
        updateValue(props.modelValue, false)
    }
}

// native拖动过程中触发
const changingHandler = (e: SliderOnChangingEvent) => {
    const { value } = e.detail
    // 更新v-model的值
    emit('update:modelValue', value)
    // 触发事件
    emit('changing', value)
}

// native滑动结束时触发
const changeHandler = (e: SliderOnChangingEvent) => {
    const { value } = e.detail
    // 更新v-model的值
    emit('update:modelValue', value)
    // 触发事件
    emit('change', value)
}

/**
 * 获取触摸点的横向坐标，兼容各端事件对象差异
 * @param e 触摸事件对象
 * @param index 触摸点索引，默认为第一个触摸点
 */
const getTouchX = (e: any, index = 0): number => {
    return e.touches?.[index]?.clientX || e.changedTouches?.[index]?.clientX || 0
}

const onTouchStart = async (e: any, index = 1) => {
    if (props.disabled) return
    // 弹窗等场景下，每次触摸前重新测量，确保 left/width 为布局完成后的最新值
    // 避免弹窗动画（缩放/平移）期间测量到错误的位置，导致点击/拖动值跳变
    const rect = (await getRect('.hy-slider__base', false, instance)) as UniNamespace.NodeInfo
    if (rect?.width) {
        sliderRect.value = rect
    }
    if (!sliderRect.value.width) return
    // 尺寸就绪后，同步一次滑块展示位置
    init()
    startX.value = 0
    // 触摸点集
    let touches = e.touches[0]
    // 触摸点到屏幕左边的距离
    startX.value = touches.clientX
    // 此处的this.modelValue虽为props值，但是通过$emit('update:modelValue')进行了修改
    if (props.isRange) {
        startValue0.value = format(props.rangeValue[0], 0)
        startValue.value = format(props.rangeValue[1], 1)
    } else {
        startValue.value = format(props.modelValue)
    }
    // 标示当前的状态为开始触摸滑动
    status.value = 'start'

    distanceX.value = getTouchX(e) - sliderRect.value.left!
    // 获得移动距离对整个滑块的值，此为带有多位小数的值，不能用此更新视图
    // 否则造成通信阻塞，需要每改变一个step值时修改一次视图
    newValue.value =
        (distanceX.value / sliderRect.value.width!) * (props.max - props.min) + props.min
    status.value = 'moving'
    // 发出moving事件
    let $crtFmtValue = updateValue(newValue.value, true, index)
    emit('changing', $crtFmtValue)
}
const onTouchMove = (e: any, index = 1) => {
    if (props.disabled) return
    // 连续触摸的过程会一直触发本方法，但只有手指触发且移动了才被认为是拖动了，才发出事件
    // 触摸后第一次移动已经将status设置为moving状态，故触摸第二次移动不会触发本事件
    if (status.value == 'start') emit('start')
    distanceX.value = getTouchX(e) - sliderRect.value.left!
    // 获得移动距离对整个滑块的值，此为带有多位小数的值，不能用此更新视图
    // 否则造成通信阻塞，需要每改变一个step值时修改一次视图
    newValue.value =
        (distanceX.value / sliderRect.value.width!) * (props.max - props.min) + props.min
    status.value = 'moving'
    // 发出moving事件
    let $crtFmtValue = updateValue(newValue.value, true, index)
    emit('changing', $crtFmtValue)
}
const onTouchEnd = (e: any, index = 1) => {
    if (props.disabled) return
    if (status.value === 'moving') {
        let $crtFmtValue = updateValue(newValue.value, false, index)
        emit('change', $crtFmtValue)
    }
    status.value = 'end'
}
const onClick = async (e: any) => {
    if (props.disabled) return
    // 直接点击滑块的情况，计算方式与onTouchMove方法相同
    // #ifndef APP-NVUE

    // 弹窗等场景下，点击时重新测量，确保使用布局完成后的最新位置，避免值跳变为0
    const rect = (await getRect('.hy-slider__base', false, instance)) as UniNamespace.NodeInfo
    if (rect?.width) {
        sliderRect.value = rect
    }
    // 弹窗等场景下尺寸尚未就绪时不处理点击，避免除零
    if (!sliderRect.value.width) return
    let x
    // #ifdef MP-ALIPAY
    x = e.detail.clientX
    // #endif
    // #ifndef MP-ALIPAY
    x = e.detail.x
    // #endif

    const clientX = x - sliderRect.value.left!
    newValue.value = (clientX / sliderRect.value.width!) * (props.max - props.min) + props.min
    updateValue(newValue.value, false, 1)
    // #endif
}
const updateValue = (value: number, drag: boolean, index: number = 1): number | number[] => {
    // 去掉小数部分，同时也是对step步进的处理
    let valueFormat = format(value, index)
    // 不允许滑动的值超过max最大值
    if (valueFormat > props.max) {
        valueFormat = props.max
    }
    // 设置移动的距离，不能用百分比，因为NVUE不支持。
    const width = Math.min(
        ((valueFormat - props.min) / (props.max - props.min)) * sliderRect.value.width!,
        sliderRect.value.width!
    )
    const barStyle_1: CSSProperties = {
        width: width + 'px'
    }
    // 移动期间无需过渡动画
    if (drag) {
        barStyle_1.transition = 'none'
    } else {
        // 非移动期间，删掉对过渡为空的声明，让css中的声明起效
        delete barStyle_1.transition
    }
    // 修改value值
    if (props.isRange) {
        props.rangeValue[index] = valueFormat
        emit('update:modelValue', props.rangeValue)
    } else {
        emit('update:modelValue', valueFormat)
    }

    switch (index) {
        case 0:
            barStyle0.value = barStyle_1
            break
        case 1:
            barStyle.value = barStyle_1
            break
        default:
            break
    }
    if (props.isRange) {
        return props.rangeValue
    } else {
        return valueFormat
    }
}
const format = (value: number, index = 1): number => {
    // 将小数变成整数，为了减少对视图的更新，造成视图层与逻辑层的阻塞
    if (props.isRange) {
        switch (index) {
            case 0:
                return (
                    Math.round(
                        Math.max(
                            props.min,
                            Math.min(value, props.rangeValue[1] - props.step, props.max)
                        ) / props.step
                    ) * props.step
                )
            case 1:
                return (
                    Math.round(
                        Math.max(
                            props.min,
                            props.rangeValue[0] + props.step,
                            Math.min(value, props.max)
                        ) / props.step
                    ) * props.step
                )
            default:
                return 0
        }
    } else {
        // 解决精度丢失
        return (
            (Math.round(Math.max(props.min, Math.min(value, props.max)) / props.step) *
                1000 *
                props.step) /
            1000
        )
    }
}
</script>

<style lang="scss">
@use './index.scss';
</style>
