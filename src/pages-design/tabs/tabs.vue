<template>
    <the-root-page>
        <hy-tabs :list="list">
            <template #default="{ record, index }">
                <scroll-view class="scroll-view" scroll-y>
                    <the-order-dom v-for="(item, i) in orderList[index]" :key="i" :order="item">
                    </the-order-dom>
                </scroll-view>
            </template>
        </hy-tabs>
    </the-root-page>
</template>

<!--<script lang="ts">-->
<!--export default {-->
<!--    name: 'tabs',-->
<!--    options: {-->
<!--        addGlobalClass: true,-->
<!--        virtualHost: true,-->
<!--        styleIsolation: 'shared'-->
<!--    }-->
<!--}-->
<!--</script>-->

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import TheOrderDom from './components/TheOrderDom.vue'
import { useShareButton } from '@/composables'
import type { OrderItem } from '@/pages-design/tabs/components/types'
import TheRootPage from '@/components/the-root-page.vue'

definePage({
    style: {
        navigationBarTitleText: '标签页'
    }
})

const list = reactive([
    { name: '关注', content: '我是内容' },
    { name: '推荐', badge: { isDot: true } },
    { name: '电影', badge: { value: 5 } },
    { name: '科技' },
    { name: '音乐' },
    { name: '美食' },
    { name: '文化' },
    { name: '财经' },
    { name: '手工' }
])
const orderList = ref<OrderItem[][]>([])

onMounted(() => {
    orderList.value = generateOrders()
    console.log(orderList.value)
})

function generateOrders(): OrderItem[][] {
    return Array.from({ length: 9 }, (_, i) =>
        Array.from({ length: 10 }, (_, j) => {
            const storeId = 1001 + i
            const orderId = `T${Date.now()}${i}${j}`
            const skuId = 20001 + i * 5 + j
            return {
                store: {
                    id: storeId,
                    name: `自动门店_${storeId}`,
                    address: `北京市朝阳区智慧路${storeId}号`,
                    phone: `138${10000000 + storeId}`
                },
                order: {
                    id: orderId,
                    createTime: new Date().toISOString(),
                    amount: (Math.random() * 200 + 30).toFixed(2),
                    status: ['待支付', '已删除', '配送中', '已完成'][Math.floor(Math.random() * 4)]
                },
                product: {
                    skuId,
                    name: `智能商品_${skuId}`,
                    img: `https://img.yzcdn.cn/vant/cat.jpeg`, // 公网图
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
.scroll-view {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
}
</style>
