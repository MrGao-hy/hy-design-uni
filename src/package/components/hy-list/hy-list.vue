<template>
  <scroll-view
    ref="hyVirtualContainer"
    @scroll="onScroll"
    @scrolltolower="scrollToLower"
    :lower-threshold="showDivider ? 40 : 10"
    :scroll-y="true"
    scroll-with-animation
    class="hy-virtual-container"
  >
    <view class="hy-virtual-container__list">
      <slot
        v-if="slotDefault"
        :record="line === 1 ? virtualData : waterfall"
      ></slot>
      <template v-else>
        <view
          v-if="line === 1"
          class="hy-virtual-container__list--item"
          v-for="(item, i) in virtualData"
          :key="typeof item === 'string' ? i : item[keyField]"
          :style="itemStyle"
          @click="handleClick(item)"
        >
          <slot style="height: 100%" name="content" :record="item"></slot>
        </view>

        <view
          v-if="line === 2"
          class="hy-virtual-container__list--left hy-virtual-container__list--box"
        >
          <view
            v-if="slots.left"
            class="hy-virtual-container__list--box-item"
            v-for="item in waterfall.left"
            :key="item[keyField]"
            :style="itemStyle"
            @click="handleClick(item)"
          >
            <slot name="left" :record="item"></slot>
          </view>
          <slot v-else name="left-list" :record="waterfall.left"></slot>
        </view>
        <view
          v-if="line === 2"
          class="hy-virtual-container__list--right hy-virtual-container__list--box"
        >
          <view
            v-if="slots.right"
            class="hy-virtual-container__list--box-item"
            v-for="item in waterfall.right"
            :key="item[keyField]"
            :style="itemStyle"
            @click="handleClick(item)"
          >
            <slot name="right" :record="item"></slot>
          </view>
          <slot v-else name="right-list" :record="waterfall.right"></slot>
        </view>
      </template>
      <!--加载更多样式-->
    </view>
    <!--    <HyDivider :text="load" v-if="showDivider"></HyDivider>-->
  </scroll-view>
</template>

<script lang="ts">
export default {
  name: "hy-list",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  type PropType,
  reactive,
  ref,
  useSlots,
  watch,
} from "vue";
import type { CSSProperties } from "vue";
import { addUnit, getPx, getRect } from "../../utils";
import type { IListEmits } from "./typing";

/**
 * 实现只展示可视内容的dom，减少dom创建，优化滚动性能
 * @displayName hy-list
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 数据列表 */
  list: {
    type: Array as PropType<(string | Record<string, any>)[]>,
    default: () => [],
  },
  /** 容器高度，必须给个高度，否则加载全部数据 */
  containerHeight: {
    type: String,
    default: "100%",
  },
  /** 子容器的高度，必须和内容一致，否则计算有问题 */
  itemHeight: {
    type: [String, Number],
    default: "40px",
  },
  /** 子容器的底部，会计算到容器内 */
  marginBottom: {
    type: [String, Number],
    default: 10,
  },
  /** 子容器的内边距 */
  padding: {
    type: [String, Number],
    default: 10,
  },
  /** 子容器的圆角，单位px */
  borderRadius: {
    type: [String, Number],
    default: "3px",
  },
  /** 容器背景色 */
  background: {
    type: String,
    default: "transparent",
  },
  /** 是否显示边框 */
  border: {
    type: Boolean,
    default: false,
  },
  /** 展示几列 */
  line: {
    type: Number,
    default: 1,
  },
  /** 每一项的唯一标识key */
  keyField: {
    type: String,
    default: "id",
  },
  /**
   * 加载状态
   * @values loadMore,loading,noMore
   * */
  load: {
    type: String,
    default: "loadMore",
  },
  /** 显示底部加载状态 */
  showDivider: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits<IListEmits>();

const slots = useSlots();
// 滚动条距离顶部距离
const scrollTop = ref(0);
// 可视区域的高度
const viewHeight = ref(0);
const waterfall: {
  left: AnyObject[];
  right: AnyObject[];
} = reactive({
  left: [],
  right: [],
});
// 排列方式
const arrange = computed(() => (props.line === 1 ? "column" : "row"));
const boxHeight = getPx(props.itemHeight) + getPx(props.marginBottom);
const listHeight = addUnit(props.containerHeight);
const instance = getCurrentInstance();

onMounted(() => {
  nextTick(async () => {
    const res = await getRect(".hy-virtual-container", false, instance);
    viewHeight.value = (res as UniApp.NodeInfo).height ?? 0;
  });
});

const itemStyle = computed((): CSSProperties => {
  return {
    height: addUnit(props.itemHeight),
    padding: addUnit(props.padding),
    marginBottom: addUnit(props.marginBottom),
    borderRadius: addUnit(props.borderRadius),
    background: props.background,
    border: props.border ? "1px solid #dadbde" : "",
  };
});

/**
 * @description 虚拟列表真实展示数据：起始下标
 */
const start = computed(() => {
  const s = Math.floor(scrollTop.value / boxHeight);
  return Math.max(0, s * props.line);
});

/**
 * @description 虚拟列表真实展示数据：结束下标
 */
const over = computed(() => {
  const o = Math.floor(
    (scrollTop.value + viewHeight.value + 1) / boxHeight + 5,
  );
  return Math.min(props.list.length, o * props.line);
});

/**
 * @description 计算虚拟列表的padding(保持列表高度完整且滚动条能正常滚动)
 */
const paddingAttr = computed(() => {
  const paddingTop = start.value * boxHeight;
  const paddingBottom = (props.list.length - over.value) * boxHeight;
  return `${paddingTop / props.line}px 0 ${paddingBottom / props.line}px`;
});

/**
 * @description 虚拟列表真实展示数据
 */
const virtualData = computed<(string | Record<string, any>)[]>(() => {
  return props.list.slice(start.value, over.value);
});

watch(
  () => virtualData.value,
  (newVal) => {
    waterfall.left.length = 0;
    waterfall.right.length = 0;
    if (props.line === 2 && newVal!.every((item) => typeof item !== "string")) {
      newVal.forEach((item, i) => {
        if (i % 2 === 0) {
          waterfall.left.push(item as AnyObject);
        } else {
          waterfall.right.push(item as AnyObject);
        }
      });
    }
  },
  { immediate: true, deep: true },
);

/**
 * @description 监听滚动条距离顶部距离，实时更新
 */
const onScroll = async (e: any) => {
  scrollTop.value = e.detail.scrollTop ?? 0;
};

/**
 * @description 滚动底部函数
 * */
const scrollToLower = () => {
  emit("scrollToLower");
};

/**
 * @description 点击行触发函数
 * */
const handleClick = (temp: string | AnyObject) => {
  emit("click", temp);
};

/**
 * @description 获取默认插槽
 */
const slotDefault = useSlots().default;
</script>

<style lang="scss" scoped>
@import "./index.scss";
.hy-virtual-container {
  height: v-bind(listHeight);
  &__list {
    padding: v-bind(paddingAttr);
    display: flex;
    flex-direction: v-bind(arrange);
  }
}
</style>
