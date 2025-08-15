<template>
  <text
    :class="['hy-count-to', customClass]"
    :style="[
      {
        fontSize: addUnit(fontSize),
        fontWeight: bold ? 'bold' : 'normal',
        color: color,
      },
      customStyle,
    ]"
  >
    {{ displayValue }}
  </text>
</template>

<script lang="ts">
export default {
  name: 'hy-count-to',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import type { ICountToEmits } from './typing'
import { computed, onMounted, ref, toRefs, watch } from 'vue'
import type { CSSProperties, PropType } from 'vue'
import { addUnit, isNumber } from '../../utils'

/**
 * 一般用于需要滚动数字到某一个值的场景，目标要求是一个递增的值。
 * @displayName hy-count-to
 */
defineOptions({})

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps({
  /** 开始的数值，默认从0增长到某一个数 */
  startVal: {
    type: Number,
    default: 0,
  },
  /** 要滚动的目标数值，必须 */
  endVal: {
    type: Number,
    default: 0,
    required: true,
  },
  /** 滚动到目标数值的动画持续时间，单位为毫秒（ms） */
  duration: {
    type: Number,
    default: 2000,
  },
  /** 设置数值后是否自动开始滚动 */
  autoplay: {
    type: Boolean,
    default: true,
  },
  /** 要显示的小数位数 */
  decimals: {
    type: Number,
    default: 0,
  },
  /** 滚动结束时，是否缓动结尾 */
  useEasing: {
    type: Boolean,
    default: true,
  },
  /** 十进制分割 */
  decimal: {
    type: String,
    default: '.',
  },
  /** 字体颜色 */
  color: String,
  /** 字体大小，单位px */
  fontSize: {
    type: [Number, String],
    default: 22,
  },
  /** 字体是否加粗 */
  bold: {
    type: Boolean,
    default: false,
  },
  /** 千位分隔符 */
  separator: String,
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /** 自定义外部类名 */
  customClass: String,
})
const { startVal, duration, endVal, autoplay, separator, useEasing, decimals, decimal } =
  toRefs(props)
const emit = defineEmits<ICountToEmits>()

const formatNumber = (num: number): string => {
  let numStr = ''
  // 将num转为Number类型，因为其值可能为字符串数值，调用toFixed会报错
  num = Number(num)
  numStr = num.toFixed(Number(decimals.value))
  numStr += ''
  const x = numStr.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? decimal.value + x[1] : ''
  const rgx = /(\d+)(\d{3})/
  if (separator.value && !isNumber(separator.value)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + separator.value + '$2')
    }
  }
  return x1 + x2
}

const localStartVal = ref(startVal.value)
let displayValue = ref(formatNumber(startVal.value))
const printVal = ref<number | null>(null)
const paused = ref(false) // 是否暂停
const localDuration = ref(Number(duration.value))
const startTime = ref<number | null>(null) // 开始的时间
const timestamp = ref<number | null>(null) // 时间戳
const remaining = ref<number | null>(null) // 停留的时间
const rAF = ref<number>() // 停留的时间
const lastTime = ref(0) // 上一次的时间

const countDown = computed(() => {
  return startVal.value > endVal.value
})

watch(
  () => startVal.value,
  () => autoplay.value && start(),
)

watch(
  () => endVal.value,
  () => autoplay.value && start(),
)

onMounted(() => {
  autoplay.value && start()
})

const easingFn = (t: number, b: number, c: number, d: number) => {
  return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
}

const requestAnimationFrame = (callback: Function): number => {
  const currTime = new Date().getTime()
  // 为了使setTimteout的尽可能的接近每秒60帧的效果
  const timeToCall = Math.max(0, 16 - (currTime - lastTime.value))
  const id = setTimeout(() => {
    callback(currTime + timeToCall)
  }, timeToCall) as unknown as number
  lastTime.value = currTime + timeToCall
  return id
}

const cancelAnimationFrame = (id?: number) => {
  clearTimeout(id)
}

/**
 * @description 开始滚动数字
 * */
const start = () => {
  localStartVal.value = startVal.value
  startTime.value = null
  localDuration.value = duration.value
  paused.value = false
  rAF.value = requestAnimationFrame(count)
}

/**
 * @description 暂定状态，重新再开始滚动；或者滚动状态下，暂停
 * */
const reStart = () => {
  if (paused.value) {
    resume()
    paused.value = false
  } else {
    stop()
    paused.value = true
  }
}

/**
 * @description 暂停
 * */
const stop = () => {
  cancelAnimationFrame(rAF.value)
}

/**
 * @description 重新开始(暂停的情况下)
 * */
const resume = () => {
  if (!remaining.value) return
  startTime.value = 0
  localDuration.value = remaining.value
  if (printVal.value) {
    localStartVal.value = printVal.value
  }
  requestAnimationFrame(count)
}

/**
 * @description 重置
 * */
const reset = () => {
  startTime.value = null
  cancelAnimationFrame(rAF.value)
  displayValue.value = formatNumber(startVal.value)
}
const count = (time_stamp: number) => {
  if (!startTime.value) startTime.value = time_stamp
  timestamp.value = time_stamp
  const progress = time_stamp - startTime.value
  remaining.value = localDuration.value - progress
  if (useEasing.value) {
    if (countDown.value) {
      printVal.value =
        localStartVal.value -
        easingFn(progress, 0, localStartVal.value - endVal.value, localDuration.value)
    } else {
      printVal.value = easingFn(
        progress,
        localStartVal.value,
        endVal.value - localStartVal.value,
        localDuration.value,
      )
    }
  } else {
    if (countDown.value) {
      printVal.value =
        localStartVal.value -
        (localStartVal.value - endVal.value) * (progress / localDuration.value)
    } else {
      printVal.value =
        localStartVal.value +
        (endVal.value - localStartVal.value) * (progress / localDuration.value)
    }
  }
  if (countDown.value) {
    printVal.value = printVal.value < endVal.value ? endVal.value : printVal.value
  } else {
    printVal.value = printVal.value > endVal.value ? endVal.value : printVal.value
  }
  displayValue.value = formatNumber(printVal.value)
  if (progress < localDuration.value) {
    rAF.value = requestAnimationFrame(count)
  } else {
    emit('end')
  }
}

const destroyed = () => {
  cancelAnimationFrame(rAF.value)
}

defineExpose({
  start,
  stop,
  reStart,
  resume,
})
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
