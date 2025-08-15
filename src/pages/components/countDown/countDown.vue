<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">基础使用</view>
    <view class="hy-container">
      <hy-count-down :time="30 * 60 * 60 * 1000"></hy-count-down>
    </view>

    <view class="hy-title">自定义格式</view>
    <view class="hy-container">
      <hy-count-down :time="30 * 60 * 60 * 1000" format="DD天HH时mm分ss秒"></hy-count-down>
    </view>

    <view class="hy-title">毫秒级渲染</view>
    <view class="hy-container">
      <hy-count-down :time="30 * 60 * 60 * 1000" format="HH:mm:ss:SSS" autoStart millisecond />
    </view>

    <view class="hy-title">自定义样式</view>
    <view class="hy-container">
      <hy-count-down :time="30 * 60 * 60 * 1000" autoStart>
        <template #default="{ record: timeData }">
          <view class="time">
            <view class="time__custom">
              <text class="time__custom__item">
                {{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours }}
              </text>
            </view>
            <text class="time__doc">:</text>
            <view class="time__custom">
              <text class="time__custom__item">{{ timeData.minutes }}</text>
            </view>
            <text class="time__doc">:</text>
            <view class="time__custom">
              <text class="time__custom__item">{{ timeData.seconds }}</text>
            </view>
          </view>
        </template>
      </hy-count-down>
    </view>

    <view class="hy-title">手动控制</view>
    <view class="hy-container">
      <hy-count-down
        ref="countDownRef"
        :time="10 * 1000"
        format="ss:SSS"
        :autoStart="false"
        millisecond
      ></hy-count-down>
      <view class="hy-flex">
        <hy-button text="重置" type="info" @click="reset"></hy-button>
        <hy-button text="开始" type="success" @click="start"></hy-button>
        <hy-button text="暂停" type="error" @click="pause"></hy-button>
      </view>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyCountDown from '@/package/components/hy-count-down/hy-count-down.vue'
import HyButton from '@/package/components/hy-button/hy-button.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { ref } from 'vue'
import { useThemeStore } from '@/store'
const themeStore = useThemeStore()

const { themeColor, darkMode } = themeStore
const countDownRef = ref<InstanceType<typeof HyCountDown>>()

// methods
const start = () => {
  if (countDownRef.value) {
    countDownRef.value.start()
  }
}

const pause = () => {
  if (countDownRef.value) {
    countDownRef.value.pause()
  }
}

const reset = () => {
  if (countDownRef.value) {
    countDownRef.value.reset()
  }
}
</script>

<style scoped lang="scss">
@import 'hy-app/theme.scss';
.time {
  display: flex;
  align-items: center;

  &__custom {
    margin-top: 4px;
    width: 22px;
    height: 22px;
    background-color: $hy-primary;
    border-radius: 4px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    justify-content: center;
    align-items: center;

    &__item {
      color: #fff;
      font-size: 12px;
      text-align: center;
    }
  }

  &__doc {
    color: $hy-primary;
    padding: 0 4px;
  }

  &__item {
    color: #606266;
    font-size: 15px;
    margin-right: 4px;
  }
}
</style>
