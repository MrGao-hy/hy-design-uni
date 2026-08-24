<template>
    <view class="tools-section">
        <!-- 区块头部 -->
        <view class="tools-section__header">
            <view class="tools-section__icon">
                <hy-icon :name="icon" :size="18" color="#fff" />
            </view>
            <view class="tools-section__title-group">
                <text class="tools-section__title">{{ title }}</text>
                <text v-if="desc" class="tools-section__desc">{{ desc }}</text>
            </view>
            <view class="tools-section__decor">
                <hy-icon name="right" :size="12" color="#c0c4cc" />
            </view>
        </view>
        <!-- 区块内容 -->
        <view class="tools-section__body">
            <slot />
        </view>
    </view>
</template>

<script setup lang="ts">
import HyIcon from '@/package/components/hy-icon/hy-icon.vue'

interface IProps {
    /** 区块标题 */
    title: string
    /** 区块描述 */
    desc?: string
    /** 头部图标名 */
    icon: string
}

withDefaults(defineProps<IProps>(), {
    desc: ''
})
</script>

<style lang="scss">
.tools-section {
    margin-bottom: $hy-border-margin-padding-xl;

    &__header {
        display: flex;
        align-items: center;
        gap: $hy-border-margin-padding-base;
        margin-bottom: $hy-border-margin-padding-base;
        padding-bottom: $hy-border-margin-padding-base;
        border-bottom: $hy-border-line;
    }

    &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 64rpx;
        height: 64rpx;
        border-radius: $hy-radius-base;
        background: linear-gradient(135deg, $hy-primary, $hy-primary-dark);
        box-shadow: $hy-shadow-sm;
        flex-shrink: 0;
    }

    &__title-group {
        display: flex;
        flex-direction: column;
        gap: 4rpx;
        flex: 1;
        min-width: 0;
    }

    &__title {
        font-size: $hy-font-size-lg;
        font-weight: $hy-font-weight-bold;
        color: $hy-text-color;
        line-height: $hy-line-height-sm;
    }

    &__desc {
        font-size: $hy-font-size-sm;
        color: $hy-text-color--3;
        line-height: $hy-line-height-sm;
    }

    &__decor {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44rpx;
        height: 44rpx;
        border-radius: $hy-radius-circle;
        background: $hy-background--3;
        flex-shrink: 0;
        opacity: 0.6;
    }
}
</style>
