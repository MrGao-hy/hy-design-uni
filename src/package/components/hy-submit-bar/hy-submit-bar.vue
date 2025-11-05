<template>
  <view
    :class="['hy-submit-bar', border && 'hy-border__top', customClass]"
    :style="submitBarStyle"
  >
    <view class="hy-submit-bar__left">
      <slot v-if="$slots.left" name="left"></slot>
      <view
        v-else-if="menus.length"
        class="hy-submit-bar__left--item"
        v-for="(item, i) in menus"
        :key="i"
        @tap="clickMenuFn(i)"
      >
        <HyIcon
          :name="item.icon"
          :label="item.text"
          :color="iconColor"
          :label-color="iconLabelColor"
          labelPos="bottom"
          space="7"
          :size="20"
        ></HyIcon>
        <HyBadge
          :value="item?.badge?.value"
          :absolute="true"
          :offset="item?.badge?.offset || [-5, 20]"
          :isDot="item?.badge?.isDot"
          :type="item?.badge?.type"
          :color="item?.badge?.color"
          :shape="item?.badge?.shape"
          :numberType="item?.badge?.numberType"
          :inverted="item?.badge?.inverted"
        ></HyBadge>
      </view>
    </view>
    <view class="hy-submit-bar__right">
      <slot v-if="$slots.right" name="right"></slot>
      <template v-else>
        <view
          class="hy-submit-bar__right--button"
          v-if="showLeftBtn"
          :style="leftBtnStyle"
          @tap.stop="confirmClickFn(0)"
        >
          <HyLoading
            :show="leftLoading"
            size="13"
            mode="circle"
            :custom-style="{ marginRight: '10rpx' }"
          ></HyLoading>
          {{ leftBtnText }}
        </view>
        <view
          class="hy-submit-bar__right--button"
          v-if="showRightBtn"
          :style="rightBtnStyle"
          @tap.stop="confirmClickFn(1)"
        >
          <HyLoading
            :show="rightLoading"
            size="13"
            mode="circle"
            :custom-style="{ marginRight: '10rpx' }"
          ></HyLoading>
          {{ rightBtnText }}
        </view>
      </template>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-submit-bar",
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
import type { IconMenus, ISubmitBarEmits } from "./typing";
// 组件
import HyIcon from "../hy-icon/hy-icon.vue";
import HyLoading from "../hy-loading/hy-loading.vue";
import HyBadge from "../hy-badge/hy-badge.vue";

/**
 * 该布局一般用于商品详情页底部引导用户快速购买商品的场景，开发者可以根据自己的需求修改布局结构和样式。
 * @displayName hy-submit-bar
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 左边菜单栏 */
  menus: {
    type: Array as unknown as PropType<IconMenus[]>,
    default: [],
  },
  /** 绝对定位 */
  fixed: {
    type: Boolean,
    default: true,
  },
  /** 是否显示边框 */
  border: {
    type: Boolean,
    default: true,
  },
  /** 加载左边按钮loading */
  leftLoading: {
    type: Boolean,
    default: false,
  },
  /** 加载右边按钮loading */
  rightLoading: {
    type: Boolean,
    default: false,
  },
  /** 左边icon的颜色 */
  iconColor: String,
  /** 左边文字的颜色 */
  iconLabelColor: {
    type: String,
    default: "#909193FF",
  },
  /** 右边按钮文字颜色 */
  textColor: String,
  /** 显示左边按钮 */
  showLeftBtn: {
    type: Boolean,
    default: true,
  },
  /** 显示右边按钮 */
  showRightBtn: {
    type: Boolean,
    default: true,
  },
  /** 左边按钮文字 */
  leftBtnText: {
    type: String,
    default: "加入购物车",
  },
  /** 右边按钮文字 */
  rightBtnText: {
    type: String,
    default: "立即购买",
  },
  /** 左边按钮颜色，支持渐变色 */
  leftBtnColor: {
    type: String,
    default: "#ed3f14",
  },
  /** 有边按钮颜色，支持渐变色 */
  rightBtnColor: {
    type: String,
    default: "#ff7900",
  },
  /**
   * 按钮的形状
   * @values circle,square
   * */
  shape: {
    type: String,
    default: "circle",
  },
  /** 层级 */
  zIndex: {
    type: [Number, String],
    default: 999,
  },
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => {},
  },
  /** 自定义外部类名 */
  customClass: String,
});
const emit = defineEmits<ISubmitBarEmits>();

/**
 * @description 整体样式
 * */
const submitBarStyle = computed(() => {
  const style: CSSProperties = {
    bottom: 0,
    left: 0,
    zIndex: props.zIndex,
  };
  if (props.fixed) style.position = "fixed";
  return Object.assign(style, props.customStyle);
});

/**
 * @description 左边按钮样式
 * */
const leftBtnStyle = computed(() => {
  const style: CSSProperties = {
    background: props.leftBtnColor,
    color: props.textColor,
  };
  if (!props.showRightBtn) {
    style.flex = 1;
    if (props.shape === "circle") {
      style.borderRadius = "100px";
    } else {
      style.borderRadius = "2px";
    }
  } else {
    if (props.shape === "circle") {
      style.borderRadius = "100px 0 0 100px";
    } else {
      style.borderRadius = "2px 0 0 2px";
    }
  }
  return style;
});

/**
 * @description 右边按钮样式
 * */
const rightBtnStyle = computed(() => {
  const style: CSSProperties = {
    background: props.rightBtnColor,
    color: props.textColor,
  };
  if (!props.showLeftBtn) {
    style.flex = 1;
    if (props.shape === "circle") {
      style.borderRadius = "100px";
    } else {
      style.borderRadius = "2px";
    }
  } else {
    if (props.shape === "circle") {
      style.borderRadius = "0 100px 100px 0";
    } else {
      style.borderRadius = "0 2px 2px 0";
    }
  }
  return style;
});

/**
 * @description 点击左边图标
 * */
const clickMenuFn = (i: number) => {
  emit("menuClick", i);
};

/**
 * @description 点击按钮
 * */
const confirmClickFn = (i: number) => {
  if (
    (!props.leftLoading && !props.rightLoading) ||
    (props.leftLoading && i !== 0) ||
    (props.rightLoading && i !== 1)
  ) {
    emit("click", i);
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
