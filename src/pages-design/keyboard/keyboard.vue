<template>
    <the-root-page>
        <!-- 组件类型 -->
        <view class="hy-title">组件类型</view>
        <view class="hy-subtitle">键盘类型</view>
        <hy-cell>
            <hy-cell-item
                title="默认键盘"
                clickable
                @click="showDefaultKeyboard = true"
            ></hy-cell-item>
            <hy-cell-item
                title="带右侧栏的键盘"
                clickable
                @click="showSidebarKeyboard = true"
            ></hy-cell-item>
            <hy-cell-item
                title="身份证键盘"
                clickable
                @click="showIdcardKeyboard = true"
            ></hy-cell-item>
            <hy-cell-item
                title="车牌号键盘(非受控)"
                clickable
                @click="showCarUncontrolledKeyboard = true"
            ></hy-cell-item>
            <hy-cell-item
                title="车牌号键盘(受控)"
                clickable
                @click="showCarControlledKeyboard = true"
            ></hy-cell-item>
        </hy-cell>

        <!-- 组件变体 -->
        <view class="hy-title">组件变体</view>
        <view class="hy-subtitle">标题与额外按键</view>
        <hy-cell>
            <hy-cell-item
                title="带标题的键盘"
                clickable
                @click="showTitleKeyboard = true"
            ></hy-cell-item>
            <hy-cell-item
                title="slot自定义标题"
                clickable
                @click="showSlotTitleKeyboard = true"
            ></hy-cell-item>
            <hy-cell-item
                title="多个额外按键"
                clickable
                @click="showMultipleExtraKeyboard = true"
            ></hy-cell-item>
            <hy-cell-item
                title="随机数字键盘"
                clickable
                @click="showRandomKeyboard = true"
            ></hy-cell-item>
        </hy-cell>

        <!-- 自定义配置 -->
        <view class="hy-title">自定义配置</view>
        <view class="hy-subtitle">小数点与按键控制</view>
        <hy-cell>
            <hy-cell-item
                title="不显示小数点"
                clickable
                @click="showNoDotKeyboard = true"
            ></hy-cell-item>
            <hy-cell-item
                title="自定义额外按键"
                clickable
                @click="showCustomExtraKeyboard = true"
            ></hy-cell-item>
        </hy-cell>

        <!-- 默认键盘 -->
        <hy-keyboard
            v-model:show="showDefaultKeyboard"
            mode="default"
            v-model="defaultValue"
            close-text="完成"
            @input="handleInput"
            @delete="handleDelete"
            @close="handleClose('default')"
        ></hy-keyboard>

        <!-- 带右侧栏的键盘 -->
        <hy-keyboard
            v-model:show="showSidebarKeyboard"
            v-model="sidebarValue"
            mode="custom"
            close-text="完成"
            @input="handleInput"
            @delete="handleDelete"
            @close="handleClose('sidebar')"
        ></hy-keyboard>

        <!-- 身份证键盘 -->
        <hy-keyboard
            v-model:show="showIdcardKeyboard"
            mode="idcard"
            v-model="idcardValue"
            @input="handleInput"
            @delete="handleDelete"
            @close="handleClose('idcard')"
        ></hy-keyboard>

        <!-- 车牌号键盘(非受控) -->
        <hy-keyboard
            v-model:show="showCarUncontrolledKeyboard"
            mode="car"
            auto-switch-lang="true"
            v-model="carUncontrolledValue"
            @input="handleInput"
            @delete="handleDelete"
            @close="handleClose('carUncontrolled')"
        ></hy-keyboard>

        <!-- 车牌号键盘(受控) -->
        <hy-keyboard
            v-model:show="showCarControlledKeyboard"
            mode="car"
            v-model="carControlledValue"
            v-model:car-lang="carLang"
            @input="handleCarInput"
            @delete="handleCarDelete"
            @close="handleClose('carControlled')"
        ></hy-keyboard>

        <!-- 带标题的键盘 -->
        <hy-keyboard
            v-model:show="showTitleKeyboard"
            mode="default"
            v-model="titleValue"
            title="标题"
            close-text="完成"
            @input="handleInput"
            @delete="handleDelete"
            @close="handleClose('title')"
        ></hy-keyboard>

        <!-- slot自定义标题 -->
        <hy-keyboard
            v-model:show="showSlotTitleKeyboard"
            mode="default"
            v-model="slotTitleValue"
            close-text="完成"
            @input="handleInput"
            @delete="handleDelete"
            @close="handleClose('slotTitle')"
        >
            <template #title>
                <view class="custom-title">
                    <text class="custom-title-text">自定义标题</text>
                </view>
            </template>
        </hy-keyboard>

        <!-- 多个额外按键 -->
        <hy-keyboard
            v-model:show="showMultipleExtraKeyboard"
            mode="custom"
            v-model="multipleExtraValue"
            :extra-key="['00', '.']"
            close-text="完成"
            @input="handleInput"
            @delete="handleDelete"
            @close="handleClose('multipleExtra')"
        ></hy-keyboard>

        <!-- 随机数字键盘 -->
        <hy-keyboard
            v-model:show="showRandomKeyboard"
            mode="default"
            v-model="randomValue"
            :random-key-order="true"
            close-text="完成"
            @input="handleInput"
            @delete="handleDelete"
            @close="handleClose('random')"
        ></hy-keyboard>

        <!-- 不显示小数点 -->
        <hy-keyboard
            v-model:show="showNoDotKeyboard"
            mode="default"
            v-model="noDotValue"
            :show-dot-key="false"
            close-text="完成"
            @input="handleInput"
            @delete="handleDelete"
            @close="handleClose('noDot')"
        ></hy-keyboard>

        <!-- 自定义额外按键 -->
        <hy-keyboard
            v-model:show="showCustomExtraKeyboard"
            mode="default"
            v-model="customExtraValue"
            extra-key="+"
            close-text="完成"
            @input="handleInput"
            @delete="handleDelete"
            @close="handleClose('customExtra')"
        ></hy-keyboard>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShareButton } from '@/composables'
import type { CarKeyboardLang } from '@/package/components/hy-keyboard/typing'

definePage({
    style: {
        navigationBarTitleText: 'Keyboard 键盘'
    }
})

// 组件类型
const showDefaultKeyboard = ref(false)
const defaultValue = ref('')

const showSidebarKeyboard = ref(false)
const sidebarValue = ref('')

const showIdcardKeyboard = ref(false)
const idcardValue = ref('')

const showCarUncontrolledKeyboard = ref(false)
const carUncontrolledValue = ref('')

const showCarControlledKeyboard = ref(false)
const carControlledValue = ref('')
const carLang = ref<CarKeyboardLang>('zh')

// 组件变体
const showTitleKeyboard = ref(false)
const titleValue = ref('')

const showSlotTitleKeyboard = ref(false)
const slotTitleValue = ref('')

const showMultipleExtraKeyboard = ref(false)
const multipleExtraValue = ref('')

const showRandomKeyboard = ref(false)
const randomValue = ref('')

// 自定义配置
const showNoDotKeyboard = ref(false)
const noDotValue = ref('')

const showCustomExtraKeyboard = ref(false)
const customExtraValue = ref('')

const handleInput = (value: string) => {
    console.log('输入:', value)
}

const handleDelete = () => {
    console.log('删除')
}

const handleClose = (type: string) => {
    console.log('关闭:', type)
}

const handleCarInput = (value: string) => {
    if (value.length === 1) {
        carLang.value = 'en'
    }
    console.log('车牌号输入:', value)
}

const handleCarDelete = () => {
    console.log('车牌号删除:', carControlledValue.value)
    if (carControlledValue.value.length === 1) {
        carLang.value = 'zh'
    }
}

useShareButton()
</script>

<style scoped lang="scss">
.custom-title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    &-text {
        font-size: 32rpx;
        font-weight: 500;
        color: #333;
    }
}
</style>
