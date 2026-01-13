<template>
    <hy-config-provider :theme-color="color" :custom-style="{ height: '2000px' }" :theme="darkMode">
        <hy-navbar title="自定义导航栏" autoBack placeholder></hy-navbar>

        <view class="hy-title">基础使用</view>
        <view>
            <hy-navbar
                title="标题"
                :fixed="false"
                left-text="返回"
                border
                autoBack
                :safeAreaInsetTop="false"
                :right-icon="IconConfig.DELETE"
            ></hy-navbar>
        </view>

        <view class="hy-title">自定义插槽</view>
        <view>
            <hy-navbar title="标题" :fixed="false" :safeAreaInsetTop="false">
                <template #left>
                    <view class="left-slot">
                        <hy-icon :name="IconConfig.LEFT" size="16"></hy-icon>
                        <hy-line
                            direction="column"
                            :hairline="false"
                            length="16"
                            margin="0 8px"
                        ></hy-line>
                        <hy-icon :name="IconConfig.HOME" size="15"></hy-icon>
                    </view>
                </template>
                <template #right>
                    <view class="right-slot">
                        <hy-icon :name="IconConfig.MAP" size="14"></hy-icon>
                        <text class="map-text">定位</text>
                    </view>
                </template>
            </hy-navbar>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HyNavbar from '../../package/components/hy-navbar/hy-navbar.vue'
import HyLine from '../../package/components/hy-line/hy-line.vue'
import HyIcon from '../../package/components/hy-icon/hy-icon.vue'
import { IconConfig } from '@/package'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '自定义导航栏'
    }
})

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)

useShareButton()
</script>

<style scoped lang="scss">
.left-slot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 100px;
    border: 0.5px solid gainsboro;
    padding: 3px 7px;
    opacity: 0.8;
}

.right-slot {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .map-text {
        font-size: 20rpx;
    }
}
</style>
