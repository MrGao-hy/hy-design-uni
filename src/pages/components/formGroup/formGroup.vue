<template>
    <hy-config-provider :theme-color="color" :custom-style="{ padding: '10px' }" :theme="darkMode">
        <view class="hy-container">
            <hy-form-group
                ref="formGroupRef"
                :columns="columns"
                :form-data="formData"
                label-position="top"
            >
                <template #custom="{ record, errorStyle }">
                    <HyInput v-model="formData[record.field]" :custom-style="errorStyle"></HyInput>
                </template>
            </hy-form-group>
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
import { FormTypeEnum } from '@/package'
import type { FormColumnsType } from '@/package'
import HyFormGroup from '@/package/components/hy-form-group/hy-form-group.vue'
import HyInput from '@/package/components/hy-input/hy-input.vue'
import HyButton from '@/package/components/hy-button/hy-button.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { reactive, ref } from 'vue'
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)

const formData: AnyObject = reactive({
    name: '',
    label: '',
    phone: '',
    interest: '',
    password: '',
    custom: '自定义值',
    isShow: true,
    sex: '1',
    time: '',
    address: '',
    select: '',
    age: '',
    remark: ''
})
const formGroupRef = ref<InstanceType<typeof HyFormGroup> | null>(null)

const columns: Partial<FormColumnsType>[] = reactive([
    {
        field: 'name',
        label: '名字（测试）',
        type: FormTypeEnum.TEXT,
        input: {
            onChange: (value: number) => {
                uni.showToast({ title: value, icon: 'none' })
            }
        },
        rules: {
            required: true,
            message: '没有填内容',
            trigger: ['blur']
        }
    },
    {
        field: 'sex',
        label: '性别（测试）',
        type: FormTypeEnum.RADIO,
        actions: [
            { label: '女', value: '0' },
            { label: '男', value: '1' }
        ],
        rules: {
            required: true,
            message: '没有填内容',
            trigger: ['blur', 'change']
        }
    },
    {
        field: 'label',
        label: '标签',
        type: 'checkButton',
        actions: [
            { label: 'i人', value: 0 },
            { label: 'e人', value: 1 },
            { label: '天才', value: 2 },
            { label: '疯子', value: 3 }
        ],
        checkButton: {
            selectType: 'checkbox',
            type: 'error'
        },
        rules: {
            required: true,
            message: '选择你的标签',
            trigger: ['blur', 'change']
        }
    },
    {
        field: 'interest',
        label: '爱好',
        type: 'checkButton',
        actions: [
            { label: '苹果', value: '0' },
            { label: '西瓜', value: '1' },
            { label: '香蕉', value: '2' }
        ],
        checkButton: {
            selectType: 'radio'
        },
        rules: {
            required: true,
            message: '选择你最喜欢的水果',
            trigger: ['blur', 'change']
        }
    },
    {
        field: 'phone',
        label: '手机号（测试）',
        type: FormTypeEnum.TEXT,
        rules: [
            {
                required: true,
                message: '请输入您的手机号',
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
        label: '密码（测试）',
        type: FormTypeEnum.PASSWORD,
        rules: {
            type: 'password',
            trigger: ['blur', 'change']
        }
    },
    {
        field: 'isShow',
        label: '是否禁用',
        type: FormTypeEnum.SWITCH
    },
    {
        field: 'time',
        label: '日期',
        type: FormTypeEnum.DATE,
        border: 'bottom',
        rules: {
            required: true,
            message: '请输入您的日期',
            trigger: ['blur', 'change']
        }
    },
    {
        field: 'address',
        label: '地址（测试）',
        type: FormTypeEnum.ADDRESS,
        rules: {
            required: true,
            message: '请输入您的地址',
            trigger: ['blur', 'change']
        }
    },
    {
        field: 'select',
        label: '学历（测试）',
        type: FormTypeEnum.SELECT,
        select: [
            [
                { text: '小学', id: '1' },
                { text: '初中', id: '2' },
                { text: '高中', id: '3' },
                { text: '大学', id: '4' }
            ]
        ],
        rules: {
            required: true,
            message: '请输入您的学历',
            trigger: ['blur', 'change']
        }
    },
    {
        field: 'age',
        label: '年龄（测试）',
        type: FormTypeEnum.NUMBER,
        rules: [
            {
                required: true,
                message: '请输入您的年龄',
                trigger: ['blur', 'change']
            },
            {
                required: true,
                message: '不能小于最小值',
                min: 0,
                trigger: ['blur', 'change']
            },
            {
                message: '不能大于最大值',
                max: 3,
                trigger: ['change']
            }
        ]
    },
    {
        field: 'custom',
        label: '自定义',
        type: FormTypeEnum.CUSTOM
    },
    {
        field: 'remark',
        label: '备注',
        type: FormTypeEnum.TEXTAREA
    }
])

// 提交表单
const handleSubmit = async (data: any) => {
    const isSuccess = await formGroupRef.value?.submit()
    if (isSuccess) {
        await uni.showToast({
            title: '提交成功',
            icon: 'success'
        })
    }
}

// 验证表单
const handleValidate = async () => {
    const isValid = await formGroupRef.value.validate()
    await uni.showToast({ title: `表单校验成功${isValid}`, icon: 'none' })
}

// 重置表单
const handleReset = async () => {
    await formGroupRef.value?.resetFields()
    await uni.showToast({
        title: '重置成功',
        icon: 'none'
    })
}
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
