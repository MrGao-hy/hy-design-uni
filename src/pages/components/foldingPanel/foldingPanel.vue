<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <hy-folding-panel
      :list="columns"
      title="水果摊"
      :border="border"
      :size="size"
      :contentHeight="height"
      :showVertical="showVertical"
      :accordion="accordion"
    >
      <template #default="{ record }">
        <view style="padding: 20px">
          {{ record }}
        </view>
      </template>
    </hy-folding-panel>

    <view class="hy-setting__box">
      <view class="hy-title">滚动方向</view>
      <hy-subsection :list="list_1" v-model="size"></hy-subsection>

      <view class="hy-title">显示标题前缀竖线</view>
      <hy-switch v-model="showVertical"></hy-switch>

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
import HyFoldingPanel from '@/package/components/hy-folding-panel/hy-folding-panel.vue'
import HySlider from '../../../package/components/hy-slider/hy-slider.vue'
import HySubsection from '../../../package/components/hy-subsection/hy-subsection.vue'
import HySwitch from '../../../package/components/hy-switch/hy-switch.vue'
import { ref } from 'vue'
import { useThemeStore } from '@/store'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
const themeStore = useThemeStore()

const { themeColor, darkMode } = themeStore
const size = ref<HyApp.SizeType>('medium')
const border = ref(false)
const showVertical = ref(false)
const accordion = ref(false)
const height = ref(80)

const list_1 = [
  { name: '小', value: 'small' },
  { name: '中', value: 'medium' },
  { name: '大', value: 'large' },
]

const columns = [
  {
    title: '苹果',
    desc: 'apply',
    content: '我是内容_1',
  },
  {
    title: '香蕉',
    desc: 'banana',
    content: '我是内容_2',
  },
  {
    title: '橙汁',
    desc: 'org',
    error: true,
    content: '我是内容_3',
  },
]
</script>

<style scoped lang="scss"></style>
