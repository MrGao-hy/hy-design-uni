<template>
    <the-root-page>
        <!-- 基础使用 - 字符串数组 -->
        <view class="hy-title">基础使用（字符串数组）</view>
        <view class="hy-container">
            <hy-subsection :list="stringList" v-model="stringValue"></hy-subsection>
        </view>

        <!-- 基础使用 - 对象数组 -->
        <view class="hy-title">基础使用（对象数组）</view>
        <view class="hy-container">
            <hy-subsection :list="objectList" v-model="objectValue"></hy-subsection>
        </view>

        <!-- 基础使用 - 数字数组 -->
        <view class="hy-title">基础使用（数字数组）</view>
        <view class="hy-container">
            <hy-subsection :list="numberList" v-model="numberValue"></hy-subsection>
        </view>

        <!-- 默认选中项 -->
        <view class="hy-title">默认选中项（current=1）</view>
        <view class="hy-container">
            <hy-subsection :list="stringList" v-model="defaultValue" :current="1"></hy-subsection>
        </view>

        <!-- 按钮模式 -->
        <view class="hy-title">按钮模式</view>
        <view class="hy-container">
            <hy-subsection :list="stringList" v-model="buttonValue" mode="button"></hy-subsection>
        </view>

        <!-- 分段器模式 -->
        <view class="hy-title">分段器模式</view>
        <view class="hy-container">
            <hy-subsection :list="stringList" v-model="subsectionValue" mode="subsection"></hy-subsection>
        </view>

        <!-- 自定义激活和未激活颜色 -->
        <view class="hy-title">自定义激活和未激活颜色</view>
        <view class="hy-container">
            <hy-subsection
                :list="stringList"
                v-model="colorValue"
                activeColor="#4F8EF7"
                inactiveColor="#999999"
                mode="subsection"
            ></hy-subsection>
        </view>

        <!-- 自定义背景颜色（按钮模式） -->
        <view class="hy-title">自定义背景颜色（按钮模式）</view>
        <view class="hy-container">
            <hy-subsection
                :list="stringList"
                v-model="bgColorValue"
                bgColor="red"
                mode="button"
            ></hy-subsection>
        </view>

        <!-- 自定义字体大小 -->
        <view class="hy-title">自定义字体大小</view>
        <view class="hy-container">
            <hy-subsection
                :list="stringList"
                v-model="fontSizeValue"
                :fontSize="20"
                mode="subsection"
            ></hy-subsection>
        </view>

        <!-- 激活字体不加粗 -->
        <view class="hy-title">激活字体不加粗</view>
        <view class="hy-container">
            <hy-subsection
                :list="stringList"
                v-model="boldValue"
                :bold="false"
                mode="subsection"
            ></hy-subsection>
        </view>

        <!-- 自定义键名 -->
        <view class="hy-title">自定义键名（title/id）</view>
        <view class="hy-container">
            <hy-subsection
                :list="customKeyList"
                v-model="customKeyValue"
                :customKeys="{ name: 'title', value: 'id' }"
                mode="subsection"
            ></hy-subsection>
        </view>

        <!-- 事件监听 -->
        <view class="hy-title">事件监听</view>
        <view class="hy-container">
            <hy-subsection 
                :list="stringList" 
                v-model="eventValue" 
                @change="handleChange"
            ></hy-subsection>
            <view class="info-box">
                <text>当前选中值：{{ eventValue }}</text>
                <text>当前选中索引：{{ currentIndex }}</text>
            </view>
        </view>

        <!-- 配合内容切换 -->
        <view class="hy-title">配合内容切换</view>
        <view class="hy-container">
            <hy-subsection 
                :list="statusList" 
                v-model="statusValue"
                mode="subsection"
            ></hy-subsection>
            <view class="content-box">
                <view v-if="statusValue === 'all'" class="content-item">
                    <view class="content-title">全部订单</view>
                    <view class="content-desc">显示所有订单信息</view>
                </view>
                <view v-else-if="statusValue === 'pending'" class="content-item">
                    <view class="content-title">待付款</view>
                    <view class="content-desc">您有 3 笔订单待支付</view>
                </view>
                <view v-else-if="statusValue === 'shipped'" class="content-item">
                    <view class="content-title">待收货</view>
                    <view class="content-desc">您的快递正在运输中</view>
                </view>
                <view v-else class="content-item">
                    <view class="content-title">已完成</view>
                    <view class="content-desc">所有订单已确认收货</view>
                </view>
            </view>
        </view>

        <!-- 配合 Tab 切换 -->
        <view class="hy-title">配合列表筛选</view>
        <view class="hy-container">
            <hy-subsection 
                :list="filterList" 
                v-model="filterValue"
                mode="subsection"
            ></hy-subsection>
            <view class="filter-result">
                <text>当前筛选：{{ filterText }}</text>
            </view>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '分段器'
    }
})

// 字符串数组
const stringList = ['未付款', '待评价', '已付款']
const stringValue = ref('未付款')

// 对象数组
const objectList = [
    { name: '全部', value: 'all' },
    { name: '未核销', value: 'unused' },
    { name: '已核销', value: 'used' }
]
const objectValue = ref('all')

// 数字数组
const numberList = [0, 1, 2]
const numberValue = ref(0)

// 默认选中项
const defaultValue = ref('待评价')

// 按钮模式
const buttonValue = ref('未付款')

// 分段器模式
const subsectionValue = ref('未付款')

// 激活颜色
const activeColorValue = ref('未付款')

// 颜色组合
const colorValue = ref('未付款')

// 背景颜色
const bgColorValue = ref('未付款')

// 字体大小
const fontSizeValue = ref('未付款')

// 字体加粗
const boldValue = ref('未付款')

// 自定义键名
const customKeyList = [
    { title: '全部', id: 1 },
    { title: '待付款', id: 2 },
    { title: '已完成', id: 3 }
]
const customKeyValue = ref(1)

// 事件监听
const eventValue = ref('未付款')
const currentIndex = ref(0)

const handleChange = (index: number) => {
    currentIndex.value = index
}

// 内容切换
const statusList = [
    { name: '全部', value: 'all' },
    { name: '待付款', value: 'pending' },
    { name: '待收货', value: 'shipped' },
    { name: '已完成', value: 'completed' }
]
const statusValue = ref('all')

// 列表筛选
const filterList = [
    { name: '综合', value: 'default' },
    { name: '销量', value: 'sales' },
    { name: '价格', value: 'price' },
    { name: '新品', value: 'new' }
]
const filterValue = ref('default')

const filterText = computed(() => {
    const item = filterList.find(i => i.value === filterValue.value)
    return item ? item.name : ''
})

useShareButton()
</script>

<style scoped lang="scss">
.info-box {
    margin-top: 20rpx;
    padding: 20rpx;
    background: #f5f5f5;
    border-radius: 8rpx;
    display: flex;
    flex-direction: column;
    gap: 8rpx;
    
    text {
        font-size: 24rpx;
        color: #666;
    }
}

.content-box {
    padding: 30rpx;
}

.content-item {
    background: #fff;
    border-radius: 8rpx;
    padding: 30rpx;
    
    .content-title {
        font-size: 32rpx;
        font-weight: 600;
        color: #333;
        margin-bottom: 12rpx;
    }
    
    .content-desc {
        font-size: 26rpx;
        color: #666;
    }
}

.filter-result {
    margin-top: 20rpx;
    padding: 20rpx;
    background: #E6F7FF;
    border-radius: 8rpx;
    
    text {
        font-size: 24rpx;
        color: #1890FF;
    }
}
</style>
