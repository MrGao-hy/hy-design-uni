<template>
  <!-- 小程序中使用 fixed 定位，避免样式兼容问题 -->
  {{ visible }}
  <view
    v-if="visible"
    class="toast"
    :class="['pos-' + position, mask ? 'has-mask' : '']"
  >
    <view class="toast-content">
      <!-- 图标 -->
      <view v-if="icon !== 'none'" class="toast-icon">
        <uni-icons :type="icon" :size="24" color="#fff"></uni-icons>
      </view>
      <!-- 文本 -->
      <text class="toast-text">{{ title }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import type { PropType } from "vue";

// 接收参数
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  icon: {
    type: String as PropType<"success" | "error" | "loading" | "none">,
    default: "none",
  },
  duration: {
    type: Number,
    default: 2000,
  },
  position: {
    type: String as PropType<"top" | "center" | "bottom">,
    default: "center",
  },
  mask: {
    type: Boolean,
    default: false,
  },
});

// 关闭事件
const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
}>();

// 监听显示状态，自动关闭
watch(
  () => props.visible,
  (newVal) => {
    if (newVal && props.duration > 0) {
      setTimeout(() => {
        emit("update:visible", false);
      }, props.duration);
    }
  },
);
</script>

<style scoped>
/* 基础样式（适配小程序rpx单位） */
.toast {
  position: fixed;
  z-index: 99999;
  display: flex;
  justify-content: center;
  width: 100%;
}

/* 位置样式 */
.pos-top {
  top: 100rpx;
}
.pos-center {
  top: 50%;
  transform: translateY(-50%);
}
.pos-bottom {
  bottom: 100rpx;
}

/* 蒙层 */
.has-mask {
  /* 小程序中蒙层需要单独处理，这里通过背景半透明实现 */
  padding-top: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
}

/* 内容样式 */
.toast-content {
  display: flex;
  align-items: center;
  padding: 16rpx 32rpx;
  border-radius: 8rpx;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
}

.toast-icon {
  margin-right: 16rpx;
}

.toast-text {
  font-size: 28rpx;
  line-height: 1.5;
}
</style>
