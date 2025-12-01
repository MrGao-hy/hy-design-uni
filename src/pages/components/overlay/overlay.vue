<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-button type="primary" @click="show = !show">打开遮罩框</hy-button>
            <hy-overlay :show="show" @click="show = false" :opacity="opacity">
                <view @click.stop="onClick" class="hy-setting__box">
                    <view class="hy-title">透明度</view>
                    <hy-slider v-if="show" v-model="opacity" :min="0" :max="1" :step="0.1" />
                </view>
            </hy-overlay>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HyOverlay from '@/package/components/hy-overlay/hy-overlay.vue'
import HyButton from '@/package/components/hy-button/hy-button.vue'
import HySlider from '@/package/components/hy-slider/hy-slider.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)
const show = ref(false)
const opacity = ref(0.5)

const onClick = () => {}
</script>

<style scoped lang="scss">
.hy-setting__box {
    z-index: 999999;
}
</style>
