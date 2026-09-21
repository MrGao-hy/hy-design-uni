<template>
    <the-root-page>
        <view class="hy-container">
            <the-cell :list="list" @click="onClick"></the-cell>
        </view>

        <hy-modal
            v-model="show"
            :title="mode === 'title' ? t('modalTitle') : ''"
            :content="t('modalContent')"
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
    </the-root-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { FormColumnsType, FormTypeEnum } from '@/package'
import { usePageTitle, useShareButton, useTranslate } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '模态框'
    }
})

const { t } = useTranslate('modal')
usePageTitle('modal')

const show = ref(false)
const formRef = ref()
const showAsync = ref(false)
const asyncClose = ref(false)
const mode = ref('')
const formData = ref({
    price: '',
    summary: ''
})
const formColumns = computed<FormColumnsType[]>(() => [
    {
        field: 'price',
        label: t('labelPrice'),
        type: FormTypeEnum.TEXT,
        rules: {
            required: true,
            message: t('requiredField'),
            trigger: ['blur']
        }
    }
])

const list = computed(() => [
    { title: t('basicUsage'), value: '' },
    { title: t('withTitle'), value: 'title' },
    { title: t('withCancel'), value: 'showCancelButton' },
    { title: t('buttonReverse'), value: 'buttonReverse' },
    { title: t('asyncPopup'), value: 'async' },
    { title: t('callApi'), value: 'hooks' }
])

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
        .then(async () => {
            asyncClose.value = true
            setTimeout(() => {
                showAsync.value = false
                asyncClose.value = false
            }, 2000)
        })
        .catch(() => {})

    return false
}

useShareButton()
</script>

<style scoped lang="scss"></style>
