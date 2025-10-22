<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <hy-cell title="导航组件" :list="list" @click="showToast"></hy-cell>
    <hy-notify ref="hyNotifyRef"></hy-notify>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyNotify from "@/package/components/hy-notify/hy-notify.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import HyCell from "@/package/components/hy-cell/hy-cell.vue";
import { useThemeStore } from "@/store";
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";

const themeStore = useThemeStore();
const { themeColor, darkMode } = storeToRefs(themeStore);
const hyNotifyRef = ref<InstanceType<typeof HyNotify>>(null);
const list = reactive([
  {
    title: "默认",
    value: "info",
  },
  { title: "信息", value: "primary" },
  { title: "成功", value: "success" },
  { title: "错误", value: "error" },
  { title: "警告", value: "warning" },
]);

const showToast = (params) => {
  hyNotifyRef.value.show({
    message: `${params.title}提示信息`,
    type: params.value,
  });
};
</script>

<style scoped lang="scss"></style>
