<template>
  <hy-config-provider :custom-style="[themeColor, { padding: '10px' }]" :theme="darkMode">
    <HyForm
      ref="formRef"
      :columns="columns"
      :form-data="formData"
      :input="{
        border: 'none',
      }"
      border-bottom
      label-position="top"
    >
      <template #custom="{ record, errorStyle }">
        <HyInput v-model="formData[record.field]" :custom-style="errorStyle"></HyInput>
      </template>
    </HyForm>
    <HyButton @click="handleSubmit">提交</HyButton>
  </hy-config-provider>
</template>

<script setup lang="ts">
import { FormTypeEnum } from 'hy-app'
import type { FormColumnsType } from 'hy-app'
import HyForm from '@/package/components/hy-form-group/hy-form-group.vue'
import HyInput from '@/package/components/hy-input/hy-input.vue'
import HyButton from '@/package/components/hy-button/hy-button.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { reactive, ref } from 'vue'
import { useThemeStore } from '@/store'
const themeStore = useThemeStore()

const { themeColor, darkMode } = themeStore

const formData: AnyObject = reactive({
  custom: '自定义值',
  isShow: true,
  sex: '1',
})
const formRef = ref<InstanceType<typeof HyForm>>(null)

const columns: FormColumnsType[] = reactive([
  {
    field: 'name',
    label: '名字（测试）',
    type: FormTypeEnum.TEXT,
    rules: {
      required: true,
      message: '没有填内容',
      trigger: ['blur'],
    },
  },
  {
    field: 'sex',
    label: '性别（测试）',
    type: FormTypeEnum.RADIO,
    actions: [
      { label: '女', value: '0' },
      { label: '男', value: '1' },
    ],
    rules: {
      required: true,
      message: '没有填内容',
      trigger: ['blur', 'change'],
    },
  },
  {
    field: 'label',
    label: '标签',
    type: 'checkButton',
    actions: [
      { label: 'i人', value: 0 },
      { label: 'e人', value: 1 },
      { label: '天才', value: 2 },
      { label: '疯子', value: 3 },
    ],
    checkButton: {
      selectType: 'checkbox',
      type: 'error',
    },
    rules: {
      required: true,
      message: '选择你的标签',
      trigger: ['blur', 'change'],
    },
  },
  {
    field: 'interest',
    label: '爱好',
    type: 'checkButton',
    actions: [
      { label: '苹果', value: '0' },
      { label: '西瓜', value: '1' },
      { label: '香蕉', value: '2' },
    ],
    checkButton: {
      selectType: 'radio',
    },
    rules: {
      required: true,
      message: '选择你最喜欢的水果',
      trigger: ['blur', 'change'],
    },
  },
  {
    field: 'phone',
    label: '手机号（测试）',
    type: FormTypeEnum.TEXT,
    rules: [
      {
        required: true,
        message: '请输入您的手机号',
        trigger: ['blur', 'change'],
      },
      {
        type: 'phone',
        trigger: ['blur', 'change'],
      },
    ],
  },
  {
    field: 'password',
    label: '密码（测试）',
    type: FormTypeEnum.PASSWORD,
    rules: {
      type: 'password',
      trigger: ['blur', 'change'],
    },
  },
  {
    field: 'isShow',
    label: '是否禁用',
    type: FormTypeEnum.SWITCH,
  },
  {
    field: 'time',
    label: '日期',
    type: FormTypeEnum.DATE,
    border: 'bottom',
    rules: {
      required: true,
      message: '请输入您的日期',
      trigger: ['blur', 'change'],
    },
  },
  {
    field: 'address',
    label: '地址（测试）',
    type: FormTypeEnum.ADDRESS,
    rules: {
      required: true,
      message: '请输入您的地址',
      trigger: ['blur', 'change'],
    },
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
        { text: '大学', id: '4' },
      ],
    ],
    rules: {
      required: true,
      message: '请输入您的学历',
      trigger: ['blur', 'change'],
    },
  },
  {
    field: 'age',
    label: '年龄（测试）',
    type: FormTypeEnum.NUMBER,
    rules: [
      {
        required: true,
        message: '请输入您的年龄',
        trigger: ['blur', 'change'],
      },
      {
        required: true,
        message: '不能小于最小值',
        min: 10,
        trigger: ['blur', 'change'],
      },
      {
        message: '不能大于最大值',
        max: 20,
        trigger: ['change'],
      },
    ],
  },
  {
    field: 'custom',
    label: '自定义',
    type: FormTypeEnum.CUSTOM,
    rules: {
      required: true,
      message: '请输入您的自定义内容',
      trigger: ['blur', 'change'],
    },
  },
  {
    field: 'remark',
    label: '备注',
    type: FormTypeEnum.TEXTAREA,
    rules: {
      required: true,
      message: '请输入您的地址',
      trigger: ['blur', 'change'],
    },
  },
])

const handleSubmit = () => {
  formRef.value.handleSubmit().then((res) => {
    uni.showToast({ title: '提交成功' })
  })
}
</script>

<style scoped lang="scss"></style>
