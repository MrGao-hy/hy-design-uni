<template>
    <view class="uni-table-wrap" :style="{ height: height, position: 'relative' }">
        <!-- 固定列容器 (左侧) -->
        <view
            v-if="fixedColumns.length"
            class="uni-table-fixed"
            :style="{
                width: fixedTotalWidth + 'px',
                height: height,
                zIndex: 20
            }"
        >
            <scroll-view
                class="uni-table-scroll"
                :scroll-y="true"
                :show-scrollbar="false"
                :scroll-top="syncScrollTop"
                @scroll="handleFixedScroll"
                :scroll-with-animation="false"
            >
                <view
                    class="uni-table"
                    :class="{ 'uni-table-border': border, 'uni-table-stripe': stripe }"
                >
                    <!-- 固定列表头 -->
                    <view
                        class="uni-table-tr uni-table-header"
                        :style="{ minWidth: fixedTotalWidth + 'px' }"
                    >
                        <view
                            class="uni-table-th"
                            v-for="(col, index) in fixedColumns"
                            :key="col.key || index"
                            :style="[getCellStyle(col, true)]"
                            @click="handleSort(col)"
                        >
                            <text class="th-text" :class="{ 'text-ellipsis': col.ellipsis }">{{
                                col.title
                            }}</text>
                            <!-- 排序图标 -->
                            <view v-if="col.sortable" class="sort-icon">
                                <text
                                    class="arrow up"
                                    :class="{ active: sortKey === col.key && sortType === 'asc' }"
                                    >▲</text
                                >
                                <text
                                    class="arrow down"
                                    :class="{ active: sortKey === col.key && sortType === 'desc' }"
                                    >▼</text
                                >
                            </view>
                        </view>
                    </view>

                    <!-- 固定列内容 -->
                    <view v-if="!loading && tableData.length > 0" class="uni-table-body">
                        <view
                            class="uni-table-tr"
                            v-for="(row, rowIndex) in tableData"
                            :key="row[rowKey] || rowIndex"
                            :style="{ minWidth: fixedTotalWidth + 'px' }"
                            @click="handleRowClick(row, rowIndex)"
                        >
                            <view
                                class="uni-table-td"
                                v-for="(col, colIndex) in fixedColumns"
                                :key="col.key || colIndex"
                                :style="[getCellStyle(col, false)]"
                                @click.stop="handleCellClick(row, col)"
                            >
                                <text :class="{ 'text-ellipsis': col.ellipsis }">{{
                                    row[col.key]
                                }}</text>
                            </view>
                        </view>
                    </view>

                    <!-- 固定列空状态/加载状态 -->
                    <view
                        v-if="!loading && tableData.length === 0"
                        class="uni-table-empty"
                        :style="{ width: fixedTotalWidth + 'px' }"
                    >
                        <text class="empty-text">{{ emptyText }}</text>
                    </view>
                    <view
                        v-if="loading"
                        class="uni-table-loading"
                        :style="{ width: fixedTotalWidth + 'px' }"
                    >
                        <text class="loading-text">加载中...</text>
                    </view>
                </view>
            </scroll-view>
        </view>

        <!-- 滚动列容器 (右侧) -->
        <view
            class="uni-table-scrollable"
            :style="{
                marginLeft: fixedColumns.length ? fixedTotalWidth + 'px' : '0',
                height: height
            }"
        >
            <scroll-view
                class="uni-table-scroll"
                :scroll-x="true"
                :scroll-y="true"
                :show-scrollbar="true"
                :scroll-top="syncScrollTop"
                @scroll="handleMainScroll"
                :scroll-with-animation="false"
            >
                <view
                    class="uni-table"
                    :class="{ 'uni-table-border': border, 'uni-table-stripe': stripe }"
                >
                    <!-- 滚动列表头 -->
                    <view
                        class="uni-table-tr uni-table-header"
                        :style="{ minWidth: scrollTotalWidth + 'px' }"
                    >
                        <view
                            class="uni-table-th"
                            v-for="(col, index) in scrollColumns"
                            :key="col.key || index"
                            :style="[getCellStyle(col, true)]"
                            @click="handleSort(col)"
                        >
                            <text class="th-text" :class="{ 'text-ellipsis': col.ellipsis }">{{
                                col.title
                            }}</text>
                            <!-- 排序图标 -->
                            <view v-if="col.sortable" class="sort-icon">
                                <text
                                    class="arrow up"
                                    :class="{ active: sortKey === col.key && sortType === 'asc' }"
                                    >▲</text
                                >
                                <text
                                    class="arrow down"
                                    :class="{ active: sortKey === col.key && sortType === 'desc' }"
                                    >▼</text
                                >
                            </view>
                        </view>
                    </view>

                    <!-- 滚动列内容 -->
                    <view v-if="!loading && tableData.length > 0" class="uni-table-body">
                        <view
                            class="uni-table-tr"
                            v-for="(row, rowIndex) in tableData"
                            :key="row[rowKey] || rowIndex"
                            :style="{ minWidth: scrollTotalWidth + 'px' }"
                            @click="handleRowClick(row, rowIndex)"
                        >
                            <view
                                class="uni-table-td"
                                v-for="(col, colIndex) in scrollColumns"
                                :key="col.key || colIndex"
                                :style="[getCellStyle(col, false)]"
                                @click.stop="handleCellClick(row, col)"
                            >
                                <text :class="{ 'text-ellipsis': col.ellipsis }">{{
                                    row[col.key]
                                }}</text>
                            </view>
                        </view>
                    </view>

                    <!-- 滚动列空状态/加载状态 -->
                    <view v-if="!loading && tableData.length === 0" class="uni-table-empty">
                        <text class="empty-text">{{ emptyText }}</text>
                    </view>
                    <view v-if="loading" class="uni-table-loading">
                        <text class="loading-text">加载中...</text>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted, onUnmounted } from 'vue'

// --- 类型定义 ---
export interface TableColumn {
    title: string // 列标题
    key: string // 对应数据字段名
    width?: number | string // 列宽 (必须是数字px，固定列必填)
    align?: 'left' | 'center' | 'right' // 对齐方式
    sortable?: boolean // 是否开启排序
    fixed?: boolean // 是否固定列
    ellipsis?: boolean // 是否开启文本超长省略
    tooltip?: boolean // 开启省略后，是否开启点击显示完整内容(Tooltip)
}

interface Props {
    data: any[] // 数据源
    columns: TableColumn[] // 列配置
    height?: string // 表格高度，必须是固定高度（如 '500rpx'、'300px'）
    stripe?: boolean // 是否斑马纹
    border?: boolean // 是否带有纵向边框
    loading?: boolean // 加载状态
    emptyText?: string // 空数据提示
    rowKey?: string // 行数据的唯一键名
    fixedGap?: number // 固定列与滚动列之间的间距（px）
}

// --- Props 与 Emits ---
const props = withDefaults(defineProps<Props>(), {
    data: () => [],
    columns: () => [],
    height: '500rpx',
    stripe: false,
    border: true,
    loading: false,
    emptyText: '暂无数据',
    rowKey: 'id',
    fixedGap: 2
})

const emit = defineEmits<{
    (e: 'row-click', row: any, index: number): void
    (e: 'cell-click', row: any, col: TableColumn): void
    (e: 'sort-change', params: { key: string; type: 'asc' | 'desc' | '' }): void
}>()

// --- 状态管理 ---
const sortKey = ref<string>('')
const sortType = ref<'asc' | 'desc' | ''>('')
const tableData = ref<any[]>([])
const syncScrollTop = ref<number>(0) // 同步的滚动高度，双向绑定到两个scroll-view
const mainScrollLock = ref<boolean>(false) // 主滚动锁
const fixedScrollLock = ref<boolean>(false) // 固定列滚动锁
const scrollDebounceTimer = ref<NodeJS.Timeout | null>(null) // 防抖计时器

// --- 拆分固定列和滚动列 ---
const fixedColumns = computed(() => {
    return props.columns.filter((col) => col.fixed)
})

const scrollColumns = computed(() => {
    return props.columns.filter((col) => !col.fixed)
})

// --- 计算宽度（修复：统一转为px计算，避免单位混乱）---
const fixedTotalWidth = computed(() => {
    let width = 0
    fixedColumns.value.forEach((col) => {
        // 固定列必须指定数字类型的宽度（px）
        if (!col.width) {
            console.warn('固定列必须指定width属性（数字类型，单位px）')
            col.width = 120 // 默认宽度
        }
        const w = typeof col.width === 'number' ? col.width : parseInt(col.width)
        width += isNaN(w) ? 120 : w
    })
    return width
})

const scrollTotalWidth = computed(() => {
    let width = 0
    scrollColumns.value.forEach((col) => {
        const w = col.width
            ? typeof col.width === 'number'
                ? col.width
                : parseInt(col.width)
            : 150
        width += isNaN(w) ? 150 : w
    })
    return width
})

// --- 监听数据变化 ---
watch(
    () => props.data,
    (val) => {
        tableData.value = [...val]
        if (sortKey.value && sortType.value) {
            localSort()
        }
    },
    { immediate: true, deep: true }
)

// --- 滚动同步处理（核心修复：双向绑定 + 防抖 + 锁机制）---
// 主滚动列滚动事件
const handleMainScroll = (e: UniApp.ScrollViewScrollEvent) => {
    if (mainScrollLock.value) return

    // 防抖处理：避免滚动事件触发过于频繁
    if (scrollDebounceTimer.value) {
        clearTimeout(scrollDebounceTimer.value)
    }

    scrollDebounceTimer.value = setTimeout(() => {
        const currentTop = e.detail.scrollTop
        // 锁定固定列滚动，防止事件循环
        fixedScrollLock.value = true

        // 更新同步滚动高度
        syncScrollTop.value = currentTop

        // 解锁延迟：确保固定列滚动完成后再解锁
        setTimeout(() => {
            fixedScrollLock.value = false
        }, 50)
    }, 16) // 约60fps的间隔
}

// 固定列滚动事件
const handleFixedScroll = (e: UniApp.ScrollViewScrollEvent) => {
    if (fixedScrollLock.value) return

    if (scrollDebounceTimer.value) {
        clearTimeout(scrollDebounceTimer.value)
    }

    scrollDebounceTimer.value = setTimeout(() => {
        const currentTop = e.detail.scrollTop
        // 锁定主滚动
        mainScrollLock.value = true

        // 更新同步滚动高度
        syncScrollTop.value = currentTop

        // 解锁延迟
        setTimeout(() => {
            mainScrollLock.value = false
        }, 50)
    }, 16)
}

// 监听syncScrollTop变化，确保双向同步
watch(syncScrollTop, (newVal) => {
    // 当syncScrollTop变化时，确保两个scroll-view都同步
    nextTick(() => {
        // 这里不需要额外操作，因为scroll-top已经双向绑定
    })
})

// --- 样式计算（修复：统一单位处理）---
const getCellStyle = (col: TableColumn, isHeader: boolean) => {
    const style: any = {}

    // 处理宽度（固定列强制固定宽度）
    if (col.width) {
        const w = typeof col.width === 'number' ? `${col.width}px` : col.width
        style.width = w
        style.flex = `0 0 ${w}` // 固定宽度，不伸缩
        style.minWidth = w
        style.maxWidth = w
    } else {
        style.flex = 1
        style.minWidth = '150rpx'
    }

    // 处理对齐
    const align = col.align || 'left'
    style.justifyContent =
        align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start'
    style.textAlign = align
    style.alignItems = 'center'

    // 固定列样式
    if (col.fixed) {
        style.borderRight = props.border ? `1px solid #ebeef5` : 'none'
        style.boxShadow = props.fixedGap > 0 ? `2px 0 ${props.fixedGap}px rgba(0,0,0,0.03)` : 'none'
        style.zIndex = 1
    }

    return style
}

// --- 排序逻辑 ---
const handleSort = (col: TableColumn) => {
    if (!col.sortable) return

    if (sortKey.value !== col.key) {
        sortKey.value = col.key
        sortType.value = 'asc'
    } else {
        sortType.value = sortType.value === 'asc' ? 'desc' : sortType.value === 'desc' ? '' : 'asc'
    }

    localSort()
    emit('sort-change', { key: sortKey.value, type: sortType.value })
}

const localSort = () => {
    if (!sortType.value) {
        tableData.value = [...props.data]
        return
    }

    tableData.value.sort((a, b) => {
        const valA = a[sortKey.value]
        const valB = b[sortKey.value]

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

const handleCellClick = (row: any, col: TableColumn) => {
    if (col.tooltip && col.ellipsis) {
        const content = row[col.key]
        if (content) {
            uni.showToast({
                title: String(content),
                icon: 'none',
                duration: 2000
            })
        }
    }
    emit('cell-click', row, col)
}

// --- 初始化处理 ---
onMounted(() => {
    // 检查固定列配置
    fixedColumns.value.forEach((col, index) => {
        if (!col.width) {
            console.error(`固定列[${col.title}]缺少width属性，请指定数字类型的宽度（单位px）`)
        } else if (typeof col.width === 'string' && isNaN(parseInt(col.width))) {
            console.error(`固定列[${col.title}]的width属性格式错误，必须是数字或数字字符串`)
        }
    })

    // 初始化滚动位置
    syncScrollTop.value = 0
})

// --- 清理防抖计时器 ---
onUnmounted(() => {
    if (scrollDebounceTimer.value) {
        clearTimeout(scrollDebounceTimer.value)
    }
})
</script>

<style lang="scss" scoped>
/* 变量定义 */
$border-color: #ebeef5;
$header-bg: #f5f7fa;
$text-color: #606266;
$header-text-color: #909399;
$stripe-bg: #fafafa;
$hover-bg: #f5f7fa;

.uni-table-wrap {
    width: 100%;
    background-color: #fff;
    border: 1px solid $border-color;
    box-sizing: border-box;
    overflow: hidden;
    position: relative !important;
}

/* 固定列容器 - 关键样式修复 */
.uni-table-fixed {
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
    background: #fff !important;
    overflow: hidden !important;
    border-right: 1px solid $border-color;
    /* 确保固定列在最上层 */
    z-index: 20 !important;
}

/* 滚动列容器 - 关键样式修复 */
.uni-table-scrollable {
    width: 100% !important;
    height: 100% !important;
    overflow: hidden !important;
    box-sizing: border-box !important;
}

/* 滚动容器 - 关键样式修复 */
.uni-table-scroll {
    width: 100% !important;
    height: 100% !important;
    overflow: auto !important;
    -webkit-overflow-scrolling: touch; /* 优化H5滚动体验 */
}

.uni-table {
    display: flex !important;
    flex-direction: column !important;
    min-width: 100% !important;
}

/* 行样式 - 修复斑马纹同步 */
.uni-table-tr {
    display: flex !important;
    flex-direction: row !important;
    border-bottom: 1px solid $border-color;
    box-sizing: border-box !important;
    width: 100% !important;

    &:last-child {
        border-bottom: none;
    }
}

/* 表头样式 - 修复粘性定位 */
.uni-table-header {
    background-color: $header-bg !important;
    font-weight: bold !important;
    position: sticky !important;
    top: 0 !important;
    z-index: 10 !important;
    width: 100% !important;
    /* 防止表头被覆盖 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

/* 单元格通用样式 - 修复宽度和对齐 */
.uni-table-th,
.uni-table-td {
    padding: 20rpx !important;
    display: flex !important;
    align-items: center !important;
    box-sizing: border-box !important;
    font-size: 28rpx !important;
    color: $text-color !important;
    white-space: nowrap !important;
    overflow: hidden !important;
}

.uni-table-th {
    color: $header-text-color !important;
    font-size: 26rpx !important;
    font-weight: 600 !important;
}

/* 文本省略样式 */
.text-ellipsis {
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    width: 100% !important;
    display: block !important;
}

/* 边框模式 */
.uni-table-border {
    .uni-table-th,
    .uni-table-td {
        border-right: 1px solid $border-color;

        &:last-child {
            border-right: none;
        }
    }

    /* 固定列特殊处理 - 避免双重边框 */
    .uni-table-fixed & .uni-table-th:last-child,
    .uni-table-fixed & .uni-table-td:last-child {
        border-right: none !important;
    }
}

/* 斑马纹 - 修复同步问题 */
.uni-table-stripe {
    .uni-table-body .uni-table-tr:nth-child(even) {
        background-color: $stripe-bg !important;
    }
}

/* 固定列斑马纹强制同步 */
.uni-table-fixed .uni-table-stripe .uni-table-body .uni-table-tr:nth-child(even) {
    background-color: $stripe-bg !important;
}

/* 点击反馈 */
.uni-table-body .uni-table-tr:active {
    background-color: $hover-bg !important;
}

/* 排序图标 */
.sort-icon {
    display: flex !important;
    flex-direction: column !important;
    margin-left: 8rpx !important;
    justify-content: space-between !important;
    height: 35rpx !important;
    margin-top: -4rpx !important;
    margin-bottom: -4rpx !important;

    .arrow {
        font-size: 16rpx !important;
        line-height: 16rpx !important;
        color: #c0c4cc !important;

        &.active {
            color: #409eff !important;
        }

        &.up {
            margin-bottom: -2rpx !important;
        }
        &.down {
            margin-top: -2rpx !important;
        }
    }
}

/* 状态样式 */
.uni-table-empty,
.uni-table-loading {
    padding: 60rpx 0 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    color: #909399 !important;
    font-size: 28rpx !important;
    width: 100% !important;
}

/* 修复小程序端scroll-view层级问题 */
::v-deep(.uni-table-scroll) {
    z-index: inherit !important;
}

/* 修复H5端滚动条显示问题 */
@media (min-width: 768px) {
    .uni-table-scroll::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    .uni-table-scroll::-webkit-scrollbar-thumb {
        background-color: #ddd;
        border-radius: 3px;
    }
    .uni-table-scroll::-webkit-scrollbar-track {
        background-color: #f5f5f5;
    }
}
</style>
