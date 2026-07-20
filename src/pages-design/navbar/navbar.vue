<template>
    <the-root-page>
        <hy-navbar title="自定义导航栏" autoBack placeholder></hy-navbar>

        <view class="demo-container">
            <view class="section">
                <view class="hy-title">基础使用</view>
                <view class="demo-card">
                    <hy-navbar
                        title="标题"
                        sub="副标题"
                        :fixed="false"
                        left-text="返回"
                        autoBack
                        :safeAreaInsetTop="false"
                        :right-icon="IconConfig.DELETE"
                    ></hy-navbar>
                    <view class="demo-desc">基础导航栏，包含标题、副标题、返回按钮和右侧图标</view>
                </view>
            </view>

            <view class="section">
                <view class="hy-title">自定义颜色</view>
                <view class="demo-card">
                    <hy-navbar
                        title="深色主题"
                        :fixed="false"
                        :safeAreaInsetTop="false"
                        bg-color="#2979ff"
                        title-color="#ffffff"
                        :left-icon-color="'#ffffff'"
                        :left-icon="IconConfig.LEFT"
                        placeholder
                        autoBack
                    ></hy-navbar>
                    <view class="demo-desc">蓝色主题，适合重要页面或品牌色展示</view>
                </view>
                <view class="demo-card">
                    <hy-navbar
                        title="绿色主题"
                        :fixed="false"
                        :safeAreaInsetTop="false"
                        bg-color="#19be6b"
                        title-color="#ffffff"
                        :left-icon-color="'#ffffff'"
                        autoBack
                        shadow
                    ></hy-navbar>
                    <view class="demo-desc">绿色主题 + 阴影效果，突出层次感</view>
                </view>
            </view>

            <view class="section">
                <view class="hy-title">多图标操作</view>
                <view class="demo-card">
                    <hy-navbar title="多操作导航" :fixed="false" :safeAreaInsetTop="false" autoBack>
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
                    <view class="demo-desc">右侧多图标布局，支持搜索、分享、更多等操作</view>
                </view>
            </view>

            <view class="section">
                <view class="hy-title">自定义标题</view>
                <view class="demo-card">
                    <hy-navbar :fixed="false" :safeAreaInsetTop="false" autoBack>
                        <template #title>
                            <view class="custom-title-slot">
                                <hy-icon
                                    :name="IconConfig.SHOPPING_CART_FILL"
                                    size="16"
                                    color="#2979ff"
                                ></hy-icon>
                                <text class="custom-title-text">购物车</text>
                                <hy-badge :count="3" type="error" :offset="[2, -4]"></hy-badge>
                            </view>
                        </template>
                    </hy-navbar>
                    <view class="demo-desc">图标 + 文字 + Badge 角标组合，适合购物车等场景</view>
                </view>
            </view>

            <view class="section">
                <view class="hy-title">搜索栏导航</view>
                <view class="demo-card">
                    <hy-navbar :fixed="false" :safeAreaInsetTop="false" autoBack>
                        <template #title>
                            <hy-search></hy-search>
                        </template>
                    </hy-navbar>
                    <view class="demo-desc">标题区域改为搜索框，适合搜索场景</view>
                </view>
            </view>

            <view class="section">
                <view class="hy-title">用户信息</view>
                <view class="demo-card">
                    <hy-navbar :fixed="false" :safeAreaInsetTop="false">
                        <template #left>
                            <view class="user-slot">
                                <hy-avatar
                                    size="28"
                                    src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=portrait%20of%20a%20young%20person%20avatar%20style%20clean%20background&image_size=square"
                                ></hy-avatar>
                                <text class="user-name">用户名</text>
                                <hy-icon
                                    :name="IconConfig.ARROW_RIGHT"
                                    size="12"
                                    color="#999"
                                ></hy-icon>
                            </view>
                        </template>
                        <template #right>
                            <hy-icon :name="IconConfig.ELLIPSIS" size="18"></hy-icon>
                        </template>
                    </hy-navbar>
                    <view class="demo-desc">左侧展示用户头像和名称，适合个人中心页面</view>
                </view>
            </view>

            <view class="section">
                <view class="hy-title">Tab 切换</view>
                <view class="demo-card">
                    <hy-navbar :fixed="false" :safeAreaInsetTop="false" autoBack>
                        <template #center>
                            <view class="tabs-slot">
                                <text class="tab-item tab-item--active">推荐</text>
                                <hy-line
                                    direction="column"
                                    :hairline="false"
                                    length="14"
                                    margin="0 16px"
                                    color="#e8e8e8"
                                ></hy-line>
                                <text class="tab-item">关注</text>
                                <hy-line
                                    direction="column"
                                    :hairline="false"
                                    length="14"
                                    margin="0 16px"
                                    color="#e8e8e8"
                                ></hy-line>
                                <text class="tab-item">热榜</text>
                            </view>
                        </template>
                    </hy-navbar>
                    <view class="demo-desc">center 区域完全自定义，实现 Tab 切换效果</view>
                </view>
            </view>

            <view class="section">
                <view class="hy-title">标签按钮</view>
                <view class="demo-card">
                    <hy-navbar
                        title="样式定制"
                        :fixed="false"
                        :safeAreaInsetTop="false"
                        :left-style="{ paddingLeft: '10px' }"
                        :right-style="{ paddingRight: '10px' }"
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
                                <hy-tag type="primary" size="mini">发布</hy-tag>
                            </view>
                        </template>
                    </hy-navbar>
                    <view class="demo-desc">右侧使用 Tag 组件，支持自定义样式</view>
                </view>
            </view>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { IconConfig } from '@/package'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '自定义导航栏'
    }
})

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
