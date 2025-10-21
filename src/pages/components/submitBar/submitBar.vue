<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <hy-submit-bar
      :menus="menus"
      :left-loading="true"
      @menu-click="clickMenuFn"
      @click="clickMenuFn"
    ></hy-submit-bar>
    <view class="hy-title">显示一个按钮</view>
    <hy-submit-bar
      :menus="menus"
      :fixed="false"
      :show-left-btn="false"
      right-btn-color="linear-gradient(to right, #4bfcfc, #FB39F5)"
    ></hy-submit-bar>
    <hy-submit-bar
      :menus="menus"
      :fixed="false"
      :show-right-btn="false"
    ></hy-submit-bar>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HySubmitBar from "@/package/components/hy-submit-bar/hy-submit-bar.vue";
import { reactive } from "vue";
import { IconConfig } from "@/package";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import { useThemeStore } from "@/store";
const themeStore = useThemeStore();

const { themeColor, darkMode } = themeStore;

const menus = reactive([
  { icon: IconConfig.HOME, text: "首页" },
  { icon: IconConfig.CUSTOMER_SERVICE, text: "客服" },
  {
    icon: IconConfig.SHOPPING_CART,
    text: "购物车",
    badge: { value: 10 },
  },
]);

const clickMenuFn = (i: number) => {
  uni.showToast({ title: `点击第${i}个` });
};
</script>

<style scoped lang="scss"></style>
