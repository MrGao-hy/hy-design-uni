<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicButton') }}</view>
        <view class="hy-container long">
            <hy-button :text="t('longText')" size="small"></hy-button>
            <hy-button :text="t('button')" size="small" disabled></hy-button>
        </view>

        <view class="hy-title">{{ t('buttonColor') }}</view>
        <view class="hy-grid hy-container">
            <hy-button type="info" :text="t('defaultButton')"></hy-button>
            <hy-button type="success" :text="t('primaryButton')"></hy-button>
            <hy-button type="primary" :text="t('infoButton')"></hy-button>
            <hy-button type="error" :text="t('dangerButton')"></hy-button>
            <hy-button type="warning" :text="t('warningButton')"></hy-button>
            <hy-button
                :text="t('gradientButton')"
                color="linear-gradient(to right, #4bfcfc, #FB39F5)"
            ></hy-button>
        </view>

        <view class="hy-title">{{ t('plainButton') }}</view>
        <view class="hy-grid hy-container">
            <hy-button type="info" :text="t('defaultButton')" plain></hy-button>
            <hy-button type="success" :text="t('primaryButton')" plain></hy-button>
            <hy-button type="primary" :text="t('infoButton')" plain></hy-button>
            <hy-button type="error" :text="t('dangerButton')" plain></hy-button>
            <hy-button type="warning" :text="t('warningButton')" plain></hy-button>
        </view>

        <view class="hy-title">{{ t('plainNoBorder') }}</view>
        <view class="hy-grid hy-container">
            <hy-button type="info" :text="t('defaultButton')" plain :border="false"></hy-button>
            <hy-button type="success" :text="t('primaryButton')" plain :border="false"></hy-button>
            <hy-button type="primary" :text="t('infoButton')" plain :border="false"></hy-button>
            <hy-button type="error" :text="t('dangerButton')" plain :border="false"></hy-button>
            <hy-button type="warning" :text="t('warningButton')" plain :border="false"></hy-button>
        </view>

        <view class="hy-title">{{ t('buttonIcon') }}</view>
        <view class="hy-container">
            <hy-button
                type="error"
                :text="t('delete')"
                :icon="{ name: IconConfig.DELETE }"
                :custom-style="{ marginBottom: '20px' }"
            ></hy-button>
            <hy-button
                :text="t('delete')"
                :icon="{ name: IconConfig.DELETE }"
                :custom-style="{ marginBottom: '20px' }"
            ></hy-button>
            <hy-button
                :text="t('delete')"
                plain
                :icon="{ name: IconConfig.DELETE }"
                :custom-style="{ marginBottom: '20px' }"
            ></hy-button>
            <hy-button
                type="error"
                :text="t('delete')"
                plain
                :icon="{ name: IconConfig.DELETE }"
            ></hy-button>
        </view>

        <view class="hy-title">{{ t('loadingButton') }}</view>
        <view class="hy-container">
            <hy-button
                :text="t('primaryButton')"
                loading
                :loading-text="t('submitting')"
                :custom-style="{ marginBottom: '20px' }"
            ></hy-button>
            <hy-button :text="t('primaryButton')" plain loading></hy-button>
        </view>

        <view class="hy-title">{{ t('buttonSize') }}</view>
        <view class="hy-container">
            <hy-button
                :text="t('largeButton')"
                size="large"
                :custom-style="{ marginBottom: '20px' }"
            ></hy-button>
            <hy-button
                :text="t('defaultButton')"
                size="medium"
                :custom-style="{ marginBottom: '20px' }"
            ></hy-button>
            <hy-button
                :text="t('smallButton')"
                size="small"
                :custom-style="{ marginBottom: '20px' }"
            ></hy-button>
            <hy-button
                :text="t('miniButton')"
                size="mini"
                :custom-style="{ marginBottom: '20px' }"
            ></hy-button>
        </view>

        <view class="hy-title">{{ t('buttonShape') }}</view>
        <view class="hy-flex hy-container">
            <hy-button :text="t('squareButton')" shape="square"></hy-button>
            <hy-button :text="t('circleButton')" shape="circle"></hy-button>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { IconConfig } from '@/package/libs/config'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '按钮'
    }
})

const { t } = useTranslate('button')
usePageTitle('button')

useShareButton()
</script>

<style scoped lang="scss">
.long {
    display: flex;
    gap: 10px;
}
</style>
