<template>
    <!-- 滚动模式：lock-scroll 为 true 时拦截触摸滚动，为 false 时触摸穿透遮罩（冒泡滚动） -->
    <view class="hy-title">{{ t('scrollSection') }}</view>
    <view class="hy-container scroll-mode">
        <view class="hy-flex">
            <hy-button plain type="primary" @click="openOverlay(true)">
                {{ t('lockScrollBtn') }}
            </hy-button>
            <hy-button plain type="warning" @click="openOverlay(false)">
                {{ t('bubbleScrollBtn') }}
            </hy-button>
        </view>
    </view>

    <!-- 长占位内容：保证页面出现滚动条，肉眼验证滚动穿透效果 -->
    <view class="scroll-mode__list">
        <view v-for="i in 16" :key="i" class="scroll-mode__item">
            {{ t('placeholderItem', i) }}
        </view>
    </view>

    <!--
        lockScroll=true 时锁住页面滚动，列表自身仍可滚，点击空白处关闭；
        lockScroll=false 时不锁滚动，触摸遮罩空白处页面照样滚动（冒泡），点击空白处同样可关闭
    -->
    <hy-overlay :show="overlayShow" :lock-scroll="lockScroll" @click="overlayShow = false">
        <!-- 插槽内容层由组件内置恢复交互（hy-overlay__content），无需手动设置 pointer-events -->
        <view v-if="overlayShow" class="scroll-mode__mask-box">
            <text class="scroll-mode__mask-title">{{ maskTitle }}</text>
            <scroll-view class="scroll-mode__scroll" scroll-y>
                <view v-for="i in 20" :key="i" class="scroll-mode__scroll-item">
                    {{ t('placeholderItem', i) }}
                </view>
            </scroll-view>
            <hy-button
                class="scroll-mode__btn"
                size="small"
                type="primary"
                @click="overlayShow = false"
            >
                {{ t('close') }}
            </hy-button>
        </view>
    </hy-overlay>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '遮罩层'
    }
})

const { t } = useTranslate('overlay')
usePageTitle('overlay')

/** 滚动模式演示：遮罩开关与滚动锁定（true 阻止滚动 / false 冒泡滚动） */
const overlayShow = ref(false)
const lockScroll = ref(true)

/** 遮罩标题随滚动模式切换 */
const maskTitle = computed(() => t(lockScroll.value ? 'lockScrollBtn' : 'bubbleScrollBtn'))

/** 打开指定滚动模式的遮罩 */
const openOverlay = (lock: boolean) => {
    lockScroll.value = lock
    overlayShow.value = true
}

useShareButton()
</script>

<style scoped lang="scss">
.hy-setting__box {
    width: 400rpx;
}

.scroll-mode {
    display: flex;
    flex-direction: column;
    gap: 20rpx;

    &__desc {
        font-size: 26rpx;
        line-height: 1.6;
        color: $hy-text-color--grey;
    }

    &__top {
        font-size: 26rpx;
        color: $hy-text-color--grey;

        &-value {
            font-weight: bold;
            color: $hy-primary;
        }
    }

    /* 遮罩内容卡片：fixed 居中于屏幕，列表可自身滚动 */
    &__mask-box {
        position: fixed;
        top: 50%;
        left: 50%;
        display: flex;
        flex-direction: column;
        gap: 30rpx;
        width: 560rpx;
        padding: 40rpx;
        border-radius: 20rpx;
        background-color: $hy-background--container;
        transform: translate(-50%, -50%);
    }

    &__mask-title {
        font-size: 32rpx;
        font-weight: bold;
        text-align: center;
        color: $hy-text-color;
    }

    /* 小列表：固定高度出滚动，验证内容层滚动不被遮罩拦截 */
    &__scroll {
        height: 480rpx;
        border: $hy-border-line;
        border-radius: 12rpx;
    }

    &__scroll-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 96rpx;
        font-size: 26rpx;
        color: $hy-text-color--grey;

        & + & {
            border-top: $hy-border-line;
        }
    }

    &__btn {
        align-self: center;
    }

    &__list {
        padding: 20rpx;
    }

    &__item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 120rpx;
        margin-bottom: 20rpx;
        border-radius: 12rpx;
        background-color: $hy-background--container;
        font-size: 28rpx;
        color: $hy-text-color--grey;
    }
}
</style>
