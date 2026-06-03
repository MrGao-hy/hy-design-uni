<template>
    <the-root-page>
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-grid :list="list" :col="col" :gap="gap" :border="border" @click="onClick"></hy-grid>
        </view>

        <view class="hy-title">嵌套卡片组件</view>
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
                        <hy-image
                            slot="cover"
                            width="100%"
                            height="187px"
                            :src="record.image"
                            mode="aspectFit"
                        ></hy-image>
                        <template #footer>
                            <view slot="content">
                                <text class="course-title">{{ record.title }}</text>
                                <view class="course-info">
                                    <hy-button
                                        type="primary"
                                        size="small"
                                        text="点击观看"
                                    ></hy-button>
                                    <text class="course-count">{{ record.count }}人看过</text>
                                </view>
                            </view>
                        </template>
                    </hy-card>
                </template>
            </hy-grid>
        </view>

        <view class="hy-setting__box">
            <view class="hy-title">自定义列数</view>
            <hy-subsection :list="list_1" v-model="col"></hy-subsection>

            <view class="hy-title">显示边框</view>
            <hy-switch :list="list_1" v-model="border"></hy-switch>

            <view class="hy-title">边距</view>
            <hy-slider v-model="gap" :min="0" :max="20" />
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { config } from '@/config/config'
import { useShareButton } from '@/composables'
import { useToast } from '@/package'

definePage({
    style: {
        navigationBarTitleText: '宫格布局'
    }
})

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
const list: Menus[] = reactive([])

for (let i = 0; i < 12; i++) {
    list.push({
        icon: config.image,
        name: '菜单' + i
    })
}

type Course = {
    image: string
    title: string
    count: number
}

const courseList: Course[] = reactive([
    {
        image: config.image,
        title: 'AI前沿探索分析',
        count: '20.1w'
    },
    {
        image: config.image,
        title: 'AI应用实战指南',
        count: '8.8w'
    },
    {
        image: config.image,
        title: '机器学习入门',
        count: '19.2w'
    },
    {
        image: config.image,
        title: '深度学习进阶',
        count: '14.5w'
    }
])

const col = ref(4)
const gap = ref(10)
const border = ref(false)
const list_1 = [2, 3, 4, 5]

const onClick = (e) => {
    toast.show(`点击${e.name}`)
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
