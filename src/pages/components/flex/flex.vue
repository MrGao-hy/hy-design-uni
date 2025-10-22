<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">基础使用</view>
    <view class="hy-container">
      <hy-flex
        :justify="justify"
        :vertical="vertical"
        :gap="gap"
        :align="align"
      >
        <hy-button size="small">提交</hy-button>
        <hy-button size="small" type="success">审核</hy-button>
        <hy-button size="small" type="error">删除</hy-button>
      </hy-flex>
    </view>

    <view class="hy-title">自动换行</view>
    <view class="hy-container">
      <hy-flex wrap="wrap" :gap="[15, 20]">
        <template v-for="item in 10">
          <hy-button size="small">按钮</hy-button>
        </template>
      </hy-flex>
    </view>

    <view class="hy-setting__box">
      <view class="hy-title">主轴对齐方式</view>
      <hy-subsection :list="list_1" v-model="justify"></hy-subsection>

      <view class="hy-title">纵轴对齐方式</view>
      <hy-subsection :list="list_2" v-model="align"></hy-subsection>

      <view class="hy-title">横排竖排</view>
      <hy-switch :list="list_1" v-model="vertical"></hy-switch>

      <view class="hy-title">网格间隙</view>
      <hy-slider :list="list_1" v-model="gap"></hy-slider>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import HyFlex from "@/package/components/hy-flex/hy-flex.vue";
import HyButton from "@/package/components/hy-button/hy-button.vue";
import HySubsection from "@/package/components/hy-subsection/hy-subsection.vue";
import HySwitch from "@/package/components/hy-switch/hy-switch.vue";
import HySlider from "@/package/components/hy-slider/hy-slider.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import type {
  FlexAlign,
  FlexJustify,
} from "@/package/components/hy-flex/typing";
import { useThemeStore } from "@/store";
import { storeToRefs } from "pinia";

const themeStore = useThemeStore();
const { themeColor, darkMode } = storeToRefs(themeStore);

const gap = ref(0);
const vertical = ref(false);
const justify = ref<FlexJustify>("flex-start");
const align = ref<FlexAlign>("flex-start");
const list_1 = reactive([
  "flex-start",
  "center",
  "flex-end",
  "space-between",
  "space-around",
  "space-evenly",
]);

const list_2 = reactive([
  "flex-start",
  "center",
  "flex-end",
  "stretch",
  "baseline",
]);
</script>

<style scoped lang="scss"></style>
