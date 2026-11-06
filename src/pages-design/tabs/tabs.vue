<template>
    <!-- 外层容器提供确定高度，供 swiper 的 calc(100% - 44px) 百分比高度参照 -->
    <view class="tabs-page">
        <hy-tabs :list="list" is-swiper>
            <template #default="{ record, index }">
                <scroll-view class="scroll-view" scroll-y>
                    <the-order-dom v-for="(item, i) in orderList[index]" :key="i" :order="item">
                    </the-order-dom>
                </scroll-view>
            </template>
        </hy-tabs>
    </view>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import TheOrderDom from './components/TheOrderDom.vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'
import type { OrderItem } from '@/pages-design/tabs/components/types'
import type { TabsItemVo } from '@/package'
import { config } from '@/config/config.ts'

definePage({
    style: {
        navigationBarTitleText: '标签页'
    }
})

const { t } = useTranslate('tabs')
usePageTitle('tabs')

// 页签数据（computed 包裹以响应语言切换）
const list = computed<TabsItemVo[]>(() => [
    { name: t('follow'), content: t('content') },
    { name: t('recommend'), badge: { value: 1, isDot: true } },
    { name: t('movie'), badge: { value: 5 } },
    { name: t('tech') },
    { name: t('music') },
    { name: t('food') },
    { name: t('culture') },
    { name: t('finance') },
    { name: t('handcraft') }
])
const orderList = ref<OrderItem[][]>([])

onMounted(() => {
    orderList.value = generateOrders()
    console.log(orderList.value)
})

function generateOrders(): OrderItem[][] {
    // 订单状态使用稳定 key（pending/deleted/delivering/completed），展示时由 TheOrderDom 翻译
    const statusKeys = ['pending', 'deleted', 'delivering', 'completed']
    return Array.from({ length: 9 }, (_, i) =>
        Array.from({ length: 10 }, (_, j) => {
            const storeId = 1001 + i
            const orderId = `T${Date.now()}${i}${j}`
            const skuId = 20001 + i * 5 + j
            return {
                store: {
                    id: storeId,
                    name: t('storeName', storeId),
                    address: t('storeAddress', storeId),
                    phone: `138${10000000 + storeId}`
                },
                order: {
                    id: orderId,
                    createTime: new Date().toISOString(),
                    amount: (Math.random() * 200 + 30).toFixed(2),
                    status: statusKeys[Math.floor(Math.random() * 4)]
                },
                product: {
                    skuId,
                    name: t('productName', skuId),
                    img: config.image, // 公网图
                    price: (Math.random() * 100 + 10).toFixed(2),
                    qty: Math.floor(Math.random() * 3) + 1
                }
            }
        })
    )
}

useShareButton()
</script>

<style scoped lang="scss">
.tabs-page {
    box-sizing: border-box;
    width: 100%;
    /* #ifdef H5 */
    height: calc(100vh - 44px);
    /* #endif */
    /* #ifndef H5 */
    height: 100vh;
    /* #endif */
}

.scroll-view {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
}
</style>
