<template>
    <view
        v-if="!(hideIfOnePage && totalPageNum <= 1)"
        class="hy-pagination"
        :class="[customClass, `hy-pagination--${mode}`]"
        :style="customStyle"
    >
        <view class="hy-pagination__content">
            <!-- 上一页 -->
            <view
                class="hy-pagination__item hy-pagination__item--nav"
                :class="{ 'hy-pagination__item--disabled': isFirstPage }"
                @tap="handlePrev"
            >
                <slot name="prev-text">
                    <hy-icon
                        v-if="showIcon"
                        :name="IconConfig.LEFT"
                        :size="iconSize"
                        custom-class="hy-pagination__icon"
                    ></hy-icon>
                    <text v-else>{{ prevText }}</text>
                </slot>
            </view>

            <!-- 简单模式：当前页 / 总页数 -->
            <view v-if="mode === 'simple'" class="hy-pagination__simple">
                <text class="hy-pagination__current">{{ currentPage }}</text>
                <text class="hy-pagination__separator">/</text>
                <text>{{ totalPageNum }}</text>
            </view>

            <!-- 页码模式：页码 + 省略号 -->
            <view
                v-for="item in pageList"
                :key="item.key"
                class="hy-pagination__item"
                :class="{
                    'hy-pagination__item--active':
                        item.type === 'page' && item.value === currentPage,
                    'hy-pagination__item--ellipsis': item.type === 'ellipsis'
                }"
                @tap="handlePageTap(item)"
            >
                <slot
                    v-if="item.type === 'page'"
                    name="page"
                    :number="item.value"
                    :text="String(item.value)"
                    :active="item.value === currentPage"
                >
                    <text>{{ item.value }}</text>
                </slot>
                <text v-else>{{ ellipsisText }}</text>
            </view>

            <!-- 下一页 -->
            <view
                class="hy-pagination__item hy-pagination__item--nav"
                :class="{ 'hy-pagination__item--disabled': isLastPage }"
                @tap="handleNext"
            >
                <slot name="next-text">
                    <hy-icon
                        v-if="showIcon"
                        :name="IconConfig.RIGHT"
                        :size="iconSize"
                        custom-class="hy-pagination__icon"
                    ></hy-icon>
                    <text v-else>{{ nextText }}</text>
                </slot>
            </view>
        </view>

        <view class="hy-pagination__message" v-if="showMessage">
            <text>{{ t('page', currentPage) }}，</text>
            <text v-if="total">{{ t('total', total) }}，</text>
            <text>{{ t('size', pageSize) }}</text>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-pagination',
    options: {
        virtualHost: true,
        addGlobalClass: true,
        styleIsolation: 'shared'
    }
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import type { IPaginationEmits, IPaginationSlots, PaginationItem } from './typing'
import { IconConfig, useTranslate } from '../../libs'
import paginationProps from './props'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 当数据量过多时，使用分页分解数据。
 * @displayName hy-pagination
 */
defineOptions({})

defineSlots<IPaginationSlots>()

const props = defineProps(paginationProps)
const emit = defineEmits<IPaginationEmits>()

const { t } = useTranslate('pagination')

/** 图标尺寸，跟随单元格高度 */
const iconSize = '18px'

/** 总页数：有 total 时按每页条数计算，否则直接使用 totalPage */
const totalPageNum = computed(() => {
    if (props.total > 0) {
        return Math.max(1, Math.ceil(props.total / props.pageSize))
    }
    return Math.max(1, props.totalPage)
})

/** 当前页，超出范围时收敛到合法区间 */
const currentPage = computed(() => {
    const current = Number(props.modelValue) || 1
    return Math.min(Math.max(current, 1), totalPageNum.value)
})

const isFirstPage = computed(() => currentPage.value <= 1)
const isLastPage = computed(() => currentPage.value >= totalPageNum.value)

/** 页码区域容量，至少 3 项才能保证窗口可居中 */
const pageCount = computed(() => Math.max(3, props.pageCount))

/**
 * 页码列表：页码区域最多展示 pageCount 项（页码 + 省略号），
 * 页数较少时全部展示，较多时以当前页为中心取窗口，不足的位置用省略号占位
 * */
const pageList = computed<PaginationItem[]>(() => {
    if (props.mode === 'simple') return []

    const total = totalPageNum.value
    const capacity = pageCount.value

    // 页数不超过容量时全部展示
    if (total <= capacity) {
        return Array.from({ length: total }, (_, index) => ({
            type: 'page' as const,
            value: index + 1,
            key: `page-${index + 1}`
        }))
    }

    /** 以当前页为中心取 size 个页码时的起始页，并收敛到合法区间 */
    const getStart = (size: number) =>
        Math.max(1, Math.min(currentPage.value - Math.floor((size - 1) / 2), total - size + 1))

    // 先为两侧省略号预留槽位，某一侧无需省略号时再把空出的槽位补回页码
    let size = capacity - 2
    for (let candidate = size + 1; candidate <= capacity; candidate++) {
        const candidateStart = getStart(candidate)
        const ellipsisCount =
            (candidateStart > 1 ? 1 : 0) + (candidateStart + candidate - 1 < total ? 1 : 0)
        if (candidate + ellipsisCount > capacity) break
        size = candidate
    }

    const windowStart = getStart(size)
    const end = windowStart + size - 1

    const list: PaginationItem[] = []
    if (windowStart > 1) list.push({ type: 'ellipsis', key: 'ellipsis-prev' })
    for (let page = windowStart; page <= end; page++) {
        list.push({ type: 'page', value: page, key: `page-${page}` })
    }
    if (end < total) list.push({ type: 'ellipsis', key: 'ellipsis-next' })

    return list
})

/** 切换页码，非法值或未变化时不触发 */
const changePage = (value: number) => {
    if (value < 1 || value > totalPageNum.value || value === currentPage.value) return
    emit('change', { value })
    emit('update:modelValue', value)
}

const handlePrev = () => {
    if (isFirstPage.value) return
    changePage(currentPage.value - 1)
}

const handleNext = () => {
    if (isLastPage.value) return
    changePage(currentPage.value + 1)
}

/** 点击页码或省略号：省略号按当前窗口大小跨页 */
const handlePageTap = (item: PaginationItem) => {
    if (item.type === 'page') {
        changePage(item.value)
        return
    }
    const step = pageCount.value
    changePage(item.key === 'ellipsis-prev' ? currentPage.value - step : currentPage.value + step)
}
</script>

<style lang="scss">
@use './index.scss';
</style>
