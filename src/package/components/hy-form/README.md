# 表单组件 (hy-form-simple)

一个简单易用的表单组件，包含 `hy-form-simple` 和 `hy-form-item-simple` 两个组件，支持表单验证、数据绑定等功能。

## 组件特性

- ✅ 表单数据双向绑定
- ✅ 表单验证（必填、长度、类型、自定义验证）
- ✅ 实时验证和失焦验证
- ✅ 支持多种表单控件
- ✅ 灵活的标签布局
- ✅ 错误信息显示
- ✅ 表单重置和清除验证

## 基础用法

```vue
<template>
  <hy-form-simple
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-width="80px"
    @submit="handleSubmit"
  >
    <hy-form-item-simple label="用户名" prop="username" required>
      <hy-input v-model="formData.username" placeholder="请输入用户名" />
    </hy-form-item-simple>
    
    <hy-form-item-simple label="手机号" prop="phone" required>
      <hy-input v-model="formData.phone" type="number" placeholder="请输入手机号" />
    </hy-form-item-simple>
    
    <hy-form-item-simple label="性别" prop="gender">
      <hy-radio v-model="formData.gender" :columns="genderOptions" />
    </hy-form-item-simple>
  </hy-form-simple>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const formData = reactive({
  username: '',
  phone: '',
  gender: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名' },
    { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符' }
  ],
  phone: [
    { required: true, message: '请输入手机号' },
    { type: 'phone', message: '请输入正确的手机号' }
  ]
}

const formRef = ref()

const handleSubmit = (data: any) => {
  console.log('表单数据:', data)
}
</script>
```

## API

### hy-form-simple Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| model | 表单数据对象 | `Record<string, any>` | `{}` |
| rules | 验证规则 | `FormItemRule` | `{}` |
| labelWidth | 标签宽度 | `string \| number` | `'auto'` |
| labelPosition | 标签位置 | `'left' \| 'top'` | `'left'` |
| labelAlign | 标签对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |

### hy-form-simple Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| submit | 表单提交时触发 | `(data: Record<string, any>)` |
| validate | 表单验证时触发 | `(valid: boolean, errors: Record<string, string>)` |

### hy-form-simple Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| validate | 验证表单 | - |
| resetFields | 重置表单 | - |
| clearValidate | 清除验证 | `(fields?: string[])` |
| submit | 提交表单 | - |

### hy-form-item-simple Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| label | 标签文本 | `string` | `''` |
| prop | 表单字段名 | `string` | `''` |
| required | 是否必填 | `boolean` | `false` |
| rules | 验证规则 | `any` | `{}` |

### hy-form-item-simple Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值变化时触发 | `(value: any)` |
| blur | 失焦时触发 | `(value: any)` |

### hy-form-item-simple Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| validate | 验证字段 | `(trigger?: 'blur' \| 'change')` |
| resetField | 重置字段 | - |
| clearValidate | 清除验证 | - |

## 验证规则

### 基础验证

```javascript
const rules = {
  username: [
    { required: true, message: '请输入用户名' },
    { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符' }
  ]
}
```

### 类型验证

```javascript
const rules = {
  phone: [
    { required: true, message: '请输入手机号' },
    { type: 'phone', message: '请输入正确的手机号' }
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱格式' }
  ],
  password: [
    { type: 'password', message: '密码格式不正确' }
  ]
}
```

### 自定义验证

```javascript
const rules = {
  confirmPassword: [
    { required: true, message: '请确认密码' },
    {
      validator: (value: string) => {
        if (value !== formData.password) {
          return '两次输入的密码不一致'
        }
        return true
      }
    }
  ]
}
```

### 触发时机

```javascript
const rules = {
  username: [
    { 
      required: true, 
      message: '请输入用户名',
      trigger: ['blur', 'change'] // 失焦和变化时都验证
    }
  ]
}
```

## 支持的表单控件

- `hy-input` - 输入框
- `hy-textarea` - 文本域
- `hy-radio` - 单选框
- `hy-check-button` - 选择按钮
- `hy-switch` - 开关
- `hy-picker` - 选择器
- `hy-datetime-picker` - 时间选择器
- `hy-address-picker` - 地址选择器
- 其他自定义组件

## 完整示例

```vue
<template>
  <view class="form-demo">
    <hy-form-simple
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
      label-position="left"
      @submit="handleSubmit"
    >
      <hy-form-item-simple label="用户名" prop="username" required>
        <hy-input v-model="formData.username" placeholder="请输入用户名" />
      </hy-form-item-simple>
      
      <hy-form-item-simple label="手机号" prop="phone" required>
        <hy-input v-model="formData.phone" type="number" placeholder="请输入手机号" />
      </hy-form-item-simple>
      
      <hy-form-item-simple label="邮箱" prop="email">
        <hy-input v-model="formData.email" placeholder="请输入邮箱" />
      </hy-form-item-simple>
      
      <hy-form-item-simple label="性别" prop="gender">
        <hy-radio v-model="formData.gender" :columns="genderOptions" />
      </hy-form-item-simple>
      
      <hy-form-item-simple label="爱好" prop="hobbies">
        <hy-check-button
          v-model="formData.hobbies"
          :columns="hobbyOptions"
          select-type="multiple"
        />
      </hy-form-item-simple>
      
      <hy-form-item-simple label="备注" prop="remark">
        <hy-textarea v-model="formData.remark" placeholder="请输入备注" />
      </hy-form-item-simple>
    </hy-form-simple>
    
    <view class="form-actions">
      <hy-button type="primary" @click="handleSubmit">提交</hy-button>
      <hy-button @click="handleReset">重置</hy-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const formData = reactive({
  username: '',
  phone: '',
  email: '',
  gender: '',
  hobbies: [],
  remark: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名' },
    { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符' }
  ],
  phone: [
    { required: true, message: '请输入手机号' },
    { type: 'phone', message: '请输入正确的手机号' }
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱格式' }
  ]
}

const genderOptions = [
  { text: '男', value: 'male' },
  { text: '女', value: 'female' }
]

const hobbyOptions = [
  { text: '阅读', value: 'reading' },
  { text: '音乐', value: 'music' },
  { text: '运动', value: 'sports' }
]

const formRef = ref()

const handleSubmit = () => {
  const result = formRef.value?.submit()
  if (result) {
    console.log('表单提交成功:', result)
  }
}

const handleReset = () => {
  formRef.value?.resetFields()
}
</script>
```

## 注意事项

1. 表单组件使用 `provide/inject` 进行数据通信，确保 `hy-form-item-simple` 组件在 `hy-form-simple` 内部使用
2. 验证规则支持数组形式，可以设置多个验证规则
3. 自定义验证函数返回 `true` 表示验证通过，返回 `false` 或字符串表示验证失败
4. 表单数据会自动双向绑定，无需手动处理数据同步
5. 支持实时验证和失焦验证，可以通过 `trigger` 属性控制验证时机