<template>
  <view>
    <hy-login @login="loginFn"></hy-login>
  </view>
</template>

<script setup lang="ts">
import HyLogin from "@/package/components/hy-login/hy-login.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";

const loginFn = () => {
  // uni.switchTab({ url: "/pages/index/Index" });
  uni.showToast({ title: "登录成功" });
};
</script>

<style scoped lang="scss"></style>
