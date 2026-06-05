<template>
    <the-root-page>
        <!-- 基础使用 -->
        <view class="hy-title">基础使用</view>
        <view class="hy-container">
            <hy-textarea
                v-model="basicValue"
                placeholder="请输入内容"
            ></hy-textarea>
        </view>

        <!-- 边框类型 -->
        <view class="hy-title">边框类型</view>
        <view class="hy-container">
            <hy-textarea
                v-model="surroundValue"
                border="surround"
                placeholder="四周边框（默认）"
            ></hy-textarea>
        </view>
        <view class="hy-container">
            <hy-textarea
                v-model="bottomValue"
                border="bottom"
                placeholder="底部边框"
            ></hy-textarea>
        </view>
        <view class="hy-container">
            <hy-textarea
                v-model="noneValue"
                border="none"
                placeholder="无边框"
            ></hy-textarea>
        </view>

        <!-- 字数统计 -->
        <view class="hy-title">字数统计</view>
        <view class="hy-container">
            <hy-textarea
                v-model="countValue"
                placeholder="请输入内容，会显示字数统计"
                :maxlength="200"
                count
            ></hy-textarea>
        </view>

        <!-- 自动增高 -->
        <view class="hy-title">自动增高</view>
        <view class="hy-container">
            <hy-textarea
                v-model="autoHeightValue"
                placeholder="输入内容会自动增高高度"
                :maxlength="500"
                autoHeight
                count
            ></hy-textarea>
        </view>

        <!-- 禁用状态 -->
        <view class="hy-title">禁用状态</view>
        <view class="hy-container">
            <hy-textarea
                v-model="disabledValue"
                disabled
                placeholder="禁用状态"
            ></hy-textarea>
        </view>

        <!-- 自动聚焦 -->
        <view class="hy-title">自动聚焦</view>
        <view class="hy-container">
            <hy-textarea
                v-model="focusValue"
                :focus="isFocus"
                placeholder="点击按钮会获取焦点"
                @focus="onFocus"
                @blur="onBlur"
            ></hy-textarea>
        </view>
        <view class="hy-container">
            <hy-button text="点击获取焦点" size="small" @click="handleFocus"></hy-button>
        </view>

        <!-- 自定义高度 -->
        <view class="hy-title">自定义高度</view>
        <view class="hy-container">
            <hy-textarea
                v-model="customHeightValue"
                placeholder="固定高度120px"
                :height="120"
                count
            ></hy-textarea>
        </view>

        <!-- 格式化处理 - 数字 -->
        <view class="hy-title">格式化处理 - 只能输入数字</view>
        <view class="hy-container">
            <hy-textarea
                v-model="numberValue"
                :formatter="formatterNumber"
                placeholder="只能输入数字"
                count
            ></hy-textarea>
        </view>

        <!-- 格式化处理 - 字母 -->
        <view class="hy-title">格式化处理 - 只能输入字母</view>
        <view class="hy-container">
            <hy-textarea
                v-model="letterValue"
                :formatter="formatterLetter"
                placeholder="只能输入英文字母"
                count
            ></hy-textarea>
        </view>


        <!-- 聊天输入框场景 -->
        <view class="hy-title">聊天输入框场景</view>
        <view class="hy-container chat-container">
            <view class="chat-messages">
                <view 
                    v-for="(msg, index) in chatMessages" 
                    :key="index"
                    :class="['chat-message', msg.isMine ? 'chat-message--mine' : 'chat-message--other']"
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
                    placeholder="输入消息..."
                    @confirm="sendMessage"
                ></hy-textarea>
                <view class="chat-send">
                    <text class="chat-count">{{ chatInput.length }}/500</text>
                    <hy-button type="primary" size="small" @click="sendMessage">发送</hy-button>
                </view>
            </view>
        </view>

        <!-- 配合表单使用 -->
        <view class="hy-title">配合表单使用</view>
        <view class="hy-container">
            <hy-cell>
                <hy-cell-item
                    title="备注"
                    name="remark"
                    :border="false"
                >
                    <template #value>
                        <hy-textarea
                            v-model="formData.remark"
                            border="none"
                            placeholder="请输入备注信息"
                            :maxlength="200"
                            count
                        ></hy-textarea>
                    </template>
                </hy-cell-item>
            </hy-cell>
        </view>

        <!-- 事件监听 -->
        <view class="hy-title">事件监听</view>
        <view class="hy-container">
            <hy-textarea
                v-model="eventValue"
                placeholder="输入内容查看事件触发"
                count
                @focus="handleFocusEvent"
                @blur="handleBlurEvent"
                @change="handleChangeEvent"
                @lineChange="handleLineChange"
            ></hy-textarea>
        </view>
        <view class="hy-container event-log">
            <view class="event-title">事件日志：</view>
            <view 
                v-for="(log, index) in eventLogs" 
                :key="index"
                class="event-item"
            >
                {{ log }}
            </view>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '文本域'
    }
})

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
const disabledValue = ref('这是禁用的文本域')
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

// 聊天输入框场景
const chatInput = ref('')
const chatMessages = ref<Array<{ text: string; isMine: boolean }>>([
    { text: '你好，有什么可以帮助你的吗？', isMine: false },
    { text: '我想咨询一下组件的使用方法', isMine: true },
    { text: '当然可以，请问你具体想了解哪个组件？', isMine: false }
])

const sendMessage = () => {
    if (!chatInput.value.trim()) return
    chatMessages.value.push({
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
    eventLogs.value.unshift(`[${new Date().toLocaleTimeString()}] 获取焦点`)
    if (eventLogs.value.length > 5) eventLogs.value.pop()
}

const handleBlurEvent = () => {
    eventLogs.value.unshift(`[${new Date().toLocaleTimeString()}] 失去焦点`)
    if (eventLogs.value.length > 5) eventLogs.value.pop()
}

const handleChangeEvent = (value: string) => {
    eventLogs.value.unshift(`[${new Date().toLocaleTimeString()}] 内容变化: ${value.slice(-10)}`)
    if (eventLogs.value.length > 5) eventLogs.value.pop()
}

const handleLineChange = (e: any) => {
    eventLogs.value.unshift(`[${new Date().toLocaleTimeString()}] 行数变化: ${e.detail.lineCount} 行`)
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
