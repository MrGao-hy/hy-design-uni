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
            <hy-folding-panel-item :title="t('fruits')" index="fruits" :value="t('fruitsValue')">
                <view class="content-box content-box--sm">
                    <text class="content-text">{{ t('fruitContent') }}</text>
                </view>
            </hy-folding-panel-item>

            <!-- 中等高度：列表内容 -->
            <hy-folding-panel-item :title="t('foodListTitle')" index="food">
                <view class="content-box content-box--md">
                    <view v-for="(item, i) in foodList" :key="i" class="list-item">
                        <text class="list-item__name">{{ item.name }}</text>
                        <text class="list-item__price">¥{{ item.price }}</text>
                    </view>
                </view>
            </hy-folding-panel-item>

            <!-- 长文本：高度大 -->
            <hy-folding-panel-item
                :title="t('beverageTitle')"
                index="beverage"
                :value="t('beverageValue')"
            >
                <view class="content-box content-box--lg">
                    <text class="content-text">{{ longText }}</text>
                </view>
            </hy-folding-panel-item>

            <!-- 自定义标题插槽 -->
            <hy-folding-panel-item index="title">
                <template #title>
                    <view class="custom-title">
                        <text class="custom-title__icon">🔥</text>
                        <text class="custom-title__text">{{ t('customTitle') }}</text>
                    </view>
                </template>
                <view class="content-box content-box--sm">
                    <text class="content-text">{{ t('customTitleTip') }}</text>
                </view>
            </hy-folding-panel-item>

            <!-- 自定义头部插槽 -->
            <hy-folding-panel-item index="header">
                <template #header>
                    <view class="custom-header">
                        <text class="custom-header__text">{{ t('customHeader') }}</text>
                        <text class="custom-header__badge">NEW</text>
                    </view>
                </template>
                <view class="content-box content-box--md">
                    <text class="content-text">{{ t('customHeaderTip') }}</text>
                </view>
            </hy-folding-panel-item>

            <!-- 内容超过上限：内部滚动 -->
            <hy-folding-panel-item :title="t('scrollTitle')" index="scroll" :content-height="300">
                <view class="content-box content-box--lg">
                    <view v-for="(item, i) in longList" :key="i" class="list-item">
                        <text class="list-item__name">{{ t('itemN', i + 1) }}</text>
                        <text class="list-item__price">¥{{ (i + 1) * 10 }}</text>
                    </view>
                </view>
            </hy-folding-panel-item>

            <!-- 动态内容：演示 resize 方法 -->
            <hy-folding-panel-item ref="dynamicRef" :title="t('dynamicTitle')" index="dynamic">
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
                        {{ t('loadMore', dynamicList.length) }}
                    </hy-button>
                </view>
            </hy-folding-panel-item>

            <!-- 嵌套折叠面板：面板内容里再嵌套一组可独立展开/收起的折叠面板 -->
            <hy-folding-panel-item :title="t('nestedTitle')" index="nested">
                <view class="nested-wrap">
                    <hy-folding-panel v-model="nestedActiveIndex">
                        <hy-folding-panel-item :title="t('nestedChildA')" index="nested-child-a">
                            <view class="content-box content-box--sm">
                                <text class="content-text">{{ t('nestedChildAContent') }}</text>
                            </view>
                        </hy-folding-panel-item>

                        <hy-folding-panel-item :title="t('nestedChildB')" index="nested-child-b">
                            <view class="content-box content-box--sm">
                                <text class="content-text">{{ t('nestedChildBContent') }}</text>
                            </view>
                        </hy-folding-panel-item>
                    </hy-folding-panel>
                </view>
            </hy-folding-panel-item>
        </hy-folding-panel>

        <view class="hy-setting__box">
            <view class="hy-title">{{ t('sizeSection') }}</view>
            <hy-subsection :list="list_1" v-model="size"></hy-subsection>

            <view class="hy-title">{{ t('disabledSection') }}</view>
            <hy-switch v-model="disabled"></hy-switch>

            <view class="hy-title">{{ t('borderSection') }}</view>
            <hy-switch v-model="border"></hy-switch>

            <view class="hy-title">{{ t('accordionSection') }}</view>
            <hy-switch v-model="accordion"></hy-switch>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import type { SizeType } from '@/package/libs/typing'
import { ref, computed } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'
import type { FoldingPanelModelValue } from '@/package/components/hy-folding-panel/typing'
import type { IFoldingPanelItemExpose } from '@/package/components/hy-folding-panel-item/typing'

definePage({
    style: {
        navigationBarTitleText: '折叠面板'
    }
})

const { t } = useTranslate('foldingPanel')
usePageTitle('foldingPanel')

const size = ref<SizeType>('medium')
const border = ref(true)
const disabled = ref(false)
const accordion = ref(false)
// 普通模式为数组，手风琴模式由父组件自动同步为字符串
const activeIndex = ref<FoldingPanelModelValue>(['food'])
const nestedActiveIndex = ref<FoldingPanelModelValue>(['nested-child-b'])

const list_1 = computed(() => [
    { name: t('sizeSmall'), value: 'small' },
    { name: t('sizeMedium'), value: 'medium' },
    { name: t('sizeLarge'), value: 'large' }
])

// 主食列表数据
const foodList = computed(() => [
    { name: t('foodRice'), price: 2 },
    { name: t('foodNoodles'), price: 12 },
    { name: t('foodDumpling'), price: 18 },
    { name: t('foodSteamedBun'), price: 1 }
])

// 长文本内容
const longText = computed(() => t('longText'))

// 超长列表（用于演示限高滚动）
const longList = computed(() =>
    Array.from({ length: 20 }, (_, i) => ({
        name: t('itemN', i + 1),
        price: (i + 1) * 10
    }))
)

// 动态内容演示
const dynamicRef = ref<IFoldingPanelItemExpose>()
const dynamicList = ref<string[]>([t('initialItem', 1), t('initialItem', 2)])

const loadMore = async () => {
    const next = dynamicList.value.length + 1
    dynamicList.value.push(t('dynamicItem', next))
    // 内容变化后重新测量高度，保证下次折叠动画起始高度准确
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

// 嵌套面板容器：与外层内容留出间距
.nested-wrap {
    padding: 20rpx;
    background-color: $hy-background--container;
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
