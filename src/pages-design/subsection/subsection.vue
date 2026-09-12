<template>
    <the-root-page>
        <!-- 基础使用 - 字符串数组 -->
        <view class="hy-title">{{ t('basicString') }}</view>
        <view class="hy-container">
            <hy-subsection :list="stringList" v-model="stringValue"></hy-subsection>
        </view>

        <!-- 基础使用 - 对象数组 -->
        <view class="hy-title">{{ t('basicObject') }}</view>
        <view class="hy-container">
            <hy-subsection :list="objectList" v-model="objectValue"></hy-subsection>
        </view>

        <!-- 基础使用 - 数字数组 -->
        <view class="hy-title">{{ t('basicNumber') }}</view>
        <view class="hy-container">
            <hy-subsection :list="numberList" v-model="numberValue"></hy-subsection>
        </view>

        <!-- 默认选中项 -->
        <view class="hy-title">{{ t('defaultCurrent') }}</view>
        <view class="hy-container">
            <hy-subsection :list="stringList" v-model="defaultValue" :current="1"></hy-subsection>
        </view>

        <!-- 按钮模式 -->
        <view class="hy-title">{{ t('buttonMode') }}</view>
        <view class="hy-container">
            <hy-subsection :list="stringList" v-model="buttonValue" mode="button"></hy-subsection>
        </view>

        <!-- 分段器模式 -->
        <view class="hy-title">{{ t('subsectionMode') }}</view>
        <view class="hy-container">
            <hy-subsection
                :list="stringList"
                v-model="subsectionValue"
                mode="subsection"
            ></hy-subsection>
        </view>

        <!-- 自定义激活和未激活颜色 -->
        <view class="hy-title">{{ t('customColor') }}</view>
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
        <view class="hy-title">{{ t('customBgColor') }}</view>
        <view class="hy-container">
            <hy-subsection
                :list="stringList"
                v-model="bgColorValue"
                bgColor="red"
                mode="button"
            ></hy-subsection>
        </view>

        <!-- 自定义字体大小 -->
        <view class="hy-title">{{ t('customFontSize') }}</view>
        <view class="hy-container">
            <hy-subsection
                :list="stringList"
                v-model="fontSizeValue"
                :fontSize="20"
                mode="subsection"
            ></hy-subsection>
        </view>

        <!-- 激活字体不加粗 -->
        <view class="hy-title">{{ t('noBold') }}</view>
        <view class="hy-container">
            <hy-subsection
                :list="stringList"
                v-model="boldValue"
                :bold="false"
                mode="subsection"
            ></hy-subsection>
        </view>

        <!-- 自定义键名 -->
        <view class="hy-title">{{ t('customKeyNames') }}</view>
        <view class="hy-container">
            <hy-subsection
                :list="customKeyList"
                v-model="customKeyValue"
                :customKeys="{ name: 'title', value: 'id' }"
                mode="subsection"
            ></hy-subsection>
        </view>

        <!-- 事件监听 -->
        <view class="hy-title">{{ t('eventListen') }}</view>
        <view class="hy-container">
            <hy-subsection
                :list="stringList"
                v-model="eventValue"
                @change="handleChange"
            ></hy-subsection>
            <view class="info-box">
                <text>{{ t('currentValue') }}{{ eventValue }}</text>
                <text>{{ t('currentIndex') }}{{ currentIndex }}</text>
            </view>
        </view>

        <!-- 配合内容切换 -->
        <view class="hy-title">{{ t('contentSwitch') }}</view>
        <view class="hy-container">
            <hy-subsection
                :list="statusList"
                v-model="statusValue"
                mode="subsection"
            ></hy-subsection>
            <view class="content-box">
                <view v-if="statusValue === 'all'" class="content-item">
                    <view class="content-title">{{ t('all') }}</view>
                    <view class="content-desc">{{ t('allOrdersDesc') }}</view>
                </view>
                <view v-else-if="statusValue === 'pending'" class="content-item">
                    <view class="content-title">{{ t('pendingPayment') }}</view>
                    <view class="content-desc">{{ t('pendingDesc') }}</view>
                </view>
                <view v-else-if="statusValue === 'shipped'" class="content-item">
                    <view class="content-title">{{ t('toReceive') }}</view>
                    <view class="content-desc">{{ t('receiveDesc') }}</view>
                </view>
                <view v-else class="content-item">
                    <view class="content-title">{{ t('completed') }}</view>
                    <view class="content-desc">{{ t('completedDesc') }}</view>
                </view>
            </view>
        </view>

        <!-- 配合 Tab 切换 -->
        <view class="hy-title">{{ t('listFilter') }}</view>
        <view class="hy-container">
            <hy-subsection
                :list="filterList"
                v-model="filterValue"
                mode="subsection"
            ></hy-subsection>
            <view class="filter-result">
                <text>{{ t('currentFilter') }}{{ filterText }}</text>
            </view>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '分段器'
    }
})

const { t } = useTranslate('subsection')
usePageTitle('subsection')

// 字符串数组（computed 包裹以响应语言切换）
const stringList = computed(() => [t('unpaid'), t('toReview'), t('paid')])
const stringValue = ref(stringList.value[0])

// 对象数组
const objectList = computed(() => [
    { name: t('all'), value: 'all' },
    { name: t('unverified'), value: 'unused' },
    { name: t('verified'), value: 'used' }
])
const objectValue = ref('all')

// 数字数组
const numberList = [0, 1, 2]
const numberValue = ref(0)

// 默认选中项
const defaultValue = ref(stringList.value[1])

// 按钮模式
const buttonValue = ref(stringList.value[0])

// 分段器模式
const subsectionValue = ref(stringList.value[0])

// 激活颜色
const activeColorValue = ref(stringList.value[0])

// 颜色组合
const colorValue = ref(stringList.value[0])

// 背景颜色
const bgColorValue = ref(stringList.value[0])

// 字体大小
const fontSizeValue = ref(stringList.value[0])

// 字体加粗
const boldValue = ref(stringList.value[0])

// 自定义键名
const customKeyList = computed(() => [
    { title: t('all'), id: 1 },
    { title: t('pendingPayment'), id: 2 },
    { title: t('completed'), id: 3 }
])
const customKeyValue = ref(1)

// 事件监听
const eventValue = ref(stringList.value[0])
const currentIndex = ref(0)

const handleChange = (index: number) => {
    currentIndex.value = index
}

// 内容切换
const statusList = computed(() => [
    { name: t('all'), value: 'all' },
    { name: t('pendingPayment'), value: 'pending' },
    { name: t('toReceive'), value: 'shipped' },
    { name: t('completed'), value: 'completed' }
])
const statusValue = ref('all')

// 列表筛选
const filterList = computed(() => [
    { name: t('comprehensive'), value: 'default' },
    { name: t('sales'), value: 'sales' },
    { name: t('price'), value: 'price' },
    { name: t('newest'), value: 'new' }
])
const filterValue = ref('default')

const filterText = computed(() => {
    const item = filterList.value.find((i) => i.value === filterValue.value)
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
    background: #e6f7ff;
    border-radius: 8rpx;

    text {
        font-size: 24rpx;
        color: #1890ff;
    }
}
</style>
