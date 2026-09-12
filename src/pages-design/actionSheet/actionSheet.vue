<template>
    <the-root-page>
        <!-- 基础功能 -->
        <view class="hy-title">{{ t('sectionBasic') }}</view>
        <hy-cell>
            <hy-cell-item
                :title="t('basicUsage')"
                clickable
                @click="showBasic = true"
            ></hy-cell-item>
            <hy-cell-item
                :title="t('withTitle')"
                clickable
                @click="showTitle = true"
            ></hy-cell-item>
            <hy-cell-item
                :title="t('withCancel')"
                clickable
                @click="showCancel = true"
            ></hy-cell-item>
        </hy-cell>

        <!-- 选项状态 -->
        <view class="hy-title">{{ t('sectionStatus') }}</view>
        <hy-cell>
            <hy-cell-item
                :title="t('disabledState')"
                clickable
                @click="showDisabled = true"
            ></hy-cell-item>
            <hy-cell-item
                :title="t('loadingState')"
                clickable
                @click="showLoading = true"
            ></hy-cell-item>
            <hy-cell-item
                :title="t('customColor')"
                clickable
                @click="showColor = true"
            ></hy-cell-item>
            <hy-cell-item
                :title="t('withDescription')"
                clickable
                @click="showSub = true"
            ></hy-cell-item>
        </hy-cell>

        <!-- 自定义面板 -->
        <view class="hy-title">{{ t('sectionPanel') }}</view>
        <hy-cell>
            <hy-cell-item
                :title="t('singlePanel')"
                clickable
                @click="showPanelSingle = true"
            ></hy-cell-item>
            <hy-cell-item
                :title="t('multiPanel')"
                clickable
                @click="showPanelMulti = true"
            ></hy-cell-item>
        </hy-cell>

        <!-- 高级用法 -->
        <view class="hy-title">{{ t('sectionAdvanced') }}</view>
        <hy-cell>
            <hy-cell-item
                :title="t('noCloseOnClick')"
                clickable
                @click="showNoClose = true"
            ></hy-cell-item>
            <hy-cell-item
                :title="t('customSlot')"
                clickable
                @click="showSlot = true"
            ></hy-cell-item>
        </hy-cell>

        <!-- ========== 基础功能 ========== -->

        <!-- 基础使用 -->
        <hy-action-sheet
            v-model="showBasic"
            :actions="actionsBasic"
            @select="onSelect"
        ></hy-action-sheet>

        <!-- 带标题 -->
        <hy-action-sheet
            v-model="showTitle"
            :actions="actionsBasic"
            :title="t('sheetTitle')"
            @select="onSelect"
        ></hy-action-sheet>

        <!-- 带取消按钮 -->
        <hy-action-sheet
            v-model="showCancel"
            :actions="actionsBasic"
            :cancel-text="t('cancelText')"
            @select="onSelect"
            @cancel="onCancel"
        ></hy-action-sheet>

        <!-- ========== 选项状态 ========== -->

        <!-- 禁用状态 -->
        <hy-action-sheet
            v-model="showDisabled"
            :actions="actionsDisabled"
            @select="onSelect"
        ></hy-action-sheet>

        <!-- 加载状态 -->
        <hy-action-sheet
            v-model="showLoading"
            :actions="actionsLoading"
            @select="onSelect"
        ></hy-action-sheet>

        <!-- 自定义颜色 -->
        <hy-action-sheet
            v-model="showColor"
            :actions="actionsColor"
            @select="onSelect"
        ></hy-action-sheet>

        <!-- 描述信息 -->
        <hy-action-sheet
            v-model="showSub"
            :actions="actionsSub"
            @select="onSelect"
        ></hy-action-sheet>

        <!-- ========== 自定义面板 ========== -->

        <!-- 单行面板 -->
        <hy-action-sheet
            v-model="showPanelSingle"
            :panels="panelsSingle"
            :title="t('shareTo')"
            @select="onSelect"
        ></hy-action-sheet>

        <!-- 多行面板 -->
        <hy-action-sheet
            v-model="showPanelMulti"
            :panels="panelsMulti"
            :title="t('shareTo')"
            title-align="left"
            @select="onSelect"
        ></hy-action-sheet>

        <!-- ========== 高级用法 ========== -->

        <!-- 点击不关闭 -->
        <hy-action-sheet
            v-model="showNoClose"
            :actions="actionsBasic"
            :close-on-click-action="false"
            @select="onSelectNoClose"
        ></hy-action-sheet>

        <!-- 自定义内容插槽 -->
        <hy-action-sheet v-model="showSlot" :title="t('customContentTitle')">
            <view class="custom-content">
                <text class="custom-text">{{ t('customContentText') }}</text>
                <hy-button
                    :text="t('confirmClose')"
                    type="primary"
                    @click="showSlot = false"
                ></hy-button>
            </view>
        </hy-action-sheet>
    </the-root-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { IActionSheetAction } from '@/package/components/hy-action-sheet/typing'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'
import { config } from '@/config/config.ts'

definePage({
    style: {
        navigationBarTitleText: '操作菜单'
    }
})

const { t } = useTranslate('actionSheet')
usePageTitle('actionSheet')

// ========== 显示状态 ==========
const showBasic = ref(false)
const showTitle = ref(false)
const showCancel = ref(false)
const showDisabled = ref(false)
const showLoading = ref(false)
const showColor = ref(false)
const showSub = ref(false)
const showPanelSingle = ref(false)
const showPanelMulti = ref(false)
const showNoClose = ref(false)
const showSlot = ref(false)

// ========== 基础选项 ==========
const actionsBasic = computed<IActionSheetAction[]>(() => [
    { name: t('option', 1) },
    { name: t('option', 2) },
    { name: t('option', 3) }
])

// ========== 禁用状态 ==========
const actionsDisabled = computed<IActionSheetAction[]>(() => [
    { name: t('normalOption') },
    { name: t('disabledOption'), disabled: true },
    { name: t('otherOption') }
])

// ========== 加载状态 ==========
const actionsLoading = computed<IActionSheetAction[]>(() => [
    { name: t('option', 1) },
    { name: t('loadingOption'), loading: true },
    { name: t('option', 3) }
])

// ========== 自定义颜色 ==========
const actionsColor = computed<IActionSheetAction[]>(() => [
    { name: t('normalText') },
    { name: t('redWarning'), color: 'red' },
    { name: t('blueLink'), color: '#2979ff' }
])

// ========== 描述信息 ==========
const actionsSub = computed<IActionSheetAction[]>(() => [
    { name: t('option', 1), sub: t('desc1') },
    { name: t('option', 2), sub: t('desc2') },
    { name: t('option', 3) }
])

// ========== 单行面板 ==========
const panelsSingle = computed(() => [
    {
        iconUrl: config.wx,
        name: t('wechat')
    },
    {
        iconUrl: config.wb,
        name: t('weibo')
    },
    {
        iconUrl: config.qq,
        name: t('qq')
    },
    {
        iconUrl: config.sc,
        name: t('favorite')
    }
])

// ========== 多行面板 ==========
const panelsMulti = computed(() => [
    [
        {
            iconUrl: config.wx,
            name: t('wechat')
        },
        {
            iconUrl: config.wb,
            name: t('weibo')
        },
        {
            iconUrl: config.qq,
            name: t('qq')
        },
        {
            iconUrl: config.sc,
            name: t('favorite')
        }
    ],
    [
        {
            iconUrl: config.qq,
            name: t('qqFriend')
        },
        {
            iconUrl: config.wx,
            name: t('wechatFriend')
        },
        {
            iconUrl: config.wb,
            name: t('moments')
        }
    ]
])

// ========== 事件处理 ==========
const onSelect = (params: any) => {
    uni.showToast({
        title: t('clicked', params.item.name),
        icon: 'none'
    })
}

const onSelectNoClose = (params: any) => {
    uni.showToast({
        title: t('clickedNoClose', params.item.name),
        icon: 'none'
    })
}

const onCancel = () => {
    uni.showToast({
        title: t('clickedCancel'),
        icon: 'none'
    })
}

useShareButton()
</script>

<style scoped lang="scss">
.custom-content {
    padding: 40rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20rpx;

    .custom-text {
        font-size: 28rpx;
        color: #666;
    }
}
</style>
