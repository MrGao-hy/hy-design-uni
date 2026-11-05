<template>
    <view class="hy-table" :style="{ height: addUnit(height) }">
        <!-- 列头：位于纵向滚动容器之外天然吸顶。
             中间列头自身为 scroll-x 容器，与主体横向滚动双向联动：
             拖动表头可滚动表格，拖动表格表头同步跟随，全平台（含支付宝小程序）一致 -->
        <view v-if="showHeader" class="hy-table__header">
            <!-- 左侧固定列头 -->
            <view
                v-if="leftFixedColumns.length"
                :class="[
                    'hy-table__fixed',
                    'hy-table__fixed--left',
                    isShadow('left') && 'is-shadow'
                ]"
                :style="{ width: addUnit(leftFixedWidth) }"
            >
                <view
                    v-for="col in leftFixedColumns"
                    :key="col.key"
                    class="hy-table__cell hy-table__cell--header"
                    :style="getHeaderCellStyle(col)"
                    @tap="handleSort(col)"
                >
                    <slot v-if="$slots['left-head']" name="left-head" :col="col"></slot>
                    <text v-else class="hy-table__cell--text">{{ col.title }}</text>
                    <view v-if="col.sortable" class="hy-table__cell--sortable">
                        <hy-icon
                            :name="IconConfig.ARROW_UP_FILL"
                            size="12"
                            :custom-class="
                                sortField === col.key && sortOrder === 'asc' ? 'is-active' : ''
                            "
                            @click.stop="handleSort(col, 'asc')"
                        ></hy-icon>
                        <hy-icon
                            :name="IconConfig.ARROW_DOWN_FILL"
                            size="12"
                            :custom-class="
                                sortField === col.key && sortOrder === 'desc' ? 'is-active' : ''
                            "
                            @click.stop="handleSort(col, 'desc')"
                        ></hy-icon>
                    </view>
                </view>
            </view>

            <!-- 中间滚动列头：自身横向可拖动，与主体横向滚动双向联动 -->
            <scroll-view
                class="hy-table__header--scroll"
                scroll-x
                :show-scrollbar="false"
                :scroll-left="headerScrollLeft"
                :lower-threshold="0"
                @scroll="onHeaderScroll"
                @scrolltolower="onReachEnd"
            >
                <view class="hy-table__track" :style="{ width: addUnit(scrollWidth) }">
                    <view
                        v-for="col in scrollColumns"
                        :key="col.key"
                        class="hy-table__cell hy-table__cell--header"
                        :style="getHeaderCellStyle(col)"
                        @tap="handleSort(col)"
                    >
                        <slot v-if="$slots.head" name="head" :col="col"></slot>
                        <text v-else class="hy-table__cell--text">{{ col.title }}</text>
                        <view v-if="col.sortable" class="hy-table__cell--sortable">
                            <hy-icon
                                :name="IconConfig.ARROW_UP_FILL"
                                size="12"
                                :custom-class="
                                    sortField === col.key && sortOrder === 'asc' ? 'is-active' : ''
                                "
                                @click.stop="handleSort(col, 'asc')"
                            ></hy-icon>
                            <hy-icon
                                :name="IconConfig.ARROW_DOWN_FILL"
                                size="12"
                                :custom-class="
                                    sortField === col.key && sortOrder === 'desc' ? 'is-active' : ''
                                "
                                @click.stop="handleSort(col, 'desc')"
                            ></hy-icon>
                        </view>
                    </view>
                </view>
            </scroll-view>

            <!-- 右侧固定列头 -->
            <view
                v-if="rightFixedColumns.length"
                :class="[
                    'hy-table__fixed',
                    'hy-table__fixed--right',
                    isShadow('right') && 'is-shadow'
                ]"
                :style="{ width: addUnit(rightFixedWidth) }"
            >
                <view
                    v-for="col in rightFixedColumns"
                    :key="col.key"
                    class="hy-table__cell hy-table__cell--header"
                    :style="getHeaderCellStyle(col)"
                    @tap="handleSort(col)"
                >
                    <slot v-if="$slots['right-head']" name="right-head" :col="col"></slot>
                    <text v-else class="hy-table__cell--text">{{ col.title }}</text>
                    <view v-if="col.sortable" class="hy-table__cell--sortable">
                        <hy-icon
                            :name="IconConfig.ARROW_UP_FILL"
                            size="12"
                            :custom-class="
                                sortField === col.key && sortOrder === 'asc' ? 'is-active' : ''
                            "
                            @click.stop="handleSort(col, 'asc')"
                        ></hy-icon>
                        <hy-icon
                            :name="IconConfig.ARROW_DOWN_FILL"
                            size="12"
                            :custom-class="
                                sortField === col.key && sortOrder === 'desc' ? 'is-active' : ''
                            "
                            @click.stop="handleSort(col, 'desc')"
                        ></hy-icon>
                    </view>
                </view>
            </view>
        </view>

        <!-- 表格主体：唯一纵向滚动容器，左/中/右三列同容器滚动，纵向天然同步零偏差 -->
        <view class="hy-table__body">
            <scroll-view v-if="processedData.length" class="hy-table__body--scroll" scroll-y>
                <view class="hy-table__body--inner">
                    <!-- 左侧固定列 -->
                    <view
                        v-if="leftFixedColumns.length"
                        :class="[
                            'hy-table__fixed',
                            'hy-table__fixed--left',
                            isShadow('left') && 'is-shadow'
                        ]"
                        :style="{ width: addUnit(leftFixedWidth) }"
                    >
                        <view class="hy-table__body--track">
                            <view
                                v-for="(row, rowIndex) in processedData"
                                :key="rowIndex"
                                :class="rowClass(rowIndex)"
                                :style="getRowStyle(rowIndex)"
                            >
                                <view
                                    v-for="col in leftFixedColumns"
                                    :key="col.key"
                                    class="hy-table__cell"
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
                                        class="hy-table__cell--text"
                                        :class="{ 'is-ellipsis': col.ellipsis }"
                                    >
                                        {{ getCellValue(row, col) }}
                                    </text>
                                </view>
                            </view>
                        </view>
                    </view>

                    <!-- 中间滚动列：横向滚动与表头双向联动 -->
                    <scroll-view
                        class="hy-table__body--scroll__inner"
                        scroll-x
                        enable-flex
                        :scroll-left="bodyScrollLeft"
                        :lower-threshold="0"
                        @scroll="onHScroll"
                        @scrolltolower="onReachEnd"
                    >
                        <view
                            class="hy-table__body--track"
                            :style="{ width: addUnit(scrollWidth) }"
                        >
                            <view
                                v-for="(row, rowIndex) in processedData"
                                :key="rowIndex"
                                :class="rowClass(rowIndex)"
                                :style="getRowStyle(rowIndex)"
                            >
                                <view
                                    v-for="col in scrollColumns"
                                    :key="col.key"
                                    class="hy-table__cell"
                                    :style="getBodyCellStyle(col, rowIndex)"
                                    @tap="onCellClick(row, rowIndex)"
                                >
                                    <slot
                                        v-if="$slots.default"
                                        :row="row"
                                        :col="col"
                                        :index="rowIndex"
                                    ></slot>
                                    <text
                                        v-else
                                        class="hy-table__cell--text"
                                        :class="{ 'is-ellipsis': col.ellipsis }"
                                    >
                                        {{ getCellValue(row, col) }}
                                    </text>
                                </view>
                            </view>
                        </view>
                    </scroll-view>

                    <!-- 右侧固定列 -->
                    <view
                        v-if="rightFixedColumns.length"
                        :class="[
                            'hy-table__fixed',
                            'hy-table__fixed--right',
                            isShadow('right') && 'is-shadow'
                        ]"
                        :style="{ width: addUnit(rightFixedWidth) }"
                    >
                        <view class="hy-table__body--track">
                            <view
                                v-for="(row, rowIndex) in processedData"
                                :key="rowIndex"
                                :class="rowClass(rowIndex)"
                                :style="getRowStyle(rowIndex)"
                            >
                                <view
                                    v-for="col in rightFixedColumns"
                                    :key="col.key"
                                    class="hy-table__cell"
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
                                        class="hy-table__cell--text"
                                        :class="{ 'is-ellipsis': col.ellipsis }"
                                    >
                                        {{ getCellValue(row, col) }}
                                    </text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>

            <!-- 加载状态 -->
            <view v-if="loading" class="hy-table__body--loading">
                <hy-loading :text="t('loading')" mode="circle"></hy-loading>
            </view>
            <!-- 空状态 -->
            <view v-if="!data.length" class="hy-table__body--empty">
                <slot v-if="$slots.empty" name="empty"></slot>
                <hy-empty v-else :image-url="emptyUrl" :description="emptyDes"></hy-empty>
            </view>
        </view>
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
import { ref, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue'
import { addUnit, IconConfig, getRect, useTranslate } from '../../libs'
import type { ITableColumn, ITableEmits, ITableSlots } from './typing'
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

const { t } = useTranslate('loadMore')

// 组件实例，用于节点查询（支付宝小程序下改用其原生 $scope）
const instance = getCurrentInstance()

// 响应式数据
const rowHeights = ref<number[]>([])
const sortField = ref<string>('')
const sortOrder = ref<'asc' | 'desc'>('asc')
// 表头横向滚动目标位置（由主体滚动驱动）
const headerScrollLeft = ref(0)
// 主体横向滚动目标位置（由拖动表头驱动）
const bodyScrollLeft = ref(0)
// 当前横向滚动位置，仅用于固定列投影显隐
const currentScrollLeft = ref(0)
// 横向是否已滚动到底（内容未超宽时同样视为已到底），用于右侧固定列投影显隐
const isReachEnd = ref(false)
// 横向滚动容器实际宽度（仅用于投影判断，无需响应式）
let hscrollWidth = 0

// 计算属性
const leftFixedColumns = computed(() => props.columns.filter((col) => col.fixed === 'left'))

const rightFixedColumns = computed(() => props.columns.filter((col) => col.fixed === 'right'))

const scrollColumns = computed(() => props.columns.filter((col) => !col?.fixed))

const leftFixedWidth = computed(() =>
    leftFixedColumns.value.reduce((sum, col) => sum + (col.width || 0), 0)
)

const rightFixedWidth = computed(() =>
    rightFixedColumns.value.reduce((sum, col) => sum + (col.width || 0), 0)
)

const scrollWidth = computed(() =>
    scrollColumns.value.reduce((sum, col) => sum + (col.width || 0), 0)
)

/**
 * 固定列投影显隐
 * @param type left-左侧固定列 right-右侧固定列
 * */
const isShadow = computed(() => {
    return (type: 'left' | 'right') => {
        if (type === 'left') {
            return currentScrollLeft.value > 0
        }
        return !isReachEnd.value
    }
})

const processedData = computed(() => {
    let data = [...props.data]

    if (sortField.value) {
        data.sort((a: any, b: any) => {
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
        const classes = ['hy-table__row']

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

        return { height: addUnit(rowHeight) }
    }
})

const getCellValue = (row: Record<string, any>, col: ITableColumn) => {
    if (col.formatter) {
        return col.formatter(row[col.key], row)
    }
    return row[col.key] || ''
}

/**
 * 更新横向是否已滚动到底
 * @param left 当前横向滚动位置
 * @param contentWidth 滚动内容宽度（取自滚动事件，缺省时用列宽计算值）
 * */
const updateReachEnd = (left: number, contentWidth?: number) => {
    const width = Number(contentWidth) || scrollWidth.value
    if (!hscrollWidth || !width) return
    isReachEnd.value = left + hscrollWidth >= width - 1
}

/**
 * 表头横向滚动：拖动表头时驱动主体横向滚动
 * */
const onHeaderScroll = (e: any) => {
    const detail = e.detail || {}
    const left = Math.round(Number(detail.scrollLeft) || 0)
    currentScrollLeft.value = left
    updateReachEnd(left, detail.scrollWidth)

    // 与下发给表头的目标位置一致，说明是主体联动触发的回声，不再反向驱动主体
    if (Math.abs(left - headerScrollLeft.value) <= 1) return
    bodyScrollLeft.value = left
}

/**
 * 主体横向滚动：驱动表头跟随
 * */
const onHScroll = (e: any) => {
    const detail = e.detail || {}
    const left = Math.round(Number(detail.scrollLeft) || 0)
    currentScrollLeft.value = left
    updateReachEnd(left, detail.scrollWidth)

    // 与下发给主体的目标位置一致，说明是表头联动触发的回声，不再反向驱动表头
    if (Math.abs(left - bodyScrollLeft.value) <= 1) return
    headerScrollLeft.value = left
}

/**
 * 滚动到横向末端（支付宝小程序等无法测量容器宽度时的兜底）
 * */
const onReachEnd = () => {
    isReachEnd.value = true
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
const onCellClick = (row: unknown, index: number) => {
    emit('row-click', row, index)
}

/**
 * 测量横向滚动容器宽度，用于"是否滚到底"判断
 * */
const measureHScroll = async () => {
    // 支付宝小程序 createSelectorQuery().in() 只认原生组件实例，需传入 $scope
    let scope: any = instance
    // #ifdef MP-ALIPAY
    scope = (instance?.proxy as any)?.$scope
    // #endif
    try {
        const rect = await getRect('.hy-table__body--scroll__inner', false, scope)
        if (rect?.width) {
            hscrollWidth = rect.width
            // 内容未超宽时视为已到底，隐藏右侧固定列投影
            isReachEnd.value = scrollWidth.value <= rect.width + 1
        }
    } catch (e) {
        // 节点查询失败时维持默认投影状态即可，不影响滚动功能
    }
}

// 初始化行高并测量横向滚动容器宽度
onMounted(() => {
    rowHeights.value = new Array(props.data.length).fill(props.rowHeight)

    if (props.data.length) measureHScroll()
})

// 监听数据变化
watch(
    () => props.data,
    () => {
        rowHeights.value = new Array(props.data.length).fill(props.rowHeight)
        // 数据更新后横向滚动容器可能重新渲染，需重新测量
        nextTick(() => measureHScroll())
    },
    { deep: true }
)

defineSlots<ITableSlots>()
</script>

<style lang="scss">
@use './index.scss';
</style>
