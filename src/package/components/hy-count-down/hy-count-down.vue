<template>
  <view :class="['hy-count-down', customClass]" :style="customStyle">
    <!--
    @slot 默认插槽
    @param {String | Number} record
     -->
    <slot :record="timeData">
      <text class="hy-count-down__text">{{ formattedTime }}</text>
    </slot>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-count-down',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRefs, watch } from 'vue'
import type { CSSProperties, PropType } from 'vue'
import { isSameSecond, parseFormat, parseTimeData } from './index'
import type { ICountDownEmits } from './typing'

/**
 * 一般使用于某个活动的截止时间上，通过数字的变化，给用户明确的时间感受，提示用户进行某一个行为操作。
 * @displayName hy-count-down
 */
defineOptions({})

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 倒计时时长，单位ms */
  time: {
    type: Number,
    default: 0,
  },
  /** 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒 */
  format: {
    type: String,
    default: 'HH:mm:ss',
  },
  /** 是否自动开始倒计时 */
  autoStart: {
    type: Boolean,
    default: true,
  },
  /** 是否展示毫秒倒计时 */
  millisecond: {
    type: Boolean,
    default: false,
  },
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /** 自定义外部类名 */
  customClass: String,
})
const { time, autoStart, millisecond, format } = toRefs(props)
const emit = defineEmits<ICountDownEmits>()

let timer: any
// 各单位(天，时，分等)剩余时间
const timeData = ref(parseTimeData(time.value))
// 格式化后的时间，如"03:23:21"
const formattedTime = ref('')
// 倒计时是否正在进行中
const runing = ref(false)
// 结束的毫秒时间戳
const endTime = ref(0)
// 剩余的毫秒时间
const remainTime = ref(0)

watch(
  () => time.value,
  () => reset(),
)

onMounted(() => {
  reset()
})

onUnmounted(() => {
  clearTimeoutFn()
})

/**
 * @description 开始倒计时
 */
const start = () => {
  if (runing.value) return
  // 标识为进行中
  runing.value = true
  // 结束时间戳 = 此刻时间戳 + 剩余的时间
  endTime.value = Date.now() + remainTime.value
  toTick()
}

/**
 * @description 根据是否展示毫秒，执行不同操作函数
 */
const toTick = () => {
  if (millisecond.value) {
    microTick()
  } else {
    macroTick()
  }
}
const macroTick = () => {
  clearTimeoutFn()
  // 每隔一定时间，更新一遍定时器的值
  // 同时此定时器的作用也能带来毫秒级的更新
  timer = setTimeout(() => {
    // 获取剩余时间
    const remain = getRemainTime()
    // 重设剩余时间
    if (!isSameSecond(remain, remainTime.value) || remain === 0) {
      setRemainTime(remain)
    }
    // 如果剩余时间不为0，则继续检查更新倒计时
    if (remainTime.value !== 0) {
      macroTick()
    }
  }, 30)
}

const microTick = () => {
  clearTimeoutFn()
  timer = setTimeout(() => {
    setRemainTime(getRemainTime())
    if (remainTime.value !== 0) {
      microTick()
    }
  }, 50)
}

/**
 * @description 获取剩余的时间
 */
const getRemainTime = () => {
  // 取最大值，防止出现小于0的剩余时间值
  return Math.max(endTime.value - Date.now(), 0)
}
/**
 * @description 设置剩余的时间
 */
const setRemainTime = (remain: number) => {
  remainTime.value = remain
  // 根据剩余的毫秒时间，得出该有天，小时，分钟等的值，返回一个对象
  timeData.value = parseTimeData(remain)
  emit('change', timeData.value)
  // 得出格式化后的时间
  formattedTime.value = parseFormat(format.value, timeData.value)
  // 如果时间已到，停止倒计时
  if (remain <= 0) {
    pause()
    emit('finish')
  }
}
// 重置倒计时
const reset = () => {
  pause()
  remainTime.value = time.value
  setRemainTime(remainTime.value)
  if (autoStart.value) {
    start()
  }
}
/**
 * @description 暂停倒计时
 * */
const pause = () => {
  runing.value = false
  clearTimeoutFn()
}
/**
 * @description 清空定时器
 * */
const clearTimeoutFn = () => {
  clearTimeout(timer)
  timer = null
}

defineExpose({
  reset,
  start,
  pause,
})
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
