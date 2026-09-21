<template>
    <the-root-page>
        <hy-navbar :title="t('navTitle')" autoBack placeholder></hy-navbar>

        <view class="demo-container">
            <view class="section">
                <view class="hy-title">{{ t('basicUsage') }}</view>
                <view class="demo-card">
                    <hy-navbar
                        :title="t('navTitleLabel')"
                        :sub="t('navSub')"
                        :fixed="false"
                        :left-text="t('back')"
                        autoBack
                        :safeAreaInsetTop="false"
                        :right-icon="IconConfig.DELETE"
                    ></hy-navbar>
                    <view class="demo-desc">{{ t('basicDesc') }}</view>
                </view>
            </view>

            <view class="section">
                <view class="hy-title">{{ t('colorSection') }}</view>
                <view class="demo-card">
                    <hy-navbar
                        :title="t('darkTheme')"
                        :fixed="false"
                        :safeAreaInsetTop="false"
                        bg-color="#2979ff"
                        title-color="#ffffff"
                        :left-icon-color="'#ffffff'"
                        :left-icon="IconConfig.LEFT"
                        placeholder
                        autoBack
                    ></hy-navbar>
                    <view class="demo-desc">{{ t('blueDesc') }}</view>
                </view>
                <view class="demo-card">
                    <hy-navbar
                        :title="t('greenTheme')"
                        :fixed="false"
                        :safeAreaInsetTop="false"
                        bg-color="#19be6b"
                        title-color="#ffffff"
                        :left-icon-color="'#ffffff'"
                        autoBack
                        shadow
                    ></hy-navbar>
                    <view class="demo-desc">{{ t('greenDesc') }}</view>
                </view>
            </view>

            <view class="section">
                <view class="hy-title">{{ t('multiIconSection') }}</view>
                <view class="demo-card">
                    <hy-navbar
                        :title="t('multiNav')"
                        :fixed="false"
                        :safeAreaInsetTop="false"
                        autoBack
                    >
                        <template #right>
                            <view class="multi-icon-slot">
                                <hy-icon :name="IconConfig.SEARCH" size="18"></hy-icon>
                                <hy-icon
                                    :name="IconConfig.SHARE"
                                    size="18"
                                    class="icon-gap"
                                ></hy-icon>
                                <hy-icon
                                    :name="IconConfig.ELLIPSIS"
                                    size="18"
                                    class="icon-gap"
                                ></hy-icon>
                            </view>
                        </template>
                    </hy-navbar>
                    <view class="demo-desc">{{ t('multiDesc') }}</view>
                </view>
            </view>

            <view class="section">
                <view class="hy-title">{{ t('customTitleSection') }}</view>
                <view class="demo-card">
                    <hy-navbar :fixed="false" :safeAreaInsetTop="false" autoBack>
                        <template #title>
                            <view class="custom-title-slot">
                                <hy-icon
                                    :name="IconConfig.SHOPPING_CART_FILL"
                                    size="16"
                                    color="#2979ff"
                                ></hy-icon>
                                <text class="custom-title-text">{{ t('shoppingCart') }}</text>
                                <hy-badge :count="3" type="error" :offset="[2, -4]"></hy-badge>
                            </view>
                        </template>
                    </hy-navbar>
                    <view class="demo-desc">{{ t('cartDesc') }}</view>
                </view>
            </view>

            <view class="section">
                <view class="hy-title">{{ t('searchSection') }}</view>
                <view class="demo-card">
                    <hy-navbar :fixed="false" :safeAreaInsetTop="false" autoBack>
                        <template #title>
                            <hy-search></hy-search>
                        </template>
                    </hy-navbar>
                    <view class="demo-desc">{{ t('searchDesc') }}</view>
                </view>
            </view>

            <view class="section">
                <view class="hy-title">{{ t('userSection') }}</view>
                <view class="demo-card">
                    <hy-navbar :fixed="false" :safeAreaInsetTop="false">
                        <template #left>
                            <view class="user-slot">
                                <hy-avatar :size="28" :src="config.avatar"></hy-avatar>
                                <text class="user-name">{{ t('userName') }}</text>
                                <hy-icon
                                    :name="IconConfig.ARROW_DOUBLE_LEFT"
                                    size="12"
                                    color="#999"
                                ></hy-icon>
                            </view>
                        </template>
                        <template #right>
                            <hy-icon :name="IconConfig.ELLIPSIS" size="18"></hy-icon>
                        </template>
                    </hy-navbar>
                    <view class="demo-desc">{{ t('userDesc') }}</view>
                </view>
            </view>

            <view class="section">
                <view class="hy-title">{{ t('tabSection') }}</view>
                <view class="demo-card">
                    <hy-navbar :fixed="false" :safeAreaInsetTop="false" autoBack>
                        <template #center>
                            <view class="tabs-slot">
                                <text class="tab-item tab-item--active">{{
                                    t('tabRecommend')
                                }}</text>
                                <hy-line
                                    direction="column"
                                    :hairline="false"
                                    length="14"
                                    margin="0 16px"
                                    color="#e8e8e8"
                                ></hy-line>
                                <text class="tab-item">{{ t('tabFollow') }}</text>
                                <hy-line
                                    direction="column"
                                    :hairline="false"
                                    length="14"
                                    margin="0 16px"
                                    color="#e8e8e8"
                                ></hy-line>
                                <text class="tab-item">{{ t('tabHot') }}</text>
                            </view>
                        </template>
                    </hy-navbar>
                    <view class="demo-desc">{{ t('tabDesc') }}</view>
                </view>
            </view>

            <view class="section">
                <view class="hy-title">{{ t('tagSection') }}</view>
                <view class="demo-card">
                    <hy-navbar
                        :title="t('styleNav')"
                        :fixed="false"
                        :safeAreaInsetTop="false"
                        :left-style="{ paddingLeft: '10px' }"
                        autoBack
                        shadow
                    >
                        <template #left>
                            <view class="styled-left">
                                <hy-icon :name="IconConfig.LEFT" size="16"></hy-icon>
                            </view>
                        </template>
                        <template #right>
                            <view class="styled-right">
                                <hy-button type="primary" plain :border="false">{{
                                    t('publish')
                                }}</hy-button>
                            </view>
                        </template>
                    </hy-navbar>
                    <view class="demo-desc">{{ t('tagDesc') }}</view>
                </view>
            </view>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { IconConfig } from '@/package'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'
import { config } from '@/config/config.ts'

definePage({
    style: {
        navigationStyle: 'custom'
    }
})

const { t } = useTranslate('navbar')
usePageTitle('navbar')

useShareButton()
</script>

<style scoped lang="scss">
.demo-container {
    padding: 24rpx;
}

.section {
    margin-bottom: 40rpx;
}

.demo-card {
    border-radius: 16rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
    margin-bottom: 24rpx;
    overflow: hidden;

    &--round-show {
        padding: 16rpx;
        background: #fafafa;
    }
}

.demo-desc {
    padding: 20rpx 24rpx 24rpx;
    font-size: 24rpx;
    color: #999;
    background-color: $hy-background--box;
}

.multi-icon-slot {
    display: flex;
    align-items: center;

    .icon-gap {
        margin-left: 16px;
    }
}

.custom-title-slot {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .custom-title-text {
        font-size: 16px;
        font-weight: 500;
        margin-left: 4px;
    }
}

.search-slot {
    display: flex;
    align-items: center;
    background-color: #f3f3f3;
    border-radius: 100px;
    padding: 4px 12px;
    width: 100%;

    .search-placeholder {
        font-size: 13px;
        color: #999;
        margin-left: 4px;
    }
}

.user-slot {
    display: flex;
    align-items: center;

    .user-name {
        font-size: 14px;
        font-weight: 500;
        margin: 0 6px;
    }
}

.tabs-slot {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;

    .tab-item {
        font-size: 14px;
        color: #999;
    }

    .tab-item--active {
        color: #2979ff;
        font-weight: 600;
    }
}

.styled-left {
    display: flex;
    align-items: center;
}

.styled-right {
    display: flex;
    align-items: center;
}
</style>
