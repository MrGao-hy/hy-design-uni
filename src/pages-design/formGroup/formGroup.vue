<template>
    <the-root-page :custom-style="{ padding: '10px' }">
        <view class="hy-container">
            <hy-form-group
                ref="formGroupRef"
                :columns="columns"
                :form-data="formData"
                label-position="top"
            >
                <template #custom="{ record }">
                    <hy-input v-model="formData[record.field]"></hy-input>
                </template>
            </hy-form-group>
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
import { FormTypeEnum, IFormExpose, useToast } from '@/package'
import type { FormColumnsType } from '@/package'
import HyFormGroup from '@/package/components/hy-form-group/hy-form-group.vue'
import { reactive, ref, computed } from 'vue'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '表单组'
    }
})

const { t } = useTranslate('formGroup')
usePageTitle('formGroup')

const toast = useToast()
const formData: AnyObject = reactive({
    name: '',
    label: '',
    phone: '',
    interest: '',
    password: '',
    custom: t('customValue'),
    isShow: true,
    sex: '1',
    time: '',
    address: '',
    select: '',
    age: '',
    remark: ''
})
const formGroupRef = ref<InstanceType<typeof HyFormGroup> | IFormExpose | null>(null)

// 列配置（computed 包裹，切换语言后 label 与校验 message 同步更新）
const columns = computed<FormColumnsType[]>(() => [
    {
        field: 'name',
        label: t('labelName'),
        type: FormTypeEnum.TEXT,
        rules: {
            required: true,
            message: t('requiredField'),
            trigger: ['blur']
        }
    },
    {
        field: 'sex',
        label: t('labelSex'),
        type: FormTypeEnum.RADIO,
        actions: [
            { label: t('female'), value: '0' },
            { label: t('male'), value: '1' }
        ],
        rules: {
            required: true,
            message: t('requiredField')
        }
    },
    {
        field: 'phone',
        label: t('labelPhone'),
        type: FormTypeEnum.TEXT,
        rules: [
            {
                required: true,
                message: t('phoneRequired'),
                trigger: ['blur', 'change']
            },
            {
                type: 'phone',
                trigger: ['blur', 'change']
            }
        ]
    },
    {
        field: 'password',
        label: t('labelPassword'),
        type: FormTypeEnum.PASSWORD,
        rules: {
            type: 'password',
            trigger: ['blur', 'change']
        }
    },
    {
        field: 'isShow',
        label: t('labelIsShow'),
        type: FormTypeEnum.SWITCH
    },
    {
        field: 'time',
        label: t('labelTime'),
        type: FormTypeEnum.DATE,
        border: 'bottom',
        rules: {
            required: true,
            message: t('timeRequired'),
            trigger: ['blur', 'change']
        }
    },
    {
        field: 'address',
        label: t('labelAddress'),
        type: FormTypeEnum.ADDRESS,
        rules: {
            required: true,
            message: t('addressRequired'),
            trigger: ['blur', 'change']
        }
    },
    {
        field: 'select',
        label: t('labelSelect'),
        type: FormTypeEnum.SELECT,
        select: [
            [
                { text: t('primarySchool'), id: '1' },
                { text: t('juniorHigh'), id: '2' },
                { text: t('seniorHigh'), id: '3' },
                { text: t('university'), id: '4' }
            ]
        ],
        rules: {
            required: true,
            message: t('selectRequired'),
            trigger: ['blur', 'change']
        }
    },
    {
        field: 'age',
        label: t('labelAge'),
        type: FormTypeEnum.NUMBER,
        rules: [
            {
                required: true,
                message: t('ageRequired'),
                trigger: ['blur', 'change']
            },
            {
                required: true,
                message: t('minError'),
                min: 0,
                trigger: ['blur', 'change']
            },
            {
                message: t('maxError'),
                max: 3,
                trigger: ['change']
            }
        ]
    },
    {
        field: 'custom',
        label: t('labelCustom'),
        type: FormTypeEnum.CUSTOM
    },
    {
        field: 'remark',
        label: t('labelRemark'),
        type: FormTypeEnum.TEXTAREA
    }
])

// 提交表单
const handleSubmit = async (data: any) => {
    const isSuccess = await formGroupRef.value?.submit()
    if (isSuccess) {
        toast.success(t('submitSuccess'))
    }
}

// 验证表单
const handleValidate = async () => {
    try {
        await (formGroupRef.value && formGroupRef.value.validate())
        toast.success(t('validateSuccess'))
    } catch (err) {
        toast.error(t('validateFail'))
    }
}

// 重置表单
const handleReset = () => {
    try {
        formGroupRef.value && formGroupRef.value.resetFields()
        toast.show(t('resetSuccess'))
    } catch (err) {
        toast.error(t('resetFail'))
    }
}

useShareButton()
</script>

<style scoped lang="scss">
.demo-actions {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
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
