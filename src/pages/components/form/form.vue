<template>
    <hy-config-provider :theme-color="color" :custom-style="{ padding: '10px' }" :theme="darkMode">
        <view class="demo-header">
            <text class="demo-title">表单组件示例</text>
        </view>

        <view class="demo-content">
            <hy-form ref="formRef" :model="formData" :rules="rules" label-position="top">
                <hy-form-item label="用户名（测试）" prop="username" required>
                    <hy-input
                        v-model="formData.username"
                        placeholder="请输入用户名"
                        border="bottom"
                    />
                </hy-form-item>

                <hy-form-item label="手机号（测试）" prop="phone" required>
                    <hy-input
                        v-model="formData.phone"
                        type="number"
                        placeholder="请输入手机号"
                        :maxlength="11"
                        border="bottom"
                    />
                </hy-form-item>

                <hy-form-item label="邮箱（测试）" prop="email">
                    <hy-input v-model="formData.email" placeholder="请输入邮箱" border="bottom" />
                </hy-form-item>

                <hy-form-item label="密码（测试）" prop="password" required>
                    <hy-input
                        v-model="formData.password"
                        type="safe-password"
                        placeholder="请输入密码"
                        border="bottom"
                    />
                </hy-form-item>

                <hy-form-item label="确认密码（测试）" prop="confirmPassword" required>
                    <hy-input
                        v-model="formData.confirmPassword"
                        type="safe-password"
                        placeholder="请再次输入密码"
                        border="bottom"
                    />
                </hy-form-item>

                <hy-form-item label="年龄（测试）" prop="age">
                    <hy-input
                        v-model="formData.age"
                        type="number"
                        placeholder="请输入年龄"
                        border="bottom"
                    />
                </hy-form-item>

                <hy-form-item label="性别（测试）" prop="gender">
                    <hy-radio v-model="formData.gender" :columns="genderOptions" />
                </hy-form-item>

                <hy-form-item label="爱好（测试）" prop="hobbies">
                    <hy-check-button
                        v-model="formData.hobbies"
                        :columns="hobbyOptions"
                        select-type="multiple"
                    />
                </hy-form-item>

                <hy-form-item label="开关" prop="switch">
                    <hy-switch v-model="formData.switch" />
                </hy-form-item>

                <hy-form-item label="备注" prop="remark">
                    <hy-textarea
                        v-model="formData.remark"
                        placeholder="请输入备注信息"
                        :height="80"
                    />
                </hy-form-item>
            </hy-form>
        </view>

        <view class="demo-actions">
            <hy-button type="primary" @click="handleSubmit">提交表单</hy-button>
            <hy-button type="info" plain @click="handleReset">重置表单</hy-button>
            <hy-button type="error" @click="handleValidate">验证表单</hy-button>
        </view>

        <view class="demo-result">
            <text class="result-title">表单数据：</text>
            <text class="result-content">{{ JSON.stringify(formData, null, 2) }}</text>
        </view>
    </hy-config-provider>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useThemeStore } from '@/store'
// 组件
import HyForm from '@/package/components/hy-form/hy-form.vue'
import HyFormItem from '@/package/components/hy-form-item/hy-form-item.vue'
import HyInput from '@/package/components/hy-input/hy-input.vue'
import HyRadio from '@/package/components/hy-radio/hy-radio.vue'
import HyCheckButton from '@/package/components/hy-check-button/hy-check-button.vue'
import HySwitch from '@/package/components/hy-switch/hy-switch.vue'
import HyTextarea from '@/package/components/hy-textarea/hy-textarea.vue'
import HyButton from '@/package/components/hy-button/hy-button.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import type { FormItemRule } from '@/package/components/hy-form/typing'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { color, darkMode } = storeToRefs(themeStore)

// 表单数据
const formData = reactive({
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    hobbies: [],
    switch: false,
    remark: ''
})

// 表单验证规则
const rules: FormItemRule = {
    username: [
        { required: true, message: '请输入用户名' },
        {
            min: 2,
            max: 4,
            message: '用户名长度在 2 到 4 个字符',
            trigger: ['change']
        }
    ],
    phone: [
        { required: true, message: '请输入手机号' },
        {
            type: 'phone',
            message: '请输入正确的手机号',
            trigger: ['change', 'blur']
        }
    ],
    email: [{ type: 'email', message: '请输入正确的邮箱格式', trigger: ['change'] }],
    password: [
        { required: true, message: '请输入密码' },
        { min: 6, message: '密码长度不能少于 6 个字符', trigger: ['change'] }
    ],
    confirmPassword: [
        { required: true, message: '请确认密码' },
        {
            validator: (value: string) => {
                if (value !== formData.password) {
                    return '两次输入的密码不一致'
                }
                return true
            },
            trigger: ['change']
        }
    ],
    age: [
        {
            validator: (value: string) => {
                if (value && (Number(value) < 1 || Number(value) > 120)) {
                    return '年龄必须在 1-120 之间'
                }
                return true
            },
            trigger: ['change']
        }
    ]
}

// 选项数据
const genderOptions = [
    { label: '男', value: 'male' },
    { label: '女', value: 'female' }
]

const hobbyOptions = [
    { label: '阅读', value: 'reading' },
    { label: '音乐', value: 'music' },
    { label: '运动', value: 'sports' },
    { label: '旅行', value: 'travel' }
]

// 表单引用
const formRef = ref()

// 提交表单
const handleSubmit = async (data: any) => {
    const isSuccess = await formRef.value?.submit()
    if (isSuccess) {
        await uni.showToast({
            title: '提交成功',
            icon: 'success'
        })
    }
}

// 验证表单
const handleValidate = async () => {
    const isValid = await formRef.value?.validate()
    await uni.showToast({ title: '表单校验成功', icon: 'none' })
}

// 重置表单
const handleReset = () => {
    formRef.value?.resetFields()
    uni.showToast({
        title: '重置成功',
        icon: 'success'
    })
}
</script>

<style lang="scss" scoped>
.demo-header {
    margin-bottom: 20px;

    .demo-title {
        font-size: 18px;
        font-weight: bold;
        color: $hy-text-color;
    }
}

.demo-content {
    background: $hy-background--container;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
}

.demo-actions {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

.demo-result {
    background: $hy-background--3;
    border-radius: 8px;
    padding: 15px;

    .result-title {
        font-size: 14px;
        font-weight: bold;
        color: $hy-text-color;
        margin-bottom: 10px;
        display: block;
    }

    .result-content {
        font-size: 12px;
        color: $hy-text-color;
        line-height: 1.5;
        word-break: break-all;
    }
}
</style>
