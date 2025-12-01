<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
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
    </hy-config-provider>
</template>

<script setup lang="ts">
import HyScrollList from '@/package/components/hy-scroll-list/hy-scroll-list.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import HyIcon from '@/package/components/hy-icon/hy-icon.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)

const goodsArr = [
    {
        price: '230.5',
        thumbnail:
            'https://img11.360buyimg.com/n1/s450x450_jfs/t1/281169/10/14028/31748/67ecf51dF384c5bd6/1ec0c214ea7a914e.png'
    },
    {
        price: '74.1',
        thumbnail:
            'https://img11.360buyimg.com/n1/s450x450_jfs/t1/281169/10/14028/31748/67ecf51dF384c5bd6/1ec0c214ea7a914e.png'
    },
    {
        price: '8457',
        thumbnail:
            'https://img11.360buyimg.com/n1/s450x450_jfs/t1/281169/10/14028/31748/67ecf51dF384c5bd6/1ec0c214ea7a914e.png'
    },
    {
        price: '1442',
        thumbnail:
            'https://img11.360buyimg.com/n1/s450x450_jfs/t1/281169/10/14028/31748/67ecf51dF384c5bd6/1ec0c214ea7a914e.png'
    },
    {
        price: '541',
        thumbnail:
            'https://img11.360buyimg.com/n1/s450x450_jfs/t1/281169/10/14028/31748/67ecf51dF384c5bd6/1ec0c214ea7a914e.png'
    },
    {
        price: '234',
        thumbnail:
            'https://img11.360buyimg.com/n1/s450x450_jfs/t1/281169/10/14028/31748/67ecf51dF384c5bd6/1ec0c214ea7a914e.png'
    },
    {
        price: '562',
        thumbnail:
            'https://img11.360buyimg.com/n1/s450x450_jfs/t1/281169/10/14028/31748/67ecf51dF384c5bd6/1ec0c214ea7a914e.png'
    },
    {
        price: '251.5',
        thumbnail:
            'https://img11.360buyimg.com/n1/s450x450_jfs/t1/281169/10/14028/31748/67ecf51dF384c5bd6/1ec0c214ea7a914e.png'
    }
]

const showMore = () => {
    uni.showToast({ title: '查看更多' })
}
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
