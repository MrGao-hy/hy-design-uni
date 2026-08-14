<template>
    <the-root-page>
        <!-- 演示区：不同高度的折叠内容 -->
        <hy-folding-panel
            v-model="activeIndex"
            :accordion="accordion"
            :border="border"
            :disabled="disabled"
            :size="size"
        >
            <!-- 短文本：高度小 -->
            <hy-folding-panel-item title="水果" index="fruits" value="5 种">
                <view class="content-box content-box--sm">
                    <text class="content-text">苹果、香蕉、橙子、葡萄、西瓜</text>
                </view>
            </hy-folding-panel-item>

            <!-- 中等高度：列表内容 -->
            <hy-folding-panel-item title="主食列表" index="food" :default-open="true">
                <view class="content-box content-box--md">
                    <view v-for="(item, i) in foodList" :key="i" class="list-item">
                        <text class="list-item__name">{{ item.name }}</text>
                        <text class="list-item__price">¥{{ item.price }}</text>
                    </view>
                </view>
            </hy-folding-panel-item>

            <!-- 长文本：高度大 -->
            <hy-folding-panel-item title="饮品介绍" index="beverage" value="奶茶">
                <view class="content-box content-box--lg">
                    <text class="content-text">{{ longText }}</text>
                </view>
            </hy-folding-panel-item>

            <!-- 自定义标题插槽 -->
            <hy-folding-panel-item index="title">
                <template #title>
                    <view class="custom-title">
                        <text class="custom-title__icon">🔥</text>
                        <text class="custom-title__text">自定义标题</text>
                    </view>
                </template>
                <view class="content-box content-box--sm">
                    <text class="content-text">使用 #title 插槽自定义标题区域</text>
                </view>
            </hy-folding-panel-item>

            <!-- 自定义头部插槽 -->
            <hy-folding-panel-item index="header">
                <template #header>
                    <view class="custom-header">
                        <text class="custom-header__text">自定义整个头部</text>
                        <text class="custom-header__badge">NEW</text>
                    </view>
                </template>
                <view class="content-box content-box--md">
                    <text class="content-text">使用 #header 插槽自定义整个头部区域</text>
                </view>
            </hy-folding-panel-item>

            <!-- 内容超过上限：内部滚动 -->
            <hy-folding-panel-item
                title="超长内容（限高 300px 滚动）"
                index="scroll"
                :content-height="300"
            >
                <view class="content-box content-box--lg">
                    <view v-for="(item, i) in longList" :key="i" class="list-item">
                        <text class="list-item__name">第 {{ i + 1 }} 项</text>
                        <text class="list-item__price">¥{{ (i + 1) * 10 }}</text>
                    </view>
                </view>
            </hy-folding-panel-item>

            <!-- 动态内容：演示 resize 方法 -->
            <hy-folding-panel-item
                ref="dynamicRef"
                title="动态内容（点击下方按钮加载更多）"
                index="dynamic"
            >
                <view class="content-box">
                    <view v-for="(item, i) in dynamicList" :key="i" class="list-item">
                        <text class="list-item__name">{{ item }}</text>
                    </view>
                    <hy-button
                        type="primary"
                        size="small"
                        :custom-style="{ marginTop: '20rpx', width: '100%' }"
                        @click="loadMore"
                    >
                        加载更多（当前 {{ dynamicList.length }} 条）
                    </hy-button>
                </view>
            </hy-folding-panel-item>
        </hy-folding-panel>

        <view class="hy-setting__box">
            <view class="hy-title">大小</view>
            <hy-subsection :list="list_1" v-model="size"></hy-subsection>

            <view class="hy-title">是否禁用</view>
            <hy-switch v-model="disabled"></hy-switch>

            <view class="hy-title">显示下边框</view>
            <hy-switch v-model="border"></hy-switch>

            <view class="hy-title">是否手风琴</view>
            <hy-switch v-model="accordion"></hy-switch>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import type { SizeType } from '@/package/libs/typing'
import { ref } from 'vue'
import { useShareButton } from '@/composables'
import type { IFoldingPanelItemExpose } from '@/package/components/hy-folding-panel-item/typing'

definePage({
    style: {
        navigationBarTitleText: '折叠面板'
    }
})

const size = ref<SizeType>('medium')
const border = ref(true)
const disabled = ref(false)
const accordion = ref(false)
// 初始不展开任何面板，避免与子项字符串索引不匹配
const activeIndex = ref<string | number>('')

const list_1 = [
    { name: '小', value: 'small' },
    { name: '中', value: 'medium' },
    { name: '大', value: 'large' }
]

// 主食列表数据
const foodList = ref([
    { name: '米饭', price: 2 },
    { name: '面条', price: 12 },
    { name: '饺子', price: 18 },
    { name: '馒头', price: 1 }
])

// 长文本内容
const longText = ref(
    '奶茶是一款将茶和奶（或奶精、冲泡奶粉）混合的饮料，可加珍珠、椰果、布丁等配料。奶茶兼具牛奶和茶的双重营养，是家常美食之一。奶茶的品种包括奶茶粉、冰奶茶、热奶茶等。奶茶的口味丰富，有原味奶茶、椰香奶茶、巧克力奶茶、咖啡奶茶、珍珠奶茶、丝袜奶茶、鸳鸯奶茶、芒果奶茶、草莓奶茶、水蜜桃奶茶、青苹果奶茶、葡萄奶茶、蓝莓奶茶、香芋奶茶、木瓜奶茶等。'
)

// 超长列表（用于演示限高滚动）
const longList = ref(
    Array.from({ length: 20 }, (_, i) => ({
        name: `项目 ${i + 1}`,
        price: (i + 1) * 10
    }))
)

// 动态内容演示
const dynamicRef = ref<IFoldingPanelItemExpose>()
const dynamicList = ref<string[]>(['初始数据 1', '初始数据 2'])

const loadMore = async () => {
    const next = dynamicList.value.length + 1
    dynamicList.value.push(`动态加载项 ${next}`)
    // 内容变化后重新测量高度，保证动画高度准确
    await dynamicRef.value?.resize()
}

useShareButton()
</script>

<style scoped lang="scss">
.hy-folding-panel {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: $hy-shadow-base;
}

// 内容容器通用样式
.content-box {
    padding: 24rpx;
    background-color: $hy-background--container;

    &--sm {
        min-height: 80rpx;
    }

    &--md {
        min-height: 160rpx;
    }

    &--lg {
        min-height: 320rpx;
    }
}

.content-text {
    font-size: 28rpx;
    color: $hy-text-color;
    line-height: 1.6;
}

.list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16rpx 0;
    border-bottom: 1rpx solid $hy-border-color;

    &:last-child {
        border-bottom: none;
    }

    &__name {
        font-size: 28rpx;
        color: $hy-text-color;
    }

    &__price {
        font-size: 26rpx;
        color: $hy-text-color--grey;
    }
}

.custom-title {
    display: flex;
    align-items: center;

    &__icon {
        margin-right: 12rpx;
        font-size: 32rpx;
    }

    &__text {
        font-size: 28rpx;
        font-weight: 500;
        color: $hy-text-color;
    }
}

.custom-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 24rpx;

    &__text {
        font-size: 30rpx;
        font-weight: 600;
        color: $hy-text-color;
    }

    &__badge {
        padding: 4rpx 16rpx;
        font-size: 22rpx;
        color: #fff;
        background-color: $hy-error;
        border-radius: 20rpx;
    }
}
</style>
