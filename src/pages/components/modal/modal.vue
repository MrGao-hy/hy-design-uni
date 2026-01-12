<template>
    <hy-config-provider :theme-color="color" :theme="darkMode">
        <view class="hy-container">
            <the-cell :list="list" @click="onClick"></the-cell>
        </view>

        <hy-modal
            v-model="show"
            :title="mode === 'title' ? '标题' : ''"
            content="模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作"
            :showCancelButton="mode === 'showCancelButton' || mode === 'buttonReverse'"
            :buttonReverse="mode === 'buttonReverse'"
            @confirm="show = false"
            @cancel="show = false"
        ></hy-modal>

        <hy-modal
            v-model="showAsync"
            show-cancel-button
            :autoClose="false"
            :loading="asyncClose"
            @confirm="onAsyncClose"
        >
            <hy-form-group
                ref="formRef"
                :columns="formColumns"
                :form-data="formData"
                label-width="60"
            ></hy-form-group>
        </hy-modal>
    </hy-config-provider>
</template>

<script setup lang="ts">
import HyModal from '@/package/components/hy-modal/hy-modal.vue'
import HyFormGroup from '@/package/components/hy-form-group/hy-form-group.vue'
import TheCell from '@/components/TheCell.vue'
import HyConfigProvider from '@/package/components/hy-config-provider/hy-config-provider.vue'
import { ref, reactive } from 'vue'
import { useThemeStore } from '@/store'
import { FormTypeEnum } from '@/package'
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore()

const { color, darkMode } = storeToRefs(themeStore)
const show = ref(false)
const formRef = ref()
const showAsync = ref(false)
const asyncClose = ref(false)
const mode = ref('')
const formData = ref({
    price: '',
    summary: ''
})
const formColumns = reactive([
    {
        field: 'price',
        label: '价格',
        type: FormTypeEnum.TEXT,
        rules: {
            required: true,
            message: '没有填内容',
            trigger: ['blur']
        }
    }
])

const list = [
    { title: '基础使用', value: '' },
    { title: '有标题', value: 'title' },
    { title: '带取消按钮', value: 'showCancelButton' },
    { title: '对调按钮', value: 'buttonReverse' },
    { title: '异步弹窗', value: 'async' },
    { title: '调用接口', value: 'hooks' }
]

const onClick = (temp: AnyObject) => {
    if (temp.value === 'async') {
        showAsync.value = true
    } else {
        mode.value = temp.value!
        show.value = true
    }
}

// 异步关闭
const onAsyncClose = () => {
    formRef.value
        .validate()
        .then(async (res) => {
            asyncClose.value = true
            setTimeout(() => {
                showAsync.value = false
                asyncClose.value = false
            }, 2000)
        })
        .catch((err) => {})

    return false
}
</script>

<style scoped lang="scss"></style>
