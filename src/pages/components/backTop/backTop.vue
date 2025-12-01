<template>
    <hy-config-provider
        :theme-color="color"
        :custom-style="{ height: '10000px' }"
        :theme="darkMode"
    >
        <hy-back-top
            :scrollTop="scrollTop"
            :mode="mode"
            :duration="duration"
            :right="right"
            :bottom="bottom"
        ></hy-back-top>
        <view class="hy-setting__box">
            <view class="hy-title">指示点</view>
            <hy-subsection :list="list_1" v-model="mode"></hy-subsection>

            <view class="hy-title">回去时长</view>
            <hy-slider v-model="duration" :min="100" :max="4000" show-value></hy-slider>

            <view class="hy-title">距离右边距离</view>
            <hy-slider v-model="right" :max="100" show-value></hy-slider>

            <view class="hy-title">距离底部距离</view>
            <hy-slider v-model="bottom" :max="500" show-value></hy-slider>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HySlider from '../../../package/components/hy-slider/hy-slider.vue'
import HySubsection from '../../../package/components/hy-subsection/hy-subsection.vue'
import HyBackTop from '@/package/components/hy-back-top/hy-back-top.vue'
import { ref } from 'vue'
import { onPageScroll } from '@dcloudio/uni-app'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)
const mode = ref<HyApp.ShapeType>('circle')
const duration = ref(500)
const right = ref(20)
const bottom = ref(100)
const scrollTop = ref(0)

onPageScroll((e) => {
    scrollTop.value = e.scrollTop
})

const list_1 = [
    { name: '圆形', value: 'circle' },
    { name: '方形', value: 'square' }
]
</script>

<style scoped lang="scss"></style>
