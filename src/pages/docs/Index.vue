<template>
    <the-root-page>
        <scroll-view
            class="tools-page"
            scroll-y
            :show-scrollbar="false"
            :scroll-into-view="scrollIntoView"
            scroll-with-animation
        >
            <!-- Hero 头部 -->
            <view class="hero">
                <!-- 装饰光斑 -->
                <view class="hero__orb hero__orb--1" />
                <view class="hero__orb hero__orb--2" />
                <view class="hero__orb hero__orb--3" />

                <view class="hero__logo-wrap">
                    <image
                        class="hero__logo"
                        src="/static/hy_logo_light.png"
                        mode="aspectFit"
                        lazy-load
                    />
                    <view class="hero__version">v1.0.4</view>
                </view>
                <view class="hero__title">华玥组件库</view>
                <view class="hero__slogan">多生态、丰富的移动端 UI 组件库</view>
                <view class="hero__tags">
                    <hy-tag
                        v-for="(tag, index) in heroTags"
                        :key="index"
                        :label="tag"
                        type="primary"
                        plain
                        size="mini"
                        shape="circle"
                    />
                </view>
                <view class="hero__actions">
                    <hy-button text="开始使用" type="primary" size="medium" @click="openDocs" />
                    <hy-button text="查看文档" type="info" plain size="medium" @click="openDocs" />
                </view>
                <view class="hero__scroll-hint" @click="handleNav('install')">
                    <hy-icon name="down" :size="14" color="rgba(255,255,255,0.7)" />
                </view>
            </view>

            <!-- 升级提醒 -->
            <view class="tools-container">
                <view class="notice-wrap">
                    <hy-notice-bar
                        :text="noticeText"
                        mode="closable"
                        color="#e6a23c"
                        bg-color="#fdf6ec"
                        :font-size="12"
                    />
                </view>

                <!-- 锚点导航 -->
                <view class="anchor-nav">
                    <view
                        v-for="(item, index) in navItems"
                        :key="item.key"
                        class="anchor-nav__item"
                        :class="{ 'is-active': activeNav === item.key }"
                        @click="handleNav(item.key)"
                    >
                        <hy-icon
                            :name="item.icon"
                            :size="13"
                            :color="activeNav === item.key ? '#fff' : $hyTextColor3"
                        />
                        <text class="anchor-nav__text">{{ item.label }}</text>
                    </view>
                </view>

                <!-- 快速开始 -->
                <view id="install" class="anchor-target">
                    <the-tools-section title="快速开始" desc="三步即可完成安装" icon="download">
                        <view
                            v-for="(step, index) in installSteps"
                            :key="index"
                            class="step"
                            :class="{ 'has-line': index < installSteps.length - 1 }"
                        >
                            <view class="step__header">
                                <view class="step__index">{{ index + 1 }}</view>
                                <view class="step__title">{{ step.title }}</view>
                                <view class="step__duration">{{ step.duration }}</view>
                            </view>
                            <view class="step__tip">{{ step.tip }}</view>
                            <the-code-block
                                :tabs="step.tabs"
                                :title="step.filename"
                                :code="step.code"
                            />
                        </view>
                    </the-tools-section>
                </view>

                <!-- 快速配置 -->
                <view id="config" class="anchor-target">
                    <the-tools-section
                        title="快速配置"
                        desc="让项目全局自动引入组件"
                        icon="setting"
                    >
                        <view
                            v-for="(step, index) in configSteps"
                            :key="index"
                            class="step"
                            :class="{ 'has-line': index < configSteps.length - 1 }"
                        >
                            <view class="step__header">
                                <view class="step__index">{{ index + 1 }}</view>
                                <view class="step__title">{{ step.title }}</view>
                            </view>
                            <view class="step__tip">{{ step.tip }}</view>
                            <the-code-block :title="step.filename" :code="step.code" />
                        </view>
                    </the-tools-section>
                </view>

                <!-- 页面使用 -->
                <view id="usage" class="anchor-target">
                    <the-tools-section title="页面使用" desc="在所需页面直接使用组件" icon="send">
                        <the-code-block title="index.vue" :code="usageCode" />
                    </the-tools-section>
                </view>

                <!-- 平台支持 -->
                <view id="platform" class="anchor-target">
                    <the-tools-section title="多端支持" desc="一套代码，多端运行" icon="layers">
                        <view class="platform-grid">
                            <view
                                v-for="item in platformList"
                                :key="item.name"
                                class="platform-item"
                            >
                                <view class="platform-item__icon">
                                    <hy-icon :name="item.icon" :size="20" :color="item.color" />
                                </view>
                                <text class="platform-item__name">{{ item.name }}</text>
                            </view>
                        </view>
                    </the-tools-section>
                </view>

                <!-- 文档入口 -->
                <view class="doc-entry" @click="openDocs">
                    <view class="doc-entry__icon">
                        <hy-icon name="link" :size="20" color="#fff" />
                    </view>
                    <view class="doc-entry__info">
                        <text class="doc-entry__text">在线文档</text>
                        <text class="doc-entry__url">{{ DOC_URL }}</text>
                    </view>
                    <view class="doc-entry__arrow">
                        <hy-icon name="right" :size="14" color="#fff" />
                    </view>
                </view>
            </view>
        </scroll-view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import HyButton from '@/package/components/hy-button/hy-button.vue'
import HyIcon from '@/package/components/hy-icon/hy-icon.vue'
import HyNoticeBar from '@/package/components/hy-notice-bar/hy-notice-bar.vue'
import HyTag from '@/package/components/hy-tag/hy-tag.vue'

// 文档地址常量
const DOC_URL = 'https://www.hy-design-uni.top/'

// Hero 特性标签
const heroTags = ['开箱即用', '类型安全', '高度可定制']

// 升级提醒文案
const noticeText = '2026-07-13 hy-app 已停止迭代更新，请下载迁移全新版本 @hy-app/ui'

// 锚点导航配置
interface INavItem {
    key: string
    label: string
    icon: string
}

const navItems: INavItem[] = [
    { key: 'install', label: '安装', icon: 'download' },
    { key: 'config', label: '配置', icon: 'setting' },
    { key: 'usage', label: '使用', icon: 'send' },
    { key: 'platform', label: '多端', icon: 'layers' }
]

// 当前激活锚点
const activeNav = ref('install')
// 滚动目标
const scrollIntoView = ref('')

// 安装步骤配置
interface IInstallStep {
    title: string
    tip: string
    duration: string
    filename: string
    tabs: { label: string; code: string }[]
    code: string
}

const installSteps: IInstallStep[] = [
    {
        title: '下载 scss',
        tip: '组件库基于 scss，未安装 scss 的需要先安装（推荐 1.53.0 ≤ sass ≤ 1.101.0）',
        duration: '约 30 秒',
        filename: '安装 sass',
        tabs: [
            { label: 'npm', code: 'npm install -D sass@1.78.0' },
            { label: 'pnpm', code: 'pnpm add -D sass@1.78.0' },
            { label: 'cnpm', code: 'cnpm install -D sass@1.78.0' },
            { label: 'yarn', code: 'yarn add -D sass@1.78.0' }
        ],
        code: 'npm install -D sass@1.78.0'
    },
    {
        title: '下载 dayjs',
        tip: '时间选择器依赖 dayjs，使用前需安装，否则会报错',
        duration: '约 20 秒',
        filename: '安装 dayjs',
        tabs: [
            { label: 'npm', code: 'npm install dayjs' },
            { label: 'pnpm', code: 'pnpm add dayjs' },
            { label: 'cnpm', code: 'cnpm install dayjs' },
            { label: 'yarn', code: 'yarn add dayjs' }
        ],
        code: 'npm install dayjs'
    },
    {
        title: '安装 hy-app',
        tip: 'hy-app 已停止迭代，请安装全新版本 @hy-app/ui',
        duration: '约 60 秒',
        filename: '安装 @hy-app/ui',
        tabs: [
            { label: 'npm', code: 'npm install @hy-app/ui' },
            { label: 'pnpm', code: 'pnpm add @hy-app/ui' },
            { label: 'cnpm', code: 'cnpm install @hy-app/ui' },
            { label: 'yarn', code: 'yarn install @hy-app/ui' }
        ],
        code: 'npm install @hy-app/ui'
    }
]

// 配置步骤配置
interface IConfigStep {
    title: string
    tip: string
    filename: string
    code: string
}

const configSteps: IConfigStep[] = [
    {
        title: '配置全局组件自动引入',
        tip: '修改项目根目录下的 ./src/pages.json，添加 easycom 配置',
        filename: 'pages.json',
        code: `{
  "easycom": {
    "custom": {
      "^hy-(.*)": "@hy-app/ui/components/hy-$1/hy-$1.vue"
    }
  }
}`
    },
    {
        title: '让 Volar/VS Code 识别组件',
        tip: 'VS Code 和 Trae 能提供组件的属性提示、类型检查、自动补全',
        filename: 'tsconfig.json',
        code: `{
  "compilerOptions": {
    "types": ["@hy-app/ui/global"]
  }
}`
    },
    {
        title: '全局导入组件库样式',
        tip: '修改 uni.scss，否则组件会丢失样式效果',
        filename: 'uni.scss',
        code: `@use '@hy-app/ui/index.scss' as *;`
    }
]

// 页面使用示例
const usageCode = `<template>
  <!-- 然后在所需页面直接使用 -->
  <hy-input></hy-input>
</template>`

// 平台支持列表
interface IPlatformItem {
    name: string
    icon: string
    color: string
}

const platformList: IPlatformItem[] = [
    { name: 'H5', icon: 'network', color: '#2979ff' },
    { name: 'App', icon: 'telephone', color: '#19be6b' },
    { name: '微信', icon: 'message', color: '#07c160' },
    { name: '支付宝', icon: 'security', color: '#1677ff' },
    { name: '抖音', icon: 'camera', color: '#333333' },
    { name: 'QQ', icon: 'comment', color: '#12b7f5' },
    { name: '鸿蒙', icon: 'layers', color: '#e60012' },
    { name: '更多', icon: 'ellipsis', color: '#909399' }
]

// 辅助文本色
const $hyTextColor3 = computed(() => '#909399')

// 锚点跳转
const handleNav = (key: string) => {
    activeNav.value = key
    scrollIntoView.value = key
}

// 打开在线文档
const openDocs = () => {
    // #ifdef H5
    window.open(DOC_URL)
    // #endif

    // #ifdef APP-PLUS
    plus.runtime.openURL(DOC_URL)
    // #endif

    // #ifdef MP
    uni.setClipboardData({
        data: DOC_URL,
        success: () => {
            uni.showToast({ title: '链接已复制，请在浏览器中打开', icon: 'none' })
        }
    })
    // #endif
}

definePage({
    style: {
        navigationStyle: 'custom'
    }
})
</script>

<style lang="scss">
.tools-page {
    height: 100vh;
    box-sizing: border-box;
}

/* ========== Hero ========== */
.hero {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $hy-border-margin-padding-xl $hy-border-margin-padding-base
        $hy-border-margin-padding-xl;
    background: linear-gradient(160deg, $hy-primary 0%, $hy-primary-dark 100%);
    border-radius: 0 0 $hy-radius-lg $hy-radius-lg;
    overflow: hidden;

    &__orb {
        position: absolute;
        border-radius: $hy-radius-circle;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.18), transparent 70%);
        pointer-events: none;
        animation: orb-float 6s $hy-transition-ease infinite;

        &--1 {
            width: 320rpx;
            height: 320rpx;
            top: -120rpx;
            right: -80rpx;
        }

        &--2 {
            width: 220rpx;
            height: 220rpx;
            bottom: 60rpx;
            left: -60rpx;
            animation-delay: -2s;
        }

        &--3 {
            width: 140rpx;
            height: 140rpx;
            top: 40rpx;
            left: 20%;
            animation-delay: -4s;
        }
    }

    &__logo-wrap {
        position: relative;
        margin-bottom: $hy-border-margin-padding-base;
        animation: logo-breathe 3s $hy-transition-ease infinite;
    }

    &__logo {
        width: 148rpx;
        height: 148rpx;
        border-radius: $hy-radius-circle;
        background-color: rgba(255, 255, 255, 0.92);
        box-shadow: $hy-shadow-lg;
    }

    &__version {
        position: absolute;
        right: -24rpx;
        bottom: -4rpx;
        padding: 4rpx 14rpx;
        font-size: $hy-font-size-xs;
        color: #fff;
        background: rgba(0, 0, 0, 0.35);
        border-radius: $hy-radius-semicircle;
        border: 2rpx solid rgba(255, 255, 255, 0.5);
    }

    &__title {
        font-size: $hy-font-size-xxl;
        font-weight: $hy-font-weight-bold;
        color: #fff;
        line-height: $hy-line-height-sm;
        margin-bottom: $hy-border-margin-padding-sm;
        text-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
    }

    &__slogan {
        font-size: $hy-font-size-md;
        color: rgba(255, 255, 255, 0.88);
        line-height: $hy-line-height-sm;
        margin-bottom: $hy-border-margin-padding-base;
    }

    &__tags {
        display: flex;
        gap: $hy-border-margin-padding-sm;
        margin-bottom: $hy-border-margin-padding-lg;
    }

    &__actions {
        display: flex;
        gap: $hy-border-margin-padding-base;
    }

    &__scroll-hint {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56rpx;
        height: 56rpx;
        margin-top: $hy-border-margin-padding-lg;
        border-radius: $hy-radius-circle;
        border: 2rpx solid rgba(255, 255, 255, 0.4);
        animation: hint-bounce 1.8s $hy-transition-ease infinite;
    }
}

/* ========== 内容区 ========== */
.tools-container {
    padding: $hy-border-margin-padding-lg $hy-border-margin-padding-base;

    .notice-wrap {
        margin-bottom: $hy-border-margin-padding-lg;
    }
}

/* 锚点导航 */
.anchor-nav {
    display: flex;
    gap: $hy-border-margin-padding-sm;
    margin-bottom: $hy-border-margin-padding-xl;
    padding: 12rpx;
    background: $hy-background--2;
    border-radius: $hy-radius-base;
    box-shadow: $hy-shadow-sm;

    &__item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8rpx;
        padding: 14rpx 0;
        border-radius: $hy-radius-base;
        transition: all 0.3s $hy-transition-ease;

        &.is-active {
            background: linear-gradient(135deg, $hy-primary, $hy-primary-dark);
            box-shadow: $hy-shadow-sm;

            .anchor-nav__text {
                color: #fff;
            }
        }
    }

    &__text {
        font-size: $hy-font-size-sm;
        color: $hy-text-color--3;
        transition: color 0.3s $hy-transition-ease;
    }
}

.anchor-target {
    scroll-margin-top: 20rpx;
}

/* 步骤 */
.step {
    position: relative;
    padding-left: 44rpx;

    &.has-line {
        &::before {
            content: '';
            position: absolute;
            left: 18rpx;
            top: 52rpx;
            bottom: -$hy-border-margin-padding-base;
            width: 2rpx;
            background: linear-gradient(180deg, $hy-primary, rgba($hy-primary, 0.1));
        }
    }

    &__header {
        display: flex;
        align-items: center;
        gap: $hy-border-margin-padding-sm;
        margin-bottom: $hy-border-margin-padding-sm;
    }

    &__index {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40rpx;
        height: 40rpx;
        margin-left: -44rpx;
        font-size: $hy-font-size-sm;
        font-weight: $hy-font-weight-bold;
        color: #fff;
        border-radius: $hy-radius-circle;
        background: linear-gradient(135deg, $hy-primary, $hy-primary-dark);
        box-shadow: $hy-shadow-sm;
        flex-shrink: 0;
    }

    &__title {
        font-size: $hy-font-size-base;
        font-weight: $hy-font-weight-medium;
        color: $hy-text-color;
    }

    &__duration {
        margin-left: auto;
        font-size: $hy-font-size-xs;
        color: $hy-text-color--3;
    }

    &__tip {
        font-size: $hy-font-size-sm;
        color: $hy-text-color--3;
        line-height: $hy-line-height-base;
        margin-bottom: $hy-border-margin-padding-sm;
    }
}

/* 平台支持 */
.platform-grid {
    display: flex;
    flex-wrap: wrap;
    gap: $hy-border-margin-padding-base;
}

.platform-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10rpx;
    width: calc((100% - #{$hy-border-margin-padding-base} * 3) / 4);
    padding: $hy-border-margin-padding-base 0;

    &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 72rpx;
        height: 72rpx;
        border-radius: $hy-radius-base;
        background: $hy-background--3;
        transition: all 0.3s $hy-transition-ease;

        &:active {
            transform: scale(0.92);
        }
    }

    &__name {
        font-size: $hy-font-size-sm;
        color: $hy-text-color--2;
    }
}

/* 文档入口 */
.doc-entry {
    display: flex;
    align-items: center;
    gap: $hy-border-margin-padding-base;
    padding: $hy-border-margin-padding-lg;
    border-radius: $hy-radius-base;
    background: linear-gradient(135deg, $hy-primary, $hy-primary-dark);
    box-shadow: $hy-shadow-base;
    transition: all 0.3s $hy-transition-ease;

    &:active {
        transform: scale(0.98);
        opacity: $hy-opacity-lg;
    }

    &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 64rpx;
        height: 64rpx;
        border-radius: $hy-radius-circle;
        background: rgba(255, 255, 255, 0.2);
        flex-shrink: 0;
    }

    &__info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 4rpx;
    }

    &__text {
        font-size: $hy-font-size-base;
        font-weight: $hy-font-weight-medium;
        color: #fff;
    }

    &__url {
        font-size: $hy-font-size-sm;
        color: rgba(255, 255, 255, 0.85);
        word-break: break-all;
    }

    &__arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48rpx;
        height: 48rpx;
        border-radius: $hy-radius-circle;
        background: rgba(255, 255, 255, 0.2);
        flex-shrink: 0;
        animation: arrow-nudge 1.5s $hy-transition-ease infinite;
    }
}

/* ========== 动画 ========== */
@keyframes orb-float {
    0%,
    100% {
        transform: translateY(0) scale(1);
    }

    50% {
        transform: translateY(-24rpx) scale(1.06);
    }
}

@keyframes logo-breathe {
    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.04);
    }
}

@keyframes hint-bounce {
    0%,
    100% {
        transform: translateY(0);
        opacity: 0.7;
    }

    50% {
        transform: translateY(10rpx);
        opacity: 1;
    }
}

@keyframes arrow-nudge {
    0%,
    100% {
        transform: translateX(0);
    }

    50% {
        transform: translateX(6rpx);
    }
}
</style>
