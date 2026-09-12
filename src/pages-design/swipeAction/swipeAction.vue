<template>
    <the-root-page>
        <!-- 基础示例 -->
        <view class="hy-title">{{ t('basicDemo') }}</view>
        <view class="hy-container">
            <hy-swipe-action borderBottom :beforeClose="beforeClose">
                <view class="cell">
                    <view class="cell-title">{{ t('cellTitle') }}</view>
                    <view class="cell-value">{{ t('cellValue') }}</view>
                </view>
            </hy-swipe-action>
        </view>

        <!-- 右侧操作按钮 -->
        <view class="hy-title">{{ t('rightButtons') }}</view>
        <view class="hy-container">
            <hy-swipe-action borderBottom :options="rightOptions">
                <view class="cell">
                    <view class="cell-title">{{ t('swipeLeft') }}</view>
                    <view class="cell-value">{{ t('swipeLeftDesc') }}</view>
                </view>
            </hy-swipe-action>
        </view>

        <!-- 左侧操作按钮 -->
        <view class="hy-title">{{ t('leftButtons') }}</view>
        <view class="hy-container">
            <hy-swipe-action borderBottom>
                <view class="cell">
                    <view class="cell-title">{{ t('swipeRight') }}</view>
                    <view class="cell-value">{{ t('swipeRightDesc') }}</view>
                </view>
                <template #left>
                    <view class="action">
                        <view class="action-btn" style="background-color: #3c9cff">
                            {{ t('mark') }}
                        </view>
                        <view class="action-btn" style="background-color: #f56c6c">
                            {{ t('delete') }}
                        </view>
                    </view>
                </template>
            </hy-swipe-action>
        </view>

        <!-- 双侧操作按钮 -->
        <view class="hy-title">{{ t('bothButtons') }}</view>
        <view class="hy-container">
            <hy-swipe-action borderBottom>
                <view class="cell">
                    <view class="cell-title">{{ t('swipeBoth') }}</view>
                    <view class="cell-value">{{ t('swipeBothDesc') }}</view>
                </view>
                <template #left>
                    <view class="action">
                        <view class="action-btn" style="background-color: #3c9cff">
                            {{ t('favorite') }}
                        </view>
                    </view>
                </template>
                <template #right>
                    <view class="action">
                        <view class="action-btn" style="background-color: #19be6b">
                            {{ t('edit') }}
                        </view>
                        <view class="action-btn" style="background-color: #f56c6c">
                            {{ t('delete') }}
                        </view>
                    </view>
                </template>
            </hy-swipe-action>
        </view>

        <!-- 禁用滑动 -->
        <view class="hy-title">{{ t('disabledSwipe') }}</view>
        <view class="hy-container">
            <hy-swipe-action borderBottom :disabled="true">
                <view class="cell">
                    <view class="cell-title">{{ t('disabledState') }}</view>
                    <view class="cell-value">{{ t('disabledDesc') }}</view>
                </view>
            </hy-swipe-action>
        </view>

        <!-- 自定义动画时间 -->
        <view class="hy-title">{{ t('customDuration') }}</view>
        <view class="hy-container">
            <hy-swipe-action borderBottom :duration="500" :options="rightOptions">
                <view class="cell">
                    <view class="cell-title">{{ t('slowAnimation') }}</view>
                    <view class="cell-value">{{ t('slowAnimDesc') }}</view>
                </view>
            </hy-swipe-action>
        </view>

        <!-- 监听点击事件 -->
        <view class="hy-title">{{ t('listenClick') }}</view>
        <view class="hy-container">
            <hy-swipe-action
                borderBottom
                :options="rightOptions"
                @click="handleClick"
                @clickAction="handleAction"
            >
                <view class="cell">
                    <view class="cell-title">{{ t('clickEvent') }}</view>
                    <view class="cell-value">{{ t('clickEventDesc') }}</view>
                </view>
            </hy-swipe-action>
        </view>

        <!-- 程序控制开关 -->
        <view class="hy-title">{{ t('programControl') }}</view>
        <view class="hy-container">
            <hy-swipe-action borderBottom v-model="controlStatus" :options="rightOptions">
                <view class="cell">
                    <view class="cell-title">{{ t('controlByCode') }}</view>
                    <view class="cell-value">{{ t('controlDesc') }}</view>
                </view>
            </hy-swipe-action>
            <view class="controls">
                <hy-button
                    :text="t('open')"
                    size="small"
                    @click="controlStatus = 'right'"
                ></hy-button>
                <hy-button
                    :text="t('close')"
                    size="small"
                    @click="controlStatus = 'close'"
                ></hy-button>
            </view>
        </view>

        <!-- 列表场景 -->
        <view class="hy-title">{{ t('listScene') }}</view>
        <view class="hy-container list-container">
            <hy-swipe-action
                v-for="(item, index) in list"
                :key="index"
                borderBottom
                :options="deleteOptions"
                @clickAction="handleDelete(index)"
            >
                <view class="cell">
                    <view class="cell-title">{{ t('listItem', item) }}</view>
                    <view class="cell-value">{{ t('listItemDesc', item) }}</view>
                </view>
            </hy-swipe-action>
        </view>

        <!-- 复杂内容 -->
        <view class="hy-title">{{ t('complexContent') }}</view>
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
        <view class="hy-title">{{ t('multiAction') }}</view>
        <view class="hy-container">
            <hy-swipe-action borderBottom :options="multiOptions" @clickAction="handleMultiAction">
                <view class="cell">
                    <view class="cell-title">{{ t('multiAction') }}</view>
                    <view class="cell-value">{{ t('multiActionDesc') }}</view>
                </view>
            </hy-swipe-action>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'
import { SwipeActionStatus } from '@/package'

definePage({
    style: {
        navigationBarTitleText: '滑动单元格'
    }
})

const { t } = useTranslate('swipeAction')
usePageTitle('swipeAction')

const show = ref(false)
const controlStatus = ref<SwipeActionStatus>('close')

// 右侧操作按钮（computed 包裹以响应语言切换）
const rightOptions = computed(() => [
    {
        text: t('favorite'),
        style: {
            backgroundColor: '#3c9cff'
        }
    },
    {
        text: t('delete'),
        style: {
            backgroundColor: '#f56c6c'
        }
    }
])

// 删除选项
const deleteOptions = computed(() => [
    {
        text: t('delete'),
        style: {
            backgroundColor: '#f56c6c'
        }
    }
])

// 复杂操作选项
const complexOptions = computed(() => [
    {
        text: t('pin'),
        style: {
            backgroundColor: '#ff9900'
        }
    },
    {
        text: t('delete'),
        style: {
            backgroundColor: '#f56c6c'
        }
    }
])

// 多种操作选项（key 为稳定标识，供点击回调匹配）
const multiOptions = computed(() => [
    {
        key: 'favorite',
        text: t('favorite'),
        style: {
            backgroundColor: '#3c9cff'
        }
    },
    {
        key: 'edit',
        text: t('edit'),
        style: {
            backgroundColor: '#19be6b'
        }
    },
    {
        key: 'delete',
        text: t('delete'),
        style: {
            backgroundColor: '#f56c6c'
        }
    }
])

// 列表数据（存储序号，文案通过 t 函数生成）
const list = ref([1, 2, 3, 4])

// 复杂内容数据
const item = computed(() => ({
    name: t('zhangSan'),
    message: t('messageContent'),
    time: '10:30'
}))

const beforeClose = () => {
    uni.showToast({ title: t('close'), icon: 'none' })
}

const handleClick = (value: string) => {
    console.log('点击位置:', value)
    uni.showToast({
        title: t('clicked', value),
        icon: 'none'
    })
}

const handleAction = (item: any, index: number) => {
    console.log('操作按钮:', item, index)
    uni.showToast({
        title: t('clickedAction', item.text),
        icon: 'none'
    })
}

const handleDelete = (index: number) => {
    uni.showModal({
        title: t('deleteTitle'),
        content: t('deleteContent'),
        success: (res) => {
            if (res.confirm) {
                list.value.splice(index, 1)
                uni.showToast({
                    title: t('deleteSuccess'),
                    icon: 'success'
                })
            }
        }
    })
}

const handleMultiAction = (item: any) => {
    // 按稳定 key 匹配反馈文案，避免翻译后映射失效
    const actions: Record<string, string> = {
        favorite: t('faved'),
        edit: t('enterEdit'),
        delete: t('deleted')
    }
    uni.showToast({
        title: actions[item.key] || item.text,
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
