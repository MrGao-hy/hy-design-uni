<template>
    <the-root-page>
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
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '遮罩层'
    }
})

const show = ref(false)
const opacity = ref(0.5)

const onClick = () => {}

useShareButton()
</script>

<style scoped lang="scss">
.hy-setting__box {
    z-index: 999999;
}
</style>
