<template>
  <view class="hy-grid" ref="hy-grid" :style="gridStyle">
    <template v-for="(item, i) in list" :key="i">
      <view
        class="hy-grid__item"
        hover-class="hy-grid__item--hover-class"
        :hover-stay-time="200"
        @tap="childClick(item)"
        :style="itemStyle"
      >
        <slot v-if="$slots.default" :record="item"></slot>
        <HyIcon
          v-else
          :name="item[customKeys?.icon]"
          label-pos="bottom"
          :label="item[customKeys?.name]"
          :space="item?.iconConfig?.space || iconConfig?.space || 8"
          :color="item?.iconConfig?.color || iconConfig?.color"
          :size="item?.iconConfig?.size || iconConfig?.size || 30"
          :bold="item?.iconConfig?.bold || iconConfig?.bold"
          :customPrefix="item?.iconConfig?.customPrefix"
          :imgMode="item?.iconConfig?.imgMode || iconConfig?.imgMode"
          :width="item?.iconConfig?.width || iconConfig?.width"
          :height="item?.iconConfig?.height || iconConfig?.height"
          :top="item?.iconConfig?.top || iconConfig?.top"
          :stop="item?.iconConfig?.stop || iconConfig?.stop"
          :round="item?.iconConfig?.round || iconConfig?.round || 6"
          :customStyle="
            item?.iconConfig?.customStyle || iconConfig?.customStyle
          "
        ></HyIcon>
      </view>
    </template>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-grid",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import type { CSSProperties, PropType } from "vue";
import type { CustomKeysVo, GridItemVo, IGridEmits } from "./typing";
import { addUnit } from "../../utils";
import type HyIconProps from "../hy-icon/typing";
// 组件
import HyIcon from "../hy-icon/hy-icon.vue";

/**
 * 宫格组件一般用于同时展示多个同类项目的场景，可以给宫格的项目设置徽标组件(badge)，或者图标等，也可以扩展为左右滑动的轮播形式
 * @displayName hy-grid
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps({
  /** 数据列表 */
  list: {
    type: Array as PropType<(GridItemVo | string)[]>,
    default: () => [],
  },
  /** 自定义键值 */
  customKeys: {
    type: Object as PropType<CustomKeysVo>,
    default: () => ({
      name: "name",
      icon: "icon",
    }),
  },
  /** 宫格的列数 */
  col: {
    type: Number,
    default: 5,
  },
  /** 是否显示宫格的边框 */
  border: {
    type: Boolean,
    default: false,
  },
  /** 单个宫格高度 */
  itemHeight: {
    type: [Number, String],
    default: "80px",
  },
  /**
   * 宫格对齐方式，表现为数量少的时候，靠左，居中，还是靠右
   * @values left,center,right
   * */
  align: {
    type: String,
    default: "left",
  },
  /** 间隔 */
  gap: {
    type: [Number, String],
    default: 0,
  },
  /** 宫格的背景颜色 */
  bgColor: {
    type: String,
    default: "transparent",
  },
  /** 图标属性api配置集合 */
  iconConfig: Object as PropType<HyIconProps>,
  /** 定义需要用到的外部样式 */
  customStyle: Object as PropType<CSSProperties>,
  /** 自定义外部类名 */
  customClass: String,
});
const emit = defineEmits<IGridEmits>();

/**
 * @description 宫格对齐方式
 * */
const gridStyle = computed<CSSProperties>(() => {
  let style: CSSProperties = {};
  switch (props.align) {
    case "left":
      style.justifyContent = "flex-start";
      break;
    case "center":
      style.justifyContent = "center";
      break;
    case "right":
      style.justifyContent = "flex-end";
      break;
    default:
      style.justifyContent = "flex-start";
  }
  return Object.assign(style, props.customStyle);
});

const itemStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    background: props.bgColor,
    height: addUnit(props.itemHeight),
    width: "100%",
    border: props.border ? "0.5px solid #c8c7cc66" : "",
  };
  return style;
});

/**
 * @description 点击事件
 * */
const childClick = (name: string | Record<string, any>) => {
  emit("click", name);
};
</script>

<style lang="scss" scoped>
.hy-grid {
  grid-gap: v-bind(gap);
  grid-template-columns: repeat(v-bind(col), 1fr);
}
@import "./index.scss";
</style>
