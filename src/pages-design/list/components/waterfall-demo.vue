<template>
    <!-- 首次加载骨架屏 -->
    <view v-if="firstLoading" class="skeleton-wrapper">
        <view v-for="i in 6" :key="i" class="skeleton-card">
            <view class="skeleton-card__image skeleton-animate"></view>
            <view class="skeleton-card__content">
                <view class="skeleton-card__title skeleton-animate"></view>
                <view class="skeleton-card__desc skeleton-animate" style="width: 60%"></view>
                <view class="skeleton-card__price-row">
                    <view class="skeleton-card__price skeleton-animate"></view>
                    <view class="skeleton-card__tag skeleton-animate"></view>
                </view>
            </view>
        </view>
    </view>

    <!-- 两列插槽示例：left-list / right-list -->
    <hy-list
        v-else
        :list="list"
        container-height="100%"
        :item-height="itemCardHeight"
        :margin-bottom="10"
        padding="0"
        border-radius="12"
        :line="2"
        :load="loadStatus"
        :show-divider="list.length > 0"
        @scroll-to-lower="loadMore"
    >
        <!-- #ifdef H5 || APP_PLUS -->
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
                    <hy-flex gap="10">
                        <hy-tag label="国产" plain size="mini"></hy-tag>
                        <hy-tag label="物美价廉" plain size="mini"></hy-tag>
                        <hy-tag label="跑车" plain size="mini"></hy-tag>
                    </hy-flex>
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
                    <hy-flex gap="10">
                        <hy-tag label="国产" plain size="mini"></hy-tag>
                        <hy-tag label="物美价廉" plain size="mini"></hy-tag>
                        <hy-tag label="跑车" plain size="mini"></hy-tag>
                    </hy-flex>
                    <view class="product-card__bottom">
                        <text class="product-card__price">
                            <text class="product-card__symbol">¥</text>{{ record.price }}
                        </text>
                        <text class="product-card__sold">{{ record.sold }}人付款</text>
                    </view>
                </view>
            </view>
        </template>
        <!-- #endif -->

        <!-- #ifndef H5 || APP_PLUS -->
        <template #left-list="{ record }">
            <view
                class="product-card"
                v-for="item in record"
                :key="item.id"
                style="margin-bottom: 10px"
            >
                <image
                    :src="item.image"
                    class="product-card__image"
                    mode="aspectFill"
                    lazy-load
                ></image>
                <view class="product-card__info">
                    <text class="product-card__name">{{ item.name }}</text>
                    <text class="product-card__desc">{{ item.description }}</text>
                    <hy-flex gap="10">
                        <hy-tag label="国产" plain size="mini"></hy-tag>
                        <hy-tag label="物美价廉" plain size="mini"></hy-tag>
                        <hy-tag label="跑车" plain size="mini"></hy-tag>
                    </hy-flex>
                    <view class="product-card__bottom">
                        <text class="product-card__price">
                            <text class="product-card__symbol">¥</text>{{ item.price }}
                        </text>
                        <text class="product-card__sold">{{ item.sold }}人付款</text>
                    </view>
                </view>
            </view>
        </template>
        <template #right-list="{ record }">
            <view
                class="product-card"
                v-for="item in record"
                :key="item.id"
                style="margin-bottom: 10px"
            >
                <image
                    :src="item.image"
                    class="product-card__image"
                    mode="aspectFill"
                    lazy-load
                ></image>
                <view class="product-card__info">
                    <text class="product-card__name">{{ item.name }}</text>
                    <text class="product-card__desc">{{ item.description }}</text>
                    <hy-flex gap="10">
                        <hy-tag label="国产" plain size="mini"></hy-tag>
                        <hy-tag label="物美价廉" plain size="mini"></hy-tag>
                        <hy-tag label="跑车" plain size="mini"></hy-tag>
                    </hy-flex>
                    <view class="product-card__bottom">
                        <text class="product-card__price">
                            <text class="product-card__symbol">¥</text>{{ item.price }}
                        </text>
                        <text class="product-card__sold">{{ item.sold }}人付款</text>
                    </view>
                </view>
            </view>
        </template>
        <!-- #endif -->
    </hy-list>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { config } from '@/config/config.ts'

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

// ====== 模拟数据 ======
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
    '创可贴'
]
const descriptions = [
    '家庭常备 疗效显著',
    '正品保障 品质优选',
    '限时特惠 品质之选',
    '热销爆款 好评如潮',
    '新品上市 医师推荐',
    '厂家直销 物美价廉'
]

const fakeRequest = <T = any,>(data: T, delay?: number): Promise<T> => {
    const ms = delay || 800 + Math.random() * 400
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), ms)
    })
}

const generateItem = (index: number): AnyObject => {
    const category = categories[index % categories.length]
    const desc = descriptions[index % descriptions.length]
    const price = (Math.random() * 200 + 5).toFixed(2)
    const sold = Math.floor(Math.random() * 10000)
    const img = Math.floor(Math.random() * 11) + 1
    const imgName = `good_${img}.jpg`
    return {
        id: index,
        name: category,
        description: desc,
        price,
        sold: sold > 9999 ? `${(sold / 10000).toFixed(1)}万` : String(sold),
        image: config.good(imgName)
    }
}

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

        const result = await fakeRequest({ list: mockData, total: 200 })

        if (isRefresh) {
            list.value = result.list
        } else {
            list.value.push(...result.list)
        }

        pagination.total = result.total
        pagination.hasMore = list.value.length < result.total
        loadStatus.value = pagination.hasMore ? 'loadMore' : 'noMore'
        pagination.current++
    } catch (e) {
        loadStatus.value = 'loadMore'
    } finally {
        isLoading.value = false
        firstLoading.value = false
    }
}

const loadMore = () => {
    if (!pagination.hasMore || isLoading.value) return
    fetchList()
}

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
    height: 280px;
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
        margin: $hy-border-margin-padding-sm 0;
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
