<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <hy-cell title="消息提示" :list="list" @click="showToast"></hy-cell>
    <hy-toast></hy-toast>

    <view class="hy-setting__box">
      <view class="hy-title">显示图标</view>
      <hy-switch v-model="icon" />

      <view class="hy-title">加载中(设置五秒钟后自动关闭)</view>
      <hy-switch v-model="loading" />

      <view class="hy-title">加载图标形状</view>
      <hy-subsection :list="list_2" v-model="loadMode"></hy-subsection>

      <view class="hy-title">显示位置</view>
      <hy-subsection :list="list_1" v-model="position"></hy-subsection>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import HyToast from "@/package/components/hy-toast/hy-toast.vue";
import HyCell from "@/package/components/hy-cell/hy-cell.vue";
import HySubsection from "../../../package/components/hy-subsection/hy-subsection.vue";
import HySwitch from "../../../package/components/hy-switch/hy-switch.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import { useThemeStore } from "@/store";
import { storeToRefs } from "pinia";
import { useToast } from "@/package";

const toast = useToast();

const themeStore = useThemeStore();

const { themeColor, darkMode } = storeToRefs(themeStore);
const list = reactive([
  { title: "默认", value: "show" },
  { title: "信息", value: "info" },
  { title: "主题", value: "primary" },
  { title: "成功", value: "success" },
  { title: "错误", value: "error" },
  { title: "警告", value: "warning" },
]);
const icon = ref(true);
const loading = ref(false);
const loadMode = ref("circle");
const position = ref("center");
const list_1 = [
  { name: "上面", value: "top" },
  { name: "中间", value: "center" },
  { name: "下面", value: "bottom" },
];
const list_2 = [
  { name: "经典花", value: "spinner" },
  { name: "圆圈", value: "circle" },
  { name: "半圆", value: "semicircle" },
];

onMounted(() => {
  // hyToastRef.value.show({
  //   message: "我是默认提示信息",
  //   type: "error",
  //   icon: true,
  //   duration: 1000000,
  //   position: "top",
  // });
});

const showToast = (params: AnyObject) => {
  (toast as any)[params.value]?.(`${params.title}提示信息`, {
    icon: params.value !== "show" ? icon.value : "",
    loading: loading.value,
    loadMode: loadMode.value,
    position: position.value,
  });

  if (loading.value) {
    const timer = setTimeout(() => {
      toast.close();
      clearTimeout(timer);
    }, 5000);
  }
};
</script>

<style scoped lang="scss"></style>
