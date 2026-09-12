<template>
    <the-root-page>
        <!-- 基础使用 -->
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-flex hy-container">
            <hy-avatar :src="config.avatar"></hy-avatar>
        </view>

        <!-- 文字头像 -->
        <view class="hy-title">{{ t('textAvatar') }}</view>
        <view class="hy-flex hy-container">
            <hy-avatar :text="t('surnameHu')" random-bg-color />
            <hy-avatar :text="t('surnameLi')" random-bg-color />
            <hy-avatar :text="t('surnameSun')" random-bg-color />
            <hy-avatar :text="t('surnameWang')" random-bg-color />
        </view>

        <!-- 图标头像 -->
        <view class="hy-title">{{ t('iconAvatar') }}</view>
        <view class="hy-flex hy-container">
            <hy-avatar :icon="IconConfig.MINE_FILL" bg-color="#448aca" />
            <hy-avatar :icon="IconConfig.PHOTO" bg-color="#f18080" />
            <hy-avatar :icon="IconConfig.STAR" bg-color="#ffb34b" />
            <hy-avatar :icon="IconConfig.CUSTOMER_SERVICE" bg-color="#89c152" />
        </view>

        <!-- 不同大小 -->
        <view class="hy-title">{{ t('differentSize') }}</view>
        <view class="hy-flex hy-container">
            <hy-avatar :src="config.avatar" size="small"></hy-avatar>
            <hy-avatar :src="config.avatar" size="medium"></hy-avatar>
            <hy-avatar :src="config.avatar" size="large"></hy-avatar>
            <hy-avatar :src="config.avatar" :size="60"></hy-avatar>
        </view>

        <!-- 自定义颜色 -->
        <view class="hy-title">{{ t('customColor') }}</view>
        <view class="hy-flex hy-container">
            <hy-avatar :text="t('colorRed')" bg-color="#ff4757" />
            <hy-avatar :text="t('colorGreen')" bg-color="#2ed573" />
            <hy-avatar :text="t('colorBlue')" bg-color="#3742fa" />
            <hy-avatar :text="t('colorPurple')" bg-color="#a55eea" />
        </view>

        <!-- 指定颜色索引 -->
        <view class="hy-title">{{ t('colorIndex') }}</view>
        <view class="hy-flex hy-container">
            <hy-avatar text="0" random-bg-color :color-index="0" />
            <hy-avatar text="5" random-bg-color :color-index="5" />
            <hy-avatar text="10" random-bg-color :color-index="10" />
            <hy-avatar text="15" random-bg-color :color-index="15" />
        </view>

        <!-- 头像形状 -->
        <view class="hy-title">{{ t('avatarShape') }}</view>
        <view class="hy-flex hy-container">
            <hy-avatar :src="config.avatar" shape="circle" size="large"></hy-avatar>
            <hy-avatar :src="config.avatar" shape="square" size="large"></hy-avatar>
        </view>

        <!-- 自定义文字样式 -->
        <view class="hy-title">{{ t('customTextStyle') }}</view>
        <view class="hy-flex hy-container">
            <hy-avatar :text="t('fontBig')" :font-size="24" bg-color="#667eea" />
            <hy-avatar :text="t('fontSmall')" :font-size="14" bg-color="#764ba2" />
            <hy-avatar :text="t('fontWhite')" :font-size="20" bg-color="#333" color="#fff" />
            <hy-avatar :text="t('fontBlack')" :font-size="18" bg-color="#eee" color="#333" />
        </view>

        <!-- 点击事件 -->
        <view class="hy-title">{{ t('clickEvent') }}</view>
        <view class="hy-flex hy-container">
            <hy-avatar :src="config.avatar" @click="previewImage"></hy-avatar>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { config } from '@/config/config'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'
import type { IAvatarClickConfig } from '@/package'
import { IconConfig } from '@/package'

definePage({
    style: {
        navigationBarTitleText: '头像'
    }
})

const { t } = useTranslate('avatar')
usePageTitle('avatar')

const showAvatar = ref(false)

const previewImage = ({ url }: IAvatarClickConfig) => {
    uni.previewImage({
        urls: [url as string],
        longPressActions: {
            itemList: [t('sendToFriend'), t('saveImage'), t('favoriteImage')],
            success: function () {},
            fail: function (err) {
                console.log(err.errMsg)
            }
        }
    })
}

useShareButton()
</script>

<style scoped lang="scss">
.avatar-actions {
    padding: 20rpx;
    display: flex;
    gap: 20rpx;

    :deep(.hy-button) {
        flex: 1;
    }
}
</style>
