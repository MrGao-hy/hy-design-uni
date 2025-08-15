<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">基础使用</view>
    <view class="hy-container">
      <hy-count-to :startVal="30" :endVal="500"></hy-count-to>
    </view>

    <view class="hy-title">显示小数点</view>
    <view class="hy-container">
      <hy-count-to :endVal="1542221" :decimals="2"></hy-count-to>
    </view>

    <view class="hy-title">千分位分隔符</view>
    <view class="hy-container">
      <hy-count-to :endVal="1542221" separator=","></hy-count-to>
    </view>

    <view class="hy-title">设置滚动时间</view>
    <view class="hy-container">
      <hy-count-to :endVal="1542" :duration="10000"></hy-count-to>
    </view>

    <view class="hy-title">设置字体</view>
    <view class="hy-container">
      <hy-count-to :endVal="1542" bold fontSize="40" color="#31E749"></hy-count-to>
    </view>

    <view class="hy-title">手动控制</view>
    <view class="hy-container">
      <hy-count-to
        ref="countToRef"
        :endVal="1542222"
        :duration="10000"
        :autoplay="false"
      ></hy-count-to>
      <view class="hy-flex">
        <hy-button text="开始" type="success" @click="start"></hy-button>
        <hy-button text="暂停" type="error" @click="pause"></hy-button>
        <hy-button text="继续" type="info" @click="resume"></hy-button>
      </view>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyCountTo from '@/package/components/hy-count-to/hy-count-to.vue'
import HyButton from '@/package/components/hy-button/hy-button.vue'
import { ref } from 'vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
const themeStore = useThemeStore()

const { themeColor, darkMode } = themeStore
const countToRef = ref<InstanceType<typeof HyCountTo>>()

// methods
const start = () => {
  if (countToRef.value) {
    countToRef.value.start()
  }
}

const pause = () => {
  if (countToRef.value) {
    countToRef.value.stop()
  }
}

const resume = () => {
  if (countToRef.value) {
    countToRef.value.resume()
  }
}
</script>

<style scoped lang="scss"></style>
