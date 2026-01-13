<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <hy-tabs :list="list" swiperHeight="calc(100vh - 88px)">
            <template #default="{ record, index }">
                <scroll-view class="scroll-view" scroll-y>
                    <the-order-dom v-for="(item, i) in orderList[index]" :key="i" :order="item">
                    </the-order-dom>
                </scroll-view>
            </template>
        </hy-tabs>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HyTabs from '../../package/components/hy-tabs/hy-tabs.vue'
import { onMounted, reactive, ref } from 'vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import TheOrderDom from './components/TheOrderDom.vue'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '标签页'
    }
})

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)
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
const orderList = ref([])

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
    height: 100%;
}
</style>
