<template>
    <!-- 基础横向步骤条 -->
    <view class="hy-title">{{ t('basicRowSection') }}</view>
    <view class="hy-container">
        <hy-steps :list="basicList" v-model:current="currentStep" direction="row"></hy-steps>
        <!-- 直接嵌套子组件写法 -->
        <hy-step-group :current="currentStep" align-center :custom-style="{ marginTop: '30rpx' }">
            <hy-step-item
                :title="t('stepRegister')"
                :description="t('descRegister')"
            ></hy-step-item>
            <hy-step-item
                :title="t('stepFillInfo')"
                :description="t('descFillInfo')"
            ></hy-step-item>
            <hy-step-item :title="t('stepLogin')" :description="t('descLogin')"></hy-step-item>
        </hy-step-group>
    </view>

    <!-- 点状模式 -->
    <view class="hy-title">{{ t('dotSection') }}</view>
    <view class="hy-container">
        <hy-steps :list="basicList" v-model:current="currentStep" direction="row" dot></hy-steps>
        <!-- 直接嵌套子组件写法 -->
        <hy-step-group :current="currentStep" dot :custom-style="{ marginTop: '30rpx' }">
            <hy-step-item :title="t('stepRegister')"></hy-step-item>
            <hy-step-item :title="t('stepFillInfo')"></hy-step-item>
            <hy-step-item :title="t('stepLogin')"></hy-step-item>
        </hy-step-group>
    </view>

    <!-- 自定义颜色 -->
    <view class="hy-title">{{ t('colorSection') }}</view>
    <view class="hy-container">
        <hy-steps
            :list="basicList"
            v-model:current="currentStep"
            activeColor="#4F8EF7"
            inactiveColor="#CCCCCC"
            icon-size="26"
        ></hy-steps>
        <hy-steps
            :list="basicList"
            v-model:current="currentStep"
            activeColor="#4F8EF7"
            inactiveColor="#CCCCCC"
            dot
            :custom-style="{ marginTop: '30rpx' }"
        ></hy-steps>
    </view>

    <!-- 竖向步骤条 -->
    <view class="hy-title">{{ t('verticalSection') }}</view>
    <view class="hy-container">
        <hy-steps :list="verticalList" v-model:current="currentStep" direction="column"></hy-steps>
        <!-- 直接嵌套子组件写法 -->
        <hy-step-group
            :current="currentStep"
            direction="column"
            :custom-style="{ marginTop: '30rpx' }"
        >
            <hy-step-item
                :title="t('stepRegister')"
                :description="t('descRegister')"
            ></hy-step-item>
            <hy-step-item
                :title="t('stepFillInfo')"
                :description="t('descFillInfo')"
            ></hy-step-item>
            <hy-step-item :title="t('stepLogin')" :description="t('descLogin')"></hy-step-item>
        </hy-step-group>
    </view>

    <!-- 带错误状态 -->
    <view class="hy-title">{{ t('errorSection') }}</view>
    <view class="hy-container">
        <hy-steps :list="errorList" v-model:current="errorStep" direction="column"></hy-steps>
        <!-- 直接嵌套子组件写法 -->
        <hy-step-group
            :current="errorStep"
            direction="column"
            :custom-style="{ marginTop: '30rpx' }"
        >
            <hy-step-item
                :title="t('orderPlaced')"
                :description="t('orderSubmitted')"
            ></hy-step-item>
            <hy-step-item :title="t('paid')" :description="t('paidDocs')"></hy-step-item>
            <hy-step-item
                :title="t('shipFailed')"
                :description="t('shipFailedDocs')"
                status="error"
            ></hy-step-item>
            <hy-step-item :title="t('waiting')" :description="t('waitingDocs')"></hy-step-item>
        </hy-step-group>
    </view>

    <!-- 自定义图标 -->
    <view class="hy-title">{{ t('iconSection') }}</view>
    <view class="hy-container">
        <hy-step-group :current="currentStep" :icon-size="20">
            <hy-step-item
                v-for="(item, i) in basicList"
                :key="i"
                :title="item.title"
                icon="check-circle"
            ></hy-step-item>
        </hy-step-group>
    </view>

    <!-- 自定义插槽 - 自定义图标 -->
    <view class="hy-title">{{ t('slotIconSection') }}</view>
    <view class="hy-container">
        <hy-step-group :current="currentStep">
            <hy-step-item v-for="(item, i) in basicList" :key="i" :title="item.title">
                <template #icon>
                    <view class="custom-icon">
                        <text v-if="i < currentStep">{{ i + 1 }}</text>
                        <text v-else-if="i === currentStep">●</text>
                        <text v-else>○</text>
                    </view>
                </template>
            </hy-step-item>
        </hy-step-group>
    </view>

    <!-- 自定义插槽 - 标题和描述 -->
    <view class="hy-title">{{ t('slotTitleDescSection') }}</view>
    <view class="hy-container">
        <hy-step-group :current="currentStep" direction="column">
            <hy-step-item v-for="(item, i) in customList" :key="i">
                <template #title>
                    <view class="custom-title">
                        <text class="step-num">{{ i + 1 }}.</text>
                        <text>{{ item.title }}</text>
                    </view>
                </template>
                <template #description>
                    <view class="custom-desc" v-if="item.docs">
                        <text class="desc-text">{{ item.docs }}</text>
                        <text class="desc-date" v-if="item.date">{{ item.date }}</text>
                    </view>
                </template>
            </hy-step-item>
        </hy-step-group>
    </view>

    <!-- 自定义插槽 - 完整内容 -->
    <view class="hy-title">{{ t('slotContentSection') }}</view>
    <view class="hy-container">
        <hy-step-group :current="currentStep" direction="column">
            <hy-step-item v-for="(item, i) in statusList" :key="i">
                <template #title>
                    <view class="custom-content">
                        <view class="content-header">
                            <text class="content-title">{{ item.title }}</text>
                            <text
                                :class="[
                                    'status-tag',
                                    i < currentStep ? 'static-done' : '',
                                    i === currentStep ? 'static-active' : '',
                                    i > currentStep ? 'static-pending' : ''
                                ]"
                            >
                                {{
                                    i < currentStep
                                        ? t('statusDone')
                                        : i === currentStep
                                          ? t('statusActive')
                                          : t('statusPending')
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
            </hy-step-item>
        </hy-step-group>
    </view>

    <!-- 动态控制 -->
    <view class="hy-title">{{ t('dynamicSection') }}</view>
    <view class="hy-container">
        <hy-steps :list="basicList" v-model:current="currentStep"></hy-steps>
        <view class="control-buttons">
            <hy-button
                :text="t('prevStep')"
                size="small"
                :disabled="currentStep <= 0"
                @click="currentStep--"
            ></hy-button>
            <hy-button
                :text="t('nextStep')"
                type="primary"
                size="small"
                :disabled="currentStep >= basicList.length - 1"
                @click="currentStep++"
            ></hy-button>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '步骤条'
    }
})

const { t } = useTranslate('steps')
usePageTitle('steps')

const currentStep = ref(1)
const errorStep = ref(2)

// 步骤数据（computed 保证语言切换时响应）
const basicList = computed(() => [
    { title: t('stepRegister') },
    { title: t('stepFillInfo') },
    { title: t('stepLogin') }
])

const verticalList = computed(() => [
    {
        title: t('orderPlaced'),
        docs: t('orderPlacedDocs'),
        date: '2024-10-13'
    },
    { title: t('shipping'), date: '2024-10-13' },
    {
        title: t('shipped'),
        docs: t('shippedDocs'),
        date: '2024-10-13'
    },
    {
        title: t('signed'),
        date: '2024-10-14'
    }
])

const errorList = computed(() => [
    {
        title: t('orderPlaced'),
        docs: t('orderSubmitted'),
        date: '2024-10-13'
    },
    {
        title: t('paid'),
        docs: t('paidDocs'),
        date: '2024-10-13'
    },
    {
        title: t('shipFailed'),
        docs: t('shipFailedDocs'),
        date: '2024-10-14',
        error: true
    },
    {
        title: t('waiting'),
        docs: t('waitingDocs'),
        date: ''
    }
])

const customList = computed(() => [
    { title: t('orderSubmitted'), docs: t('submittedDocs'), date: '2024-10-13 10:30' },
    { title: t('paid'), docs: t('paidDocs'), date: '2024-10-13 10:35' },
    { title: t('orderDeliver'), docs: t('trackingNo'), date: '2024-10-13 14:00' }
])

const statusList = computed(() => [
    { title: t('userRegister'), docs: t('registerDocs'), date: '2024-10-13 10:00' },
    { title: t('profileFill'), docs: t('profileDocs'), date: '2024-10-13 10:15' },
    { title: t('emailVerify'), docs: t('emailDocs'), date: '2024-10-13 10:30' },
    { title: t('done'), docs: t('doneDocs'), date: '' }
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
