<template>
    <the-root-page @click="closeOutside">
        <hy-card>
            <template #header>
                <view class="header">
                    <view class="hy-title">{{ t('basicUsage') }}</view>
                    <hy-popover v-model="show" :content="t('tipContent')" placement="bottom-end">
                        <hy-icon :name="IconConfig.HELP_CIRCLE"></hy-icon>
                    </hy-popover>
                </view>
            </template>

            <template #body>
                <view class="container">
                    <view class="top">
                        <hy-popover :content="content" placement="bottom-start">
                            <hy-button :text="t('posTopLeft')" :stop="false"></hy-button>
                        </hy-popover>
                        <hy-popover :content="content" placement="bottom">
                            <hy-button :text="t('posTopCenter')" :stop="false"></hy-button>
                        </hy-popover>
                        <hy-popover :content="content" placement="bottom-end">
                            <hy-button :text="t('posTopRight')" :stop="false"></hy-button>
                        </hy-popover>
                    </view>

                    <view class="center">
                        <hy-popover :content="content" placement="right-start">
                            <hy-button :text="t('posLeftTop')" :stop="false"></hy-button>
                        </hy-popover>
                        <hy-popover :content="content" placement="left-start">
                            <hy-button :text="t('posRightBottom')" :stop="false"></hy-button>
                        </hy-popover>
                    </view>
                    <view class="center">
                        <hy-popover :content="content" placement="right">
                            <hy-button :text="t('posLeftCenter')" :stop="false"></hy-button>
                        </hy-popover>
                        <hy-popover :content="content" placement="left">
                            <hy-button :text="t('posRightCenter')" :stop="false"></hy-button>
                        </hy-popover>
                    </view>
                    <view class="center">
                        <hy-popover :content="content" placement="right-end">
                            <hy-button :text="t('posRightTop')" :stop="false"></hy-button>
                        </hy-popover>
                        <hy-popover :content="content" placement="left-end">
                            <hy-button :text="t('posRightBottom')" :stop="false"></hy-button>
                        </hy-popover>
                    </view>

                    <view class="bottom">
                        <hy-popover :content="content" placement="top-start">
                            <hy-button :text="t('posBottomLeft')" :stop="false"></hy-button>
                        </hy-popover>
                        <hy-popover :content="content" placement="top">
                            <hy-button :text="t('posBottomCenter')" :stop="false"></hy-button>
                        </hy-popover>
                        <hy-popover :content="content" placement="top-end">
                            <hy-button :text="t('posBottomRight')" :stop="false"></hy-button>
                        </hy-popover>
                    </view>
                </view>
            </template>
        </hy-card>

        <view class="hy-title">{{ t('linkageSection') }}</view>
        <view class="hy-container">
            <hy-popover mode="menu" :content="menus" placement="bottom-start" @menu-click="onMenu">
                <hy-button :text="t('btnMenu')" :stop="false"></hy-button>
            </hy-popover>
        </view>

        <view class="hy-title">{{ t('slotSection') }}</view>
        <view class="hy-container hy-flex">
            <hy-popover placement="top-end">
                <template #content>
                    <view class="custom-content">{{ t('slotContent') }}</view>
                </template>
                <hy-button :text="t('btnCustom')" :stop="false"></hy-button>
            </hy-popover>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQueue, IconConfig, type PopoverItemParamsVo } from '@/package'
// 组件
import HyButton from '../../package/components/hy-button/hy-button.vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '气泡'
    }
})

const { t } = useTranslate('popover')
usePageTitle('popover')

const { closeOutside } = useQueue()
// 提示内容（computed 保证语言切换时响应）
const content = computed(() => t('introContent'))
const count = ref(0)
// 菜单项（computed 保证语言切换时响应）
const menus = computed(() => [
    {
        icon: IconConfig.REMIND,
        content: t('menuMarkAll')
    },
    {
        icon: IconConfig.DELETE,
        content: t('menuClear')
    },
    {
        icon: IconConfig.SETTING,
        content: t('menuSubscribe')
    },
    {
        icon: IconConfig.NOTICE,
        content: t('menuAnomaly')
    }
])
const show = ref(false)

setTimeout(() => (count.value = 10), 2000)

const onMenu = ({ index, item }: PopoverItemParamsVo) => {
    uni.showToast({ title: t('clicked', index), icon: 'none' })
}

useShareButton()
</script>

<style scoped lang="scss">
.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .hy-title {
        padding: 0 10px;
    }
}
.container {
    height: 260px;
    display: flex;
    flex-direction: column;
    align-content: space-between;
    justify-content: space-between;
    .top {
        display: flex;
        justify-content: space-between;
    }
    .center {
        display: flex;
        justify-content: space-between;
    }
    .bottom {
        display: flex;
        justify-content: space-between;
    }
}
.custom-content {
    /* 必填 开始 */
    position: relative;
    z-index: 999;
    border-radius: 4px;
    /* 必填 结束 */
    background: $hy-background--box;
    color: #8268de;
    font-weight: bolder;
    padding: 10px;
    width: 150px;
}
</style>
