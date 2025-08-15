<template>
  <view class="hy-form">
    <slot></slot>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-form',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { provide, reactive, ref, toRefs } from 'vue'
import type { PropType } from 'vue'
import type { FormItemRule } from './typing'
import { clearVal } from '../../utils'

/**
 * 表单组件父组件，需要搭配hy-form-item
 * @displayName hy-form
 */
defineOptions({})

const props = defineProps({
  /** 表单数据对象 */
  model: Object as PropType<AnyObject>,
  /** 表单校验规则 */
  rules: Object as PropType<FormItemRule>,
  /** 表单底部边框 */
  border: {
    type: Boolean,
    default: false,
  },
  /** label标签的宽度，单位rpx */
  labelWidth: {
    type: String,
    default: 'auto',
  },
  /**
   * 标签位置
   * @values left,top
   * */
  labelPosition: {
    type: String,
    default: 'left',
  },
  /**
   * 标签位置
   * @values left,center,right
   * */
  labelAlign: {
    type: String,
    default: 'left',
  },
})
const { rules, border, labelWidth, labelAlign, labelPosition } = toRefs(props)

const emit = defineEmits<{
  submit: [data: Record<string, any>]
  validate: [valid: boolean, errors: Record<string, string>]
}>()

// 表单数据
const formData = reactive(props.model || {})
const formItems = ref<any[]>([])
const errors = reactive<Record<string, string>>({})

// 表单上下文
const formContext = {
  formData,
  errors,
  rules: rules.value,
  border: border.value,
  labelWidth: labelWidth.value,
  labelPosition: labelPosition.value,
  labelAlign: labelAlign.value,
  addFormItem: (item: any) => {
    formItems.value.push(item)
  },
  removeFormItem: (item: any) => {
    const index = formItems.value.indexOf(item)
    if (index > -1) {
      formItems.value.splice(index, 1)
    }
  },
  validateField: (field: string, value: any, trigger?: 'blur' | 'change') => {
    const fieldRules = props.rules?.[field]
    if (!fieldRules) return true

    const rules = Array.isArray(fieldRules) ? fieldRules : [fieldRules]
    let isValid = true
    let errorMessage = ''

    for (const rule of rules) {
      // 检查触发时机
      if (
        (trigger && !rule.trigger) ||
        (trigger && rule.trigger && !rule.trigger.includes(trigger))
      ) {
        continue
      }

      // 必填校验
      if (rule.required && (!value || value === '')) {
        errorMessage = rule.message || `${field} 是必填项`
        isValid = false
        break
      }

      // 长度校验
      if (rule.min && String(value).length < rule.min) {
        errorMessage = rule.message || `${field} 长度不能少于 ${rule.min} 个字符`
        isValid = false
        break
      }

      if (rule.max && String(value).length > rule.max) {
        errorMessage = rule.message || `${field} 长度不能超过 ${rule.max} 个字符`
        isValid = false
        break
      }

      // 类型校验
      if (rule.type === 'phone') {
        const phoneRegex = /^1[3-9]\d{9}$/
        if (!phoneRegex.test(String(value))) {
          errorMessage = rule.message || '请输入正确的手机号'
          isValid = false
          break
        }
      }

      if (rule.type === 'email') {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        if (!emailRegex.test(String(value))) {
          errorMessage = rule.message || '请输入正确的邮箱格式'
          isValid = false
          break
        }
      }

      if (rule.type === 'password') {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
        if (!passwordRegex.test(String(value))) {
          errorMessage = rule.message || '密码至少8个字符，包含大小写字母、数字和特殊符号'
          isValid = false
          break
        }
      }

      // 自定义校验
      if (rule.validator) {
        const result = rule.validator(value)
        if (result === false || typeof result === 'string') {
          errorMessage = typeof result === 'string' ? result : rule.message || `${field} 校验失败`
          isValid = false
          break
        }
      }
    }

    if (isValid) {
      delete errors[field]
    } else {
      errors[field] = errorMessage
    }

    return isValid
  },
  setFieldValue: (field: string, value: any) => {
    formData[field] = value
  },
  getFieldValue: (field: string) => {
    return formData[field]
  },
}

// 提供表单上下文给子组件
provide('formContext', formContext)

// 验证所有字段
const validate = () => {
  return new Promise((resolve, reject) => {
    let isValid = true
    const allErrors: Record<string, string> = {}

    formItems.value.forEach((item) => {
      const field = item.props?.prop
      if (field) {
        const value = formData[field]
        const fieldValid = formContext.validateField(field, value)
        if (!fieldValid) {
          isValid = false
          allErrors[field] = errors[field]
        }
      }
    })

    emit('validate', isValid, allErrors)
    if (isValid) {
      resolve(isValid)
    } else {
      reject(allErrors)
    }
  })
}

// 重置表单
const resetFields = () => {
  clearVal(formData)
  Object.keys(errors).forEach((key) => {
    delete errors[key]
  })
}

// 清除验证
const clearValidate = (fields?: string[]) => {
  if (fields) {
    fields.forEach((field) => {
      delete errors[field]
    })
  } else {
    Object.keys(errors).forEach((key) => {
      delete errors[key]
    })
  }
}

// 提交表单
const submit = async () => {
  if (await validate()) {
    emit('submit', { ...formData })
    return formData
  }
  return false
}

defineExpose({
  validate,
  resetFields,
  clearValidate,
  submit,
  formData,
  errors,
})
</script>

<style lang="scss" scoped>
.hy-form {
  width: 100%;
}
</style>
