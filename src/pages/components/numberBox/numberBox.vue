<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">基础使用</view>
    <view class="hy-container">
      <hy-number-step v-model="value"></hy-number-step>
    </view>

    <view class="hy-title">步长设置</view>
    <view class="hy-container">
      <hy-number-step v-model="value" :step="3"></hy-number-step>
    </view>

    <view class="hy-title">禁用</view>
    <view class="hy-container">
      <hy-number-step v-model="value" disabled></hy-number-step>
    </view>

    <view class="hy-title">现在范围</view>
    <view class="hy-container">
      <hy-number-step v-model="value" :min="10" :max="20"></hy-number-step>
    </view>

    <view class="hy-title">自定义样式</view>
    <view class="hy-container">
      <hy-number-step v-model="value" :showMinus="!!value" :min="0">
        <template #minus>
          <view class="minus">
            <hy-icon :name="IconConfig.MINUS" size="12"></hy-icon>
          </view>
        </template>
        <template #input>
          <text style="width: 30px; text-align: center" class="input">{{
            value
          }}</text>
        </template>
        <template #plus>
          <view class="plus">
            <hy-icon
              :name="IconConfig.PLUS"
              color="#FFFFFF"
              size="12"
            ></hy-icon>
          </view>
        </template>
      </hy-number-step>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IconConfig } from "@/package";

import hyIcon from "@/package/components/hy-icon/hy-icon.vue";
import HyNumberStep from "@/package/components/hy-number-step/hy-number-step.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import { useThemeStore } from "@/store";
import { storeToRefs } from "pinia";
const themeStore = useThemeStore();

const { themeColor, darkMode } = storeToRefs(themeStore);
const value = ref(10);
</script>

<style scoped lang="scss">
.minus {
  width: 22px;
  height: 22px;
  border: 1px solid black;
  box-sizing: border-box;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input {
  padding: 0 10px;
}

.plus {
  width: 22px;
  height: 22px;
  background-color: #ff0000;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
