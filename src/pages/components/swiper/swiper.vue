<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-margin">
            <hy-swiper
                :list="list"
                indicator
                :indicatorMode="mode"
                :height="height"
                :duration="duration"
                :interval="interval"
            ></hy-swiper>
        </view>

        <view class="hy-margin">
            <hy-swiper
                :list="list"
                indicator
                :indicatorMode="mode"
                previousMargin="30"
                nextMargin="30"
                circular
                radius="5"
                bgColor="#ffffff"
                :duration="duration"
                :interval="interval"
            ></hy-swiper>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">指示点</view>
            <hy-subsection :list="list_1" v-model="mode"></hy-subsection>

            <view class="hy-title">轮播图高度</view>
            <hy-slider v-model="height" :max="500"></hy-slider>

            <view class="hy-title">轮播图切换时间</view>
            <hy-slider v-model="duration" :min="100" :max="1000"></hy-slider>

            <view class="hy-title">轮播图自动切换间隔</view>
            <hy-slider v-model="interval" :min="1000" :max="5000"></hy-slider>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import HySwiper from '@/package/components/hy-swiper/hy-swiper.vue'
import HySubsection from '@/package/components/hy-subsection/hy-subsection.vue'
import HySlider from '@/package/components/hy-slider/hy-slider.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)
const list = ref([
    'https://img0.baidu.com/it/u=1913990970,584854398&fm=253&id=1',
    'http://mms2.baidu.com/it/u=204741874,3444396868&fm=253&id=2',
    'https://img2.baidu.com/it/u=3042825715,659259329&fm=253&id=3',
    'https://img2.baidu.com/it/u=109690972,2214958998&fm=253&id=4',
    'http://mms0.baidu.com/it/u=2161107790,808970254&fm=253&id=5',
    'https://img2.baidu.com/it/u=4211554685,400408647&fm=253&id=6',
    'https://img2.baidu.com/it/u=2237681987,1998118702&fm=253&id=7',
    'https://img1.baidu.com/it/u=2494879897,1602792615&fm=253&id=8'
])
const mode = ref<HyApp.SwiperIndicatorModeType>('line')
const height = ref<number>(130)
const duration = ref<number>(300)
const interval = ref<number>(3000)

const list_1 = reactive([
    { name: '线', value: 'line' },
    { name: '点', value: 'dot' }
])
</script>

<style scoped lang="scss"></style>
