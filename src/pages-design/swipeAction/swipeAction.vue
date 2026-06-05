<template>
    <the-root-page>
        <!-- 基础示例 -->
        <view class="hy-title">基础示例</view>
        <view class="hy-container">
            <hy-swipe-action borderBottom :beforeClose="beforeClose">
                <view class="cell">
                    <view class="cell-title">我是标题</view>
                    <view class="cell-value">我是内容</view>
                </view>
            </hy-swipe-action>
        </view>

        <!-- 右侧操作按钮 -->
        <view class="hy-title">右侧操作按钮</view>
        <view class="hy-container">
            <hy-swipe-action borderBottom :options="rightOptions">
                <view class="cell">
                    <view class="cell-title">向左滑动</view>
                    <view class="cell-value">显示收藏和删除按钮</view>
                </view>
            </hy-swipe-action>
        </view>

        <!-- 左侧操作按钮 -->
        <view class="hy-title">左侧操作按钮</view>
        <view class="hy-container">
            <hy-swipe-action borderBottom>
                <view class="cell">
                    <view class="cell-title">向右滑动</view>
                    <view class="cell-value">显示标记和删除按钮</view>
                </view>
                <template #left>
                    <view class="action">
                        <view class="action-btn" style="background-color: #3c9cff"> 标记 </view>
                        <view class="action-btn" style="background-color: #f56c6c"> 删除 </view>
                    </view>
                </template>
            </hy-swipe-action>
        </view>

        <!-- 双侧操作按钮 -->
        <view class="hy-title">双侧操作按钮</view>
        <view class="hy-container">
            <hy-swipe-action borderBottom>
                <view class="cell">
                    <view class="cell-title">双向滑动</view>
                    <view class="cell-value">左右滑动均可显示操作按钮</view>
                </view>
                <template #left>
                    <view class="action">
                        <view class="action-btn" style="background-color: #3c9cff">收藏</view>
                    </view>
                </template>
                <template #right>
                    <view class="action">
                        <view class="action-btn" style="background-color: #19be6b">编辑</view>
                        <view class="action-btn" style="background-color: #f56c6c">删除</view>
                    </view>
                </template>
            </hy-swipe-action>
        </view>

        <!-- 禁用滑动 -->
        <view class="hy-title">禁用滑动</view>
        <view class="hy-container">
            <hy-swipe-action borderBottom :disabled="true">
                <view class="cell">
                    <view class="cell-title">禁用状态</view>
                    <view class="cell-value">此单元格无法滑动</view>
                </view>
            </hy-swipe-action>
        </view>

        <!-- 自定义动画时间 -->
        <view class="hy-title">自定义动画时间</view>
        <view class="hy-container">
            <hy-swipe-action borderBottom :duration="500" :options="rightOptions">
                <view class="cell">
                    <view class="cell-title">慢速动画</view>
                    <view class="cell-value">动画过渡时间为 500ms</view>
                </view>
            </hy-swipe-action>
        </view>

        <!-- 监听点击事件 -->
        <view class="hy-title">监听点击事件</view>
        <view class="hy-container">
            <hy-swipe-action
                borderBottom
                :options="rightOptions"
                @click="handleClick"
                @clickAction="handleAction"
            >
                <view class="cell">
                    <view class="cell-title">点击事件</view>
                    <view class="cell-value">点击内容或按钮触发事件</view>
                </view>
            </hy-swipe-action>
        </view>

        <!-- 程序控制开关 -->
        <view class="hy-title">程序控制开关</view>
        <view class="hy-container">
            <hy-swipe-action borderBottom v-model="controlStatus" :options="rightOptions">
                <view class="cell">
                    <view class="cell-title">程序控制</view>
                    <view class="cell-value">通过按钮控制开关</view>
                </view>
            </hy-swipe-action>
            <view class="controls">
                <hy-button text="打开" size="small" @click="controlStatus = 'right'"></hy-button>
                <hy-button text="关闭" size="small" @click="controlStatus = 'close'"></hy-button>
            </view>
        </view>

        <!-- 列表场景 -->
        <view class="hy-title">列表场景</view>
        <view class="hy-container list-container">
            <hy-swipe-action
                v-for="(item, index) in list"
                :key="index"
                borderBottom
                :options="deleteOptions"
                @clickAction="handleDelete(index)"
            >
                <view class="cell">
                    <view class="cell-title">{{ item.title }}</view>
                    <view class="cell-value">{{ item.desc }}</view>
                </view>
            </hy-swipe-action>
        </view>

        <!-- 复杂内容 -->
        <view class="hy-title">复杂内容</view>
        <view class="hy-container">
            <hy-swipe-action borderBottom :options="complexOptions">
                <view class="cell complex-cell">
                    <view class="cell-avatar">
                        <hy-avatar :text="item.name" size="large"></hy-avatar>
                    </view>
                    <view class="cell-content">
                        <view class="cell-title">{{ item.name }}</view>
                        <view class="cell-value">{{ item.message }}</view>
                        <view class="cell-time">{{ item.time }}</view>
                    </view>
                </view>
            </hy-swipe-action>
        </view>

        <!-- 多种操作 -->
        <view class="hy-title">多种操作</view>
        <view class="hy-container">
            <hy-swipe-action borderBottom :options="multiOptions" @clickAction="handleMultiAction">
                <view class="cell">
                    <view class="cell-title">多种操作</view>
                    <view class="cell-value">支持收藏、编辑、删除等多种操作</view>
                </view>
            </hy-swipe-action>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '滑动单元格'
    }
})

const show = ref(false)
const controlStatus = ref('close')

// 右侧操作按钮
const rightOptions = [
    {
        text: '收藏',
        style: {
            backgroundColor: '#3c9cff'
        }
    },
    {
        text: '删除',
        style: {
            backgroundColor: '#f56c6c'
        }
    }
]

// 删除选项
const deleteOptions = [
    {
        text: '删除',
        style: {
            backgroundColor: '#f56c6c'
        }
    }
]

// 复杂操作选项
const complexOptions = [
    {
        text: '置顶',
        style: {
            backgroundColor: '#ff9900'
        }
    },
    {
        text: '删除',
        style: {
            backgroundColor: '#f56c6c'
        }
    }
]

// 多种操作选项
const multiOptions = [
    {
        text: '收藏',
        style: {
            backgroundColor: '#3c9cff'
        }
    },
    {
        text: '编辑',
        style: {
            backgroundColor: '#19be6b'
        }
    },
    {
        text: '删除',
        style: {
            backgroundColor: '#f56c6c'
        }
    }
]

// 列表数据
const list = ref([
    { title: '列表项 1', desc: '这是第一条数据' },
    { title: '列表项 2', desc: '这是第二条数据' },
    { title: '列表项 3', desc: '这是第三条数据' },
    { title: '列表项 4', desc: '这是第四条数据' }
])

// 复杂内容数据
const item = {
    name: '张三',
    message: '这是一条消息内容',
    time: '10:30'
}

const beforeClose = () => {
    uni.showToast({ title: '关闭', icon: 'none' })
}

const handleClick = (value: string) => {
    console.log('点击位置:', value)
    uni.showToast({
        title: `点击了: ${value}`,
        icon: 'none'
    })
}

const handleAction = (item: any, index: number) => {
    console.log('操作按钮:', item, index)
    uni.showToast({
        title: `点击了: ${item.text}`,
        icon: 'none'
    })
}

const handleDelete = (index: number) => {
    uni.showModal({
        title: '提示',
        content: '确定删除此条数据吗？',
        success: (res) => {
            if (res.confirm) {
                list.value.splice(index, 1)
                uni.showToast({
                    title: '删除成功',
                    icon: 'success'
                })
            }
        }
    })
}

const handleMultiAction = (item: any) => {
    const actions: Record<string, string> = {
        收藏: '已收藏',
        编辑: '进入编辑',
        删除: '已删除'
    }
    uni.showToast({
        title: actions[item.text] || item.text,
        icon: 'none'
    })
}

useShareButton()
</script>

<style scoped lang="scss">
.cell {
    padding: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-title {
        font-size: 28rpx;
    }

    &-value {
        font-size: 24rpx;
        color: #999;
    }
}

.complex-cell {
    display: flex;
    gap: 20rpx;

    .cell-avatar {
        flex-shrink: 0;
    }

    .cell-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8rpx;

        .cell-title {
            font-size: 28rpx;
            font-weight: 600;
        }

        .cell-value {
            font-size: 24rpx;
            color: #666;
        }

        .cell-time {
            font-size: 22rpx;
            color: #999;
        }
    }
}

.action {
    display: flex;
    height: 100%;

    &-btn {
        padding: 0 30rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 28rpx;
    }
}

.controls {
    display: flex;
    gap: 20rpx;
    padding: 20rpx;
}
</style>
