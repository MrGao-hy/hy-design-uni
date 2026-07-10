<template>
    <the-root-page>
        <!-- 顶部搜索栏 -->
        <view class="page-header">
            <hy-search placeholder="搜索商品" @search="onSearch"></hy-search>
            <hy-tabs :list="tabs"></hy-tabs>
        </view>

        <!-- 列表区域 -->
        <view class="page-body">
            <!-- 首次加载骨架屏 -->
            <view v-if="firstLoading" class="skeleton-wrapper">
                <view v-for="i in 6" :key="i" class="skeleton-card">
                    <view class="skeleton-card__image skeleton-animate"></view>
                    <view class="skeleton-card__content">
                        <view class="skeleton-card__title skeleton-animate"></view>
                        <view
                            class="skeleton-card__desc skeleton-animate"
                            style="width: 60%"
                        ></view>
                        <view class="skeleton-card__price-row">
                            <view class="skeleton-card__price skeleton-animate"></view>
                            <view class="skeleton-card__tag skeleton-animate"></view>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 列表 -->
            <hy-list
                v-else
                ref="listRef"
                :list="list"
                container-height="100%"
                :item-height="itemCardHeight"
                :margin-bottom="16"
                padding="0"
                border-radius="12"
                :line="2"
                :load="loadStatus"
                :show-divider="list.length > 0"
                @scroll-to-lower="loadMore"
                @click="onItemClick"
            >
                <template #left="{ record }">
                    <view class="product-card">
                        <image
                            :src="record.image"
                            class="product-card__image"
                            mode="aspectFill"
                            lazy-load
                        ></image>
                        <view class="product-card__info">
                            <text class="product-card__name">{{ record.name }}</text>
                            <text class="product-card__desc">{{ record.description }}</text>
                            <view class="product-card__bottom">
                                <text class="product-card__price">
                                    <text class="product-card__symbol">¥</text>{{ record.price }}
                                </text>
                                <text class="product-card__sold">{{ record.sold }}人付款</text>
                            </view>
                        </view>
                    </view>
                </template>
                <template #right="{ record }">
                    <view class="product-card">
                        <image
                            :src="record.image"
                            class="product-card__image"
                            mode="aspectFill"
                            lazy-load
                        ></image>
                        <view class="product-card__info">
                            <text class="product-card__name">{{ record.name }}</text>
                            <text class="product-card__desc">{{ record.description }}</text>
                            <view class="product-card__bottom">
                                <text class="product-card__price">
                                    <text class="product-card__symbol">¥</text>{{ record.price }}
                                </text>
                                <text class="product-card__sold">{{ record.sold }}人付款</text>
                            </view>
                        </view>
                    </view>
                </template>
            </hy-list>

            <!-- 空状态 -->
            <hy-empty
                v-if="!firstLoading && list.length === 0 && !isLoading"
                mode="search"
                description="暂无相关商品"
                :custom-style="{ marginTop: '120px' }"
            ></hy-empty>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '商品列表',
        enablePullDownRefresh: false
    }
})

useShareButton()

// ====== 筛选标签 ======
const tabs = reactive([
    { name: '推荐', value: 'recommend' },
    { name: '销量', value: 'sales' },
    { name: '价格', value: 'price' },
    { name: '新品', value: 'new' }
])

// ====== 列表数据 ======
const list = ref<AnyObject[]>([])
const itemCardHeight = ref(280)

// ====== 分页 ======
const pagination = reactive({
    current: 1,
    pageSize: 20,
    total: 0,
    hasMore: true
})

// ====== 加载状态 ======
const firstLoading = ref(true)
const isLoading = ref(false)
const loadStatus = ref<'loadMore' | 'loading' | 'noMore'>('loadMore')

// ====== 模拟数据源 ======
const categories = [
    '阿莫西林胶囊',
    '布洛芬缓释片',
    '维生素C泡腾片',
    '复方氨酚烷胺',
    '板蓝根颗粒',
    '藿香正气水',
    '连花清瘟胶囊',
    '六味地黄丸',
    '健胃消食片',
    '云南白药气雾剂',
    '风油精',
    '创可贴',
    '体温计',
    '血压计',
    '血糖仪',
    '按摩器'
]
const descriptions = [
    '家庭常备 疗效显著',
    '正品保障 品质优选',
    '限时特惠 品质之选',
    '热销爆款 好评如潮',
    '新品上市 医师推荐',
    '厂家直销 物美价廉'
]

/**
 * 模拟异步请求，延迟 800~1200ms
 */
const fakeRequest = <T = any,>(data: T, delay?: number): Promise<T> => {
    const ms = delay ?? 800 + Math.random() * 400
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), ms)
    })
}

/**
 * 生成单条商品数据
 */
const generateItem = (index: number): AnyObject => {
    const category = categories[index % categories.length]
    const desc = descriptions[index % descriptions.length]
    const price = (Math.random() * 200 + 5).toFixed(2)
    const sold = Math.floor(Math.random() * 10000)
    // 随机图片，使用 picsum
    const seed = `product-${index}-${Date.now()}`
    return {
        id: index,
        name: category,
        description: desc,
        price,
        sold: sold > 9999 ? `${(sold / 10000).toFixed(1)}万` : String(sold),
        image: `https://picsum.photos/seed/${seed}/400/400`
    }
}

/**
 * 请求列表数据
 */
const fetchList = async (isRefresh = false) => {
    if (isLoading.value) return

    if (isRefresh) {
        pagination.current = 1
        pagination.hasMore = true
        list.value = []
    }

    isLoading.value = true
    loadStatus.value = 'loading'

    try {
        const start = (pagination.current - 1) * pagination.pageSize
        const end = start + pagination.pageSize
        const mockData: AnyObject[] = []

        for (let i = start; i < end; i++) {
            mockData.push(generateItem(i))
        }

        const result = await fakeRequest({
            list: mockData,
            total: 200 // 模拟总共200条
        })

        if (isRefresh) {
            list.value = result.list
        } else {
            list.value.push(...result.list)
        }

        pagination.total = result.total
        pagination.hasMore = list.value.length < result.total
        loadStatus.value = pagination.hasMore ? 'loadMore' : 'noMore'
        pagination.current++
    } catch {
        loadStatus.value = 'loadMore'
    } finally {
        isLoading.value = false
        firstLoading.value = false
    }
}

/**
 * 滚动到底部加载更多
 */
const loadMore = () => {
    if (!pagination.hasMore || isLoading.value) return
    fetchList()
}

/**
 * 点击商品
 */
const onItemClick = (item: AnyObject) => {
    uni.showToast({
        title: `点击了: ${item.name}`,
        icon: 'none'
    })
}

/**
 * 点击搜索栏
 */
const onSearch = () => {
    uni.showToast({
        title: '搜索功能',
        icon: 'none'
    })
}

// ====== 初始化加载 ======
onMounted(() => {
    fetchList(true)
})
</script>

<style scoped lang="scss">

.page {
    &-header {
        padding: $hy-border-margin-padding-base $hy-border-margin-padding-base 0;
        background: $hy-background--container;
    }

    &-body {
        padding: $hy-border-margin-padding-sm $hy-border-margin-padding-sm 0;
        height: calc(100vh - 180rpx);
    }
}

/* 骨架屏 */
.skeleton-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: $hy-border-margin-padding-sm;
    padding: 8rpx;
}

.skeleton-card {
    width: calc(50% - 8rpx);
    background: $hy-background--container;
    border-radius: $hy-radius-base;
    overflow: hidden;

    &__image {
        width: 100%;
        height: 260rpx;
    }

    &__content {
        padding: $hy-border-margin-padding-sm;
    }

    &__title {
        height: 28rpx;
        border-radius: 6rpx;
        background: $hy-background--skeleton;
        margin-bottom: 12rpx;
    }

    &__desc {
        height: 22rpx;
        border-radius: 6rpx;
        background: $hy-background--skeleton;
        margin-bottom: $hy-border-margin-padding-sm;
    }

    &__price-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__price {
        width: 100rpx;
        height: 28rpx;
        border-radius: 6rpx;
        background: $hy-background--skeleton;
    }

    &__tag {
        width: 64rpx;
        height: 22rpx;
        border-radius: 6rpx;
        background: $hy-background--skeleton;
    }
}

.skeleton-animate {
    background: linear-gradient(
        90deg,
        $hy-background--skeleton 25%,
        $hy-background--track 50%,
        $hy-background--skeleton 75%
    );
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.5s ease-in-out infinite;
}

@keyframes skeleton-shimmer {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

/* 商品卡片 */
.product-card {
    width: 100%;
    height: 100%;
    background: $hy-background--container;
    border-radius: $hy-radius-base;
    overflow: hidden;
    box-shadow: $hy-shadow-sm;
    transition: transform 0.2s ease;

    &:active {
        transform: scale(0.98);
    }

    &__image {
        width: 100%;
        height: 55%;
        display: block;
    }

    &__info {
        padding: $hy-border-margin-padding-sm;
        display: flex;
        flex-direction: column;
        height: 45%;
        box-sizing: border-box;
    }

    &__name {
        font-size: $hy-font-size-sm;
        font-weight: $hy-font-weight-medium;
        color: $hy-text-color;
        line-height: $hy-line-height-sm;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    &__desc {
        font-size: $hy-font-size-xs;
        color: $hy-text-color--3;
        margin-top: 6rpx;
    }

    &__bottom {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        margin-top: auto;
        padding-top: 8rpx;
    }

    &__price {
        font-size: $hy-font-size-md;
        font-weight: $hy-font-weight-bold;
        color: $hy-error;
    }

    &__symbol {
        font-size: $hy-font-size-xs;
        font-weight: $hy-font-weight-medium;
    }

    &__sold {
        font-size: $hy-font-size-xs;
        color: $hy-text-color--3;
    }
}
</style>
