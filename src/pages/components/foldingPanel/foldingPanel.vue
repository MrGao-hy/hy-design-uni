<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <hy-folding-panel
      v-model="activeIndex"
      :accordion="accordion"
      :border="border"
      :disabled="disabled"
      :size="size"
    >
      <hy-folding-panel-item title="水果" index="fruits">
        内容一
      </hy-folding-panel-item>
      <hy-folding-panel-item title="主食" index="food">
        内容二
      </hy-folding-panel-item>
      <hy-folding-panel-item
        title="饮品"
        index="beverage"
        value="奶茶"
        :default-open="true"
      >
        内容三
      </hy-folding-panel-item>
      <hy-folding-panel-item index="title">
        <template #title>
          <view class="hy-folding-panel-item__title">自定义标题</view>
        </template>
        内容四
      </hy-folding-panel-item>
      <hy-folding-panel-item index="header">
        <template #header>
          <view class="hy-folding-panel-item__title">自定义头部</view>
        </template>
        内容五
      </hy-folding-panel-item>
    </hy-folding-panel>

    <view class="hy-setting__box">
      <view class="hy-title">大小</view>
      <hy-subsection :list="list_1" v-model="size"></hy-subsection>

      <view class="hy-title">是否禁用</view>
      <hy-switch v-model="disabled"></hy-switch>

      <view class="hy-title">显示下边框</view>
      <hy-switch v-model="border"></hy-switch>

      <view class="hy-title">是否手风琴</view>
      <hy-switch v-model="accordion"></hy-switch>

      <view class="hy-title">内容高度</view>
      <hy-slider v-model="height" :min="50" :max="300" showValue></hy-slider>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HySlider from "@/package/components/hy-slider/hy-slider.vue";
import HySubsection from "@/package/components/hy-subsection/hy-subsection.vue";
import HySwitch from "@/package/components/hy-switch/hy-switch.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import HyFoldingPanel from "../../../package/components/hy-folding-panel/hy-folding-panel.vue";
import HyFoldingPanelItem from "@/package/components/hy-folding-panel-item/hy-folding-panel-item.vue";
import { ref } from "vue";
import { useThemeStore } from "@/store";
import { storeToRefs } from "pinia";
const themeStore = useThemeStore();

const { themeColor, darkMode } = storeToRefs(themeStore);
const size = ref<HyApp.SizeType>("medium");
const border = ref(true);
const disabled = ref(false);
const accordion = ref(false);
const height = ref(80);
const activeIndex = ref(1);

const list_1 = [
  { name: "小", value: "small" },
  { name: "中", value: "medium" },
  { name: "大", value: "large" },
];

const columns = [
  {
    title: "苹果",
    desc: "apply",
    content: "我是内容_1",
  },
  {
    title: "香蕉",
    desc: "banana",
    content: "我是内容_2",
  },
  {
    title: "橙汁",
    desc: "org",
    error: true,
    content: "我是内容_3",
  },
];
</script>

<style scoped lang="scss">
.hy-folding-panel {
  //width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: $hy-box-shadow;
}
</style>
