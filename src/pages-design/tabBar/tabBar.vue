<template>
    <the-root-page>
        <view class="hy-title"> {{ t('basicUsage') }}</view>
        <hy-tabbar-group v-model="current" @change="onChange">
            <hy-tabbar-item :title="t('home')" icon="home"></hy-tabbar-item>
            <hy-tabbar-item :title="t('category')" icon="class"></hy-tabbar-item>
            <hy-tabbar-item :title="t('mine')" icon="mine"></hy-tabbar-item>
        </hy-tabbar-group>

        <view class="hy-title"> {{ t('badge') }} </view>
        <hy-tabbar-group
            :custom-style="{ marginBottom: '20px' }"
            :badgeProps="{ isDot: true }"
            v-model="current"
            @change="onChange"
        >
            <hy-tabbar-item :title="t('home')" icon="home"></hy-tabbar-item>
            <hy-tabbar-item :title="t('category')" icon="class"></hy-tabbar-item>
            <hy-tabbar-item :title="t('mine')" icon="mine" :value="1"></hy-tabbar-item>
        </hy-tabbar-group>

        <hy-tabbar-group v-model="current" @change="onChange">
            <hy-tabbar-item :title="t('home')" icon="home" :value="10"></hy-tabbar-item>
            <hy-tabbar-item :title="t('category')" icon="class"></hy-tabbar-item>
            <hy-tabbar-item :title="t('mine')" icon="mine"></hy-tabbar-item>
        </hy-tabbar-group>

        <view class="hy-title"> {{ t('circleBar') }} </view>
        <hy-tabbar-group v-model="current" @change="onChange" shape="circle">
            <hy-tabbar-item :title="t('home')" icon="home"></hy-tabbar-item>
            <hy-tabbar-item :title="t('category')" icon="class"></hy-tabbar-item>
            <hy-tabbar-item :title="t('mine')" icon="mine"></hy-tabbar-item>
        </hy-tabbar-group>

        <view class="hy-title"> {{ t('customColor') }} </view>
        <hy-tabbar-group
            v-model="current"
            @change="onChange"
            activeColor="red"
            inactiveColor="green"
            bgColor="yellow"
        >
            <hy-tabbar-item :title="t('home')" icon="home"></hy-tabbar-item>
            <hy-tabbar-item :title="t('category')" icon="class"></hy-tabbar-item>
            <hy-tabbar-item :title="t('mine')" icon="mine"></hy-tabbar-item>
        </hy-tabbar-group>

        <view class="hy-title"> {{ t('customIcon') }} </view>
        <hy-tabbar-group v-model="current" @change="onChange">
            <hy-tabbar-item :title="t('home')" icon="home">
                <template #icon>
                    <hy-image :src="config.avatar" width="30" height="30"></hy-image>
                </template>
            </hy-tabbar-item>
            <hy-tabbar-item :title="t('category')" icon="class"></hy-tabbar-item>
            <hy-tabbar-item :title="t('mine')" icon="mine"></hy-tabbar-item>
        </hy-tabbar-group>

        <!-- 底部固定的tabbar测试 -->
        <hy-tabbar v-model="fixedCurrent" :list="list"></hy-tabbar>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { IconConfig } from '@/package'
import { config } from '@/config/config'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '底部导航栏'
    }
})

const { t } = useTranslate('tabBar')
usePageTitle('tabBar')

const current = ref(0)
const fixedCurrent = ref(0)
// 底部固定 tabbar 数据（computed 包裹以响应语言切换）
const list = computed(() => [
    { name: t('home'), icon: IconConfig.HOME },
    { name: t('category'), icon: IconConfig.HOME },
    { name: t('cart'), icon: IconConfig.HOME, badge: 10 },
    { name: t('mine'), icon: IconConfig.HOME }
])

const onChange = ({ value }: { value: number | string }) => {
    uni.showToast({ title: t('switched', value), icon: 'none' })
}

useShareButton()
</script>

<style lang="scss" scoped></style>
