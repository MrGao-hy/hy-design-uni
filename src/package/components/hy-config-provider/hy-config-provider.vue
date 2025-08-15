<template>
  <view :class="themeClass" :style="themeStyle">
    <!-- @slot 默认插槽 -->
    <slot />
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-config-provider',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import type { CSSProperties, PropType } from 'vue'
import { addUnit, colorGradient } from '../../utils'
import { ColorConfig } from '../../config'

/**
 * 将 ConfigProvider 组件的 theme 属性设置为 dark，可以开启深色模式。 深色模式会全局生效，使页面上的所有 Wot 组件变为深色风格。
 * @displayName hy-config-provider
 */
defineOptions({})

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps({
  /**
   * 主题色，暗色或者默认白色
   * @values dark,light
   * */
  theme: {
    type: String,
    default: 'light',
  },
  /** 主题色 */
  themeColor: {
    type: String,
    default: ColorConfig.primary,
  },
  /** 内边距 */
  padding: [String, Number],
  /** 定义需要用到的主题类名 */
  customClass: String,
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: [Object, Array] as PropType<CSSProperties | CSSProperties[]>,
  },
})
const { theme, themeColor, customClass, customStyle, padding } = toRefs(props)

const themeClass = computed(() => {
  return [customClass.value, 'hy-config-provider', `hy-theme--${theme.value}`]
})

const themeStyle = computed(() => {
  return [
    {
      '--hy-theme-color': themeColor.value,
      '--hy-theme--light': colorGradient(themeColor.value)[90],
      padding: addUnit(padding.value),
    },
    customStyle.value,
  ]
})
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
