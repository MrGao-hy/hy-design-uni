<template>
    <hy-card
        :thumb="IconConfig.SHOP"
        :title="order.store.name"
        :sub-title="order.store.address"
        :rightText="order.order.status"
        :right-text-color="orderStatusColor[order.order.status]"
        show-foot
    >
        <template #body>
            <hy-flex>
                <hy-image width="80" height="80" :src="order.product.img"></hy-image>
                <view class="info">
                    <text class="title">{{ order.product.name }}</text>
                    <text class="price">单价：{{ order.product.price }}元</text>
                    <text class="num">数量：{{ order.product.qty }}</text>
                    <text class="all-price">￥{{ order.order.amount }}</text>
                </view>
            </hy-flex>
        </template>
        <template #footer>
            <hy-flex justify="flex-end" gap="10">
                <hy-button
                    text="申请退款"
                    type="info"
                    size="small"
                    shape="circle"
                    plain
                ></hy-button>
                <hy-button text="删除" type="error" size="small" shape="circle" plain></hy-button>
                <hy-button text="评价" type="primary" size="small" shape="circle" plain></hy-button>
            </hy-flex>
        </template>
    </hy-card>
</template>

<script setup lang="ts">
import { IconConfig } from '@/package'
import HyCard from '@/package/components/hy-card/hy-card.vue'
import HyImage from '@/package/components/hy-image/hy-image.vue'
import HyFlex from '@/package/components/hy-flex/hy-flex.vue'
import HyButton from '@/package/components/hy-button/hy-button.vue'
import type { OrderItem } from './types'

interface IProps {
    order: OrderItem
}
const props = withDefaults(defineProps<IProps>(), {})

const orderStatusColor = {
    已完成: '#19be6b',
    待支付: '#909399',
    配送中: '#ff9900',
    已删除: '#fa3534'
}
</script>

<style lang="scss" scoped>
.info {
    margin-left: $hy-border-margin-padding-base;
    font-size: 24rpx;
    display: flex;
    flex-direction: column;
    gap: 3rpx;
    flex: 1;

    .title {
        font-size: 32rpx;
    }
    .price {
        font-size: 22rpx;
        color: $hy-warning;
    }
    .num {
        font-size: 22rpx;
        color: $hy-text-color--grey;
    }
    .all-price {
        text-align: right;
        color: red;
    }
}
</style>
