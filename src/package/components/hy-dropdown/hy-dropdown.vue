<template>
  <view class="hy-dropdown" :style="dropdownStyle">
    <slot></slot>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-dropdown",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { provide, ref, computed } from "vue";
import type { CSSProperties, PropType } from "vue";
import { IconConfig } from "../../config";
import { addUnit } from "../../utils";

/**
 * 主要提供筛选下拉筛选框，内置基础筛选功能，可以根据自己的需求自定义筛选项。
 * @displayName hy-dropdown
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 标题菜单的高度，单位px */
  height: {
    type: [String, Number],
    default: 40,
  },
  /** 标题菜单是否显示下边框 */
  borderBottom: {
    type: Boolean,
    default: false,
  },
  /** 是否固定定位 */
  sticky: {
    type: Boolean,
    default: true,
  },
  /** 标题和选项卡选中的颜色 */
  activeColor: String,
  /** 标题和选项卡未选中的颜色 */
  inactiveColor: String,
  /** 图标名称 */
  menuIcon: {
    type: String,
    default: IconConfig.ARROW_DOWN_FILL,
  },
  /** 图标大小 */
  menuIconSize: {
    type: [String, Number],
    default: 14,
  },
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
});

//样式设置
const dropdownStyle = computed(() => {
  const style: CSSProperties = props.sticky
    ? {
        position: "fixed",
        left: 0,
        // #ifdef H5
        top: "44px",
        // #endif
        // #ifndef H5
        top: 0,
        // #endif
      }
    : {};
  style.height = addUnit(props.height);
  if (props.borderBottom) style.borderBottom = "1px solid #dadbde";

  return Object.assign(style, props.customStyle);
});

//当前打开的项（以标题标识）
const currentDropItem = ref("");
provide("dropdownProps", props);
provide("currentDropItem", currentDropItem);
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
