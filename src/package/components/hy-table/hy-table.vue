<template>
    <view class="hy-table" :style="{ height: addUnit(containerHeight) }">
        <!-- 列头 -->
        <view class="hy-table__header" v-if="showHeader">
            <scroll-view
                class="hy-table__header--scroll"
                scroll-x
                :scroll-left="topScrollLeft"
                :scroll-y="false"
                lower-threshold="0"
                @scroll="onHeaderScroll"
                @scrolltolower="isReachBottom = true"
            >
                <view class="hy-table__header--wrapper" :style="{ width: addUnit(totalWidth) }">
                    <!-- 左侧固定列头 -->
                    <view
                        v-if="leftFixedColumns.length > 0"
                        :class="[
                            'hy-table__header--wrapper__left',
                            isShadow('left') && 'is-shadow'
                        ]"
                        :style="{ width: addUnit(leftFixedWidth), zIndex: 3 }"
                    >
                        <view
                            v-for="(col, colIndex) in leftFixedColumns"
                            :key="colIndex"
                            class="hy-table__header--wrapper__cell"
                            :style="getHeaderCellStyle(col)"
                            @tap="handleSort(col)"
                        >
                            <slot v-if="$slots['left-head']" name="left-head" :col="col">
                                <text class="header-text">{{ col.title }}</text>
                            </slot>
                            <text v-else class="hy-table__header--wrapper__cell--text">{{
                                col.title
                            }}</text>
                            <view
                                v-if="col.sortable"
                                class="hy-table__header--wrapper__cell--sortable"
                            >
                                <hy-icon
                                    :name="IconConfig.ARROW_UP_FILL"
                                    size="12"
                                    :custom-class="
                                        sortField === col.key && sortOrder === 'asc'
                                            ? 'is-active'
                                            : ''
                                    "
                                    @click.stop="handleSort(col, 'asc')"
                                ></hy-icon>

                                <hy-icon
                                    :name="IconConfig.ARROW_DOWN_FILL"
                                    size="12"
                                    :custom-class="
                                        sortField === col.key && sortOrder === 'desc'
                                            ? 'is-active'
                                            : ''
                                    "
                                    @click.stop="handleSort(col, 'desc')"
                                ></hy-icon>
                            </view>
                        </view>
                    </view>

                    <!-- 中间滚动列头 -->
                    <view class="hy-table__header--wrapper__center">
                        <view
                            v-for="(col, colIndex) in scrollColumns"
                            :key="colIndex"
                            class="hy-table__header--wrapper__cell"
                            :style="getHeaderCellStyle(col)"
                            @tap="handleSort(col)"
                        >
                            <slot v-if="$slots.head" name="head" :col="col"></slot>
                            <text v-else class="hy-table__header--wrapper__cell--text">{{
                                col.title
                            }}</text>
                            <view
                                v-if="col.sortable"
                                class="hy-table__header--wrapper__cell--sortable"
                            >
                                <hy-icon
                                    :name="IconConfig.ARROW_UP_FILL"
                                    size="12"
                                    :custom-class="
                                        sortField === col.key && sortOrder === 'asc'
                                            ? 'is-active'
                                            : ''
                                    "
                                    @click.stop="handleSort(col, 'asc')"
                                ></hy-icon>

                                <hy-icon
                                    :name="IconConfig.ARROW_DOWN_FILL"
                                    size="12"
                                    :custom-class="
                                        sortField === col.key && sortOrder === 'desc'
                                            ? 'is-active'
                                            : ''
                                    "
                                    @click.stop="handleSort(col, 'desc')"
                                ></hy-icon>
                            </view>
                        </view>
                    </view>

                    <!-- 右侧固定列头 -->
                    <view
                        v-if="rightFixedColumns.length > 0"
                        :class="[
                            'hy-table__header--wrapper__right',
                            isShadow('right') && 'is-shadow'
                        ]"
                        :style="{ width: addUnit(rightFixedWidth), zIndex: 3 }"
                    >
                        <view
                            v-for="(col, colIndex) in rightFixedColumns"
                            :key="colIndex"
                            class="hy-table__header--wrapper__cell"
                            :style="getHeaderCellStyle(col)"
                            @tap="handleSort(col)"
                        >
                            <slot v-if="$slots['right-head']" name="right-head" :col="col"></slot>
                            <text v-else class="hy-table__header--wrapper__cell--text">{{
                                col.title
                            }}</text>
                            <view
                                v-if="col.sortable"
                                class="hy-table__header--wrapper__cell--sortable"
                            >
                                <hy-icon
                                    :name="IconConfig.ARROW_UP_FILL"
                                    size="12"
                                    :custom-class="
                                        sortField === col.key && sortOrder === 'asc'
                                            ? 'is-active'
                                            : ''
                                    "
                                    @click.stop="handleSort(col, 'asc')"
                                ></hy-icon>

                                <hy-icon
                                    :name="IconConfig.ARROW_DOWN_FILL"
                                    size="12"
                                    :custom-class="
                                        sortField === col.key && sortOrder === 'desc'
                                            ? 'is-active'
                                            : ''
                                    "
                                    @click.stop="handleSort(col, 'desc')"
                                ></hy-icon>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>

        <!-- 表格主体 -->
        <view class="hy-table__body">
            <view v-if="loading" class="hy-table__body--loading">
                <hy-loading text="加载中..." mode="circle"></hy-loading>
            </view>
            <view v-if="!data.length" class="hy-table__body--empty">
                <slot v-if="$slots.empty" name="empty"></slot>
                <hy-empty v-else :image-url="emptyUrl" :description="emptyDes"></hy-empty>
            </view>
            <!-- 左侧固定列 -->
            <scroll-view
                v-if="processedData.length"
                :class="['hy-table__body--left', isShadow('left') && 'is-shadow']"
                scroll-y
                :scroll-top="leftScrollTop"
                :style="{ width: addUnit(leftFixedWidth), height: addUnit(bodyHeight) }"
                @scroll="onLeftScroll"
            >
                <view class="hy-table__body--content">
                    <view
                        v-for="(row, rowIndex) in processedData"
                        :key="rowIndex"
                        :class="rowClass(rowIndex)"
                        :style="getRowStyle(rowIndex)"
                    >
                        <view
                            v-for="(col, colIndex) in leftFixedColumns"
                            :key="colIndex"
                            class="hy-table__body--content__row--cell"
                            :style="getBodyCellStyle(col, rowIndex)"
                            @tap="onCellClick(row, rowIndex)"
                        >
                            <slot
                                v-if="$slots.left"
                                name="left"
                                :row="row"
                                :col="col"
                                :index="rowIndex"
                            ></slot>
                            <text
                                v-else
                                class="hy-table__body--content__row--cell__text"
                                :class="{ 'is-ellipsis': col.ellipsis }"
                            >
                                {{ getCellValue(row, col) }}
                            </text>
                        </view>
                    </view>
                </view>
            </scroll-view>

            <!-- 中间滚动区域 -->
            <scroll-view
                v-if="processedData.length"
                class="hy-table__body--center"
                scroll-y
                :scroll-top="centerScrollTop"
                @scroll="onScroll"
                :style="{
                    width: `calc(100% - ${leftFixedWidth + rightFixedWidth}px)`,
                    height: addUnit(bodyHeight),
                    left: addUnit(leftFixedWidth),
                    right: addUnit(rightFixedWidth)
                }"
            >
                <scroll-view
                    scroll-x
                    :scroll-y="false"
                    :scroll-left="centerScrollLeft"
                    class="hy-table__body--content"
                    lower-threshold="5"
                    @scroll="onCrosswiseScroll"
                    @scrolltolower="isReachBottom = true"
                >
                    <view
                        v-for="(row, rowIndex) in processedData"
                        :key="rowIndex"
                        :class="rowClass(rowIndex)"
                        :style="getRowStyle(rowIndex)"
                    >
                        <view
                            v-for="(col, colIndex) in scrollColumns"
                            :key="colIndex"
                            class="hy-table__body--content__row--cell"
                            :class="{ ellipsis: col.ellipsis }"
                            :style="getBodyCellStyle(col, rowIndex)"
                            @tap="onCellClick(row, rowIndex)"
                        >
                            <slot
                                v-if="$slots.default"
                                name="default"
                                :row="row"
                                :col="col"
                                :index="rowIndex"
                            ></slot>
                            <text
                                v-else
                                class="hy-table__body--content__row--cell__text"
                                :class="{ 'is-ellipsis': col.ellipsis }"
                            >
                                {{ getCellValue(row, col) }}
                            </text>
                        </view>
                    </view>
                </scroll-view>
            </scroll-view>

            <!-- 右侧固定列 -->
            <scroll-view
                v-if="processedData.length"
                :class="['hy-table__body--right', isShadow('right') && 'is-shadow']"
                scroll-y
                :scroll-top="rightScrollTop"
                :style="{
                    width: addUnit(rightFixedWidth),
                    height: addUnit(bodyHeight),
                    right: '0'
                }"
                @scroll="onRightScroll"
            >
                <view class="hy-table__body--content">
                    <view
                        v-for="(row, rowIndex) in processedData"
                        :key="rowIndex"
                        :class="rowClass(rowIndex)"
                        :style="getRowStyle(rowIndex)"
                    >
                        <view
                            v-for="(col, colIndex) in rightFixedColumns"
                            :key="colIndex"
                            class="hy-table__body--content__row--cell"
                            :style="getBodyCellStyle(col, rowIndex)"
                            @tap="onCellClick(row, rowIndex)"
                        >
                            <slot
                                v-if="$slots.right"
                                name="right"
                                :row="row"
                                :col="col"
                                :index="rowIndex"
                            ></slot>
                            <text
                                v-else
                                class="hy-table__body--content__row--cell__text"
                                :class="{ 'is-ellipsis': col.ellipsis }"
                            >
                                {{ getCellValue(row, col) }}
                            </text>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-tabs',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { addUnit, IconConfig, getPx } from '../../libs'
import type { ITableColumn, ITableEmits } from './typing'
import tableProps from './props'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'
import HyEmpty from '../hy-empty/hy-empty.vue'
import HyLoading from '../hy-loading/hy-loading.vue'

/**
 * Table是一个基于Uniapp开发的高性能表格组件，支持固定列、排序、斑马纹、自定义插槽等功能，适用于各种数据展示场景。
 * @displayName hy-table
 */
defineOptions({})

const props = defineProps(tableProps)
const emit = defineEmits<ITableEmits>()

// 响应式数据
const rowHeights = ref<number[]>([])
const sortField = ref<string>('')
const sortOrder = ref<'asc' | 'desc'>('asc')
const SLEEP_TIME = 60
// 防止滚动循环触发和抖动的标志位
const activeScroller = ref('')
const isSyncing = ref(false)
const leftScrollTop = ref(0)
const centerScrollTop = ref(0)
const rightScrollTop = ref(0)
const centerScrollLeft = ref(0)
const topScrollLeft = ref(0)
const isReachBottom = ref(false)

// 计算属性
const leftFixedColumns = computed(() => props.columns.filter((col) => col.fixed === 'left'))

const rightFixedColumns = computed(() => props.columns.filter((col) => col.fixed === 'right'))

const scrollColumns = computed(() => props.columns.filter((col) => !col?.fixed))

const leftFixedWidth = computed(() =>
    leftFixedColumns.value.reduce((sum, col) => sum + col.width, 0)
)

const rightFixedWidth = computed(() =>
    rightFixedColumns.value.reduce((sum, col) => sum + col.width, 0)
)

const scrollWidth = computed(() => scrollColumns.value.reduce((sum, col) => sum + col.width, 0))

const totalWidth = computed(() => leftFixedWidth.value + scrollWidth.value + rightFixedWidth.value)
// 表格高度
const containerHeight = computed(() => props.height)
// 表格高度
const bodyHeight = computed(() => {
    // 减去表头高度
    return props.showHeader ? getPx(props.height) - 50 : props.height
})

const isShadow = computed(() => {
    return (type: 'left' | 'right') => {
        if (type === 'left') {
            return topScrollLeft.value !== 0 || centerScrollLeft.value !== 0
        } else {
            return !isReachBottom.value
        }
    }
})

const processedData = computed(() => {
    let data = [...props.data]

    if (sortField.value) {
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

onMounted(() => {})

// 方法
const getHeaderCellStyle = (col: ITableColumn) => {
    return {
        width: addUnit(col.width),
        textAlign: col.align || 'left'
    }
}

const getBodyCellStyle = (col: ITableColumn, rowIndex: number) => {
    const rowHeight = rowHeights.value[rowIndex] || props.rowHeight
    return {
        width: addUnit(col.width),
        textAlign: col.align || 'left',
        height: addUnit(rowHeight)
    }
}

/**
 * 行类名
 * */
const rowClass = computed(() => {
    return (rowIndex: number) => {
        const classes = ['hy-table__body--content__row']

        if (props.stripe && rowIndex % 2 === 1) {
            classes.push('is-stripe')
        }

        return classes
    }
})
/**
 * 行样式
 * */
const getRowStyle = computed(() => {
    return (rowIndex: number) => {
        const rowHeight = rowHeights.value[rowIndex] || props.rowHeight
        const styles: any = {
            width: addUnit(scrollWidth.value),
            height: addUnit(rowHeight)
        }

        return styles
    }
})

const getCellValue = (row: any, col: ITableColumn) => {
    if (col.formatter) {
        return col.formatter(row[col.key], row)
    }
    return row[col.key] || ''
}

/**
 * 头部横向滚动
 * */
const onHeaderScroll = (e: any) => {
    if (activeScroller.value && activeScroller.value !== 'top') return
    syncScroll('top', {
        scrollLeft: e.detail.scrollLeft
    })
}

/**
 * 中间内容竖直滚动
 * */
const onScroll = (e: any) => {
    if (activeScroller.value && activeScroller.value !== 'center') return
    syncScroll('center', {
        scrollTop: e.detail.scrollTop
    })
}

/**
 * 中间内容横向滚动
 * */
const onCrosswiseScroll = (e: any) => {
    if (activeScroller.value && activeScroller.value !== 'bottom') return
    syncScroll('bottom', {
        scrollLeft: e.detail.scrollLeft
    })
}

/**
 * 左侧列表竖向滚动
 * */
const onLeftScroll = (e: any) => {
    if (activeScroller.value && activeScroller.value !== 'left') return
    syncScroll('left', {
        scrollTop: e.detail.scrollTop
    })
}

/**
 * 右侧列表竖向滚动
 * */
const onRightScroll = (e: any) => {
    if (activeScroller.value && activeScroller.value != 'right') return
    syncScroll('right', {
        scrollTop: e.detail.scrollTop
    })
}

/**
 * 点击排序
 * @param col 列标题
 * @param sort 排序
 * */
const handleSort = (col: ITableColumn, sort?: 'asc' | 'desc') => {
    if (!col.sortable) return

    if (sort) {
        sortOrder.value = sort
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

/**
 * 点击单元格
 * @param row 行数据
 * @param index 第几列
 * */
const onCellClick = (row: AnyObject, index: number) => {
    emit('row-click', row, index)
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

/**
 * 通用滚动同步函数
 * @param source 哪组滚动数据
 * @param payload 滚动实例
 * */
const syncScroll = (source: string, payload: { scrollTop?: number; scrollLeft?: number }) => {
    if (isSyncing.value) return

    isSyncing.value = true
    activeScroller.value = source

    if (payload.scrollTop !== undefined) {
        if (activeScroller.value !== 'left') leftScrollTop.value = payload.scrollTop
        if (activeScroller.value !== 'center') centerScrollTop.value = payload.scrollTop
        if (activeScroller.value !== 'right') rightScrollTop.value = payload.scrollTop
    }

    if (payload.scrollLeft !== undefined) {
        isReachBottom.value = false
        // centerScrollLeft.value = payload.scrollLeft
        if (activeScroller.value !== 'top') topScrollLeft.value = payload.scrollLeft
        if (activeScroller.value !== 'bottom') centerScrollLeft.value = payload.scrollLeft
    }

    // 下一帧解锁
    nextFrame(() => {
        isSyncing.value = false
        activeScroller.value = ''
    })
}

const nextFrame = (cb: () => void) => {
    if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(cb)
    } else {
        setTimeout(cb, SLEEP_TIME)
    }
}
</script>

<style scoped lang="scss">
@import './index.scss';

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
</style>
