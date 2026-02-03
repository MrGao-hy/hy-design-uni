<template>
    <view class="hy-table" :style="{ height: addUnit(containerHeight) }">
        <scroll-view
            class="hy-table__scroll-view"
            scroll-x
            scroll-y
            :scroll-top="scrollTop"
            :scroll-left="scrollLeft"
            @scroll="onTableScroll"
            :style="{ height: addUnit(containerHeight) }"
        >
            <view class="hy-table__content" :style="{ width: addUnit(totalWidth) }">
                <view class="hy-table__header sticky-header" v-if="showHeader">
                    <view
                        v-for="(col, index) in columns"
                        :key="'head-' + index"
                        :class="['hy-table__cell', col.fixed ? 'is-fixed' : '']"
                        :style="getColStyle(col)"
                        @tap="handleSort(col)"
                    >
                        <slot
                            v-if="col.fixed === 'left' && $slots['left-head']"
                            name="left-head"
                            :col="col"
                        ></slot>
                        <slot
                            v-else-if="col.fixed === 'right' && $slots['right-head']"
                            name="right-head"
                            :col="col"
                        ></slot>
                        <slot v-else-if="$slots.head" name="head" :col="col"></slot>
                        <text v-else class="cell-text">{{ col.title }}</text>

                        <view v-if="col.sortable" class="sort-box">
                            <hy-icon
                                :name="IconConfig.ARROW_UP_FILL"
                                size="12"
                                :custom-class="
                                    sortField === col.key && sortOrder === 'asc' ? 'is-active' : ''
                                "
                            />
                            <hy-icon
                                :name="IconConfig.ARROW_DOWN_FILL"
                                size="12"
                                :custom-class="
                                    sortField === col.key && sortOrder === 'desc' ? 'is-active' : ''
                                "
                            />
                        </view>
                    </view>
                </view>

                <view class="hy-table__body">
                    <view
                        v-for="(row, rowIndex) in processedData"
                        :key="rowIndex"
                        :class="['hy-table__row', stripe && rowIndex % 2 === 1 ? 'is-stripe' : '']"
                    >
                        <view
                            v-for="(col, colIndex) in columns"
                            :key="colIndex"
                            :class="['hy-table__cell', col.fixed ? 'is-fixed' : '']"
                            :style="getColStyle(col, rowIndex)"
                            @tap="onCellClick(row, rowIndex)"
                        >
                            <slot
                                v-if="col.fixed === 'left' && $slots.left"
                                name="left"
                                :row="row"
                                :col="col"
                                :index="rowIndex"
                            ></slot>
                            <slot
                                v-else-if="col.fixed === 'right' && $slots.right"
                                name="right"
                                :row="row"
                                :col="col"
                                :index="rowIndex"
                            ></slot>
                            <slot
                                v-else-if="$slots.default"
                                name="default"
                                :row="row"
                                :col="col"
                                :index="rowIndex"
                            ></slot>
                            <text v-else class="cell-text" :class="{ 'is-ellipsis': col.ellipsis }">
                                {{ getCellValue(row, col) }}
                            </text>
                        </view>
                    </view>
                </view>
            </view>
        </scroll-view>

        <view v-if="loading" class="hy-table__loading"><hy-loading /></view>
        <view v-if="!data.length && !loading" class="hy-table__empty"><hy-empty /></view>
    </view>
</template>
