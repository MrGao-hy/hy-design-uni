<template>
    <view class="hy-table" :style="{ height: addUnit(height) }">
        <!-- 表格容器 -->
        <scroll-view class="hy-table__scroll" scroll-y>
            <view
                class="hy-table__container"
                :class="{ 'is-border': border, 'hy-table__container--stripe': stripe }"
            >
                <!-- 表头 (Header) -->
                <view
                    class="hy-table__container--tr hy-table__container--header"
                    :style="{ minWidth: totalMinWidth + 'px' }"
                >
                    <view
                        class="hy-table__container__th"
                        v-for="(col, index) in columns"
                        :key="col.key || index"
                        :style="[getCellStyle(col, true)]"
                        @click="handleSort(col)"
                    >
                        <text class="hy-table__container__th--text">{{ col.title }}</text>

                        <!-- 排序图标 -->
                        <view v-if="col.sortable" class="hy-table__container__th--sort">
                            <hy-icon
                                :name="IconConfig.ARROW_UP_FILL"
                                size="10"
                                :custom-class="
                                    sortKey === col.key && sortType === 'asc' ? 'is-active' : ''
                                "
                            />
                            <hy-icon
                                :name="IconConfig.ARROW_DOWN_FILL"
                                size="10"
                                :custom-class="
                                    sortKey === col.key && sortType === 'desc' ? 'is-active' : ''
                                "
                            />
                        </view>
                    </view>
                </view>

                <!-- 表格内容 (Body) -->
                <view v-if="!loading && tableData.length > 0" class="uni-table-body">
                    <view
                        class="hy-table__container--tr"
                        v-for="(row, rowIndex) in tableData"
                        :key="row[rowKey] || rowIndex"
                        :style="{ minWidth: totalMinWidth + 'px' }"
                        @click="handleRowClick(row, rowIndex)"
                    >
                        <view
                            class="hy-table__container__td"
                            v-for="(col, colIndex) in columns"
                            :key="col.key || colIndex"
                            :style="[getCellStyle(col, false)]"
                            @click.stop="handleCellClick(row, col)"
                        >
                            <!-- 核心改动：默认作用域插槽，暴露 row, col, index -->
                            <slot name="default" :row="row" :col="col" :index="rowIndex">
                                <!-- 默认渲染逻辑（支持省略号） -->
                                <text
                                    :class="{ 'hy-table__container__td--ellipsis': col.ellipsis }"
                                    >{{ row[col.key] }}</text
                                >
                            </slot>
                        </view>
                    </view>
                </view>

                <!-- 空状态 -->
                <hy-empty
                    :show="!loading && tableData.length === 0"
                    :description="emptyText"
                ></hy-empty>

                <!-- 加载状态 -->
                <hy-loading
                    :show="loading"
                    text="加载中..."
                    mode="circle"
                    direction="column"
                    custom-class="hy-table__container--loading"
                ></hy-loading>
            </view>
        </scroll-view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-table',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import tableProps from './props'
import type { ITableColumn, ITableEmits, SortType } from './typing'
import { addUnit, IconConfig } from '../../libs'
// 组件
import HyEmpty from '../hy-empty/hy-empty.vue'
import HyLoading from '../hy-loading/hy-loading.vue'
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 用于展示多条结构类似的数据， 可对数据进行排序等操作。
 * @displayName hy-table
 */
defineOptions({})

const props = defineProps(tableProps)
const emit = defineEmits<ITableEmits>()

// --- 状态管理 ---
const sortKey = ref<string>('')
const sortType = ref<SortType>('normal')
const tableData = ref<any[]>([]) // 内部维护的数据，用于排序展示

// --- 监听数据变化 ---
watch(
    () => props.data,
    (val) => {
        tableData.value = [...val]
        // 如果当前有排序状态，重新应用排序
        if (sortKey.value && sortType.value) {
            localSort()
        }
    },
    { immediate: true, deep: true }
)

// --- 计算总宽度 (用于 scroll-view 横向滚动) ---
const totalMinWidth = computed(() => {
    let width = 0
    props.columns.forEach((col) => {
        // 简单估算：如果有明确宽度则累加，否则给个默认值 100
        const w = parseInt(String(col.width || 100))
        width += w
    })
    return width
})

// --- 样式计算 ---
const getCellStyle = (col: ITableColumn, isHeader: boolean) => {
    const style: any = {}

    // 处理宽度
    if (col.width) {
        const w = typeof col.width === 'number' ? `${col.width}px` : col.width
        style.width = w
        style.flex = `0 0 ${w}` // 固定宽度，不伸缩
    } else {
        style.flex = 1 // 自动填充
        style.minWidth = '150rpx' // 最小宽度防止太挤
    }

    // 处理对齐
    style.justifyContent =
        col.align === 'center' ? 'center' : col.align === 'right' ? 'flex-end' : 'flex-start'
    style.textAlign = col.align || 'left'

    return style
}

// --- 排序逻辑 ---
const handleSort = (col: ITableColumn) => {
    if (!col.sortable) return

    // 切换排序状态: '' -> 'asc' -> 'desc' -> ''
    if (sortKey.value !== col.key) {
        sortKey.value = col.key
        sortType.value = 'asc'
    } else {
        if (sortType.value === 'asc') sortType.value = 'desc'
        else if (sortType.value === 'desc') sortType.value = 'normal'
        else sortType.value = 'asc' // 逻辑闭环
    }

    // 触发本地排序或远程排序事件
    localSort()
    emit('sort-change', { key: sortKey.value, type: sortType.value })
}

const localSort = () => {
    if (!sortType.value) {
        tableData.value = [...props.data] // 还原
        return
    }

    tableData.value.sort((a, b) => {
        const valA = a[sortKey.value]
        const valB = b[sortKey.value]

        // 简单的数字和字符串比较
        if (valA === valB) return 0

        let result = 0
        if (typeof valA === 'number' && typeof valB === 'number') {
            result = valA - valB
        } else {
            result = String(valA).localeCompare(String(valB))
        }

        return sortType.value === 'asc' ? result : -result
    })
}

// --- 交互逻辑 ---
const handleRowClick = (row: any, index: number) => {
    emit('row-click', row, index)
}

// 处理单元格点击（主要用于Tooltip）
const handleCellClick = (row: any, col: ITableColumn) => {
    // 如果开启了 tooltip，显示完整内容
    if (col.tooltip && col.ellipsis) {
        const content = row[col.key]
        if (content) {
            uni.showToast({ title: String(content), icon: 'none' })
        }
    }
    emit('cell-click', row, col)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
