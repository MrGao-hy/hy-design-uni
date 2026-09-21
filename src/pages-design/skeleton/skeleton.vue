<template>
    <the-root-page>
        <view class="hy-title">{{ t('avatarSection') }}</view>
        <view class="hy-container">
            <hy-skeleton theme="avatar" animation="gradient" />
        </view>
        <view class="hy-title">{{ t('imageSection') }}</view>
        <view class="hy-container">
            <hy-skeleton theme="image" :row-col="imageGroup" animation="gradient" />
        </view>
        <view class="hy-title">{{ t('textSection') }}</view>
        <view class="hy-container">
            <hy-skeleton theme="text" />
        </view>
        <view class="hy-title">{{ t('paragraphSection') }}</view>
        <view class="hy-container">
            <hy-skeleton theme="paragraph" />
        </view>

        <view class="hy-title">{{ t('cellSection') }}</view>
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
    </the-root-page>
</template>

<script setup lang="ts">
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '骨架屏'
    }
})

const { t } = useTranslate('skeleton')
usePageTitle('skeleton')

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
