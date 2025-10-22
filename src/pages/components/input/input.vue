<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">基础使用</view>
    <view class="hy-container">
      <hy-input
        v-model="value"
        :shape="shape"
        :border="border"
        :type="type"
        clearable
        :disabled="disabled"
        placeholder="输入值"
      ></hy-input>
    </view>

    <view class="hy-title">清空按钮</view>
    <view class="hy-container">
      <hy-input
        v-model="value2"
        clearable
        focus
        placeholder="输入值"
      ></hy-input>
    </view>

    <view class="hy-title">icon</view>
    <view class="hy-container">
      <hy-input
        v-model="value"
        :prefixIcon="{
          name: IconConfig.LOCK,
        }"
        :suffix-icon="{
          name: IconConfig.DOWN,
        }"
        :disabled="disabled"
        border="bottom"
      ></hy-input>
    </view>

    <view class="hy-title">自定义icon</view>
    <view class="hy-container">
      <hy-input
        v-model="value"
        :prefixIcon="{
          name: 'feishu-gray',
          customPrefix: 'icon',
          color: 'red',
        }"
        :disabled="disabled"
        border="bottom"
      ></hy-input>
    </view>

    <view class="hy-setting__box">
      <view class="hy-title">禁用</view>
      <hy-switch v-model="disabled"></hy-switch>

      <view class="hy-title">输入框形状</view>
      <hy-subsection :list="list_1" v-model="shape"></hy-subsection>

      <view class="hy-title">输入框类型</view>
      <hy-subsection :list="list_2" v-model="type"></hy-subsection>

      <view class="hy-title">边框</view>
      <hy-subsection :list="list_3" v-model="border"></hy-subsection>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import HyInput from "@/package/components/hy-input/hy-input.vue";
import HySubsection from "@/package/components/hy-subsection/hy-subsection.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import { IconConfig } from "@/package";
import { useThemeStore } from "@/store";
import HySwitch from "../../../package/components/hy-switch/hy-switch.vue";
import type { InputType } from "@uni-helper/uni-types";
import { storeToRefs } from "pinia";

const themeStore = useThemeStore();
const { themeColor, darkMode } = storeToRefs(themeStore);
const value = ref("");
const value2 = ref("中国速度，东风快递，使命必达，风雨无阻！！！");
const disabled = ref(false);
const shape = ref<HyApp.ShapeType>("square");
const type = ref<InputType>("text");
const border = ref<HyApp.BorderType>("surround");

const list_1 = reactive([
  { name: "半圆", value: "circle" },
  { name: "方形", value: "square" },
]);

const list_2 = reactive([
  { name: "文本", value: "text" },
  { name: "数字", value: "number" },
  { name: "身份证id", value: "idcard" },
  { name: "方形", value: "digit" },
  { name: "密码", value: "password" },
]);

const list_3 = reactive([
  { name: "四周边框", value: "surround" },
  { name: "底部边框", value: "bottom" },
  { name: "无边框", value: "none" },
]);
</script>

<style scoped lang="scss"></style>
