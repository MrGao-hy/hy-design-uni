<template>
  <view
    :class="['hy-popover', customClass]"
    :style="customStyle"
    id="popover"
    @click.stop="popover.noop"
  >
    <!-- 使用插槽时无法获取正确宽高 -->
    <view class="hy-popover__pos hy-popover__hidden" id="pos">
      <view class="hy-popover__container">
        <view
          v-if="!slots.content && mode === 'normal'"
          class="hy-popover__inner"
        >
          {{ content }}
        </view>
        <view
          v-if="!slots.content && mode === 'menu' && isArray(content)"
          class="hy-popover__menu"
        >
          <view
            v-for="(item, index) in content"
            :key="index"
            class="hy-popover__menu-inner"
            @click="menuClick(index)"
          >
            <hy-icon
              v-if="item.iconClass"
              :name="item.iconClass"
              custom-class="hy-popover__icon"
            />
            <text>{{ item.content }}</text>
          </view>
        </view>
      </view>
    </view>

    <hy-transition
      custom-class="hy-popover__pos"
      :custom-style="popover.popStyle.value"
      :show="showPopover"
      :duration="200"
    >
      <view class="hy-popover__container">
        <!-- 三角形 -->
        <view
          :class="`hy-popover__arrow ${popover.arrowClass.value}`"
          :style="popover.arrowStyle.value"
        ></view>
        <!-- 三角形 -->

        <!-- 普通模式 -->
        <view
          v-if="!slots.content && mode === 'normal'"
          class="hy-popover__inner"
        >
          {{ content }}
        </view>
        <!-- 普通模式 -->

        <!-- 列表模式 -->
        <view
          v-if="!slots.content && mode === 'menu' && isArray(content)"
          class="hy-popover__menu"
        >
          <view
            v-for="(item, index) in content"
            :key="index"
            class="hy-popover__menu-inner"
            @click="menuClick(index)"
            :style="index === 0 ? 'border-top: none' : ''"
          >
            <hy-icon
              v-if="typeof item === 'object' && item.icon"
              :name="item.icon"
              custom-class="hy-popover__icon"
            />
            <view style="display: inline-block">
              {{
                typeof item === "object" && item.content ? item.content : item
              }}
            </view>
          </view>
        </view>
        <!-- 列表模式 -->

        <!-- 用户自定义样式 -->
        <slot name="content" v-else />
        <!-- 用户自定义样式 -->
      </view>
      <hy-icon
        v-if="showClose"
        name="close"
        custom-class="hy-popover__close-icon"
        @click="toggle"
      ></hy-icon>
    </hy-transition>
    <view @click="toggle" class="hy-popover__target" id="target">
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-popover",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared",
  },
};
</script>

<script lang="ts" setup>
import {
  getCurrentInstance,
  onMounted,
  onBeforeMount,
  onBeforeUnmount,
  ref,
  useSlots,
  watch,
  inject,
} from "vue";
import type { PropType, CSSProperties } from "vue";
import type {
  IOffset,
  IPlacementVo,
  IPopoverEmits,
  PopoverExpose,
} from "./typing";
import {
  type Queue,
  queueKey,
  usePopover,
  closeOther,
  pushToQueue,
  removeFromQueue,
  isArray,
} from "../../libs";
// 组件
import HyIcon from "../hy-icon/hy-icon.vue";
import HyTransition from "../hy-transition/hy-transition.vue";

/**
 * 常用于展示提示信息。
 * @displayName hy-popover
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 控制 popover 的显示状态 */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /** 显示的内容，也可以通过 slot#content 传入 */
  content: {
    type: [String, Array] as PropType<string | any[]>,
  },
  /**
   * 指定 popover 的放置位置
   * @values top,top-start,top-end,bottom,bottom-start,bottom-end,left,left-start,left-end,right,right-start,right-end
   * */
  placement: {
    type: String as PropType<IPlacementVo>,
    default: "bottom",
  },
  /** 控制 popover 的显示状态 */
  offset: {
    type: [Number, Array, Object] as PropType<IOffset>,
    default: 0,
  },
  /** 是否显示关闭按钮 */
  showClose: {
    type: Boolean,
    default: false,
  },
  /** 是否禁用 popover */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 当前显示的模式，决定内容的展现形式
   * @values normal,menu
   * */
  mode: {
    type: String,
    default: "normal",
  },
  /** 定义需要用到的外部样式 */
  customStyle: Object as PropType<CSSProperties>,
  /** 自定义外部类名 */
  customClass: String,
});
const emit = defineEmits<IPopoverEmits>();

const slots = useSlots();
const queue = inject<Queue | null>(queueKey, null);
const selector: string = "popover";
const visibleArrow = ref<boolean>(true);
const { proxy } = getCurrentInstance() as any;
const popover = usePopover();
const showPopover = ref<boolean>(false); // 控制popover显隐

watch(
  () => props.content,
  (newVal) => {
    if (props.mode === "normal" && typeof newVal !== "string") {
      console.error("在“normal”模式下，值类型必须为字符串类型。");
    } else if (props.mode === "menu" && !isArray(newVal)) {
      console.error("在“menu”模式下，值类型必须是数组类型。");
    }
  },
);

watch(
  () => props.placement,
  (newVal) => {
    popover.init(newVal, visibleArrow.value, selector);
  },
  { immediate: true },
);

watch(
  () => props.modelValue,
  (newValue: boolean) => {
    showPopover.value = newValue;
  },
);

watch(
  () => showPopover.value,
  (newValue) => {
    if (newValue) {
      popover.control(props.placement, props.offset);
      if (queue && queue.closeOther) {
        queue.closeOther(proxy);
      } else {
        closeOther(proxy);
      }
    }
    popover.showStyle.value = newValue
      ? "display: inline-block;"
      : "display: none;";
    emit("change", { show: newValue });
    emit(`${newValue ? "open" : "close"}`);
  },
);

onMounted(() => {
  setTimeout(() => {
    popover.init(props.placement, visibleArrow.value, selector);
  }, 2000);
});

onBeforeMount(() => {
  if (queue && queue.pushToQueue) {
    queue.pushToQueue(proxy);
  } else {
    pushToQueue(proxy);
  }
  popover.showStyle.value = showPopover.value ? "opacity: 1;" : "opacity: 0;";
});

onBeforeUnmount(() => {
  if (queue && queue.removeFromQueue) {
    queue.removeFromQueue(proxy);
  } else {
    removeFromQueue(proxy);
  }
});

const menuClick = (index: number) => {
  updateModelValue(false);
  emit("menuClick", {
    item: isArray(props.content) ? props.content[index] : props.content,
    index,
  });
};

const toggle = () => {
  if (props.disabled) return;
  updateModelValue(!showPopover.value);
};

const open = () => {
  updateModelValue(true);
};

const close = () => {
  updateModelValue(false);
};

function updateModelValue(value: boolean) {
  showPopover.value = value;
  emit("update:modelValue", value);
}

defineExpose<PopoverExpose>({
  open,
  close,
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
