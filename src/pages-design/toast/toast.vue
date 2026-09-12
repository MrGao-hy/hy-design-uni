<template>
    <the-root-page>
        <hy-toast></hy-toast>

        <!-- 基础类型 -->
        <view class="hy-title">{{ t('basicTypes') }}</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item
                    :title="t('defaultTipCell')"
                    name="show"
                    @click="handleToast('show')"
                ></hy-cell-item>
                <hy-cell-item
                    :title="t('infoTip')"
                    name="info"
                    @click="handleToast('info')"
                ></hy-cell-item>
                <hy-cell-item
                    :title="t('successTip')"
                    name="success"
                    @click="handleToast('success')"
                ></hy-cell-item>
                <hy-cell-item
                    :title="t('errorTip')"
                    name="error"
                    @click="handleToast('error')"
                ></hy-cell-item>
                <hy-cell-item
                    :title="t('warningTip')"
                    name="warning"
                    @click="handleToast('warning')"
                ></hy-cell-item>
                <hy-cell-item
                    :title="t('primaryTip')"
                    name="primary"
                    @click="handleToast('primary')"
                ></hy-cell-item>
            </hy-cell>
        </view>

        <!-- 显示位置 -->
        <view class="hy-title">{{ t('position') }}</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item
                    :title="t('top')"
                    name="top"
                    @click="handlePosition('top')"
                ></hy-cell-item>
                <hy-cell-item
                    :title="t('center')"
                    name="center"
                    @click="handlePosition('center')"
                ></hy-cell-item>
                <hy-cell-item
                    :title="t('bottom')"
                    name="bottom"
                    @click="handlePosition('bottom')"
                ></hy-cell-item>
            </hy-cell>
        </view>

        <!-- 显示时长 -->
        <view class="hy-title">{{ t('duration') }}</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item
                    :title="t('oneSecond')"
                    name="1000"
                    @click="handleDuration(1000)"
                ></hy-cell-item>
                <hy-cell-item
                    :title="t('threeSeconds')"
                    name="3000"
                    @click="handleDuration(3000)"
                ></hy-cell-item>
                <hy-cell-item
                    :title="t('fiveSeconds')"
                    name="5000"
                    @click="handleDuration(5000)"
                ></hy-cell-item>
                <hy-cell-item
                    :title="t('noAutoClose')"
                    name="-1"
                    @click="handleDuration(-1)"
                ></hy-cell-item>
            </hy-cell>
        </view>

        <!-- 加载提示 -->
        <view class="hy-title">{{ t('loadingToast') }}</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item
                    :title="t('defaultLoading')"
                    name="loading"
                    @click="handleLoading()"
                ></hy-cell-item>
                <hy-cell-item
                    :title="t('customText')"
                    name="loading-text"
                    @click="handleLoading(t('loadingNow'))"
                ></hy-cell-item>
                <hy-cell-item
                    :title="t('circleLoading')"
                    name="loading-circle"
                    @click="handleLoading(t('loadingText'), 'circle')"
                ></hy-cell-item>
                <hy-cell-item
                    :title="t('spinnerLoading')"
                    name="loading-spinner"
                    @click="handleLoading(t('loadingText'), 'spinner')"
                ></hy-cell-item>
                <hy-cell-item
                    :title="t('dotsLoading')"
                    name="loading-semicircle"
                    @click="handleLoading(t('loadingText'), 'dots')"
                ></hy-cell-item>
                <hy-cell-item
                    :title="t('barsLoading')"
                    name="loading-semicircle"
                    @click="handleLoading(t('loadingText'), 'bars')"
                ></hy-cell-item>
            </hy-cell>
            <view class="hy-button-group">
                <hy-button
                    :text="t('closeLoading')"
                    size="small"
                    @click="toast.close()"
                ></hy-button>
            </view>
        </view>

        <!-- 自定义图标 -->
        <view class="hy-title">{{ t('customIcon') }}</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item
                    :title="t('iconCustomSize')"
                    @click="handleCustomIcon({ name: 'time', size: '24', color: '#2979ff' })"
                ></hy-cell-item>
                <hy-cell-item :title="t('mapIcon')" @click="handleCustomIcon('map')"></hy-cell-item>
                <hy-cell-item
                    :title="t('smileIcon')"
                    @click="handleCustomIcon('smile')"
                ></hy-cell-item>
            </hy-cell>
        </view>

        <!-- 回调函数 -->
        <view class="hy-title">{{ t('callback') }}</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item
                    :title="t('closeCallback')"
                    name="callback"
                    @click="handleCallback()"
                ></hy-cell-item>
            </hy-cell>
            <view v-if="callbackMessage" class="callback-message">
                {{ callbackMessage }}
            </view>
        </view>

        <!-- 触摸穿透 -->
        <view class="hy-title">{{ t('touchThrough') }}</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item
                    :title="t('allowThrough')"
                    @click="handleOverlay(true)"
                ></hy-cell-item>
                <hy-cell-item
                    :title="t('forbidThrough')"
                    @click="handleOverlay(false)"
                ></hy-cell-item>
                <hy-cell-item :title="t('showCover')" @click="handleCover(true)"></hy-cell-item>
            </hy-cell>
        </view>

        <!-- 综合示例 -->
        <view class="hy-title">{{ t('comprehensive') }}</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item
                    :title="t('mockLogin')"
                    name="login"
                    @click="handleLogin()"
                ></hy-cell-item>
                <hy-cell-item
                    :title="t('mockRequest')"
                    name="request"
                    @click="handleRequest()"
                ></hy-cell-item>
            </hy-cell>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import type { LoadingMode } from '@/package/libs/typing'
import { ref, computed } from 'vue'
import type { HyIconProps } from '@/package/components/hy-icon/typing'
import { isString, useToast } from '@/package'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '消息提示'
    }
})

const { t } = useTranslate('toast')
usePageTitle('toast')

const toast = useToast()

// 配置项
const icon = ref(true)
const loading = ref(false)
const loadMode = ref<LoadingMode>('circle')
const position = ref('center')
const callbackMessage = ref('')

// 位置演示数据（computed 包裹以响应语言切换）
const positionList = computed(() => [
    { name: t('posTop'), value: 'top' },
    { name: t('posCenter'), value: 'center' },
    { name: t('posBottom'), value: 'bottom' }
])

// 基础类型提示
const handleToast = (type: string) => {
    const options = {
        icon: type !== 'show' ? icon.value : '',
        position: position.value as any
    }
    ;(toast as any)[type]?.(t('defaultTip', type), options)
}

// 显示位置
const handlePosition = (pos: string) => {
    toast.success(
        pos === 'top'
            ? t('positionTop')
            : pos === 'center'
              ? t('positionCenter')
              : t('positionBottom'),
        {
            position: pos as any
        }
    )
}

// 显示时长
const handleDuration = (duration: number) => {
    const text = duration === -1 ? t('manualClose') : t('autoClose', duration / 1000)
    toast.info(text, {
        duration,
        position: position.value as any
    })
}

// 加载提示
const handleLoading = (message?: string, mode?: LoadingMode) => {
    toast.loading(message || t('loadingDefault'), {
        loadMode: mode || loadMode.value,
        position: position.value as any
    })

    if (loading.value) {
        const timer = setTimeout(() => {
            toast.close()
            clearTimeout(timer)
        }, 5000)
    }
}

// 自定义图标
const handleCustomIcon = (icon: string | Partial<HyIconProps>) => {
    toast.info(t('customIconTip'), {
        icon: isString(icon) ? icon : icon.name,
        position: position.value as any
    })
}

// 回调函数
const handleCallback = () => {
    callbackMessage.value = ''
    toast.success(t('operateSuccess'), {
        position: position.value as any,
        complete: () => {
            callbackMessage.value = t('callbackDone')
            setTimeout(() => {
                callbackMessage.value = ''
            }, 3000)
        }
    })
}

// 触摸穿透
const handleOverlay = (overlay: boolean) => {
    toast.info(overlay ? t('forbidTouchThrough') : t('allowTouchThrough'), {
        overlay,
        position: position.value as any
    })
}

// 触摸穿透
const handleCover = (cover: boolean) => {
    toast.show(cover ? t('showCover') : t('hideCover'), {
        cover,
        position: position.value as any
    })
}

// 模拟登录
const handleLogin = () => {
    toast.loading(t('logging'), { position: position.value as any })

    setTimeout(() => {
        toast.close()
        toast.success(t('loginSuccess'), { position: position.value as any })
    }, 2000)
}

// 模拟网络请求
const handleRequest = () => {
    toast.loading(t('requesting'), { position: position.value as any })

    setTimeout(() => {
        toast.close()
        toast.success(t('dataLoaded'), { position: position.value as any })
    }, 3000)
}

useShareButton()
</script>

<style scoped lang="scss">
.hy-button-group {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    justify-content: center;
}

.callback-message {
    margin-top: 15px;
    padding: 15px;
    background-color: #e8f5e9;
    border-radius: 8px;
    color: #2e7d32;
    font-size: 14px;
    text-align: center;
}
</style>
