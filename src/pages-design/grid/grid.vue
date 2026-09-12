<template>
    <the-root-page>
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container">
            <hy-grid :list="list" :col="col" :gap="gap" :border="border" @click="onClick"></hy-grid>
        </view>

        <view class="hy-title">{{ t('nestedCard') }}</view>
        <view class="hy-container">
            <hy-grid :list="courseList" :col="2" :gap="10" item-height="100%">
                <template #default="{ record }">
                    <hy-card
                        padding-body="0"
                        border-radius="10"
                        margin="0"
                        :show-head="false"
                        :custom-style="{ overflow: 'hidden' }"
                    >
                        <hy-image width="100%" height="187px" :src="record.image"></hy-image>
                        <template #footer>
                            <view>
                                <text class="course-title">{{ record.title }}</text>
                                <view class="course-info">
                                    <hy-button
                                        type="primary"
                                        size="small"
                                        :text="t('watchNow')"
                                    ></hy-button>
                                    <text class="course-count">{{
                                        t('viewers', record.count)
                                    }}</text>
                                </view>
                            </view>
                        </template>
                    </hy-card>
                </template>
            </hy-grid>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">{{ t('colSection') }}</view>
            <hy-subsection :list="list_1" v-model="col"></hy-subsection>

            <view class="hy-title">{{ t('borderSection') }}</view>
            <hy-switch :list="list_1" v-model="border"></hy-switch>

            <view class="hy-title">{{ t('padding') }}</view>
            <hy-slider v-model="gap" :min="0" :max="20" />
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { config } from '@/config/config'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'
import { useToast } from '@/package'

definePage({
    style: {
        navigationBarTitleText: '宫格布局'
    }
})

const { t } = useTranslate('grid')
usePageTitle('grid')

type Menus = {
    icon: string
    name: string
}

type CustomMenus = {
    icon: string
    name: string
    bgColor: string
}

const toast = useToast()
// 菜单数据（响应语言切换）
const list = computed<Menus[]>(() =>
    Array.from({ length: 12 }, (_, i) => ({
        icon: config.image,
        name: t('menu', i)
    }))
)

type Course = {
    image: string
    title: string
    count: string
}

const courseList = computed<Course[]>(() => [
    {
        image: config.image,
        title: t('course1'),
        count: '20.1w'
    },
    {
        image: config.image,
        title: t('course2'),
        count: '8.8w'
    },
    {
        image: config.image,
        title: t('course3'),
        count: '19.2w'
    },
    {
        image: config.image,
        title: t('course4'),
        count: '14.5w'
    }
])

const col = ref(4)
const gap = ref(10)
const border = ref(false)
const list_1 = [2, 3, 4, 5]

const onClick = (e: any) => {
    toast.show(t('clicked', e.name))
}

useShareButton()
</script>

<style scoped lang="scss">
.custom-grid-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.custom-grid-icon {
    width: 80rpx;
    height: 80rpx;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12rpx;
}

.custom-grid-icon-text {
    font-size: 36rpx;
}

.custom-grid-name {
    font-size: 24rpx;
}

.course-title {
    font-size: 28rpx;
    font-weight: 600;
    display: block;
    margin-bottom: 16rpx;
}

.course-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.course-count {
    font-size: 24rpx;
    color: #999;
}
</style>
