<template>
    <!-- 键盘按键组件 -->
    <view
        :class="[
            'hy-keyboard__key',
            {
                'hy-keyboard__key--wider': wider, // 加宽样式
                'hy-keyboard__key--large': large, // 大号样式（用于侧边栏）
                'hy-keyboard__key--car': isCar, // 车牌号键盘样式
                'hy-keyboard__key--delete': type === 'delete', // 删除键样式
                'hy-keyboard__key--extra': type === 'extra', // 额外按键样式
                'hy-keyboard__key--close': type === 'close' // 关闭键样式
            }
        ]"
        @click="handlePress"
    >
        <!-- 按键文本 -->
        <text class="hy-keyboard__key-text">{{ text }}</text>
        <!-- 删除键图标 -->
        <view v-if="type === 'delete'" class="hy-keyboard__delete-icon">
            <view class="hy-keyboard__delete-line hy-keyboard__delete-line--left">
                <hy-icon
                    v-if="type === 'delete'"
                    :name="IconConfig.CLEAR"
                    class="hy-keyboard__key-icon"
                    color="#fff"
                    size="28"
                />
            </view>
            <view class="hy-keyboard__delete-line hy-keyboard__delete-line--right"></view>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-keyboard-key',
    options: {
        virtualHost: true,
        addGlobalClass: true,
        styleIsolation: 'shared'
    }
}
</script>

<script lang="ts" setup>
import { IconConfig } from '@/package/libs'
import type { NumberKeyType } from './types'

const props = defineProps({
    /** 按键显示文本 */
    text: {
        type: [String, Number],
        default: ''
    },
    /** 按键类型: delete(删除), extra(额外), close(关闭), ''(普通) */
    type: {
        type: String as () => NumberKeyType,
        default: ''
    },
    /** 是否加宽（用于车牌号键盘的特殊按键） */
    wider: {
        type: Boolean,
        default: false
    },
    /** 是否大号（用于侧边栏按键） */
    large: {
        type: Boolean,
        default: false
    },
    /** 是否车牌号键盘的按键 */
    isCar: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['press'])

/**
 * 处理按键点击
 * 触发 press 事件，传递按键文本和类型
 */
const handlePress = () => {
    emit('press', props.text, props.type)
}
</script>

<style lang="scss">
@import './index.scss';
</style>
