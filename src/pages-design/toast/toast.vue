<template>
    <the-root-page>
        <hy-toast></hy-toast>

        <!-- 基础类型 -->
        <view class="hy-title">基础类型</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item
                    title="默认提示"
                    name="show"
                    @click="handleToast('show')"
                ></hy-cell-item>
                <hy-cell-item
                    title="信息提示"
                    name="info"
                    @click="handleToast('info')"
                ></hy-cell-item>
                <hy-cell-item
                    title="成功提示"
                    name="success"
                    @click="handleToast('success')"
                ></hy-cell-item>
                <hy-cell-item
                    title="错误提示"
                    name="error"
                    @click="handleToast('error')"
                ></hy-cell-item>
                <hy-cell-item
                    title="警告提示"
                    name="warning"
                    @click="handleToast('warning')"
                ></hy-cell-item>
                <hy-cell-item
                    title="主题提示"
                    name="primary"
                    @click="handleToast('primary')"
                ></hy-cell-item>
            </hy-cell>
        </view>

        <!-- 显示位置 -->
        <view class="hy-title">显示位置</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item title="顶部" name="top" @click="handlePosition('top')"></hy-cell-item>
                <hy-cell-item
                    title="居中"
                    name="center"
                    @click="handlePosition('center')"
                ></hy-cell-item>
                <hy-cell-item
                    title="底部"
                    name="bottom"
                    @click="handlePosition('bottom')"
                ></hy-cell-item>
            </hy-cell>
        </view>

        <!-- 显示时长 -->
        <view class="hy-title">显示时长</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item title="1秒" name="1000" @click="handleDuration(1000)"></hy-cell-item>
                <hy-cell-item title="3秒" name="3000" @click="handleDuration(3000)"></hy-cell-item>
                <hy-cell-item title="5秒" name="5000" @click="handleDuration(5000)"></hy-cell-item>
                <hy-cell-item
                    title="不自动关闭"
                    name="-1"
                    @click="handleDuration(-1)"
                ></hy-cell-item>
            </hy-cell>
        </view>

        <!-- 加载提示 -->
        <view class="hy-title">加载提示</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item
                    title="默认加载"
                    name="loading"
                    @click="handleLoading()"
                ></hy-cell-item>
                <hy-cell-item
                    title="自定义文字"
                    name="loading-text"
                    @click="handleLoading('正在加载...')"
                ></hy-cell-item>
                <hy-cell-item
                    title="圆形加载"
                    name="loading-circle"
                    @click="handleLoading('加载中', 'circle')"
                ></hy-cell-item>
                <hy-cell-item
                    title="经典花"
                    name="loading-spinner"
                    @click="handleLoading('加载中', 'spinner')"
                ></hy-cell-item>
                <hy-cell-item
                    title="半圆形"
                    name="loading-semicircle"
                    @click="handleLoading('加载中', 'semicircle')"
                ></hy-cell-item>
            </hy-cell>
            <view class="hy-button-group">
                <hy-button text="关闭加载提示" size="small" @click="toast.close()"></hy-button>
            </view>
        </view>

        <!-- 自定义图标 -->
        <view class="hy-title">自定义图标</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item
                    title="图标自定义大小和颜色"
                    @click="handleCustomIcon({ name: 'time', size: '24', color: '#2979ff' })"
                ></hy-cell-item>
                <hy-cell-item title="地址图标" @click="handleCustomIcon('map')"></hy-cell-item>
                <hy-cell-item title="笑脸图标" @click="handleCustomIcon('smile')"></hy-cell-item>
            </hy-cell>
        </view>

        <!-- 回调函数 -->
        <view class="hy-title">回调函数</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item
                    title="关闭后回调"
                    name="callback"
                    @click="handleCallback()"
                ></hy-cell-item>
            </hy-cell>
            <view v-if="callbackMessage" class="callback-message">
                {{ callbackMessage }}
            </view>
        </view>

        <!-- 触摸穿透 -->
        <view class="hy-title">触摸穿透</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item title="允许穿透" @click="handleOverlay(true)"></hy-cell-item>
                <hy-cell-item title="禁止穿透" @click="handleOverlay(false)"></hy-cell-item>
                <hy-cell-item title="显示遮罩层" @click="handleCover(true)"></hy-cell-item>
            </hy-cell>
        </view>

        <!-- 综合示例 -->
        <view class="hy-title">综合示例</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item title="模拟登录" name="login" @click="handleLogin()"></hy-cell-item>
                <hy-cell-item
                    title="模拟网络请求"
                    name="request"
                    @click="handleRequest()"
                ></hy-cell-item>
            </hy-cell>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { HyIconProps } from '@/package/components/hy-icon/typing'
import { useToast } from '@/package'
import { useShareButton } from '@/composables'
import TheRootPage from '@/components/TheRootPage.vue'

definePage({
    style: {
        navigationBarTitleText: '消息提示'
    }
})

const toast = useToast()

// 配置项
const icon = ref(true)
const loading = ref(false)
const loadMode = ref('circle')
const position = ref('center')
const callbackMessage = ref('')

const positionList = [
    { name: '上面', value: 'top' },
    { name: '中间', value: 'center' },
    { name: '下面', value: 'bottom' }
]

// 基础类型提示
const handleToast = (type: string) => {
    const options = {
        icon: type !== 'show' ? icon.value : '',
        position: position.value as any
    }
    ;(toast as any)[type]?.(`${type === 'show' ? '默认' : type}提示信息`, options)
}

// 显示位置
const handlePosition = (pos: string) => {
    toast.success(`显示在${pos === 'top' ? '顶部' : pos === 'center' ? '居中' : '底部'}`, {
        position: pos as any
    })
}

// 显示时长
const handleDuration = (duration: number) => {
    const text = duration === -1 ? '需手动关闭' : `${duration / 1000}秒后关闭`
    toast.info(text, {
        duration,
        position: position.value as any
    })
}

// 加载提示
const handleLoading = (message?: string, mode?: string) => {
    toast.loading(message || '加载中...', {
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
const handleCustomIcon = (iconName: string | HyIconProps) => {
    toast.info('自定义图标', {
        icon: iconName,
        position: position.value as any
    })
}

// 回调函数
const handleCallback = () => {
    callbackMessage.value = ''
    toast.success('操作成功', {
        position: position.value as any,
        complete: () => {
            callbackMessage.value = 'Toast 已关闭，回调函数执行成功！'
            setTimeout(() => {
                callbackMessage.value = ''
            }, 3000)
        }
    })
}

// 触摸穿透
const handleOverlay = (overlay: boolean) => {
    toast.info(overlay ? '禁止触摸穿透' : '允许触摸穿透', {
        overlay,
        position: position.value as any
    })
}

// 触摸穿透
const handleCover = (cover: boolean) => {
    toast.show(cover ? '显示遮罩层' : '不显示遮罩层', {
        cover,
        position: position.value as any
    })
}

// 模拟登录
const handleLogin = () => {
    toast.loading('登录中...', { position: position.value as any })

    setTimeout(() => {
        toast.close()
        toast.success('登录成功', { position: position.value as any })
    }, 2000)
}

// 模拟网络请求
const handleRequest = () => {
    toast.loading('请求数据中...', { position: position.value as any })

    setTimeout(() => {
        toast.close()
        toast.success('数据加载完成', { position: position.value as any })
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
