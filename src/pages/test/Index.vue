<script setup lang="ts">
import { computed, onUnmounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { FormTypeEnum, IconConfig, useToast } from 'hy-app'
import TheForm from '@/components/TheTest.vue'
import { useThemeStore } from '@/store'

const toast = useToast()
const themeStore = useThemeStore()
const { darkMode, color } = storeToRefs(themeStore)

const registerRef = ref()
// 表单数据
const formData = reactive({
    companyName: '',
    creditCode: '',
    producingArea: '',
    invoice: '',
    contactName: '',
    contactUnit: '',
    contactPhone: '',
    code: ''
})
const registerFormColumns = reactive([
    {
        field: 'companyName',
        type: FormTypeEnum.TEXT,
        input: {
            placeholder: '请输入企业名称',
            prefixIcon: { name: 'qiye', customPrefix: 'icon' },
            customStyle: { height: '80rpx' }
        }
    },
    {
        field: 'creditCode',
        type: FormTypeEnum.NUMBER,
        input: {
            placeholder: '请输入统一社会信用代码（18位）',
            prefixIcon: { name: 'xinyongdaima', customPrefix: 'icon' },
            customStyle: { height: '80rpx' }
        }
    },
    {
        field: 'producingArea',
        type: FormTypeEnum.SELECT,
        select: [
            [
                { label: '无基地', value: '无基地' },
                { label: '种植基地', value: '种植基地' },
                { label: 'GAP基地', value: 'GAP基地' },
                { label: '趁鲜加工', value: '趁鲜加工' },
                { label: '养殖基地', value: '养殖基地' }
            ]
        ],
        input: {
            placeholder: '请选择产地信息',
            prefixIcon: { name: 'chandiguanli_icox', customPrefix: 'icon' },
            customStyle: { height: '80rpx' }
        }
    },
    {
        field: 'invoice',
        label: '发票信息：',
        type: FormTypeEnum.RADIO,
        actions: [
            {
                label: '普通发票',
                value: 'apply'
            },
            {
                label: '增值税发票',
                value: 'banana'
            }
        ]
    },
    {
        field: 'contactName',
        type: FormTypeEnum.TEXT,
        input: {
            placeholder: '请输入联系人姓名',
            prefixIcon: { name: IconConfig.MINE },
            customStyle: { height: '80rpx' }
        }
    },
    {
        field: 'contactUnit',
        type: FormTypeEnum.TEXT,
        input: {
            placeholder: '请输入联系人职务',
            prefixIcon: { name: 'zhiwu', customPrefix: 'icon' },
            customStyle: { height: '80rpx' }
        }
    },
    {
        field: 'contactPhone',
        type: FormTypeEnum.NUMBER,
        input: {
            placeholder: '请输入联系人手机号',
            prefixIcon: { name: IconConfig.TELEPHONE },
            customStyle: { height: '80rpx' }
        },
        valid: true
    },
    {
        field: 'custom',
        type: FormTypeEnum.CUSTOM
    }
])
const registerFormRules = reactive({
    companyName: [
        {
            required: true,
            message: '请输入企业名称',
            trigger: ['blur', 'change']
        }
    ],
    creditCode: [
        {
            required: true,
            message: '请输入信用代码',
            trigger: ['blur', 'change']
        }
    ],
    producingArea: {
        required: true,
        message: '请选择产地信息'
    },
    invoice: {
        required: true,
        message: '请选择发票类型'
    },
    contactName: [
        {
            required: true,
            message: '请输入联系人姓名',
            trigger: ['blur', 'change']
        }
    ],
    contactUnit: [
        {
            required: true,
            message: '请输入联系人的职务',
            trigger: ['blur', 'change']
        }
    ],
    contactPhone: [
        {
            required: true,
            message: '请输入联系人的手机号',
            trigger: ['blur', 'change']
        },
        {
            type: 'phone',
            message: '请输入正确的手机号',
            trigger: ['blur', 'change']
        }
    ]
})
const columns = reactive([{ value: 1, label: '' }])
// 倒计时状态
const countdown = ref<string | number>(0)
const timer = ref<number | null>(null)
const consent = ref(false)
// 获取验证码文字描述
const codeText = computed(() => {
    if (typeof countdown.value === 'string') {
        return countdown.value
    } else {
        return countdown.value > 0 ? `${countdown.value}秒后重试` : '获取验证码'
    }
})

// 打开预览隐私协议
const openPact = () => {
    // wx.openPrivacyContract();
}

// 获取验证码
const getVerificationCode = () => {
    const valid = registerRef.value.itemRef[0]?.validate('blur')
    // 校验成功发送验证码
    if (valid) {
        // 设置倒计时
        countdown.value = 5

        // 模拟发送验证码请求
        toast.success('验证码发送成功')

        // 倒计时逻辑
        timer.value = setInterval(() => {
            ;(countdown.value as number)--
            if (countdown.value <= 0) {
                if (timer.value) {
                    clearInterval(timer.value)
                    timer.value = null
                    countdown.value = '请重新发送'
                }
            }
        }, 1000)
    } else {
        toast.warning('请先输入手机号')
    }
}

// 企业注册提交
const submitRegister = () => {
    console.log(formData)
    registerRef.value.validate().then((valid: boolean) => {
        if (valid) {
            // 注册成功提示
            toast.success('注册成功')
        }

        // 延迟返回登录页面
        setTimeout(() => {
            uni.navigateBack()
        }, 1500)
    })
}

// 页面卸载时清除定时器
onUnmounted(() => {
    if (timer.value) {
        clearInterval(timer.value)
    }
})
</script>

<template>
    <hy-config-provider :theme="darkMode" :themeColor="color">
        <hy-toast></hy-toast>
        <view class="register-container">
            <!-- 标题 -->
            <view class="title">
                <text class="title-text">企业注册</text>
            </view>

            <!-- 表单区域 -->
            <the-form
                ref="registerRef"
                :columns="registerFormColumns"
                :form-data="formData"
                :rules="registerFormRules"
            >
                <template #custom>
                    <hy-input
                        v-model="formData.code"
                        type="number"
                        placeholder="请输入验证码"
                        :maxlength="6"
                        :custom-style="{ height: '80rpx', flex: 1 }"
                    >
                        <template #suffix>
                            <hy-button
                                class="code-button"
                                type="success"
                                :disabled="countdown > 0"
                                @click="getVerificationCode"
                            >
                                {{ codeText }}
                            </hy-button>
                        </template>
                    </hy-input>
                </template>
            </the-form>

            <!-- 隐私协议 -->
            <hy-checkbox
                v-model="consent"
                :columns="columns"
                :custom-style="{ margin: '50rpx 0 30rpx' }"
            >
                <template #label>
                    <text class="pact-text">我已阅读并同意</text>
                    <text class="pact" @tap="openPact">《隐私协议》</text>
                </template>
            </hy-checkbox>
            <!-- 注册按钮 -->
            <hy-button
                text="企业注册"
                shape="circle"
                @click="submitRegister"
                :disabled="!consent"
            ></hy-button>
        </view>
    </hy-config-provider>
</template>

<style lang="scss" scoped>
.register-container {
    padding: 40px 30px;
    .title {
        margin-bottom: 60rpx;
        text-align: center;

        .title-text {
            display: block;
            font-size: 56rpx;
            font-weight: 600;
            color: var(--hy-text-color, #333);
            margin-bottom: 16rpx;
        }

        .subtitle-text {
            display: block;
            font-size: 28rpx;
            color: var(--hy-text-color--2, #666);
        }
    }

    .pact-text {
        font-size: 26rpx;
        color: var(--hy-text-color--2, #666);
    }

    .pact {
        color: var(--hy-primary, #07c160);
        font-size: 26rpx;
    }
}
</style>
