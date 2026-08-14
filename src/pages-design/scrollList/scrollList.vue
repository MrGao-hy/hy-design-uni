<template>
    <the-root-page>
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-scroll-list>
                <view class="scroll-list" style="flex-direction: row">
                    <view
                        class="scroll-list__goods-item"
                        v-for="(item, index) in goodsArr"
                        :key="index"
                        :class="[index === 9 && 'scroll-list__goods-item--no-margin-right']"
                    >
                        <image class="scroll-list__goods-item__image" :src="item.thumbnail"></image>
                        <text class="scroll-list__goods-item__text">￥{{ item.price }}</text>
                    </view>
                    <view class="scroll-list__show-more" @tap="showMore">
                        <text class="scroll-list__show-more__text">查看更多</text>
                        <hy-icon name="arrow-leftward" color="#f56c6c" size="12"></hy-icon>
                    </view>
                </view>
            </hy-scroll-list>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { useShareButton } from '@/composables'
import { config } from '@/config/config.ts'

definePage({
    style: {
        navigationBarTitleText: '横向滚动列表'
    }
})

const goodsArr = [
    {
        price: '230.5',
        thumbnail: config.image
    },
    {
        price: '74.1',
        thumbnail: config.image
    },
    {
        price: '8457',
        thumbnail: config.image
    },
    {
        price: '1442',
        thumbnail: config.image
    },
    {
        price: '541',
        thumbnail: config.image
    },
    {
        price: '234',
        thumbnail: config.image
    },
    {
        price: '562',
        thumbnail: config.image
    },
    {
        price: '251.5',
        thumbnail: config.image
    }
]

const showMore = () => {
    uni.showToast({ title: '查看更多' })
}

useShareButton()
</script>

<style scoped lang="scss">
.scroll-list {
    display: flex;
    flex-direction: column;

    &__goods-item {
        margin-right: 20px;

        &__image {
            width: 60px;
            height: 60px;
            border-radius: 4px;
        }

        &__text {
            color: #f56c6c;
            text-align: center;
            font-size: 12px;
            margin-top: 5px;
        }
    }

    &__show-more {
        background-color: #fff0f0;
        border-radius: 3px;
        padding: 3px 6px;
        display: flex;
        flex-direction: column;
        align-items: center;

        &__text {
            font-size: 12px;
            width: 12px;
            color: #f56c6c;
            line-height: 16px;
        }
    }

    &__line {
        display: flex;
        margin-top: 10px;

        &__item {
            margin-right: 15px;

            &__image {
                width: 61px;
                height: 48px;
            }

            &__text {
                margin-top: 5px;
                font-size: 12px;
                text-align: center;
            }

            &--no-margin-right {
                margin-right: 0;
            }
        }
    }
}
</style>
