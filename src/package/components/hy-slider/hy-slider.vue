<template>
  <view :class="['hy-slider', customClass]" :style="[customStyle]">
    <template v-if="!useNative || isRange">
      <view
        ref="hy-slider-inner"
        class="hy-slider-inner"
        @click="onClick"
        @onTouchStart="onTouchStart2($event, 1)"
        @touchmove="onTouchMove2($event, 1)"
        @touchend="onTouchEnd2($event, 1)"
        @touchcancel="onTouchEnd2($event, 1)"
        :class="[disabled ? 'hy-slider--disabled' : '']"
        :style="{
          height: isRange && showValue ? addUnit(getPx(blockSize) + 24) : addUnit(blockSize),
        }"
      >
        <view
          ref="hy-slider__base"
          class="hy-slider__base"
          :style="[
            {
              height: addUnit(height),
              backgroundColor: inactiveColor,
            },
          ]"
        ></view>
        <view
          @click="onClick"
          class="hy-slider__gap"
          :style="[
            barStyle,
            {
              height: addUnit(height),
              marginTop: '-' + addUnit(height),
              backgroundColor: activeColor,
            },
          ]"
        ></view>
        <view
          v-if="isRange"
          class="hy-slider__gap hy-slider__gap-0"
          :style="[
            barStyle0,
            {
              height: addUnit(height),
              marginTop: '-' + addUnit(height),
              backgroundColor: inactiveColor,
            },
          ]"
        ></view>
        <text
          v-if="isRange && showValue"
          class="hy-slider__show-range-value"
          :style="{
            left: blockLeft(barStyle0?.width, blockSize),
          }"
        >
          {{ rangeValue[0] }}
        </text>
        <text
          v-if="isRange && showValue"
          class="hy-slider__show-range-value"
          :style="{
            left: blockLeft(barStyle?.width, blockSize),
          }"
        >
          {{ rangeValue[1] }}
        </text>
        <template v-if="isRange">
          <view
            class="hy-slider__button-wrap hy-slider__button-wrap-0"
            @touchstart="onTouchStart($event, 0)"
            @touchmove="onTouchMove($event, 0)"
            @touchend="onTouchEnd($event, 0)"
            @touchcancel="onTouchEnd($event, 0)"
            :style="{
              left: blockLeft(barStyle0?.width, blockSize),
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
                  backgroundColor: blockColor,
                },
              ]"
            ></view>
          </view>
        </template>
        <view
          class="hy-slider__button-wrap"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
          @touchcancel="onTouchEnd"
          :style="{
            left: blockLeft(barStyle?.width, blockSize),
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
                backgroundColor: blockColor,
              },
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
      :blockSize="addUnit(blockSize)"
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
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref, toRefs, watch } from 'vue'
import type { CSSProperties, PropType } from 'vue'
import { addUnit, error, getRect, getPx } from '../../utils'
import type { ISliderEmits } from './typing'

/**
 * 一般用于表单中，手动选择一个区间范围的场景。
 * @displayName hy-slider
 */
defineOptions({})

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps({
  /** 滑块默认值 */
  modelValue: {
    type: Number,
    default: 0,
  },
  /** 滑块的大小，取值范围为 12 - 28 */
  blockSize: {
    type: [String, Number],
    default: 18,
  },
  /** 最小值 */
  min: {
    type: Number,
    default: 0,
  },
  /** 最大值 */
  max: {
    type: Number,
    default: 100,
  },
  /** 步长 */
  step: {
    type: Number,
    default: 1,
  },
  /** 底部选择部分的背景颜色 */
  activeColor: String,
  /** 底部条背景颜色 */
  inactiveColor: String,
  /** 滑块颜色 */
  blockColor: String,
  /** 是否显示当前的选择值 */
  showValue: {
    type: Boolean,
    default: false,
  },
  /** 是否禁用滑块 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 是否渲染uni-app框架内置组件 */
  useNative: {
    type: Boolean,
    default: false,
  },
  /** 滑块条高度，单位rpx */
  height: {
    type: [String, Number],
    default: 2,
  },
  /** 双滑块时值 */
  rangeValue: {
    type: Array as unknown as PropType<number[]>,
    default: [0, 0],
  },
  /** 是否区间的模式 */
  isRange: {
    type: Boolean,
    default: false,
  },
  /** 给滑块自定义样式，对象形式 */
  blockStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /** 自定义外部类名 */
  customClass: String,
})
const { modelValue, rangeValue, useNative, isRange, disabled, step, min, max } = toRefs(props)
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
  width: 0,
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
  () => modelValue.value,
  (newValue) => {
    // 只有在非滑动状态时，才可以通过value更新滑块值，这里监听，是为了让用户触发
    if (status.value === 'end') updateValue(newValue, false)
  },
)

watch(
  () => rangeValue.value,
  (newValue) => {
    if (status.value === 'end') {
      updateValue(newValue[0], false, 0)
      updateValue(newValue[1], false, 1)
    }
  },
  { deep: true },
)

onMounted(async () => {
  // 获取滑块条的尺寸信息
  if (!useNative.value) {
    // #ifndef APP-NVUE
    sliderRect.value = (await getRect('.hy-slider__base', false, instance)) as UniNamespace.NodeInfo
    // console.log('sliderRect', sliderRect.value)
    if (sliderRect.value.width == 0) {
      error('如在弹窗等元素中使用，请使用v-if来显示滑块，否则无法计算长度。')
    }
    init()
    // #endif
  }
})

const init = () => {
  if (isRange.value) {
    updateValue(rangeValue.value[0], false, 0)
    updateValue(rangeValue.value[1], false, 1)
  } else {
    updateValue(modelValue.value, false)
  }
}
// native拖动过程中触发
const changingHandler = (e: MouseEvent) => {
  const { value } = e.detail
  // 更新v-model的值
  emit('update:modelValue', value)
  // 触发事件
  emit('changing', value)
}
// native滑动结束时触发
const changeHandler = (e: TouchEvent) => {
  const { value } = e.detail
  // 更新v-model的值
  emit('update:modelValue', value)
  // 触发事件
  emit('change', value)
}
const onTouchStart = (event: TouchEvent, index = 1) => {
  if (disabled.value) return
  startX.value = 0
  // 触摸点集
  let touches = event.touches[0]
  // 触摸点到屏幕左边的距离
  startX.value = touches.clientX
  // 此处的this.modelValue虽为props值，但是通过$emit('update:modelValue')进行了修改
  if (isRange.value) {
    startValue0.value = format(rangeValue.value[0], 0)
    startValue.value = format(rangeValue.value[1], 1)
  } else {
    startValue.value = format(modelValue.value)
  }
  // 标示当前的状态为开始触摸滑动
  status.value = 'start'

  let clientX = 0
  // #ifndef APP-NVUE
  clientX = touches.clientX
  // #endif
  // #ifdef APP-NVUE
  clientX = touches.screenX
  // #endif
  distanceX.value = clientX - sliderRect.value.left!
  // 获得移动距离对整个滑块的值，此为带有多位小数的值，不能用此更新视图
  // 否则造成通信阻塞，需要每改变一个step值时修改一次视图
  newValue.value = (distanceX.value / sliderRect.value.width!) * (max.value - min.value) + min.value
  status.value = 'moving'
  // 发出moving事件
  let $crtFmtValue = updateValue(newValue.value, true, index)
  emit('changing', $crtFmtValue)
}
const onTouchMove = (event: TouchEvent, index = 1) => {
  if (disabled.value) return
  // 连续触摸的过程会一直触发本方法，但只有手指触发且移动了才被认为是拖动了，才发出事件
  // 触摸后第一次移动已经将status设置为moving状态，故触摸第二次移动不会触发本事件
  if (status.value == 'start') emit('start')
  let touches = event.touches[0]
  // console.log('touchs', touches)
  // 滑块的左边不一定跟屏幕左边接壤，所以需要减去最外层父元素的左边值
  let clientX = 0
  // #ifndef APP-NVUE
  clientX = touches.clientX
  // #endif
  // #ifdef APP-NVUE
  clientX = touches.screenX
  // #endif
  distanceX.value = clientX - sliderRect.value.left!
  // 获得移动距离对整个滑块的值，此为带有多位小数的值，不能用此更新视图
  // 否则造成通信阻塞，需要每改变一个step值时修改一次视图
  newValue.value = (distanceX.value / sliderRect.value.width!) * (max.value - min.value) + min.value
  status.value = 'moving'
  // 发出moving事件
  let $crtFmtValue = updateValue(newValue.value, true, index)
  emit('changing', $crtFmtValue)
}
const onTouchEnd = (event: TouchEvent, index = 1) => {
  if (disabled.value) return
  if (status.value === 'moving') {
    let $crtFmtValue = updateValue(newValue.value, false, index)
    emit('change', $crtFmtValue)
  }
  status.value = 'end'
}
const onTouchStart2 = (event: TouchEvent, index = 1) => {
  if (!isRange.value) {
    // this.onChangeStart(event, index);
  }
}
const onTouchMove2 = (event: TouchEvent, index = 1) => {
  if (!isRange.value) {
    // this.onTouchMove(event, index);
  }
}
const onTouchEnd2 = (event: TouchEvent, index = 1) => {
  if (!isRange.value) {
    // this.onTouchEnd(event, index);
  }
}
const onClick = (event: MouseEvent) => {
  // if (isRange.value) return;
  if (disabled.value) return
  // 直接点击滑块的情况，计算方式与onTouchMove方法相同
  // console.log('click', event)
  // #ifndef APP-NVUE
  // nvue下暂时无法获取坐标
  let clientX = event.detail.x - sliderRect.value.left!
  newValue.value = (clientX / sliderRect.value.width!) * (max.value - min.value) + min.value
  updateValue(newValue.value, false, 1)
  // #endif
}
const updateValue = (value: number, drag: boolean, index: number = 1): number => {
  // 去掉小数部分，同时也是对step步进的处理
  let valueFormat = format(value, index)
  // 不允许滑动的值超过max最大值
  if (valueFormat > max.value) {
    valueFormat = max.value
  }
  // 设置移动的距离，不能用百分比，因为NVUE不支持。
  let width = Math.min(
    ((valueFormat - min.value) / (max.value - min.value)) * sliderRect.value.width!,
    sliderRect.value.width!,
  )
  let barStyle_1: CSSProperties = {
    width: width + 'px',
  }
  // 移动期间无需过渡动画
  if (drag) {
    barStyle_1.transition = 'none'
  } else {
    // 非移动期间，删掉对过渡为空的声明，让css中的声明起效
    delete barStyle_1.transition
  }
  // 修改value值
  if (isRange.value) {
    rangeValue.value[index] = valueFormat
    emit('update:modelValue', rangeValue.value)
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
  if (isRange.value) {
    return rangeValue.value
  } else {
    return valueFormat
  }
}
const format = (value: number, index = 1): number => {
  // 将小数变成整数，为了减少对视图的更新，造成视图层与逻辑层的阻塞
  if (isRange.value) {
    switch (index) {
      case 0:
        return (
          Math.round(
            Math.max(min.value, Math.min(value, rangeValue.value[1] - step.value, max.value)) /
              step.value,
          ) * step.value
        )
      case 1:
        return (
          Math.round(
            Math.max(min.value, rangeValue.value[0] + step.value, Math.min(value, max.value)) /
              step.value,
          ) * step.value
        )
      default:
        return 0
    }
  } else {
    // 解决精度丢失
    return (
      (Math.round(Math.max(min.value, Math.min(value, max.value)) / step.value) *
        1000 *
        step.value) /
      1000
    )
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
