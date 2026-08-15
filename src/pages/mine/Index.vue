<template>
    <the-root-page>
        <scroll-view class="mine-page" scroll-y :show-scrollbar="false">
            <!-- 用户信息区域 -->
            <hy-card custom-class="user-card">
                <hy-flex align="center" gap="24rpx">
                    <hy-avatar
                        :src="userInfo.avatar"
                        size="large"
                        shape="circle"
                        @click="handleEditProfile"
                    />
                    <hy-flex vertical :flex="1" justify="center" gap="4rpx">
                        <hy-flex align="center" justify="space-between">
                            <hy-text :text="userInfo.nickname" size="18rpx" :bold="true" />
                            &ensp;
                            <hy-tag :label="t('vip')" type="primary" plain size="mini" />
                        </hy-flex>
                        <hy-text :text="'ID: ' + userInfo.userId" size="12rpx" color="#999" />
                        <hy-text :text="t('bio')" size="12rpx" color="#666" />
                    </hy-flex>
                </hy-flex>
            </hy-card>

            <!-- 统计数据 -->
            <hy-card custom-class="stats-card">
                <hy-flex justify="space-around">
                    <view
                        v-for="stat in stats"
                        :key="stat.key"
                        class="stat-item"
                        @click="handleStatClick(stat.key)"
                    >
                        <hy-text :text="String(stat.value)" size="36rpx" :bold="true" block />
                        <hy-text :text="t(stat.key)" size="24rpx" color="#999" block />
                    </view>
                </hy-flex>
            </hy-card>

            <!-- 我的服务 -->
            <!-- <hy-card>
                <view
                    v-for="item in serviceFeatures"
                    :key="item.key"
                    class="cell-row"
                    :class="{ 'cell-border': item.key !== 'favorites' }"
                    @click="handleNavigate(item.route)"
                >
                    <view class="cell-icon" :style="{ backgroundColor: item.iconBg }">
                        <hy-icon :name="item.icon" size="20" color="#fff" />
                    </view>
                    <hy-text :text="t(item.key)" size="28rpx" :flex="true" />
                    <view class="cell-right">
                        <hy-badge
                            v-if="item.badge"
                            :value="Number(item.badge)"
                            :max="99"
                            type="error"
                        />
                        <hy-icon v-else name="right" size="20" color="#c0c4cc" />
                    </view>
                </view>
            </hy-card> -->

            <!-- 设置与帮助 -->
            <!-- <hy-card>
                <view
                    v-for="item in settingFeatures"
                    :key="item.key"
                    class="cell-row"
                    :class="{ 'cell-border': item.key !== 'about' }"
                    @click="handleNavigate(item.route)"
                >
                    <view class="cell-icon" :style="{ backgroundColor: item.iconBg }">
                        <hy-icon :name="item.icon" size="20" color="#fff" />
                    </view>
                    <hy-text :text="t(item.key)" size="28rpx" :flex="true" />
                    <view class="cell-right">
                        <hy-text
                            v-if="item.version"
                            :text="item.version"
                            size="24rpx"
                            color="#999"
                        />
                        <hy-icon v-else name="right" size="20" color="#c0c4cc" />
                    </view>
                </view>
            </hy-card> -->

            <!-- 语言切换 -->
            <hy-card>
                <view class="cell-row">
                    <view class="cell-icon" style="background-color: #4299e1">
                        <hy-icon name="switch" size="20" color="#fff" />
                    </view>
                    <hy-text :text="t('language')" size="28rpx" :flex="true" />
                    <hy-switch
                        v-model="isEn"
                        size="small"
                        :activeValue="true"
                        :inactiveValue="false"
                        @change="handleLangChange"
                    />
                </view>
            </hy-card>

            <!-- 退出登录 -->
            <!-- <hy-button
                type="error"
                plain
                :loading="isLoggingOut"
                :disabled="isLoggingOut"
                custom-class="logout-btn"
                @click="handleLogout"
            >
                {{ t('logout') }}
            </hy-button> -->
        </scroll-view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconConfig, Locale, useCurrentLang, useToast, useTranslate } from '@/package'
import { config } from '@/config/config'

const { t } = useTranslate('mine')

// 当前语言
const currentLang = useCurrentLang()

const isEn = ref(currentLang.value === 'en-US')

const toast = useToast()

// 工具页未读问题数（鸿蒙审核未通过项），存在本地，用于在入口徽标提示
const toolBadge = ref<string>(
    (() => {
        const cnt = uni.getStorageSync('harmony_tools_issues')
        return typeof cnt === 'number' && cnt > 0 ? String(cnt) : ''
    })()
)

// 用户信息
const userInfo = ref({
    nickname: '华玥10086',
    userId: '10086',
    avatar: config.avatar,
    bio: '这个人很懒，什么都没有留下',
    isVip: true
})

// 统计数据
const stats = ref([
    { key: 'components', value: 74 },
    { key: 'following', value: '80万' },
    { key: 'followers', value: '18万' },
    { key: 'likes', value: '200万' }
])

// 服务功能列表
const serviceFeatures = ref([
    {
        key: 'orders',
        icon: IconConfig.ORDER,
        iconBg: '#667eea',
        badge: '3',
        route: '/pages/orders/index'
    },
    { key: 'address', icon: IconConfig.MAP, iconBg: '#48bb78', route: '/pages/address/index' },
    {
        key: 'messages',
        icon: IconConfig.MESSAGE,
        iconBg: '#ed8936',
        badge: '5',
        route: '/pages/coupons/index'
    },
    { key: 'favorites', icon: IconConfig.STAR, iconBg: '#f56565', route: '/pages/favorites/index' }
])

// 设置和帮助功能列表
const settingFeatures = ref([
    {
        key: 'settings',
        icon: IconConfig.SETTING,
        iconBg: '#a0aec0',
        route: '/pages/settings/index'
    },
    {
        key: 'help',
        icon: IconConfig.CUSTOMER_SERVICE,
        iconBg: '#4299e1',
        route: '/pages/help/index'
    },
    {
        key: 'about',
        icon: IconConfig.MINE,
        iconBg: '#9f7aea',
        version: 'v1.0.0',
        route: '/pages/about/index'
    }
])

// 处理编辑资料
const handleEditProfile = () => {}

// 处理统计项点击
const handleStatClick = (key: string) => {
    // const routeMap: Record<string, string> = {
    //     components: '/pages/favorites/index',
    //     following: '/pages/following/index',
    //     followers: '/pages/followers/index',
    //     likes: '/pages/likes/index'
    // }
    // const route = routeMap[key]
    // if (route) {
    //     uni.navigateTo({ url: route, fail: () => toast.info(t('pageNotExist')) })
    // }
}

// 处理导航
const handleNavigate = (route?: string) => {
    if (!route) return
    uni.navigateTo({
        url: route,
        fail: () => toast.info(t('pageNotExist')),
        success: () => {
            // 进入工具页后清除徽标
            if (route === '/pages/docs/Index') {
                toolBadge.value = ''
            }
        }
    })
}

// 处理语言切换
const handleLangChange = (val: boolean | string | number) => {
    if (val) {
        Locale.use('en-US')
    } else {
        Locale.use('zh-CN')
    }
    toast.success(val ? t('langSwitchEn') : t('langSwitch'))
}
</script>

<style lang="scss">
.mine-page {
    height: calc(100vh - 94px);
    padding: $hy-border-margin-padding-base;
    box-sizing: border-box;
}

.user-card {
    margin-bottom: $hy-border-margin-padding-base;
}

.stats-card {
    margin-bottom: $hy-border-margin-padding-base;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10rpx 0;
}

.cell-row {
    display: flex;
    align-items: center;
    padding: 24rpx 30rpx;
    transition: background-color 0.2s;

    &:active {
        background-color: $hy-background--hover;
    }
}

.cell-border {
    border-bottom: $hy-border-line;
}

.cell-icon {
    width: 56rpx;
    height: 56rpx;
    border-radius: $hy-radius-sm;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: $hy-border-margin-padding-base;
    flex-shrink: 0;
}

.cell-right {
    flex-shrink: 0;
    display: flex;
    align-items: center;
}

.logout-btn {
    margin-top: $hy-border-margin-padding-lg;
    margin-bottom: 60rpx;
}
</style>
