<template>
    <view class="mine">
        <hy-config-provider custom-class="mine-page" :theme-color="color" :theme="darkMode">
            <!-- 主内容区域 -->
            <scroll-view class="main-content" scroll-y :show-scrollbar="false">
                <!-- 用户信息卡片 -->
                <user-card :user-info="userInfo" edit-text="编辑资料" @edit="handleEditProfile" />

                <!-- 统计数据卡片 -->
                <stats-card :stats="stats" @click="handleStatClick" />

                <!-- 功能列表：我的服务 -->
                <feature-list
                    title="我的服务"
                    :features="serviceFeatures"
                    @click="handleFeatureClick"
                    @navigate="handleNavigate"
                />

                <!-- 功能列表：设置和帮助 -->
                <feature-list
                    title="设置与帮助"
                    :features="settingFeatures"
                    @click="handleFeatureClick"
                    @navigate="handleNavigate"
                />

                <!-- 退出登录按钮 -->
                <logout-button
                    button-text="退出登录"
                    :loading="isLoggingOut"
                    :disabled="isLoggingOut"
                    loading-text="退出中..."
                    @logout="handleLogout"
                />
            </scroll-view>
        </hy-config-provider>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { IconConfig } from '@/package'

// 导入组件
import UserCard from './components/UserCard.vue'
import StatsCard from './components/StatsCard.vue'
import FeatureList from './components/FeatureList.vue'
import LogoutButton from './components/LogoutButton.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)
const isLoggingOut = ref(false)
const deviceInfo = ref('')

// 响应式断点
const breakpoints = {
    small: 375,
    medium: 768,
    large: 1024
}

// 获取当前设备类型
const deviceType = computed(() => {
    const windowWidth = uni.getSystemInfoSync().windowWidth
    if (windowWidth < breakpoints.medium) return 'mobile'
    if (windowWidth < breakpoints.large) return 'tablet'
    return 'desktop'
})

// 用户信息
const userInfo = ref({
    nickname: '华玥10086',
    userId: '10086',
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=123456789&s=100',
    bio: '这个人很懒，什么都没有留下',
    isVip: true
})

// 统计数据
const stats = ref([
    { key: 'favorites', label: '组件', value: 74 },
    { key: 'following', label: '用户', value: '80万' },
    { key: 'followers', label: '粉丝', value: '18万' },
    { key: 'likes', label: '获赞', value: '200万' }
])

// 服务功能列表
const serviceFeatures = ref([
    {
        key: 'orders',
        label: '我的订单',
        icon: IconConfig.ORDER,
        iconColor: '#ffffff',
        iconBg: '#667eea',
        badge: '3',
        route: '/pages/orders/index'
    },
    {
        key: 'address',
        label: '收货地址',
        icon: IconConfig.MAP,
        iconColor: '#ffffff',
        iconBg: '#48bb78',
        route: '/pages/address/index'
    },
    {
        key: 'coupons',
        label: '我的消息',
        icon: IconConfig.MESSAGE,
        iconColor: '#ffffff',
        iconBg: '#ed8936',
        badge: '5',
        route: '/pages/coupons/index'
    },
    {
        key: 'favorites',
        label: '我的收藏',
        icon: IconConfig.STAR,
        iconColor: '#ffffff',
        iconBg: '#f56565',
        route: '/pages/favorites/index'
    }
])

// 设置和帮助功能列表
const settingFeatures = ref([
    {
        key: 'settings',
        label: '设置',
        icon: IconConfig.SETTING,
        iconColor: '#ffffff',
        iconBg: '#a0aec0',
        route: '/pages/settings/index'
    },
    {
        key: 'help',
        label: '帮助与反馈',
        icon: IconConfig.CUSTOMER_SERVICE,
        iconColor: '#ffffff',
        iconBg: '#4299e1',
        route: '/pages/help/index'
    },
    {
        key: 'about',
        label: '关于我们',
        icon: IconConfig.MINE,
        iconColor: '#ffffff',
        iconBg: '#9f7aea',
        version: 'v1.0.0',
        route: '/pages/about/index'
    }
])

// 导航映射表
const navigationMap: Record<string, string> = {
    orders: '/pages/orders/index',
    address: '/pages/address/index',
    coupons: '/pages/coupons/index',
    favorites: '/pages/favorites/index',
    settings: '/pages/settings/index',
    help: '/pages/help/index',
    about: '/pages/about/index'
}

// 处理编辑资料
const handleEditProfile = () => {}

// 处理统计项点击
const handleStatClick = (key: string) => {
    console.log('统计项点击:', key)
    // 根据不同的统计项跳转到不同页面
    switch (key) {
        case 'favorites':
            uni.navigateTo({
                url: '/pages/favorites/index'
            })
            break
        case 'following':
            uni.navigateTo({
                url: '/pages/following/index'
            })
            break
        case 'followers':
            uni.navigateTo({
                url: '/pages/followers/index'
            })
            break
        case 'likes':
            uni.navigateTo({
                url: '/pages/likes/index'
            })
            break
    }
}

// 处理功能项点击
const handleFeatureClick = (item: any) => {
    console.log('功能项点击:', item)
}

// 处理导航
const handleNavigate = (route: string, params?: Record<string, any>) => {
    console.log('导航到:', route, params)

    let url = route
    if (params) {
        // 将参数拼接到URL
        const queryString = Object.entries(params)
            .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
            .join('&')
        url = `${route}?${queryString}`
    }

    uni.navigateTo({
        url,
        fail: (err) => {
            console.error('导航失败:', err)
            uni.showToast({
                title: '页面不存在',
                icon: 'none'
            })
        }
    })
}

// 处理退出登录
const handleLogout = async () => {
    // 显示确认对话框
    uni.showModal({
        title: '确认退出',
        content: '确定要退出登录吗？',
        success: async (res) => {
            if (res.confirm) {
                isLoggingOut.value = true

                try {
                    // 模拟退出登录请求
                    await new Promise((resolve) => setTimeout(resolve, 1000))

                    // 清除本地存储的用户信息
                    uni.removeStorageSync('userInfo')
                    uni.removeStorageSync('token')

                    // 退出成功提示
                    uni.showToast({
                        title: '退出成功',
                        icon: 'success'
                    })

                    // 跳转到登录页面
                    setTimeout(() => {
                        uni.reLaunch({
                            url: '/pages/login/index'
                        })
                    }, 1500)
                } catch (error) {
                    console.error('退出登录失败:', error)
                    uni.showToast({
                        title: '退出失败，请重试',
                        icon: 'none'
                    })
                    isLoggingOut.value = false
                }
            }
        }
    })
}

// 获取设备信息（用于测试响应式）
const getDeviceInfo = () => {
    const sysInfo = uni.getSystemInfoSync()
    return {
        model: sysInfo.model,
        screenWidth: sysInfo.screenWidth,
        screenHeight: sysInfo.screenHeight,
        windowWidth: sysInfo.windowWidth,
        windowHeight: sysInfo.windowHeight,
        pixelRatio: sysInfo.pixelRatio,
        deviceType: deviceType.value
    }
}

// 窗口大小变化监听
const handleResize = () => {
    const info = getDeviceInfo()
    console.log(info)
    deviceInfo.value = `设备: ${info.model}, 尺寸: ${info.windowWidth}x${info.windowHeight}, 类型: ${info.deviceType}`
}

// 组件挂载时调用
onMounted(() => {
    // 获取设备信息
    handleResize()
})
</script>

<script lang="ts">
export default {
    options: {
        styleIsolation: 'shared'
    }
}
</script>

<style lang="scss" scoped>
.hy-theme--dark {
    &.mine-page {
        //background: linear-gradient(135deg, #4a5fc7 0%, #5a3a8a 100%);
    }
}
.mine {
    :deep(.mine-page) {
        //background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        //background: resultColor(180deg, #667eea, ('dark', 'light'), (#2b85e4, #ecf5ff), (0%, 100%));
        background: resultColor(180deg, #2979ff, ('dark', 'light'), (#2b85e4, #ecf5ff), (0%, 100%));
        height: calc(100vh - 94px);

        /* 主内容区域 */
        .main-content {
            height: 100%;
            padding: $hy-border-margin-padding-base;
            box-sizing: border-box;
        }
    }
}
</style>
