<template>
    <the-root-page>
        <!-- 基础使用 -->
        <view class="hy-title">{{ t('basicUsage') }}</view>
        <view class="hy-container">
            <hy-textarea v-model="basicValue" :placeholder="t('inputPlaceholder')"></hy-textarea>
        </view>

        <!-- 边框类型 -->
        <view class="hy-title">{{ t('borderType') }}</view>
        <view class="hy-container">
            <hy-textarea
                v-model="surroundValue"
                border="surround"
                :placeholder="t('borderSurround')"
            ></hy-textarea>
        </view>
        <view class="hy-container">
            <hy-textarea
                v-model="bottomValue"
                border="bottom"
                :placeholder="t('borderBottom')"
            ></hy-textarea>
        </view>
        <view class="hy-container">
            <hy-textarea
                v-model="noneValue"
                border="none"
                :placeholder="t('borderNone')"
            ></hy-textarea>
        </view>

        <!-- 字数统计 -->
        <view class="hy-title">{{ t('count') }}</view>
        <view class="hy-container">
            <hy-textarea
                v-model="countValue"
                :placeholder="t('countPlaceholder')"
                :maxlength="200"
                count
            ></hy-textarea>
        </view>

        <!-- 自动增高 -->
        <view class="hy-title">{{ t('autoHeight') }}</view>
        <view class="hy-container">
            <hy-textarea
                v-model="autoHeightValue"
                :placeholder="t('autoHeightPlaceholder')"
                :maxlength="500"
                autoHeight
                count
            ></hy-textarea>
        </view>

        <!-- 禁用状态 -->
        <view class="hy-title">{{ t('disabledState') }}</view>
        <view class="hy-container">
            <hy-textarea
                v-model="disabledValue"
                disabled
                :placeholder="t('disabledState')"
            ></hy-textarea>
        </view>

        <!-- 自动聚焦 -->
        <view class="hy-title">{{ t('autoFocus') }}</view>
        <view class="hy-container">
            <hy-textarea
                v-model="focusValue"
                :focus="isFocus"
                :placeholder="t('focusPlaceholder')"
                @focus="onFocus"
                @blur="onBlur"
            ></hy-textarea>
        </view>
        <view class="hy-container">
            <hy-button :text="t('focusBtn')" size="small" @click="handleFocus"></hy-button>
        </view>

        <!-- 自定义高度 -->
        <view class="hy-title">{{ t('customHeight') }}</view>
        <view class="hy-container">
            <hy-textarea
                v-model="customHeightValue"
                :placeholder="t('fixedHeightPlaceholder')"
                :height="120"
                count
            ></hy-textarea>
        </view>

        <!-- 格式化处理 - 数字 -->
        <view class="hy-title">{{ t('formatNumber') }}</view>
        <view class="hy-container">
            <hy-textarea
                v-model="numberValue"
                :formatter="formatterNumber"
                :placeholder="t('onlyNumber')"
                count
            ></hy-textarea>
        </view>

        <!-- 格式化处理 - 字母 -->
        <view class="hy-title">{{ t('formatLetter') }}</view>
        <view class="hy-container">
            <hy-textarea
                v-model="letterValue"
                :formatter="formatterLetter"
                :placeholder="t('onlyLetter')"
                count
            ></hy-textarea>
        </view>

        <!-- 聊天输入框场景 -->
        <view class="hy-title">{{ t('chatScene') }}</view>
        <view class="hy-container chat-container">
            <view class="chat-messages">
                <view
                    v-for="(msg, index) in chatMessages"
                    :key="index"
                    :class="[
                        'chat-message',
                        msg.isMine ? 'chat-message--mine' : 'chat-message--other'
                    ]"
                >
                    <view class="chat-bubble">{{ msg.text }}</view>
                </view>
            </view>
            <view class="chat-input-box">
                <hy-textarea
                    v-model="chatInput"
                    autoHeight
                    :maxlength="500"
                    confirmType="send"
                    :placeholder="t('inputMessage')"
                    @confirm="sendMessage"
                ></hy-textarea>
                <view class="chat-send">
                    <text class="chat-count">{{ chatInput.length }}/500</text>
                    <hy-button type="primary" size="small" @click="sendMessage">{{
                        t('send')
                    }}</hy-button>
                </view>
            </view>
        </view>

        <!-- 配合表单使用 -->
        <view class="hy-title">{{ t('withForm') }}</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item :title="t('remark')" name="remark" :border="false">
                    <template #value>
                        <hy-textarea
                            v-model="formData.remark"
                            border="none"
                            :placeholder="t('remarkPlaceholder')"
                            :maxlength="200"
                            count
                        ></hy-textarea>
                    </template>
                </hy-cell-item>
            </hy-cell>
        </view>

        <!-- 事件监听 -->
        <view class="hy-title">{{ t('eventListen') }}</view>
        <view class="hy-container">
            <hy-textarea
                v-model="eventValue"
                :placeholder="t('eventPlaceholder')"
                count
                @focus="handleFocusEvent"
                @blur="handleBlurEvent"
                @change="handleChangeEvent"
                @lineChange="handleLineChange"
            ></hy-textarea>
        </view>
        <view class="hy-container event-log">
            <view class="event-title">{{ t('eventLog') }}</view>
            <view v-for="(log, index) in eventLogs" :key="index" class="event-item">
                {{ log }}
            </view>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '文本域'
    }
})

const { t } = useTranslate('textarea')
usePageTitle('textarea')

// 基础使用
const basicValue = ref('')

// 边框类型
const surroundValue = ref('')
const bottomValue = ref('')
const noneValue = ref('')

// 字数统计
const countValue = ref('')

// 自动增高
const autoHeightValue = ref('')

// 禁用状态
const disabledValue = ref(t('disabledText'))
// 自动聚焦
const focusValue = ref('')
const isFocus = ref(false)
const handleFocus = () => {
    isFocus.value = true
    setTimeout(() => {
        isFocus.value = false
    }, 100)
}
const onFocus = () => {
    console.log('获取焦点')
}
const onBlur = () => {
    console.log('失去焦点')
}

// 自定义高度
const customHeightValue = ref('')

// 格式化处理
const numberValue = ref('')
const letterValue = ref('')
const phoneValue = ref('')

// 格式化函数：只能输入数字
const formatterNumber = (val: string) => {
    return val.replace(/[^0-9]/g, '')
}

// 格式化函数：只能输入字母
const formatterLetter = (val: string) => {
    return val.replace(/[^a-zA-Z]/g, '')
}

// 聊天输入框场景：初始消息 computed 响应语言切换，用户发送的消息存于 ref
const initialMessages = computed(() => [
    { text: t('chatHello'), isMine: false },
    { text: t('chatAsk'), isMine: true },
    { text: t('chatAnswer'), isMine: false }
])
const sentMessages = ref<Array<{ text: string; isMine: boolean }>>([])
const chatMessages = computed(() => [...initialMessages.value, ...sentMessages.value])
const chatInput = ref('')

const sendMessage = () => {
    if (!chatInput.value.trim()) return
    sentMessages.value.push({
        text: chatInput.value,
        isMine: true
    })
    chatInput.value = ''
}

// 配合表单使用
const formData = ref({
    remark: ''
})

// 事件监听
const eventValue = ref('')
const eventLogs = ref<string[]>([])

const handleFocusEvent = () => {
    eventLogs.value.unshift(`[${new Date().toLocaleTimeString()}] ${t('logFocus')}`)
    if (eventLogs.value.length > 5) eventLogs.value.pop()
}

const handleBlurEvent = () => {
    eventLogs.value.unshift(`[${new Date().toLocaleTimeString()}] ${t('logBlur')}`)
    if (eventLogs.value.length > 5) eventLogs.value.pop()
}

const handleChangeEvent = (value: string) => {
    eventLogs.value.unshift(
        `[${new Date().toLocaleTimeString()}] ${t('logChange', value.slice(-10))}`
    )
    if (eventLogs.value.length > 5) eventLogs.value.pop()
}

const handleLineChange = (e: any) => {
    eventLogs.value.unshift(
        `[${new Date().toLocaleTimeString()}] ${t('logLine', e.detail.lineCount)}`
    )
    if (eventLogs.value.length > 5) eventLogs.value.pop()
}

const count = ref(false)

useShareButton()
</script>

<style scoped lang="scss">
// 聊天输入框样式
.chat-container {
    flex-direction: column;
    height: 400px;
    background-color: $hy-background--empty;
    overflow: auto;

    .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 10px;
        border-radius: 8px 8px 0 0;
    }

    .chat-message {
        display: flex;
        margin-bottom: 10px;

        &--mine {
            justify-content: flex-end;

            .chat-bubble {
                background-color: #3c9cff;
                color: #fff;
            }
        }

        &--other {
            justify-content: flex-start;

            .chat-bubble {
                background-color: #fff;
                color: #333;
            }
        }
    }

    .chat-bubble {
        max-width: 70%;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 14px;
        line-height: 1.4;
        word-break: break-all;
    }

    .chat-input-box {
        border-top: $hy-border-line;
        padding: 10px;
    }

    .chat-send {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 8px;
        gap: 10px;
    }

    .chat-count {
        font-size: 12px;
        color: #999;
    }
}

// 事件日志样式
.event-log {
    flex-direction: column;
    align-items: flex-start;
    min-height: 100px;
    max-height: 150px;
    overflow-y: auto;
    background-color: $hy-background--empty;

    .event-title {
        font-size: 14px;
        margin-bottom: 8px;
    }

    .event-item {
        font-size: 12px;
        padding: 4px 0;
        border-bottom: $hy-border-line;
        width: 100%;
    }
}
</style>
