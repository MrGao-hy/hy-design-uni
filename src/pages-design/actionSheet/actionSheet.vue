<template>
    <the-root-page>
        <!-- 基础功能 -->
        <view class="hy-title">基础功能</view>
        <hy-cell>
            <hy-cell-item
                title="基础使用"
                clickable
                @click="showBasic = true"
            ></hy-cell-item>
            <hy-cell-item
                title="带标题"
                clickable
                @click="showTitle = true"
            ></hy-cell-item>
            <hy-cell-item
                title="带取消按钮"
                clickable
                @click="showCancel = true"
            ></hy-cell-item>
        </hy-cell>

        <!-- 选项状态 -->
        <view class="hy-title">选项状态</view>
        <hy-cell>
            <hy-cell-item
                title="禁用状态"
                clickable
                @click="showDisabled = true"
            ></hy-cell-item>
            <hy-cell-item
                title="加载状态"
                clickable
                @click="showLoading = true"
            ></hy-cell-item>
            <hy-cell-item
                title="自定义颜色"
                clickable
                @click="showColor = true"
            ></hy-cell-item>
            <hy-cell-item
                title="描述信息"
                clickable
                @click="showSub = true"
            ></hy-cell-item>
        </hy-cell>

        <!-- 自定义面板 -->
        <view class="hy-title">自定义面板</view>
        <hy-cell>
            <hy-cell-item
                title="单行面板"
                clickable
                @click="showPanelSingle = true"
            ></hy-cell-item>
            <hy-cell-item
                title="多行面板"
                clickable
                @click="showPanelMulti = true"
            ></hy-cell-item>
        </hy-cell>

        <!-- 高级用法 -->
        <view class="hy-title">高级用法</view>
        <hy-cell>
            <hy-cell-item
                title="点击不关闭"
                clickable
                @click="showNoClose = true"
            ></hy-cell-item>
            <hy-cell-item
                title="自定义内容插槽"
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
            title="我是标题"
            @select="onSelect"
        ></hy-action-sheet>

        <!-- 带取消按钮 -->
        <hy-action-sheet
            v-model="showCancel"
            :actions="actionsBasic"
            cancel-text="取消"
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
            title="分享给"
            @select="onSelect"
        ></hy-action-sheet>

        <!-- 多行面板 -->
        <hy-action-sheet
            v-model="showPanelMulti"
            :panels="panelsMulti"
            title="分享给"
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
        <hy-action-sheet v-model="showSlot" title="自定义内容">
            <view class="custom-content">
                <text class="custom-text">这里是自定义内容区域</text>
                <hy-button
                    text="确认关闭"
                    type="primary"
                    @click="showSlot = false"
                ></hy-button>
            </view>
        </hy-action-sheet>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IActionSheetAction } from '@/package/components/hy-action-sheet/typing'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '操作菜单'
    }
})

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
const actionsBasic = ref<IActionSheetAction[]>([
    { name: '选项1' },
    { name: '选项2' },
    { name: '选项3' }
])

// ========== 禁用状态 ==========
const actionsDisabled = ref<IActionSheetAction[]>([
    { name: '正常选项' },
    { name: '禁用选项', disabled: true },
    { name: '其他选项' }
])

// ========== 加载状态 ==========
const actionsLoading = ref<IActionSheetAction[]>([
    { name: '选项1' },
    { name: '加载中...', loading: true },
    { name: '选项3' }
])

// ========== 自定义颜色 ==========
const actionsColor = ref<IActionSheetAction[]>([
    { name: '正常文字' },
    { name: '红色警告', color: 'red' },
    { name: '蓝色链接', color: '#2979ff' }
])

// ========== 描述信息 ==========
const actionsSub = ref<IActionSheetAction[]>([
    { name: '选项1', sub: '这是一段描述信息' },
    { name: '选项2', sub: '这是另一段描述' },
    { name: '选项3' }
])

// ========== 单行面板 ==========
const panelsSingle = ref([
    {
        iconUrl: 'https://img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
        name: '微信'
    },
    {
        iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/111572/11/11734/1245/5f0692a1E39d13d21/b35dfe9243bd6c2a.png',
        name: '微博'
    },
    {
        iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/132639/25/4003/945/5f069336E18778248/fa181913030bed8a.png',
        name: 'QQ'
    },
    {
        iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/134807/4/3950/1256/5f069336E76949e27/d20641da8e699f07.png',
        name: '收藏'
    }
])

// ========== 多行面板 ==========
const panelsMulti = ref([
    [
        {
            iconUrl: 'https://img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
            name: '微信'
        },
        {
            iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/111572/11/11734/1245/5f0692a1E39d13d21/b35dfe9243bd6c2a.png',
            name: '微博'
        },
        {
            iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/132639/25/4003/945/5f069336E18778248/fa181913030bed8a.png',
            name: 'QQ'
        },
        {
            iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/134807/4/3950/1256/5f069336E76949e27/d20641da8e699f07.png',
            name: '收藏'
        }
    ],
    [
        {
            iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/132639/25/4003/945/5f069336E18778248/fa181913030bed8a.png',
            name: 'QQ好友'
        },
        {
            iconUrl: 'https://img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
            name: '微信好友'
        },
        {
            iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/111572/11/11734/1245/5f0692a1E39d13d21/b35dfe9243bd6c2a.png',
            name: '朋友圈'
        }
    ]
])

// ========== 事件处理 ==========
const onSelect = (params: any) => {
    uni.showToast({
        title: `点击了: ${params.item.name}`,
        icon: 'none'
    })
}

const onSelectNoClose = (params: any) => {
    uni.showToast({
        title: `点击了: ${params.item.name} (不关闭)`,
        icon: 'none'
    })
}

const onCancel = () => {
    uni.showToast({
        title: '点击了取消',
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