<template>
    <the-root-page :custom-style="{ padding: '10px' }">
        <view class="demo-header">
            <text class="demo-title">{{ t('demoTitle') }}</text>
        </view>

        <view class="demo-content">
            <hy-form ref="formRef" :model="formData" :rules="rules" label-position="top">
                <hy-form-item :label="t('labelUsername')" prop="username" required>
                    <hy-input
                        v-model="formData.username"
                        :placeholder="t('phUsername')"
                        border="bottom"
                    />
                </hy-form-item>

                <hy-form-item :label="t('labelPhone')" prop="phone" required>
                    <hy-input
                        v-model="formData.phone"
                        type="number"
                        :placeholder="t('phPhone')"
                        :maxlength="11"
                        border="bottom"
                    />
                </hy-form-item>

                <hy-form-item :label="t('labelEmail')" prop="email">
                    <hy-input
                        v-model="formData.email"
                        :placeholder="t('phEmail')"
                        border="bottom"
                    />
                </hy-form-item>

                <hy-form-item :label="t('labelPassword')" prop="password" required>
                    <hy-input
                        v-model="formData.password"
                        type="safe-password"
                        :placeholder="t('phPassword')"
                        border="bottom"
                    />
                </hy-form-item>

                <hy-form-item :label="t('labelConfirmPassword')" prop="confirmPassword" required>
                    <hy-input
                        v-model="formData.confirmPassword"
                        type="safe-password"
                        :placeholder="t('phConfirmPassword')"
                        border="bottom"
                    />
                </hy-form-item>

                <hy-form-item :label="t('labelAge')" prop="age">
                    <hy-input
                        v-model="formData.age"
                        type="number"
                        :placeholder="t('phAge')"
                        border="bottom"
                    />
                </hy-form-item>

                <hy-form-item :label="t('labelGender')" prop="gender">
                    <hy-radio v-model="formData.gender" :columns="genderOptions" />
                </hy-form-item>

                <hy-form-item :label="t('labelHobbies')" prop="hobbies">
                    <hy-check-button v-model="formData.hobbies" :columns="hobbyOptions" />
                </hy-form-item>

                <hy-form-item :label="t('labelSwitch')" prop="switch">
                    <hy-switch v-model="formData.switch" />
                </hy-form-item>

                <hy-form-item :label="t('labelRemark')" prop="remark">
                    <hy-textarea
                        v-model="formData.remark"
                        :placeholder="t('phRemark')"
                        :height="80"
                    />
                </hy-form-item>
            </hy-form>
        </view>

        <view class="demo-actions">
            <hy-button type="primary" @click="handleSubmit">{{ t('submitBtn') }}</hy-button>
            <hy-button type="info" plain @click="handleReset">{{ t('resetBtn') }}</hy-button>
            <hy-button type="error" @click="handleValidate">{{ t('validateBtn') }}</hy-button>
        </view>

        <view class="demo-result">
            <text class="result-title">{{ t('resultTitle') }}</text>
            <text class="result-content">{{ JSON.stringify(formData, null, 2) }}</text>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import type { FieldRuleMap } from '@/package/components/hy-form/typing'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'
import { useToast } from '@/package'

definePage({
    style: {
        navigationBarTitleText: '表单'
    }
})

const { t } = useTranslate('form')
usePageTitle('form')

const toast = useToast()
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

// 表单验证规则（computed 包裹，切换语言后 message 同步更新）
const rules = computed<FieldRuleMap>(() => ({
    username: [
        { required: true, message: t('usernameRequired') },
        {
            min: 2,
            max: 4,
            message: t('usernameLength'),
            trigger: ['change']
        }
    ],
    phone: [
        { required: true, message: t('phoneRequired') },
        {
            type: 'phone',
            message: t('phoneInvalid'),
            trigger: ['change', 'blur']
        }
    ],
    email: [{ type: 'email', message: t('emailInvalid'), trigger: ['change'] }],
    password: [
        { required: true, message: t('passwordRequired') },
        { min: 6, message: t('passwordMin'), trigger: ['change'] }
    ],
    confirmPassword: [
        { required: true, message: t('confirmPasswordRequired') },
        {
            validator: (value: string) => {
                if (value !== formData.password) {
                    return t('passwordMismatch')
                }
                return true
            },
            trigger: ['change']
        }
    ],
    gender: { required: true, message: t('genderRequired') }
}))

// 选项数据
const genderOptions = computed(() => [
    { label: t('genderMale'), value: 'male' },
    { label: t('genderFemale'), value: 'female' }
])

const hobbyOptions = computed(() => [
    { label: t('hobbyReading'), value: 'reading' },
    { label: t('hobbyMusic'), value: 'music' },
    { label: t('hobbySports'), value: 'sports' },
    { label: t('hobbyTravel'), value: 'travel' }
])

// 表单引用
const formRef = ref()

// 提交表单
const handleSubmit = async (data: any) => {
    const isSuccess = await formRef.value?.submit()
    if (isSuccess) {
        await uni.showToast({
            title: t('submitSuccess'),
            icon: 'success'
        })
    }
}

// 验证表单
const handleValidate = async () => {
    try {
        await formRef.value?.validate()
        toast.success(t('validateSuccess'))
    } catch (err) {
        toast.error(t('validateFail'))
    }
}

// 重置表单
const handleReset = () => {
    formRef.value?.resetFields()
    toast.show(t('resetSuccess'))
}

useShareButton()
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
