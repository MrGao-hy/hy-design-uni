<template>
    <the-root-page>
        <!-- 基础横向步骤条 -->
        <view class="hy-title">基础横向步骤条</view>
        <view class="hy-container">
            <hy-steps :list="basicList" v-model:current="currentStep" direction="row"></hy-steps>
        </view>

        <!-- 点状模式 -->
        <view class="hy-title">点状模式</view>
        <view class="hy-container">
            <hy-steps
                :list="basicList"
                v-model:current="currentStep"
                direction="row"
                dot
            ></hy-steps>
        </view>

        <!-- 自定义颜色 -->
        <view class="hy-title">自定义颜色</view>
        <view class="hy-container">
            <hy-steps
                :list="basicList"
                v-model:current="currentStep"
                activeColor="#4F8EF7"
                inactiveColor="#CCCCCC"
            ></hy-steps>
        </view>

        <!-- 竖向步骤条 -->
        <view class="hy-title">竖向步骤条</view>
        <view class="hy-container">
            <hy-steps
                :list="verticalList"
                v-model:current="currentStep"
                direction="column"
            ></hy-steps>
        </view>

        <!-- 带错误状态 -->
        <view class="hy-title">错误状态</view>
        <view class="hy-container">
            <hy-steps :list="errorList" v-model:current="errorStep" direction="column"></hy-steps>
        </view>

        <!-- 自定义图标 -->
        <view class="hy-title">自定义图标</view>
        <view class="hy-container">
            <hy-steps
                :list="basicList"
                v-model:current="currentStep"
                activeIcon="check-circle"
                inactiveIcon="circle"
                :iconSize="20"
            ></hy-steps>
        </view>

        <!-- 自定义插槽 - 自定义图标 -->
        <view class="hy-title">自定义插槽 - 图标</view>
        <view class="hy-container">
            <hy-steps :list="basicList" v-model:current="currentStep">
                <template #icon="{ index, error }">
                    <view class="custom-icon" :class="{ error }">
                        <text v-if="index < currentStep">{{ index + 1 }}</text>
                        <text v-else-if="index === currentStep">●</text>
                        <text v-else>○</text>
                    </view>
                </template>
            </hy-steps>
        </view>

        <!-- 自定义插槽 - 标题和描述 -->
        <view class="hy-title">自定义插槽 - 标题和描述</view>
        <view class="hy-container">
            <hy-steps :list="customList" v-model:current="currentStep">
                <template #title="{ title, index }">
                    <view class="custom-title">
                        <text class="step-num">{{ index + 1 }}.</text>
                        <text>{{ title }}</text>
                    </view>
                </template>
                <template #desc="{ docs, date }">
                    <view class="custom-desc" v-if="docs">
                        <text class="desc-text">{{ docs }}</text>
                        <text class="desc-date" v-if="date">{{ date }}</text>
                    </view>
                </template>
            </hy-steps>
        </view>

        <!-- 自定义插槽 - 完整内容 -->
        <view class="hy-title">自定义插槽 - 完整内容</view>
        <view class="hy-container">
            <hy-steps :list="statusList" v-model:current="currentStep" direction="column">
                <template #content="{ item, index }">
                    <view class="custom-content">
                        <view class="content-header">
                            <text class="content-title">{{ item.title }}</text>
                            <text
                                :class="[
                                    'status-tag',
                                    index < currentStep ? 'status-done' : '',
                                    index === currentStep ? 'status-active' : '',
                                    index > currentStep ? 'status-pending' : ''
                                ]"
                            >
                                {{
                                    index < currentStep
                                        ? '已完成'
                                        : index === currentStep
                                          ? '进行中'
                                          : '待开始'
                                }}
                            </text>
                        </view>
                        <view class="content-info" v-if="item?.docs">
                            <text>{{ item.docs }}</text>
                        </view>
                        <view class="content-date" v-if="item?.date">
                            <text>{{ item.date }}</text>
                        </view>
                    </view>
                </template>
            </hy-steps>
        </view>

        <!-- 动态控制 -->
        <view class="hy-title">动态控制步骤</view>
        <view class="hy-container">
            <hy-steps :list="basicList" v-model:current="currentStep"></hy-steps>
            <view class="control-buttons">
                <hy-button
                    text="上一步"
                    size="small"
                    :disabled="currentStep <= 0"
                    @click="currentStep--"
                ></hy-button>
                <hy-button
                    text="下一步"
                    type="primary"
                    size="small"
                    :disabled="currentStep >= basicList.length - 1"
                    @click="currentStep++"
                ></hy-button>
            </view>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '步骤条'
    }
})

const currentStep = ref(1)
const errorStep = ref(2)

const basicList = ref([{ title: '注册用户' }, { title: '填写基本信息' }, { title: '登录' }])

const verticalList = ref([
    {
        title: '已下单',
        docs: '【深证市】您的快递正在站点，快递员正在为你打包，请耐心等待发货',
        date: '2024-10-13'
    },
    { title: '发货中', date: '2024-10-13' },
    {
        title: '已发货',
        docs: '【合肥市】温馨提醒：您的快递已处于运输配送途中，预计将在近期送达。',
        date: '2024-10-13'
    },
    {
        title: '已签收',
        date: '2024-10-14'
    }
])

const errorList = ref([
    {
        title: '已下单',
        docs: '订单已成功提交',
        date: '2024-10-13'
    },
    {
        title: '支付完成',
        docs: '支付金额：¥199.00',
        date: '2024-10-13'
    },
    {
        title: '发货失败',
        docs: '【重要通知】您的快递在运输过程中发生意外，包裹已受损。',
        date: '2024-10-14',
        error: true
    },
    {
        title: '等待处理',
        docs: '理赔专员将尽快与您联系',
        date: ''
    }
])

const customList = ref([
    { title: '订单提交', docs: '订单已成功提交', date: '2024-10-13 10:30' },
    { title: '支付完成', docs: '支付金额：¥199.00', date: '2024-10-13 10:35' },
    { title: '订单发货', docs: '快递单号：SF1234567890', date: '2024-10-13 14:00' }
])

const statusList = ref([
    { title: '用户注册', docs: '填写手机号并验证', date: '2024-10-13 10:00' },
    { title: '完善资料', docs: '填写姓名、头像等信息', date: '2024-10-13 10:15' },
    { title: '邮箱验证', docs: '请查收邮件并点击验证链接', date: '2024-10-13 10:30' },
    { title: '完成', docs: '注册成功', date: '' }
])

useShareButton()
</script>

<style scoped lang="scss">
.control-buttons {
    display: flex;
    gap: 20rpx;
    justify-content: center;
    margin-top: 30rpx;
}

.custom-icon {
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    background: #e8e8e8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20rpx;
    color: #999;

    &.error {
        background: #ff4d4f;
        color: #fff;
    }

    :deep(.hy-steps__item--active) & {
        background: #4f8ef7;
        color: #fff;
    }
}

.custom-title {
    display: flex;
    align-items: center;
    gap: 8rpx;
    font-weight: 600;

    .step-num {
        color: #4f8ef7;
    }
}

.custom-desc {
    display: flex;
    flex-direction: column;
    gap: 4rpx;
    margin-top: 8rpx;

    .desc-text {
        font-size: 24rpx;
        color: #666;
    }

    .desc-date {
        font-size: 22rpx;
        color: #999;
    }
}

.custom-content {
    padding: 16rpx;
    border-radius: 8rpx;
    background: $hy-background--track;

    .content-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .content-title {
        font-weight: 600;
        font-size: 28rpx;
    }

    .content-info {
        margin-top: 8rpx;
        font-size: 24rpx;
        color: #666;
    }

    .content-date {
        margin-top: 4rpx;
        font-size: 22rpx;
        color: #999;
    }

    .status-tag {
        font-size: 22rpx;
        padding: 4rpx 16rpx;
        border-radius: 20rpx;

        &.status-done {
            background: #f6ffed;
            color: #52c41a;
        }

        &.status-active {
            background: #e6f7ff;
            color: #1890ff;
        }

        &.status-pending {
            background: #f5f5f5;
            color: #999;
        }
    }
}
</style>
