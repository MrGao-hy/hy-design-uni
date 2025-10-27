<template>
  <view class="hy-folding-panel">
    <HyCell
      :title="title"
      :titleBorder="titleBorder"
      :border="border"
      :showVertical="showVertical"
      :verticalColor="verticalColor"
      :size="size"
      :disabled="disabled"
      :list="lists"
      @click="clickHandler"
    >
      <template #icon="{ icon }">
        <slot name="icon" :icon="icon"></slot>
      </template>
      <template #title="{ title }">
        <slot name="title" :title="title"></slot>
      </template>
      <template #value="{ record }">
        <slot name="value" :record="record"></slot>
      </template>
      <template #bottom="{ record }">
        <view
          class="hy-folding-panel__main"
          :style="[
            customStyle,
            {
              height: record?.spread ? addUnit(contentHeight) : '0px',
            },
          ]"
        >
          <slot :record="record?.content" />
        </view>
        <HyLine v-if="record?.spread"></HyLine>
      </template>
    </HyCell>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-folding-panel",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { CSSProperties, PropType } from "vue";
import type { IFoldingPanel, PanelVo } from "./typing";
import { ColorConfig, addUnit } from "../../libs";
// 组件
import HyCell from "../hy-cell/hy-cell.vue";
import HyLine from "../hy-line/hy-line.vue";

/**
 * 通过折叠面板收纳内容区域。
 * @displayName hy-folding-panel
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps({
  /** 数据集 */
  list: {
    type: Array as PropType<PanelVo[]>,
    default: [],
  },
  /** 是否手风琴模式 */
  accordion: {
    type: Boolean,
    default: false,
  },
  /** 头部标题 */
  title: String,
  /** 是否显示头部底部边框 */
  titleBorder: {
    type: Boolean,
    default: false,
  },
  /** 是否显示cell下边框 */
  border: {
    type: Boolean,
    default: true,
  },
  /** 标题前缀竖线颜色 */
  verticalColor: {
    type: String,
    default: ColorConfig.primary,
  },
  /** 是否显示标题前缀竖线 */
  showVertical: {
    type: Boolean,
    default: true,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 单元的大小
   * @values large,medium,small
   * */
  size: {
    type: String,
    default: "medium",
  },
  /** 内容面板高度 */
  contentHeight: {
    type: [Number, String],
    default: 120,
  },
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
});
const emit = defineEmits<IFoldingPanel>();

const lists = ref<PanelVo[]>([]);

watch(
  () => props.list,
  (newValue: PanelVo[]) => {
    lists.value = newValue.map((item) => ({
      ...item,
      arrowDirection: "down",
      spread: false,
    }));
  },
  { immediate: true },
);

const clickHandler = (temp: PanelVo, index: number) => {
  // if (temp?.disabled && temp?.animating) return;
  lists.value = props.list.map((item, i) => {
    if (props.accordion) {
      // 判断是否是收起来
      item.spread = i === index ? !item.spread : false;
    } else {
      if (i === index) {
        item.spread = !item.spread;
      }
    }

    item.arrowDirection = item.spread ? "up" : "down";
    return item;
  });
  const event: "open" | "close" = temp.spread ? "open" : "close";
  emit("change", temp, index);
  emit(event, temp, index);
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
