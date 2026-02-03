<template>
    <view class="test-container">
        <view class="title">Sticky Table 多端适配测试</view>

        <view class="table-wrapper">
            <scroll-view class="main-scroll-y" scroll-y @scroll="handleScroll">
                <scroll-view class="main-scroll-x" scroll-x @scroll="handleScroll">
                    <view class="table-content" :style="{ width: totalWidth + 'px' }">
                        <view class="tr header sticky-top">
                            <view
                                v-for="(col, index) in columns"
                                :key="index"
                                :class="['td', col.fixed ? 'sticky-column' : '']"
                                :style="getColStyle(col)"
                            >
                                {{ col.title }}
                            </view>
                        </view>

                        <view v-for="row in tableData" :key="row.id" class="tr">
                            <view
                                v-for="(col, index) in columns"
                                :key="index"
                                :class="[
                                    'td',
                                    col.fixed ? 'sticky-column' : '',
                                    row.id % 2 === 0 ? 'stripe' : ''
                                ]"
                                :style="getColStyle(col)"
                            >
                                {{ row[col.key] }}
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </scroll-view>
        </view>

        <view class="footer">当前滚动位置: {{ scrollLeft }}px</view>
    </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 1. 定义列配置（模拟你的 props）
const columns = ref([
    { title: 'ID', key: 'id', width: 80, fixed: 'left' },
    { title: '姓名', key: 'name', width: 100, fixed: 'left' },
    { title: '年龄', key: 'age', width: 120 },
    { title: '城市', key: 'city', width: 150 },
    { title: '职业', key: 'job', width: 150 },
    { title: '入职日期', key: 'date', width: 150 },
    { title: '备注', key: 'memo', width: 200 },
    { title: '操作', key: 'action', width: 100, fixed: 'right' }
])

// 2. 模拟 50 条大数据
const tableData = ref(
    Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: '张三' + i,
        age: 20 + (i % 10),
        city: '北京',
        job: '工程师',
        date: '2023-01-01',
        memo: '这是一段很长很长的备注信息',
        action: '编辑'
    }))
)

const scrollLeft = ref(0)
const handleScroll = (e) => {
    scrollLeft.value = e.detail.scrollLeft
}

// 3. 计算总宽度
const totalWidth = computed(() => columns.value.reduce((s, c) => s + c.width, 0))

// 4. 核心：计算 Sticky 偏移量
const getColStyle = (col) => {
    const style = {
        width: col.width + 'px',
        minWidth: col.width + 'px'
    }

    if (col.fixed === 'left') {
        const idx = columns.value.findIndex((c) => c.key === col.key)
        const left = columns.value.slice(0, idx).reduce((s, c) => s + c.width, 0)
        style.left = left + 'px'
    }

    if (col.fixed === 'right') {
        const idx = columns.value.findIndex((c) => c.key === col.key)
        const right = columns.value.slice(idx + 1).reduce((s, c) => s + c.width, 0)
        style.right = right + 'px'
    }
    return style
}
</script>

<style lang="scss" scoped>
.test-container {
    padding: 20rpx;
    background: #f4f4f4;
    height: 100vh;
}
.title {
    padding: 20rpx;
    font-weight: bold;
    text-align: center;
}

.table-wrapper {
    height: 800rpx; // 固定高度测试垂直滚动
    background: #fff;
    border: 1px solid #ddd;
}

.main-scroll-x {
    width: 100%;
}

.main-scroll-y {
    width: 100%;
    height: 100%;
}

.table-content {
    display: flex;
    flex-direction: column;
}

.tr {
    display: flex;
    background: #fff;
}

.td {
    height: 80rpx;
    line-height: 80rpx;
    padding: 0 20rpx;
    border-bottom: 1px solid #f0f0f0;
    border-right: 1px solid #f0f0f0;
    box-sizing: border-box;
    white-space: nowrap;
    background: inherit; // 关键：继承父行背景防止透明
}

.header {
    background: #fafafa;
    font-weight: bold;
}

/* 核心样式 */
.sticky-top {
    position: sticky;
    top: 0;
    z-index: 100;
}

.sticky-column {
    position: sticky;
    z-index: 10;
    background: #fff; // 必须有背景
}

// 提升左上角和右上角表头的层级
.header .sticky-column {
    z-index: 110;
    background: #fafafa;
}

.stripe {
    background: #fafafa;
}
.footer {
    padding: 20rpx;
    font-size: 24rpx;
    color: #999;
}
</style>
