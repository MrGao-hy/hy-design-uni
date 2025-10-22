<template>
  <view class="hy-menu" :style="{ width: addUnit(width) }">
    <template v-for="(item, i) in list">
      <view
        @click="handleClick(item, i)"
        :class="menuItemClass(item, i)"
        :style="customStyle"
      >
        <template v-if="item.icon">
          <slot v-if="$slots.icon" name="icon" :value="item.icon"></slot>
          <hy-icon
            v-else
            class="hy-menu__item__icon"
            :name="item.icon"
            :color="current === i ? color || 'var(--hy-theme-color)' : ''"
            :size="icon?.size || 16"
            :bold="icon?.bold"
            :customPrefix="icon?.customPrefix"
            :imgMode="icon?.imgMode"
            :width="icon?.width"
            :height="icon?.height"
            :top="icon?.top"
            :stop="icon?.stop"
            :round="icon?.round"
            :customStyle="icon?.customStyle || { marginRight: '2px' }"
          ></hy-icon>
        </template>
        <slot v-if="$slots.default"></slot>
        <text v-else class="hy-menu__item--title">{{ item.title }}</text>
        <hy-badge
          :value="item?.badge"
          :offset="badge?.offset"
          :shape="badge?.shape"
          :color="badge?.color"
          :bg-color="badge?.bgColor"
          :inverted="badge?.inverted"
          :type="badge?.type"
          :number-type="badge?.numberType"
          :is-dot="badge?.isDot"
          :absolute="badge?.absolute"
          :max="badge?.max"
          :show-zero="badge?.showZero"
          :custom-style="badge?.customStyle"
        ></hy-badge>
      </view>
    </template>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-menu",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import type { CSSProperties, PropType } from "vue";
import type { IMenuEmits, MenusType, ModelValueVo } from "./typing";
import { addUnit } from "../../utils";
import type HyBadgeProps from "../hy-badge/typing";
import type HyIconProps from "../hy-icon/typing";
// 组件
import HyIcon from "../hy-icon/hy-icon.vue";
import HyBadge from "../hy-badge/hy-badge.vue";

/**
 * 垂直展示的导航栏，用于在不同的内容区域之间进行切换。
 * @displayName hy-menu
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps({
  /** 当前值 */
  modelValue: [String, Number] as PropType<ModelValueVo>,
  /** 菜单数据集 */
  list: {
    type: Array as PropType<Array<MenusType>>,
    default: [],
  },
  /** 对应的键 */
  id: {
    type: String,
    default: "id",
  },
  name: {
    type: String,
    default: "id",
  },
  /** 侧边菜单栏宽度 */
  width: {
    type: [String, Number],
    default: 120,
  },
  /** 选中颜色 */
  color: String,
  /** 图标属性值 */
  icon: {
    type: Object as PropType<HyIconProps>,
    default: {},
  },
  /** 徽标属性值 */
  badge: {
    type: Object as PropType<HyBadgeProps>,
    default: {},
  },
  /** 定义需要用到的外部样式 */
  customStyle: Object as PropType<CSSProperties>,
});
const emit = defineEmits<IMenuEmits>();

const current = ref<string | number>(0);

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) current.value = newVal;
  },
  { immediate: true },
);

const menuItemClass = computed(() => {
  return (temp: MenusType, i: number) => {
    const classes = [
      "hy-menu__item",
      prefix.value && "hy-menu__item--prefix",
      suffix.value && "hy-menu__item--suffix",
      temp.disabled && "hy-menu__item--disabled",
    ];
    if (current.value === temp[props.id]) {
      classes.push(
        "hy-menu__item--active",
        props.color && "hy-menu__item--active__color",
      );
    }

    return classes;
  };
});

const prefix = computed(() => {
  let prefix: boolean = false;
  // if (sidebar) {
  //   let activeIndex: number = sidebar.children.findIndex((c: any) => {
  //     return c.value === sidebar.props.modelValue;
  //   });
  //
  //   let currentIndex: number = sidebar.children.findIndex((c: any) => {
  //     return c.value === props.value;
  //   });
  //
  //   if (currentIndex === activeIndex - 1) {
  //     prefix = true;
  //   }
  // }
  return prefix;
});

const suffix = computed(() => {
  let suffix: boolean = false;
  // if (sidebar) {
  //   let activeIndex: number = sidebar.children.findIndex((c: any) => {
  //     return c.value === sidebar.props.modelValue;
  //   });
  //
  //   let currentIndex: number = sidebar.children.findIndex((c: any) => {
  //     return c.value === props.value;
  //   });
  //
  //   if (currentIndex === activeIndex + 1) {
  //     suffix = true;
  //   }
  // }
  return suffix;
});

function handleClick(temp: MenusType, i: number) {
  if (temp?.disabled) {
    return;
  }
  current.value = i;
  emit("update:modelValue", temp.id);
  emit("change", temp);
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
.hy-menu__item--active__color {
  color: v-bind(color);
  &::before {
    background: v-bind(color);
  }
}
</style>
