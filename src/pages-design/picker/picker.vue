<template>
    <the-root-page>
        <view class="hy-title">基础使用（单列模式）</view>
        <view class="hy-container">
            <hy-picker :show="show1" :columns="columns1" @confirm="onConfirm1"></hy-picker>
            <hy-cell clickable @click="onCellClick">
                <hy-cell-item title="打开选择器" name="show1" :value="value1"></hy-cell-item>
            </hy-cell>
        </view>

        <view class="hy-title">通过输入框打开</view>
        <view class="hy-container">
            <hy-picker
                v-model="value2"
                has-input
                :columns="columns2"
                :input="{ placeholder: '请选择国家' }"
                @confirm="onConfirm2"
            ></hy-picker>
        </view>

        <view class="hy-title">多列模式（自定义分隔符）</view>
        <view class="hy-container">
            <hy-picker
                v-model="value3"
                has-input
                :columns="columns3"
                separator="-"
                @confirm="onConfirm3"
            ></hy-picker>
        </view>

        <view class="hy-title">多列联动</view>
        <view class="hy-container">
            <hy-picker
                ref="pickerRef"
                v-model="value4"
                :columns="columns4"
                has-input
                @change="changeHandler"
                @confirm="onConfirm4"
            ></hy-picker>
        </view>

        <view class="hy-title">对象数据格式</view>
        <view class="hy-container">
            <hy-picker
                v-model="value5"
                has-input
                :columns="columns5"
                label-key="label"
                value-key="value"
                @confirm="onConfirm5"
            ></hy-picker>
        </view>

        <view class="hy-title">自定义弹窗位置（顶部）</view>
        <view class="hy-container">
            <hy-picker
                :show="show6"
                :columns="columns6"
                popup-mode="top"
                @confirm="onConfirm6"
            ></hy-picker>
            <hy-cell clickable @click="onCellClick">
                <hy-cell-item title="顶部弹窗" name="show6" :value="value6"></hy-cell-item>
            </hy-cell>
        </view>

        <view class="hy-title">自定义工具栏按钮</view>
        <view class="hy-container">
            <hy-picker
                :show="show7"
                :columns="columns7"
                cancel-text="取消选择"
                confirm-text="确认选择"
                cancel-color="#999999"
                confirm-color="#4F8EF7"
                title="自定义标题"
                @confirm="onConfirm7"
                @cancel="onCancel7"
            ></hy-picker>
            <hy-cell clickable @click="onCellClick">
                <hy-cell-item title="自定义按钮" name="show7" :value="value7"></hy-cell-item>
            </hy-cell>
        </view>

        <view class="hy-title">自定义输入框样式</view>
        <view class="hy-container">
            <hy-picker
                v-model="value8"
                has-input
                :columns="columns8"
                :input="{
                    placeholder: '请选择选项',
                    fontSize: 16,
                    border: false,
                    suffixIcon: 'arrow-down'
                }"
            ></hy-picker>
        </view>

        <view class="hy-title">设置默认选中项</view>
        <view class="hy-container">
            <hy-picker
                :show="show9"
                :columns="columns9"
                :defaultIndex="[1, 2]"
                @confirm="onConfirm9"
            ></hy-picker>
            <hy-cell clickable @click="onCellClick">
                <hy-cell-item title="默认选中" name="show9" :value="value9"></hy-cell-item>
            </hy-cell>
        </view>

        <view class="hy-title">禁用点击遮罩关闭</view>
        <view class="hy-container">
            <hy-picker
                :show="show10"
                :columns="columns10"
                :closeOnClickOverlay="false"
                title="必须点击按钮关闭"
                @confirm="onConfirm10"
            ></hy-picker>
            <hy-cell clickable @click="onCellClick">
                <hy-cell-item title="禁用遮罩关闭" name="show10" :value="value10"></hy-cell-item>
            </hy-cell>
        </view>

        <view class="hy-title">自定义插槽内容</view>
        <view class="hy-container">
            <hy-picker
                ref="pickerRef11"
                v-model="value11"
                has-input
                :columns="columns11"
                title="自定义标题"
            >
                <template #toolbar-right>
                    <hy-button text="保存" size="small" @click="handleSave"></hy-button>
                </template>
                <template #toolbar-bottom>
                    <view style="text-align: center; color: #999; padding: 10rpx">
                        请选择您的选项
                    </view>
                </template>
            </hy-picker>
        </view>
    </the-root-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { PickerColumnVo, IPickerExpose } from '@/package'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '选择器'
    }
})

// 1. 基础使用
const show1 = ref(false)
const value1 = ref('')
const columns1 = reactive([['中国', '美国', '日本', '韩国']])

// 2. 输入框模式
const value2 = ref('')
const columns2 = reactive([['中国', '美国', '日本']])

// 3. 多列模式
const value3 = ref([])
const columns3 = reactive([
    ['周一', '周二', '周三', '周四', '周五'],
    ['上午', '下午', '晚上'],
    ['9:00', '10:00', '11:00']
])

// 4. 多列联动
const pickerRef = ref(null)
// 11. 自定义插槽 ref
const pickerRef11 = ref<IPickerExpose>()
const value4 = ref([])
const columns4 = reactive([
    ['中国', '美国'],
    ['北京', '上海', '广州']
])
const cityData = reactive({
    中国: ['北京', '上海', '广州', '深圳'],
    美国: ['纽约', '洛杉矶', '芝加哥', '休斯顿']
})

// 5. 对象数据格式
const value5 = ref('')
const columns5: PickerColumnVo[][] = reactive([
    [
        { label: '雪月夜', value: 2021 },
        { label: '冷夜雨', value: 804 },
        { label: '清风颂', value: 305 }
    ]
])

// 6. 自定义弹窗位置
const show6 = ref(false)
const value6 = ref('')
const columns6 = reactive([['选项1', '选项2', '选项3']])

// 7. 自定义工具栏按钮
const show7 = ref(false)
const value7 = ref('')
const columns7 = reactive([['选项A', '选项B', '选项C']])

// 8. 自定义输入框样式
const value8 = ref('')
const columns8 = reactive([['选项1', '选项2', '选项3']])

// 9. 默认选中项
const show9 = ref(false)
const value9 = ref('')
const columns9 = reactive([
    ['A', 'B', 'C', 'D'],
    ['1', '2', '3', '4']
])

// 10. 禁用遮罩关闭
const show10 = ref(false)
const value10 = ref('')
const columns10 = reactive([['选项1', '选项2', '选项3']])

// 11. 自定义插槽
const value11 = ref('')
const columns11 = reactive([['选项1', '选项2', '选项3']])

const onConfirm1 = (e) => {
    console.log('基础使用:', e.value)
    value1.value = e.value.join('')
    show1.value = false
}

const onConfirm2 = (e) => {
    console.log('输入框模式:', e.value)
}

const onConfirm3 = (e) => {
    console.log('多列模式:', e.value)
}

const changeHandler = (e) => {
    const { columnIndex, value } = e
    if (columnIndex === 0) {
        const selectedCountry = value[0]
        pickerRef.value.setColumnValues(1, cityData[selectedCountry])
    }
}

const onConfirm4 = (e) => {
    console.log('联动选择:', e.value)
}

const onConfirm5 = (e) => {
    console.log('对象数据:', e.value)
}

const onConfirm6 = (e) => {
    console.log('居中弹窗:', e.value)
    value6.value = e.value.join('')
    show6.value = false
}

const onConfirm7 = (e) => {
    console.log('自定义按钮:', e.value)
    value7.value = e.value.join('')
    show7.value = false
}

const onCancel7 = () => {
    console.log('取消选择')
    show7.value = false
}

const onConfirm9 = (e) => {
    console.log('默认选中:', e.value)
    value9.value = e.value.join(' / ')
    show9.value = false
}

const onConfirm10 = (e) => {
    console.log('禁用遮罩:', e.value)
    value10.value = e.value.join('')
    show10.value = false
}

const onCellClick = (name: string) => {
    if (name === 'show1') show1.value = true
    else if (name === 'show6') show6.value = true
    else if (name === 'show7') show7.value = true
    else if (name === 'show9') show9.value = true
    else if (name === 'show10') show10.value = true
}

const handleSave = () => {
    console.log('保存:', value11.value)
    if (pickerRef11.value) {
        pickerRef11.value.onConfirm()
    }
}

useShareButton()
</script>

<style scoped lang="scss"></style>
