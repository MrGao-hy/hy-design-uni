<template>
    <view class="hy-address-picker">
        <view v-if="hasInput" class="hy-address-picker__has-input" @tap="onShowByClickInput">
            <!-- @slot 自定义输入框 -->
            <slot name="trigger" :value="inputValue">
                <HyInput
                    v-model="inputValue"
                    :readonly="true"
                    :disabled="input?.disabled"
                    :disabledColor="input?.disabledColor"
                    :shape="input?.shape"
                    :border="input?.border"
                    :prefixIcon="input?.prefixIcon"
                    :suffixIcon="input?.suffixIcon"
                    :color="input?.color"
                    :fontSize="input?.fontSize"
                    :inputAlign="input?.inputAlign"
                    :placeholder="input?.placeholder || '请选择地址'"
                    :placeholderStyle="input?.placeholderStyle"
                    :placeholderClass="input?.placeholderClass"
                    :customStyle="Object.assign({ 'pointer-events': 'none' }, input?.customStyle)"
                ></HyInput>
                <view class="input-cover"></view>
            </slot>
        </view>
        <HyPicker
            ref="uPickerRef"
            :show="show || (hasInput && showByClickInput)"
            :popupMode="popupMode"
            :closeOnClickOverlay="closeOnClickOverlay"
            :columns="columns"
            :defaultIndex="defaultIndex"
            :title="title"
            keyName="name"
            :itemHeight="itemHeight"
            :loading="loading"
            :showToolbar="showToolbar"
            :visibleItemCount="visibleItemCount"
            :cancelText="cancelText"
            :cancelColor="cancelColor"
            :confirmColor="confirmColor"
            :toolbarRightSlot="toolbarRightSlot"
            @close="close"
            @cancel="cancel"
            @confirm="confirm"
            @change="change"
        >
            <template #toolbar-right>
                <!-- @slot 工具栏右侧内容，自定义右侧内容，因为微信小程序限制，需要同时设置:toolbarRightSlot="true"生效。 -->
                <slot name="toolbar-right">
                    {{ confirmText }}
                </slot>
            </template>
            <template #toolbar-bottom>
                <!-- @slot 工具栏下面内容，自定义底部内容 -->
                <slot name="toolbar-bottom"></slot>
            </template>
        </HyPicker>
    </view>
</template>

<script lang="ts">
export default {
    name: 'hy-address-picker',
    options: {
        addGlobalClass: true,
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue'
import type { IAddressPickerEmits } from './typing'
import address from '../../libs/utils/address.json'
import addressPickerProps from './props'
// 组件
import HyInput from '../hy-input/hy-input.vue'
import HyPicker from '../hy-picker/hy-picker.vue'

/**
 * 此选择器用于选择地址
 * @displayName hy-address-picker
 */
defineOptions({})

const props = defineProps(addressPickerProps)
const { show, modelValue, hasInput, input, separator, closeOnClickOverlay } = toRefs(props)
const emit = defineEmits<IAddressPickerEmits>()

// 原来的日期选择器不方便，这里增加一个hasInput选项支持类似element的自带输入框的功能。
const inputValue = ref<string>('') // 表单显示值
const showByClickInput = ref<boolean>(false) // 是否在hasInput模式下显示日期选择
const columns = ref<any[]>([])
const uPickerRef = ref<InstanceType<typeof HyPicker> | null>()
const defaultIndex = ref<number[]>([])

function normalizeCityName(city: string) {
    // 定义常见的后缀
    const suffixes = ['市', '省', '自治区', '特别行政区', '县', '区']
    suffixes.forEach((suffix) => {
        if (city.endsWith(suffix)) {
            city = city.slice(0, -suffix.length)
        }
    })
    return city
}
/**
 * @description 判断城市是否相等
 * */
const areCitiesEqual = (city1: string, city2: string) => {
    const normalizedCity1 = normalizeCityName(city1)
    const normalizedCity2 = normalizeCityName(city2)
    return normalizedCity1 === normalizedCity2
}
/**
 * @description 更新各列的值
 * */
const updateColumnValue = (value: string) => {
    let provinceIndex, cityIndex, countyIndex
    // 判断是初始化有数据就找到对应索引，无数据默认索引为0
    if (value) {
        const addressArr = value.split(separator.value)
        // 查出省索引
        provinceIndex = address.findIndex((item) => areCitiesEqual(item.name, addressArr[0]))
        // 查出市索引
        cityIndex = address[provinceIndex].areas.findIndex((item) =>
            areCitiesEqual(item.name, addressArr[1])
        )

        // 查出县/区索引
        countyIndex = address[provinceIndex].areas[cityIndex].areas.findIndex((item) =>
            areCitiesEqual(item.name, addressArr[2])
        )
    } else {
        provinceIndex = 0
        cityIndex = 0
        countyIndex = 0
    }
    // 省级数组
    const provinceData = address.map((item) => ({
        name: item.name,
        code: item.code
    }))
    // 市级数组
    const cityData = address[provinceIndex].areas.map((item) => ({
        name: item.name,
        code: item.code
    }))
    // 县/区级数组
    const areaData = address[provinceIndex].areas[cityIndex].areas

    // 默认索引
    defaultIndex.value = [provinceIndex, cityIndex, countyIndex]
    // 列表
    columns.value = [provinceData, cityData, areaData]
}

const init = () => {
    // 获取当前值
    inputValue.value = modelValue.value
    // 更新列表
    updateColumnValue(modelValue.value)
}

onMounted(() => {
    init()
})

/**
 * @description 关闭选择器
 * */
const close = () => {
    if (closeOnClickOverlay.value) {
        if (hasInput.value) {
            showByClickInput.value = false
        }
        emit('close')
    }
}

/**
 * @description 点击工具栏的取消按钮
 * */
const cancel = () => {
    if (hasInput.value) {
        showByClickInput.value = false
    }
    emit('cancel')
}

/**
 * @description 点击工具栏的确定按钮
 * */
const confirm = ({ value }: { value: Record<string, any>[] }) => {
    inputValue.value = value.map((item) => item.name).join(separator.value)

    showByClickInput.value = false
    emit('update:modelValue', inputValue.value)
    emit('confirm', {
        value: inputValue.value
    })
}

/**
 * @description 列发生变化时触发
 * */
const change = (e: any) => {
    const { columnIndex, index, indexs } = e
    //如果改变的是第一列
    if (columnIndex === 0) {
        const children1 = address[index].areas.map((item) => {
            return { name: item.name, code: item.code }
        })
        uPickerRef.value?.setColumnValues(1, children1)
        //更换 第二列数据
        const children2 = address[index].areas[indexs[1]].areas.map((item) => ({
            ...item
        }))
        uPickerRef.value?.setColumnValues(2, children2)
        //更换 第三列数据
    }
    if (columnIndex === 1) {
        //如果改变的是第二列
        const children3 = address[indexs[0]].areas[indexs[1]].areas.map((item) => ({
            ...item
        }))
        uPickerRef.value?.setColumnValues(2, children3)
    }

    // 发出change时间，value为当前选中的时间戳
    emit('change', {
        ...e
    })
}

const onShowByClickInput = () => {
    if (!props.input?.disabled) {
        showByClickInput.value = !showByClickInput.value
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
