<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-title">头像骨架屏</view>
        <view class="hy-container">
            <hy-skeleton theme="avatar" animation="gradient" />
        </view>
        <view class="hy-title">图片骨架屏</view>
        <view class="hy-container">
            <hy-skeleton theme="image" :row-col="imageGroup" animation="gradient" />
        </view>
        <view class="hy-title">文本骨架屏</view>
        <view class="hy-container">
            <hy-skeleton theme="text" />
        </view>
        <view class="hy-title">段落骨架屏</view>
        <view class="hy-container">
            <hy-skeleton theme="paragraph" />
        </view>

        <view class="hy-title">单元格骨架屏</view>
        <view class="hy-container">
            <view class="hy-flex" style="margin-bottom: 20px">
                <hy-skeleton :row-col="[{ size: '48px', type: 'circle' }]" />
                <hy-skeleton
                    :custom-style="{ width: '100%', marginLeft: '12px' }"
                    :row-col="[{ width: '50%' }, { width: '100%' }]"
                />
            </view>
            <view class="hy-flex">
                <hy-skeleton :row-col="[{ size: '48px', type: 'rect' }]" />
                <hy-skeleton
                    :custom-style="{ width: '100%', marginLeft: '12px' }"
                    :row-col="[{ width: '50%' }, { width: '100%' }]"
                />
            </view>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HySkeleton from '@/package/components/hy-skeleton/hy-skeleton.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '骨架屏'
    }
})

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)
const imageGroup = [
    { height: '171px' },
    1,
    { width: '107px' },
    [{ width: '93px' }, { width: '32px', marginLeft: '41px' }]
]

useShareButton()
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    align-items: center;
}
</style>
