<template>
    <hy-config-provider :custom-style="themeColor" :theme="darkMode">
        <view class="hy-title"> 基础使用</view>
        <hy-tabbar-group v-model="current" @change="onChange">
            <hy-tabbar-item title="首页" icon="home"></hy-tabbar-item>
            <hy-tabbar-item title="分类" icon="class"></hy-tabbar-item>
            <hy-tabbar-item title="我的" icon="mine"></hy-tabbar-item>
        </hy-tabbar-group>

        <view class="hy-title"> 徽标提示 </view>
        <hy-tabbar-group
            :custom-style="{ marginBottom: '20px' }"
            :badgeProps="{ isDot: true }"
            v-model="current"
            @change="onChange"
        >
            <hy-tabbar-item title="首页" icon="home"></hy-tabbar-item>
            <hy-tabbar-item title="分类" icon="class"></hy-tabbar-item>
            <hy-tabbar-item title="我的" icon="mine" :value="true"></hy-tabbar-item>
        </hy-tabbar-group>

        <hy-tabbar-group v-model="current" @change="onChange">
            <hy-tabbar-item title="首页" icon="home" :value="10"></hy-tabbar-item>
            <hy-tabbar-item title="分类" icon="class"></hy-tabbar-item>
            <hy-tabbar-item title="我的" icon="mine"></hy-tabbar-item>
        </hy-tabbar-group>

        <view class="hy-title"> 圆角导航栏 </view>
        <hy-tabbar-group v-model="current" @change="onChange" shape="circle">
            <hy-tabbar-item title="首页" icon="home"></hy-tabbar-item>
            <hy-tabbar-item title="分类" icon="class"></hy-tabbar-item>
            <hy-tabbar-item title="我的" icon="mine"></hy-tabbar-item>
        </hy-tabbar-group>

        <view class="hy-title"> 自定义颜色 </view>
        <hy-tabbar-group
            v-model="current"
            @change="onChange"
            activeColor="red"
            inactiveColor="green"
            bgColor="yellow"
        >
            <hy-tabbar-item title="首页" icon="home"></hy-tabbar-item>
            <hy-tabbar-item title="分类" icon="class"></hy-tabbar-item>
            <hy-tabbar-item title="我的" icon="mine"></hy-tabbar-item>
        </hy-tabbar-group>

        <view class="hy-title"> 自定义图标 </view>
        <hy-tabbar-group v-model="current" @change="onChange">
            <hy-tabbar-item title="首页" icon="home">
                <template #icon>
                    <hy-image :src="config.avatar" width="30" height="30"></hy-image>
                </template>
            </hy-tabbar-item>
            <hy-tabbar-item title="分类" icon="class"></hy-tabbar-item>
            <hy-tabbar-item title="我的" icon="mine"></hy-tabbar-item>
        </hy-tabbar-group>

        <!-- 底部固定的tabbar测试 -->
        <hy-tabbar v-model="fixedCurrent" :list="list"></hy-tabbar>
    </hy-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HyTabbarGroup from '@/package/components/hy-tabbar-group/hy-tabbar-group.vue'
import HyTabbarItem from '@/package/components/hy-tabbar-item/hy-tabbar-item.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import HyTabbar from '@/package/components/hy-tabbar/hy-tabbar.vue'
import HyImage from '@/package/components/hy-image/hy-image.vue'
import { IconConfig } from '@/package'
import { config } from '@/config/config'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { themeColor, darkMode } = storeToRefs(themeStore)
const current = ref(0)
const fixedCurrent = ref(0)
const list = [
    { name: '首页', icon: IconConfig.HOME },
    { name: '分类', icon: IconConfig.HOME },
    { name: '购物车', icon: IconConfig.HOME, badge: 10 },
    { name: '我的', icon: IconConfig.HOME }
]

const onChange = ({ value }) => {
    uni.showToast({ title: `切换第${value}个`, icon: 'none' })
}
</script>

<style lang="scss" scoped></style>
