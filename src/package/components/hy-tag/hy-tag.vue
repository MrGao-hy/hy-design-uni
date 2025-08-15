<template>
  <HyTransition mode="fade" :show="show" style="display: inline-flex">
    <view class="hy-tag__wrapper cursor-pointer">
      <view :class="tagClass" @tap.stop="clickHandler" :style="tagStyle">
        <slot name="icon">
          <HyIcon
            v-if="icon?.name"
            :name="icon?.name"
            :color="hyIconColor"
            :size="hyIconSize"
            :bold="icon?.bold"
            :customPrefix="icon?.customPrefix"
            :imgMode="icon?.imgMode"
            :width="icon?.width"
            :height="icon?.height"
            :top="icon?.top"
            :stop="icon?.stop"
            :round="icon?.round"
            :customStyle="Object.assign({ marginRight: '3px' }, icon?.customStyle)"
          ></HyIcon>
        </slot>
        <text :class="textClass" :style="textStyle">
          <slot>
            {{ text }}
          </slot>
        </text>
      </view>
      <view
        :class="['hy-tag__close', `hy-tag__close--${size}`]"
        v-if="closable"
        @tap.stop="closeHandler"
        :style="{ backgroundColor: closeColor }"
      >
        <HyIcon :name="IconConfig.CLOSE" :size="closeSize" color="#ffffff"></HyIcon>
      </view>
    </view>
  </HyTransition>
</template>

<script lang="ts">
export default {
  name: 'hy-tag',
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
import type { ITagEmits } from './typing'
import { IconConfig } from '../../config'
import { colorGradient } from '../../utils'
import type HyIconProps from '../hy-icon/typing'

// 组件
import HyTransition from '../hy-transition/hy-transition.vue'
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * tag组件一般用于标记和选择，我们提供了更加丰富的表现形式，能够较全面的涵盖您的使用场景
 * @displayName hy-tag
 */
defineOptions({})

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 标签的文字内容 */
  text: String,
  /** 点击需要传得值 */
  name: [String, Number],
  /**
   * 标签类型
   * @values info,primary,success,error,warning
   * */
  type: {
    type: String,
    default: 'primary',
  },
  /** 禁用点击标签 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 标签的大小
   * @values large,medium,small
   * */
  size: {
    type: String,
    default: 'medium',
  },
  /**
   * tag的形状
   * @values circle,square
   * */
  shape: {
    type: String,
    default: 'square',
  },
  /** 背景颜色，默认为空字符串，即不处理 */
  bgColor: String,
  /** 标签字体颜色，默认为空字符串，即不处理 */
  color: String,
  /** 镂空形式标签的边框颜色 */
  borderColor: String,
  /** 关闭按钮图标的颜色 */
  closeColor: {
    type: String,
    default: '#C6C7CB',
  },
  /** 镂空时是否填充背景色 */
  plainFill: {
    type: Boolean,
    default: false,
  },
  /** 是否镂空 */
  plain: {
    type: Boolean,
    default: false,
  },
  /** 是否可关闭，设置为true，文字右边会出现一个关闭图标 */
  closable: {
    type: Boolean,
    default: false,
  },
  /** 标签显示与否 */
  show: {
    type: Boolean,
    default: true,
  },
  /** 组件内置图标，或绝对路径的图片 */
  icon: Object as PropType<HyIconProps>,
  /** 定义需要用到的外部样式 */
  customStyle: Object as PropType<CSSProperties>,
  /** 自定义外部类名 */
  customClass: String,
})
const {
  text,
  name,
  shape,
  plain,
  type,
  size,
  plainFill,
  closable,
  bgColor,
  color,
  borderColor,
  icon,
  disabled,
  customStyle,
  customClass,
} = toRefs(props)
const emit = defineEmits<ITagEmits>()

/**
 * @description tag类名
 * */
const tagClass = computed((): string[] => {
  let classes = ['hy-tag', `hy-tag--${shape.value}`, `hy-tag--${size.value}`, customClass.value]
  if (disabled.value) {
    classes.push('hy-tag--disabled')
  } else {
    const arr = [
      plain.value ? `hy-tag--${type.value}--plain` : `hy-tag--${type.value}`,
      plain.value && plainFill.value && `hy-tag--${type.value}--plain__fill`,
    ].filter(Boolean)
    classes = classes.concat(arr as string[])
  }
  return classes
})
/**
 * @description tag样式
 * */
const tagStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    marginRight: closable.value ? '10px' : 0,
    marginTop: closable.value ? '10px' : 0,
    background: bgColor.value,
    borderColor: borderColor.value,
  }

  if (color.value) {
    if (plain.value) {
      style.borderColor = color.value
      if (plainFill.value) {
        style.background = colorGradient(color.value, '#FFFFFF', 100)[90]
      }
    } else {
      style.background = color.value
      style.borderColor = color.value
    }
  }

  return Object.assign(style, customStyle.value)
})

/**
 * @description 文本样式
 * */
const textStyle = computed(() => {
  const style: CSSProperties = {}
  if (color.value && plain.value) style.color = color.value
  return style
})
/**
 * @description 文本类名
 * */
const textClass = computed((): string[] => {
  return [`hy-tag__text`, `hy-tag__text--${size.value}`]
})

/**
 * @description 关闭图标icon大小
 */
const closeSize = computed(() => {
  return size.value === 'large' ? 15 : size.value === 'medium' ? 13 : 11
})
/**
 * @description 图标大小
 * */
const hyIconSize = computed(() => {
  if (icon.value.size) {
    return icon.value.size
  } else {
    return size.value === 'large' ? 18 : size.value === 'medium' ? 14 : 10
  }
})
/**
 * @description 图标颜色
 * */
const hyIconColor = computed(() => {
  return icon.value.color ? icon.value.color : plain.value ? type.value : '#ffffff'
})

/**
 * @description 点击关闭按钮
 * */
const closeHandler = () => {
  if (!disabled.value) {
    emit('close', text.value)
  }
}
/**
 * @description 点击标签
 * */
const clickHandler = () => {
  if (!disabled.value) {
    emit('click', {
      value: text.value,
      name: name.value,
    })
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
