<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">基础示例</view>
    <view class="hy-container">
      <hy-swipe-action borderBottom :beforeClose="beforeClose">
        <view class="cell">
          <view class="cell-title">我是标题</view>
          <view class="cell-value">我是内容</view>
        </view>
      </hy-swipe-action>
    </view>

    <view class="hy-title">左边打开</view>
    <view class="hy-container">
      <hy-swipe-action borderBottom>
        <view class="cell">
          <view class="cell-title">我是标题</view>
          <view class="cell-value">我是内容</view>
        </view>
        <template #left>
          <view class="action">
            <view
              class="action-btn"
              :style="item.style"
              v-for="item in options"
            >
              {{ item.text }}
            </view>
          </view>
        </template>
      </hy-swipe-action>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HySwipeAction from "@/package/components/hy-swipe-action/hy-swipe-action.vue";
import { ref } from "vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import { useThemeStore } from "@/store";

const themeStore = useThemeStore();
const { themeColor, darkMode } = themeStore;
const show = ref(false);

const options = [
  {
    text: "收藏",
    style: {
      backgroundColor: "#3c9cff",
    },
  },
  {
    text: "删除",
    style: {
      backgroundColor: "#f56c6c",
    },
  },
];

const beforeClose = () => {
  uni.showToast({ title: "关闭", icon: "none" });
};
</script>

<style scoped lang="scss">
.cell {
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-value {
    font-size: $hy-font-size-sm;
    color: $hy-text-color--3;
  }
}
.action {
  display: flex;
  height: 100%;
  &-btn {
    padding: 0 15px;
    line-height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
  }
}
</style>
