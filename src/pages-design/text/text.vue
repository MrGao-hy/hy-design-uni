<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-title">基础使用</view>
        <hy-text text="我用十年青春,赴你最后之约"></hy-text>

        <view class="hy-title">主题色</view>
        <view class="hy-flex">
            <hy-text text="主色" type="primary"></hy-text>
            <hy-text text="错误" type="error"></hy-text>
            <hy-text text="成功" type="success"></hy-text>
            <hy-text text="警告" type="warning"></hy-text>
            <hy-text text="信息" type="info"></hy-text>
            <hy-text text="颜色" size="30rpx" color="#892FE8"></hy-text>
        </view>

        <view class="hy-title">手机号</view>
        <view class="hy-flex">
            <hy-text mode="phone" text="19807123294"></hy-text>
            <hy-text mode="phone" text="19807123294" format="encrypt"></hy-text>
        </view>

        <view class="hy-title">日期格式化</view>
        <hy-text mode="date" :text="1746024799822"></hy-text>

        <view class="hy-title">姓名脱敏</view>
        <view class="hy-flex">
            <hy-text mode="name" text="张三" format="encrypt"></hy-text>
            <hy-text mode="name" text="张益达" format="encrypt"></hy-text>
            <hy-text mode="name" text="古力娜扎" format="encrypt"></hy-text>
        </view>

        <view class="hy-title">超链接</view>
        <hy-text mode="link" text="摸鱼日记" href="https://gxh151.top/h5"></hy-text>

        <view class="hy-title">显示金额</view>
        <hy-text mode="price" text="728732.32"></hy-text>

        <view class="hy-title">显示图标</view>
        <view class="hy-flex">
            <hy-text :prefixIcon="IconConfig.MAP" text="地址"></hy-text>
            <hy-text
                :suffixIcon="IconConfig.ARROW_RIGHTWARD"
                :iconStyle="{ fontSize: '15px' }"
                text="查看更多"
            ></hy-text>
        </view>

        <view class="hy-title">超出两行隐藏</view>
        <hy-text
            :lines="2"
            text="关于uview-plus的取名来由，首字母u来自于uni-app首字母，plus参考element-plus起名让大家容易理解这是Vue3版本，uni-app是基于Vue.js，Vue和View(延伸为UI、视图之意)同音，同时view组件uni-app中 最基础，最重要的组件，故取名uview-plus，表达源于uni-app和Vue之意，同时在此也对它们表示感谢。"
        ></hy-text>

        <view class="hy-title">小程序开放能力</view>
        <hy-text text="分享到微信" openType="share" type="success" @click="clickHandler"></hy-text>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HyText from '@/package/components/hy-text/hy-text.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { IconConfig } from '@/package'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '文本'
    }
})

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)
const clickHandler = () => {
    // #ifndef MP-WEIXIN
    uni.showToast({ title: '请在微信小程序内查看效果' })
    // #endif
}

useShareButton()
</script>

<style scoped lang="scss"></style>
