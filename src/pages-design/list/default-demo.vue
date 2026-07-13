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

    <!-- 默认插槽示例：横向 tabs 切换 -->
    <hy-list
        v-else
        ref="listRef"
        :list="list"
        container-height="100%"
        :item-height="100"
        :margin-bottom="10"
        padding="0"
        border-radius="12"
        :load="loadStatus"
        :show-divider="list.length > 0"
        @scroll-to-lower="loadMore"
    >
        <template #default="{ record }">
            <view v-for="item in record" class="list-item" @click="onItemClick(item)">
                <image
                    :src="item.image"
                    class="list-item__image"
                    mode="aspectFill"
                    lazy-load
                ></image>
                <view class="list-item__info">
                    <text class="list-item__name">{{ item.name }}</text>
                    <view class="list-item__bottom">
                        <text class="list-item__price">
                            <text class="list-item__symbol">¥</text>{{ item.price }}
                        </text>
                        <text class="list-item__sold">{{ item.sold }}人付款</text>
                    </view>
                </view>
            </view>
        </template>
    </hy-list>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

// ====== 列表数据 ======
const list = ref<AnyObject[]>([])

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

const fakeRequest = <T = any,>(data: T, delay?: number): Promise<T> => {
    const ms = delay ?? 800 + Math.random() * 400
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), ms)
    })
}

const generateItem = (index: number): AnyObject => {
    const category = categories[index % categories.length]
    const price = (Math.random() * 200 + 5).toFixed(2)
    const sold = Math.floor(Math.random() * 10000)
    const seed = `default-${index}-${Date.now()}`
    return {
        id: index,
        name: category,
        price,
        sold: sold > 9999 ? `${(sold / 10000).toFixed(1)}万` : String(sold),
        image: `https://picsum.photos/seed/${seed}/400/400`
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
    } catch {
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

const onItemClick = (item: AnyObject) => {
    uni.showToast({ title: item.name, icon: 'none' })
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
    flex-direction: column;
    gap: $hy-border-margin-padding-sm;
    padding: 8rpx;
}

.skeleton-card {
    display: flex;
    background: $hy-background--container;
    border-radius: $hy-radius-base;
    overflow: hidden;

    &__image {
        width: 180rpx;
        height: 180rpx;
        flex-shrink: 0;
    }

    &__content {
        flex: 1;
        padding: $hy-border-margin-padding-sm;
        display: flex;
        flex-direction: column;
        justify-content: center;
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

/* 列表项 */
.list-item {
    display: flex;
    align-items: center;
    background: $hy-background--container;
    border-radius: $hy-radius-base;
    overflow: hidden;
    box-shadow: $hy-shadow-sm;
    margin-bottom: 10px;
    height: 100px;

    &:active {
        opacity: 0.8;
    }

    &__image {
        width: 180rpx;
        height: 180rpx;
        flex-shrink: 0;
    }

    &__info {
        flex: 1;
        padding: $hy-border-margin-padding-sm;
        display: flex;
        flex-direction: column;
        justify-content: center;
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

    &__bottom {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        margin-top: 12rpx;
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
