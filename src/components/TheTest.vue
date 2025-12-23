<template>
    <view class="sticky-table-container" :style="{ height: containerHeight + 'px' }">
        <!-- 列头 -->
        <view class="table-header-wrapper" v-if="showHeader">
            <scroll-view
                class="header-scroll"
                scroll-x
                :scroll-left="scrollLeft"
                :scroll-y="false"
                @scroll="onHeaderScroll"
            >
                <view class="table-header" :style="{ width: totalWidth + 'px' }">
                    <!-- 左侧固定列头 -->
                    <view
                        v-if="leftFixedColumns.length > 0"
                        class="fixed-left-header"
                        :style="{ width: leftFixedWidth + 'px', zIndex: 3 }"
                    >
                        <view
                            v-for="(col, colIndex) in leftFixedColumns"
                            :key="colIndex"
                            class="header-cell"
                            :style="getHeaderCellStyle(col)"
                            @tap="handleSort(col)"
                        >
                            <slot v-if="col.slotHeader" :name="col.slotHeader" :column="col">
                                <text class="header-text">{{ col.title }}</text>
                            </slot>
                            <text v-else class="header-text">{{ col.title }}</text>
                            <view v-if="col.sortable" class="sort-icons">
                                <view
                                    :class="[
                                        'sort-icon',
                                        sortField === col.key && sortOrder === 'asc' ? 'active' : ''
                                    ]"
                                    @tap.stop="handleSort(col, 'asc')"
                                >
                                    ↑
                                </view>
                                <view
                                    :class="[
                                        'sort-icon',
                                        sortField === col.key && sortOrder === 'desc'
                                            ? 'active'
                                            : ''
                                    ]"
                                    @tap.stop="handleSort(col, 'desc')"
                                >
                                    ↓
                                </view>
                            </view>
                        </view>
                    </view>

                    <!-- 中间滚动列头 -->
                    <view class="scroll-header">
                        <view
                            v-for="(col, colIndex) in scrollColumns"
                            :key="colIndex"
                            class="header-cell"
                            :style="getHeaderCellStyle(col)"
                            @tap="handleSort(col)"
                        >
                            <slot v-if="col.slotHeader" :name="col.slotHeader" :column="col">
                                <text class="header-text">{{ col.title }}</text>
                            </slot>
                            <text v-else class="header-text">{{ col.title }}</text>
                            <view v-if="col.sortable" class="sort-icons">
                                <view
                                    :class="[
                                        'sort-icon',
                                        sortField === col.key && sortOrder === 'asc' ? 'active' : ''
                                    ]"
                                    @tap.stop="handleSort(col, 'asc')"
                                >
                                    ↑
                                </view>
                                <view
                                    :class="[
                                        'sort-icon',
                                        sortField === col.key && sortOrder === 'desc'
                                            ? 'active'
                                            : ''
                                    ]"
                                    @tap.stop="handleSort(col, 'desc')"
                                >
                                    ↓
                                </view>
                            </view>
                        </view>
                    </view>

                    <!-- 右侧固定列头 -->
                    <view
                        v-if="rightFixedColumns.length > 0"
                        class="fixed-right-header"
                        :style="{ width: rightFixedWidth + 'px', zIndex: 3 }"
                    >
                        <view
                            v-for="(col, colIndex) in rightFixedColumns"
                            :key="colIndex"
                            class="header-cell"
                            :style="getHeaderCellStyle(col)"
                            @tap="handleSort(col)"
                        >
                            <slot v-if="col.slotHeader" :name="col.slotHeader" :column="col">
                                <text class="header-text">{{ col.title }}</text>
                            </slot>
                            <text v-else class="header-text">{{ col.title }}</text>
                            <view v-if="col.sortable" class="sort-icons">
                                <view
                                    :class="[
                                        'sort-icon',
                                        sortField === col.key && sortOrder === 'asc' ? 'active' : ''
                                    ]"
                                    @tap.stop="handleSort(col, 'asc')"
                                >
                                    ↑
                                </view>
                                <view
                                    :class="[
                                        'sort-icon',
                                        sortField === col.key && sortOrder === 'desc'
                                            ? 'active'
                                            : ''
                                    ]"
                                    @tap.stop="handleSort(col, 'desc')"
                                >
                                    ↓
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>

        <!-- 表格主体 -->
        <view class="table-body-wrapper">
            <!-- 左侧固定列 -->
            <scroll-view
                v-if="leftFixedColumns.length > 0"
                class="fixed-left-body"
                scroll-y
                :scroll-top="scrollTop"
                :style="{ width: leftFixedWidth + 'px', height: bodyHeight + 'px' }"
                @scroll="onLeftScroll"
            >
                <view class="fixed-left-content">
                    <view
                        v-for="(row, rowIndex) in processedData"
                        :key="rowIndex"
                        class="table-row"
                        :style="getRowStyle(rowIndex)"
                    >
                        <view
                            v-for="(col, colIndex) in leftFixedColumns"
                            :key="colIndex"
                            class="body-cell"
                            :style="getBodyCellStyle(col, rowIndex)"
                        >
                            <slot
                                v-if="col.slot"
                                :name="col.slot"
                                :row="row"
                                :column="col"
                                :index="rowIndex"
                            >
                                <text class="cell-text" :class="{ ellipsis: col.ellipsis }">
                                    {{ getCellValue(row, col) }}
                                </text>
                            </slot>
                            <text v-else class="cell-text" :class="{ ellipsis: col.ellipsis }">
                                {{ getCellValue(row, col) }}
                            </text>
                        </view>
                    </view>
                </view>
            </scroll-view>

            <!-- 中间滚动区域 -->
            <scroll-view
                class="scroll-body"
                scroll-x
                scroll-y
                :scroll-left="scrollLeft"
                :scroll-top="scrollTop"
                @scroll="onScroll"
                :style="{
                    height: bodyHeight + 'px',
                    left: leftFixedWidth + 'px',
                    right: rightFixedWidth + 'px'
                }"
            >
                <view class="scroll-content" :style="{ width: scrollWidth + 'px' }">
                    <view
                        v-for="(row, rowIndex) in processedData"
                        :key="rowIndex"
                        class="table-row"
                        :style="getRowStyle(rowIndex)"
                    >
                        <view
                            v-for="(col, colIndex) in scrollColumns"
                            :key="colIndex"
                            class="body-cell"
                            :style="getBodyCellStyle(col, rowIndex)"
                        >
                            <slot
                                v-if="col.slot"
                                :name="col.slot"
                                :row="row"
                                :column="col"
                                :index="rowIndex"
                            >
                                <text class="cell-text" :class="{ ellipsis: col.ellipsis }">
                                    {{ getCellValue(row, col) }}
                                </text>
                            </slot>
                            <text v-else class="cell-text" :class="{ ellipsis: col.ellipsis }">
                                {{ getCellValue(row, col) }}
                            </text>
                        </view>
                    </view>
                </view>
            </scroll-view>

            <!-- 右侧固定列 -->
            <scroll-view
                v-if="rightFixedColumns.length > 0"
                class="fixed-right-body"
                scroll-y
                :scroll-top="scrollTop"
                :style="{
                    width: rightFixedWidth + 'px',
                    height: bodyHeight + 'px',
                    right: '0'
                }"
                @scroll="onRightScroll"
            >
                <view class="fixed-right-content">
                    <view
                        v-for="(row, rowIndex) in processedData"
                        :key="rowIndex"
                        class="table-row"
                        :style="getRowStyle(rowIndex)"
                    >
                        <view
                            v-for="(col, colIndex) in rightFixedColumns"
                            :key="colIndex"
                            class="body-cell"
                            :style="getBodyCellStyle(col, rowIndex)"
                        >
                            <slot
                                v-if="col.slot"
                                :name="col.slot"
                                :row="row"
                                :column="col"
                                :index="rowIndex"
                            >
                                <text class="cell-text" :class="{ ellipsis: col.ellipsis }">
                                    {{ getCellValue(row, col) }}
                                </text>
                            </slot>
                            <text v-else class="cell-text" :class="{ ellipsis: col.ellipsis }">
                                {{ getCellValue(row, col) }}
                            </text>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'

interface TableColumn {
    title: string
    key: string
    width: number
    fixed?: 'left' | 'right'
    align?: 'left' | 'center' | 'right'
    ellipsis?: boolean
    sortable?: boolean
    slot?: string
    slotHeader?: string
    formatter?: (value: any, row: any) => string
}

interface Props {
    columns: TableColumn[]
    data: any[]
    height?: number
    rowHeight?: number
    stripe?: boolean
    showHeader?: boolean
    sortable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    height: 400,
    rowHeight: 50,
    stripe: true,
    showHeader: true,
    sortable: true
})

const emit = defineEmits<{
    'sort-change': [field: string, order: 'asc' | 'desc']
    'row-click': [row: any, index: number]
}>()

// 响应式数据
const scrollLeft = ref(0)
const scrollTop = ref(0)
const rowHeights = ref<number[]>([])
const sortField = ref<string>('')
const sortOrder = ref<'asc' | 'desc'>('asc')

// 计算属性
const leftFixedColumns = computed(() => props.columns.filter((col) => col.fixed === 'left'))

const rightFixedColumns = computed(() => props.columns.filter((col) => col.fixed === 'right'))

const scrollColumns = computed(() => props.columns.filter((col) => !col.fixed))

const leftFixedWidth = computed(() =>
    leftFixedColumns.value.reduce((sum, col) => sum + col.width, 0)
)

const rightFixedWidth = computed(() =>
    rightFixedColumns.value.reduce((sum, col) => sum + col.width, 0)
)

const scrollWidth = computed(() => scrollColumns.value.reduce((sum, col) => sum + col.width, 0))

const totalWidth = computed(() => leftFixedWidth.value + scrollWidth.value + rightFixedWidth.value)

const containerHeight = computed(() => props.height)

const bodyHeight = computed(() => {
    // 减去表头高度
    return props.showHeader ? props.height - 50 : props.height
})

const processedData = computed(() => {
    let data = [...props.data]

    if (sortField.value && props.sortable) {
        data.sort((a, b) => {
            const aVal = a[sortField.value]
            const bVal = b[sortField.value]

            if (aVal === bVal) return 0
            if (sortOrder.value === 'asc') {
                return aVal > bVal ? 1 : -1
            } else {
                return aVal < bVal ? 1 : -1
            }
        })
    }

    return data
})

// 方法
const getHeaderCellStyle = (col: TableColumn) => {
    return {
        width: `${col.width}px`,
        textAlign: col.align || 'left',
        flexShrink: 0
    }
}

const getBodyCellStyle = (col: TableColumn, rowIndex: number) => {
    const rowHeight = rowHeights.value[rowIndex] || props.rowHeight
    return {
        width: `${col.width}px`,
        textAlign: col.align || 'left',
        flexShrink: 0,
        height: `${rowHeight}px`,
        lineHeight: `${rowHeight}px`
    }
}

const getRowStyle = (rowIndex: number) => {
    const rowHeight = rowHeights.value[rowIndex] || props.rowHeight
    const styles: any = {
        height: `${rowHeight}px`,
        lineHeight: `${rowHeight}px`
    }

    if (props.stripe && rowIndex % 2 === 1) {
        styles.backgroundColor = '#f9f9f9'
    }

    return styles
}

const getCellValue = (row: any, col: TableColumn) => {
    if (col.formatter) {
        return col.formatter(row[col.key], row)
    }
    return row[col.key] || ''
}

const onHeaderScroll = (e: any) => {
    scrollLeft.value = e.detail.scrollLeft
}

const onScroll = (e: any) => {
    scrollLeft.value = e.detail.scrollLeft
    scrollTop.value = e.detail.scrollTop
}

const onLeftScroll = (e: any) => {
    scrollTop.value = e.detail.scrollTop
}

const onRightScroll = (e: any) => {
    scrollTop.value = e.detail.scrollTop
}

const handleSort = (col: TableColumn, order?: 'asc' | 'desc') => {
    if (!col.sortable) return

    if (order) {
        sortOrder.value = order
        sortField.value = col.key
    } else {
        if (sortField.value === col.key) {
            sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
        } else {
            sortField.value = col.key
            sortOrder.value = 'asc'
        }
    }

    emit('sort-change', sortField.value, sortOrder.value)
}

// 初始化行高
onMounted(() => {
    rowHeights.value = new Array(props.data.length).fill(props.rowHeight)
})

// 监听数据变化
watch(
    () => props.data,
    () => {
        rowHeights.value = new Array(props.data.length).fill(props.rowHeight)
    },
    { deep: true }
)
</script>

<style scoped lang="scss">
.sticky-table-container {
    position: relative;
    width: 100%;
    background-color: #fff;
    overflow: hidden;
}

.table-header-wrapper {
    position: relative;
    z-index: 10;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e8e8e8;
}

.header-scroll {
    width: 100%;
    height: 50px;
    white-space: nowrap;
}

.table-header {
    display: flex;
    height: 50px;
}

.fixed-left-header,
.fixed-right-header,
.scroll-header {
    display: flex;
    height: 100%;
}

.fixed-left-header,
.fixed-right-header {
    position: sticky;
    background-color: #f5f5f5;
}

.fixed-left-header {
    left: 0;
}

.fixed-right-header {
    right: 0;
}

.header-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 8px;
    font-weight: 600;
    color: #333;
    font-size: 14px;
    border-right: 1px solid #e8e8e8;
    box-sizing: border-box;
    position: relative;
    flex-shrink: 0;
}

.header-text {
    white-space: nowrap;
}

.sort-icons {
    display: flex;
    flex-direction: column;
    margin-left: 4px;
}

.sort-icon {
    font-size: 10px;
    color: #ccc;
    line-height: 0.8;
}

.sort-icon.active {
    color: #1890ff;
}

/* 表格主体 */
.table-body-wrapper {
    position: relative;
    width: 100%;
}

.fixed-left-body,
.fixed-right-body {
    position: absolute;
    top: 0;
    z-index: 5;
    background-color: #fff;
    overflow: hidden;
}

.fixed-left-body {
    left: 0;
    border-right: 1px solid #e8e8e8;
}

.fixed-right-body {
    right: 0;
    border-left: 1px solid #e8e8e8;
}

.scroll-body {
    position: absolute;
    top: 0;
    z-index: 1;
    overflow: scroll;
}

.fixed-left-content,
.fixed-right-content,
.scroll-content {
    display: flex;
    flex-direction: column;
}

.table-row {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
    box-sizing: border-box;
}

.body-cell {
    display: flex;
    align-items: center;
    padding: 0 8px;
    font-size: 14px;
    color: #333;
    border-right: 1px solid #e8e8e8;
    box-sizing: border-box;
    flex-shrink: 0;
    white-space: nowrap;
}

.cell-text {
    width: 100%;
    overflow: hidden;
}

.cell-text.ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>
