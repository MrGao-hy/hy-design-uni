<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">基础示例</view>
    <view class="hy-container">
      <hy-pagination v-model="current" :total="999"></hy-pagination>
    </view>

    <view class="hy-title">icon</view>
    <view class="hy-container">
      <hy-pagination v-model="current" showIcon :total="12"></hy-pagination>
    </view>

    <view class="hy-title">文字提示</view>
    <view class="hy-container">
      <hy-pagination v-model="current" showMessage :total="999"></hy-pagination>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import HyPagination from "@/package/components/hy-pagination/hy-pagination.vue";
import { useThemeStore } from "@/store";
import { ref } from "vue";
import { storeToRefs } from "pinia";

const themeStore = useThemeStore();
const { themeColor, darkMode } = storeToRefs(themeStore);

const current = ref(1);
</script>

<style scoped lang="scss"></style>
