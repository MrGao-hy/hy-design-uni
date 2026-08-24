<template>
    <view class="code-block">
        <!-- 头部：指示灯 + tab/文件名 + 复制 -->
        <view class="code-block__header">
            <view class="code-block__left">
                <!-- 指示灯（macOS 风格） -->
                <view class="code-block__dots">
                    <view class="code-block__dot code-block__dot--red" />
                    <view class="code-block__dot code-block__dot--yellow" />
                    <view class="code-block__dot code-block__dot--green" />
                </view>
                <!-- 包管理器 tab -->
                <view v-if="tabs.length" class="code-block__tabs">
                    <view
                        v-for="(tab, index) in tabs"
                        :key="tab.label"
                        class="code-block__tab"
                        :class="{ 'is-active': activeTab === index }"
                        @click="handleTab(index)"
                    >
                        {{ tab.label }}
                    </view>
                </view>
                <text v-else class="code-block__filename">{{ title }}</text>
            </view>
            <view class="code-block__copy" @click="handleCopy">
                <hy-icon
                    :name="copied ? IconConfig.CHECK_MASK : IconConfig.COPY"
                    :size="13"
                    :color="copied ? '#52c41a' : '#8a8f98'"
                />
                <text class="code-block__copy-text" :class="{ 'is-copied': copied }">
                    {{ copied ? '已复制' : '复制' }}
                </text>
            </view>
        </view>
        <!-- 代码内容，横向可滚动，带行号 -->
        <scroll-view class="code-block__body" scroll-x :show-scrollbar="false">
            <view class="code-block__lines">
                <view v-for="(line, index) in codeLines" :key="index" class="code-block__line">
                    <text class="code-block__gutter">{{ index + 1 }}</text>
                    <text class="code-block__code">
                        <text v-if="isComment(line)" class="code-block__code--comment">{{
                            line
                        }}</text>
                        <text v-else-if="isKeyValue(line)" class="code-block__code--key">{{
                            line
                        }}</text>
                        <text v-else>{{ line }}</text>
                    </text>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import HyIcon from '@/package/components/hy-icon/hy-icon.vue'
import { IconConfig } from '@/package'

interface ICodeTab {
    label: string
    code: string
}

interface IProps {
    /** 代码块标题（无 tabs 时显示） */
    title?: string
    /** 单段代码 */
    code?: string
    /** 包管理器 tab 列表 */
    tabs?: ICodeTab[]
}

const props = withDefaults(defineProps<IProps>(), {
    title: '',
    code: '',
    tabs: () => []
})

// 当前激活的 tab 索引
const activeTab = ref(0)
// 复制状态
const copied = ref(false)
// 复制状态复位定时器
let copyTimer: ReturnType<typeof setTimeout> | null = null

// 当前展示的代码
const currentCode = computed(() => {
    if (props.tabs.length > 0) {
        return props.tabs[activeTab.value]?.code || ''
    }
    return props.code
})

// 按行拆分，便于行号与着色
const codeLines = computed(() => currentCode.value.split('\n'))

// 注释行识别（// 或 # 开头）
const isComment = (line: string) => /^\s*(\/\/|#|<!--)/.test(line)

// JSON 键值对识别
const isKeyValue = (line: string) => /^\s*"[^"]*"\s*:/.test(line) || /^\{|^\}/.test(line.trim())

// 切换 tab
const handleTab = (index: number) => {
    activeTab.value = index
}

// 复制代码
const handleCopy = () => {
    uni.setClipboardData({
        data: currentCode.value,
        success: () => {
            copied.value = true
            if (copyTimer) clearTimeout(copyTimer)
            copyTimer = setTimeout(() => {
                copied.value = false
            }, 2000)
        }
    })
}
</script>

<style lang="scss">
.code-block {
    border-radius: $hy-radius-base;
    overflow: hidden;
    background: #16181d;
    margin-bottom: $hy-border-margin-padding-lg;
    border: 1rpx solid rgba(255, 255, 255, 0.06);
    box-shadow: $hy-shadow-base;

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 18rpx $hy-border-margin-padding-base;
        background: #1d1f26;
        border-bottom: 1rpx solid rgba(255, 255, 255, 0.06);
    }

    &__left {
        display: flex;
        align-items: center;
        gap: $hy-border-margin-padding-base;
        flex: 1;
        min-width: 0;
    }

    &__dots {
        display: flex;
        gap: 10rpx;
        flex-shrink: 0;
    }

    &__dot {
        width: 16rpx;
        height: 16rpx;
        border-radius: $hy-radius-circle;

        &--red {
            background: #ff5f57;
        }

        &--yellow {
            background: #febc2e;
        }

        &--green {
            background: #28c840;
        }
    }

    &__tabs {
        display: flex;
        align-items: center;
        gap: 4rpx;
        flex: 1;
        min-width: 0;
    }

    &__tab {
        position: relative;
        padding: 6rpx 20rpx;
        font-size: $hy-font-size-sm;
        color: #9aa0a6;
        border-radius: $hy-radius-sm;
        transition: all 0.25s $hy-transition-ease;

        &.is-active {
            color: #fff;
            background: rgba(255, 255, 255, 0.1);

            &::after {
                content: '';
                position: absolute;
                left: 20rpx;
                right: 20rpx;
                bottom: 0;
                height: 4rpx;
                border-radius: 4rpx;
                background: $hy-primary;
            }
        }
    }

    &__filename {
        font-size: $hy-font-size-sm;
        color: #9aa0a6;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    &__copy {
        display: flex;
        align-items: center;
        gap: 8rpx;
        padding: 8rpx 16rpx;
        border-radius: $hy-radius-sm;
        flex-shrink: 0;
        transition: background-color 0.2s $hy-transition-ease;

        &:active {
            background-color: rgba(255, 255, 255, 0.08);
        }
    }

    &__copy-text {
        font-size: $hy-font-size-sm;
        color: #8a8f98;
        transition: color 0.2s $hy-transition-ease;

        &.is-copied {
            color: #52c41a;
        }
    }

    &__body {
        width: 100%;
    }

    &__lines {
        display: inline-block;
        min-width: 100%;
        padding: $hy-border-margin-padding-base 0;
    }

    &__line {
        display: flex;
        padding-right: $hy-border-margin-padding-lg;
        white-space: pre;
    }

    &__gutter {
        width: 72rpx;
        flex-shrink: 0;
        text-align: right;
        padding-right: $hy-border-margin-padding-base;
        font-size: $hy-font-size-sm;
        color: #4a4f57;
        user-select: none;
        font-family: 'Courier New', Consolas, monospace;
    }

    &__code {
        font-family: 'Courier New', Consolas, monospace;
        font-size: $hy-font-size-sm;
        line-height: $hy-line-height-lg;
        color: #d6d8dc;
        user-select: text;

        &--comment {
            color: #6a9955;
        }

        &--key {
            color: #4fc1ff;
        }
    }
}
</style>
