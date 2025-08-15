<template>
  <view>
    <HyPopup
      :show="showPopup"
      :duration="duration"
      mode="bottom"
      :close-on-click-overlay="closeOnClickOverlay"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      @open="onOpen"
      @close="onClose"
      :z-index="zIndex"
      :round="round"
    >
      <view
        :class="`hy-action-sheet ${customClass}`"
        :style="`${
          (actions && actions.length) || (panels && panels.length)
            ? 'margin: 0 10px calc(var(--window-bottom) + 10px) 10px; border-radius: 16px;'
            : 'margin-bottom: var(--window-bottom);'
        } ${customStyle}`"
      >
        <!-- 标题 -->
        <view
          v-if="title"
          :class="`hy-action-sheet__header ${customHeaderClass}`"
        >
          {{ title }}
          <HyIcon
            customClass="hy-action-sheet__close"
            class="hy-action-sheet__close"
            name="close"
            @click="onClose"
          />
        </view>
        <!-- 标题 -->

        <!-- 选项卡 -->
        <view class="hy-action-sheet__actions" v-if="actions && actions.length">
          <button
            v-for="(action, rowIndex) in actions"
            :key="rowIndex"
            :class="`hy-action-sheet__action ${
              action?.disabled ? 'hy-action-sheet__action--disabled' : ''
            }  ${action?.loading ? 'hy-action-sheet__action--loading' : ''}`"
            :style="`color: ${action?.color}`"
            @click="onSelect(rowIndex, 'action')"
          >
            <HyLoading :show="!!action?.loading" mode="circle" />
            <view v-if="!action?.loading" class="hy-action-sheet__name">{{
              action?.name
            }}</view>
            <view
              v-if="!action?.loading && action?.sub"
              class="hy-action-sheet__subname"
            >
              {{ action?.sub }}
            </view>
          </button>
        </view>
        <!-- 选项卡 -->

        <!-- 自定义面板 -->
        <view v-if="formatPanels && formatPanels.length">
          <view
            v-for="(panel, rowIndex) in formatPanels"
            :key="rowIndex"
            class="hy-action-sheet__panels"
          >
            <view class="hy-action-sheet__panels-content">
              <view
                v-for="(col, colIndex) in panel"
                :key="colIndex"
                class="hy-action-sheet__panel"
                @click="onSelect(rowIndex, 'panels', colIndex)"
              >
                <image
                  class="hy-action-sheet__panel-img"
                  :src="(col as any).iconUrl"
                />
                <view class="hy-action-sheet__panel-title">{{
                  (col as any).name
                }}</view>
              </view>
            </view>
          </view>
        </view>
        <!-- 自定义面板 -->

        <!-- 面板插槽 -->
        <slot />
        <!-- 自定义面板 -->

        <!-- 取消按钮 -->
        <HyButton
          v-if="cancelText"
          :text="cancelText"
          shape="circle"
          custom-class="hy-action-sheet__cancel"
          @click="handleCancel"
        ></HyButton>
        <!-- 取消按钮 -->
      </view>
    </HyPopup>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-action-sheet",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script lang="ts" setup>
import { watch, ref } from "vue";
import type { PropType, CSSProperties } from "vue";
import { isArray } from "../../utils";
import type {
  IActionSheetPanel,
  IActionSheetEmits,
  IActionSheetAction,
} from "./typing";
// 组件
import HyIcon from "../hy-icon/hy-icon.vue";
import HyPopup from "../hy-popup/hy-popup.vue";
import HyLoading from "../hy-loading/hy-loading.vue";
import HyButton from "../hy-button/hy-button.vue";

/**
 * 本组件用于从底部弹出一个操作菜单，供用户选择并返回结果。本组件功能类似于uni的uni.showActionSheetAPI，配置更加灵活，所有平台都表现一致。
 * @displayName hy-action-sheet
 */
defineOptions({});

// const props = withDefaults(defineProps<HyActionSheetProps>(), defaultProps)
const props = defineProps({
  /** 操作菜单是否展示 */
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
  /** 菜单选项列表 */
  actions: {
    type: Array as PropType<IActionSheetAction[]>,
    default() {
      return [];
    },
  },
  /** 自定义面板项,可以为字符串数组，也可以为对象数组，如果为二维数组，则为多行展示 */
  panels: {
    type: Array as PropType<Array<IActionSheetPanel | IActionSheetPanel[]>>,
    default() {
      return [];
    },
  },
  /** 操作菜单是否展示 */
  round: {
    type: [String, Number],
    default: 20,
  },
  /** 标题 */
  title: String,
  /**
   * 标题文字位置
   * @values left,center,right
   * */
  titleAlign: {
    type: String,
    default: "center",
  },
  /** 取消按钮的提示文字,不为空时显示按钮 */
  cancelText: String,
  /** 点击某个菜单项时是否关闭弹窗 */
  closeOnClickAction: {
    type: Boolean,
    default: true,
  },
  /** 点击遮罩是否允许关闭 */
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  /** 弹框动画持续时间 */
  duration: {
    type: Number,
    default: 200,
  },
  /** 菜单层级 */
  zIndex: {
    type: Number,
    default: 100,
  },
  /** 处理底部安全区 */
  safeAreaInsetBottom: {
    type: Boolean,
    default: true,
  },
  /** 自定义外部样式 */
  customStyle: Object as PropType<CSSProperties>,
  /** 自定义外部类名 */
  customClass: String,
  /** 自定义标题类名 */
  customHeaderClass: String,
});
const emit = defineEmits<IActionSheetEmits>();

const formatPanels = ref<Array<IActionSheetPanel> | Array<IActionSheetPanel[]>>(
  [],
);
const showPopup = ref<boolean>(false);

watch(() => props.panels, computedValue, { deep: true, immediate: true });

watch(
  () => props.modelValue,
  (newValue) => {
    showPopup.value = newValue;
  },
  { deep: true, immediate: true },
);

function isPanelArray() {
  return props.panels.length && !isArray(props.panels[0]);
}
function computedValue() {
  formatPanels.value = isPanelArray()
    ? [props.panels as IActionSheetPanel[]]
    : (props.panels as IActionSheetPanel[][]);
}

function onSelect(
  rowIndex: number,
  type: "action" | "panels",
  colIndex?: number,
) {
  if (type === "action") {
    if (props.actions[rowIndex].disabled || props.actions[rowIndex].loading) {
      return;
    }
    emit("select", {
      item: props.actions[rowIndex],
      index: rowIndex,
    });
  } else if (isPanelArray()) {
    emit("select", {
      item: props.panels[Number(colIndex)],
      index: colIndex,
    });
  } else {
    emit("select", {
      item: (props.panels as IActionSheetPanel[][])[rowIndex][Number(colIndex)],
      rowIndex,
      colIndex,
    });
  }
  if (props.closeOnClickAction) {
    onClose();
  }
}
function handleCancel() {
  emit("cancel");
  onClose();
}
function onClose() {
  emit("update:modelValue", false);
  emit("close");
}
function onOpen() {
  emit("open");
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
.hy-action-sheet__header {
  text-align: v-bind(titleAlign);
}
</style>
