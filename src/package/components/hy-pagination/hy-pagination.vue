<template>
  <view
    class="hy-pagination"
    :style="customStyle"
    v-if="!(hideIfOnePage && totalPageNum === 1)"
  >
    <view class="hy-pagination__content">
      <hy-button
        :plain="modelValue > 1"
        type="info"
        size="small"
        :disabled="modelValue <= 1"
        shape="circle"
        class="hy-pagination__nav"
        @click="sub"
      >
        <text v-if="!showIcon">{{ prevText }}</text>
        <hy-icon
          v-else
          :class="`hy-pagination__left hy-pagination__icon ${
            modelValue <= 1
              ? 'hy-pagination__nav--disabled'
              : 'hy-pagination__nav--active'
          }`"
          :name="IconConfig.LEFT"
        ></hy-icon>
      </hy-button>
      <view class="hy-pagination__size">
        <text class="hy-pagination__current">{{ modelValue }}</text>
        <text class="hy-pagination__separator">/</text>
        <text>{{ totalPageNum }}</text>
      </view>
      <hy-button
        :plain="modelValue < totalPageNum"
        type="info"
        size="small"
        :disabled="modelValue >= totalPageNum"
        shape="circle"
        @click="add"
      >
        <text v-if="!showIcon">{{ nextText }}</text>
        <hy-icon
          v-else
          :custom-class="`hy-pagination__icon ${
            modelValue >= totalPageNum
              ? 'hy-pagination__nav--disabled'
              : 'hy-pagination__nav--active'
          }`"
          :name="IconConfig.RIGHT"
        ></hy-icon>
      </hy-button>
    </view>
    <view class="hy-pagination__message" v-if="showMessage">
      <text>当前页：{{ modelValue }}，</text>
      <text v-if="total">当前数据：{{ total }}，</text>
      <text>分页大小：{{ pageSize }}</text>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-pagination",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared",
  },
};
</script>

<script lang="ts" setup>
import { ref, watch } from "vue";
import type { CSSProperties, PropType } from "vue";
import type { IPaginationEmits } from "./typing";
import { IconConfig } from "../../libs";
// 组件
import HyIcon from "../hy-icon/hy-icon.vue";
import HyButton from "../hy-button/hy-button.vue";

/**
 * 当数据量过多时，使用分页分解数据。
 * @displayName hy-pagination
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps({
  /** 当前页 */
  modelValue: {
    type: Number,
    default: 1,
  },
  /** 总页数，如果有total，则优先使用total计算页数 */
  totalPage: {
    type: Number,
    default: 1,
  },
  /** 是否展示分页为Icon图标 */
  showIcon: {
    type: Boolean,
    default: false,
  },
  /** 是否展示总条数 */
  showMessage: {
    type: Boolean,
    default: false,
  },
  /** 总条数 */
  total: {
    type: Number,
    default: 0,
  },
  /** 每页条数 */
  pageSize: {
    type: Number,
    default: 10,
  },
  /** 上一页文本 */
  prevText: {
    type: String,
    default: "上一页",
  },
  /** 下一页文本 */
  nextText: {
    type: String,
    default: "下一页",
  },
  /** 总页数只有一页时是否隐藏 */
  hideIfOnePage: {
    type: Boolean,
    default: true,
  },
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
});
const emit = defineEmits<IPaginationEmits>();

const totalPageNum = ref<number>(0); // 总页数

watch(
  () => props.totalPage,
  (newValue) => {
    if (!totalPageNum.value && newValue) {
      totalPageNum.value = totalPageNum.value;
    }
  },
  { immediate: true, deep: true },
);

watch(
  () => props.total,
  () => {
    updateTotalPage();
  },
  { immediate: true, deep: true },
);

/**
 * @description 加数
 * */
const add = () => {
  const { modelValue } = props;
  if (modelValue > totalPageNum.value - 1) {
    return;
  }
  emit("change", { value: modelValue + 1 });
  emit("update:modelValue", modelValue + 1);
};

const sub = () => {
  const { modelValue } = props;
  if (modelValue < 2) {
    return;
  }
  emit("change", { value: modelValue - 1 });
  emit("update:modelValue", modelValue - 1);
};

function updateTotalPage() {
  const { total, pageSize } = props;
  totalPageNum.value = Math.ceil(total / pageSize);
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
