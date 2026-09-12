<template>
    <hy-card
        :thumb="IconConfig.SHOP"
        :title="order.store.name"
        :sub-title="order.store.address"
        :rightText="statusText"
        :right-text-color="statusTextColor"
        show-foot
    >
        <template #body>
            <hy-flex>
                <hy-image width="80" height="80" :src="order.product.img"></hy-image>
                <view class="info">
                    <text class="title">{{ order.product.name }}</text>
                    <text class="price">{{ t('priceText', order.product.price) }}</text>
                    <text class="num">{{ t('qtyText') }}{{ order.product.qty }}</text>
                    <text class="all-price">￥{{ order.order.amount }}</text>
                </view>
            </hy-flex>
        </template>
        <template #footer>
            <hy-flex justify="flex-end" gap="10">
                <hy-button
                    :text="t('refund')"
                    type="info"
                    size="small"
                    shape="circle"
                    plain
                ></hy-button>
                <hy-button
                    :text="t('delete')"
                    type="error"
                    size="small"
                    shape="circle"
                    plain
                ></hy-button>
                <hy-button
                    :text="t('review')"
                    type="primary"
                    size="small"
                    shape="circle"
                    plain
                ></hy-button>
            </hy-flex>
        </template>
    </hy-card>
</template>

<script setup lang="ts">
import { IconConfig } from '@/package'
import HyCard from '../../../package/components/hy-card/hy-card.vue'
import HyImage from '../../../package/components/hy-image/hy-image.vue'
import HyFlex from '@/package/components/hy-flex/hy-flex.vue'
import HyButton from '../../../package/components/hy-button/hy-button.vue'
import type { OrderItem } from './types'
import { computed } from 'vue'
import { useTranslate } from '@/composables'

interface IProps {
    order: OrderItem
}
const props = withDefaults(defineProps<IProps>(), {})

// 子组件直接使用 tabs 命名空间翻译
const { t } = useTranslate('tabs')

// 订单状态 key 与颜色映射（key 与父页面生成数据保持一致）
const orderStatusColor = {
    completed: '#19be6b',
    pending: '#909399',
    delivering: '#ff9900',
    deleted: '#fa3534'
} as Record<string, string>

// 状态展示文案（computed 包裹以响应语言切换）
const statusText = computed(() => {
    const map: Record<string, string> = {
        pending: t('statusPending'),
        deleted: t('statusDeleted'),
        delivering: t('statusDelivering'),
        completed: t('statusCompleted')
    }
    return map[props.order.order.status] || props.order.order.status
})

const statusTextColor = computed(() => {
    return orderStatusColor[props.order.order.status] || '#909399'
})
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
