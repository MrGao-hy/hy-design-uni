<template>
  <view class="hy-check-button">
    <template v-for="(item, i) in columns_1" :key="i">
      <HyTag
        :text="item?.[fieldNames.label] as string | number"
        :name="i"
        :type="type"
        :size="size"
        :shape="shape"
        :disabled="isDisabled(item.disabled)"
        :plain="!item?.[fieldNames.checked]"
        @click="onCheckbox"
      ></HyTag>
    </template>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-check-button',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { toRefs, watch, ref, type PropType } from 'vue'
import type { ICheckButtonEmits, IFieldNames } from './typing'
import type { CheckboxColumnsVo } from './typing'
import HyTag from '../hy-tag/hy-tag.vue'
import { isArray } from '../../utils'

/**
 * 该组件内部实现以tag二次封装按钮复选框和单选框
 * @displayName hy-check-button
 */
defineOptions({})

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 选中得值，selectTypeW为radio是字符串，为checkbox是数组 */
  modelValue: {
    type: [String, Number, Array<string | number>],
    required: true,
  },
  /** 选择列表数据 */
  columns: {
    type: Array as unknown as PropType<Array<CheckboxColumnsVo>>,
    default: [],
    required: true,
  },
  /** columns对应得键 */
  fieldNames: {
    type: Object as unknown as PropType<IFieldNames>,
    default: {
      label: 'label',
      value: 'value',
      checked: 'checked',
    },
  },
  /**
   * 选择单选框还是复选框
   * @values checkbox, radio
   * */
  selectType: {
    type: String,
    default: 'checkbox',
  },
  /** 禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 每行几列，每列等宽 */
  col: {
    type: String,
    default: 'repeat(3, 1fr)',
  },
  /** 设置每行间距,需要加单位 */
  gap: {
    type: String,
    default: '10px',
  },
  /**
   * 标签类型
   * @values info,primary,success,warning,error
   * */
  type: {
    type: String,
    default: 'primary',
  },
  /**
   * 标签的大小
   * @values small,medium,large
   * */
  size: {
    type: String,
    default: 'medium',
  },
  /**
   * 标签的形状
   * @values circle,square
   * */
  shape: {
    type: String,
    default: 'square',
  },
})
const { modelValue, columns, fieldNames, disabled, selectType } = toRefs(props)
const emit = defineEmits<ICheckButtonEmits>()

const isDisabled = (disabledVal?: boolean): boolean => disabled.value || !!disabledVal

const columns_1 = ref<CheckboxColumnsVo[]>()

watch(
  () => modelValue.value,
  (newValue: string | number | (string | number)[]) => {
    if (!isArray(columns.value) || !columns.value.length) return
    columns_1.value = columns.value.map((item) => {
      if (isArray(newValue)) {
        item[fieldNames.value.checked] = newValue.includes(item[fieldNames.value.value] as string)
      } else {
        item[fieldNames.value.checked] = newValue === item[fieldNames.value.value]
      }
      return item
    })
  },
  { immediate: true },
)

const onCheckbox = ({ name }: { name: number }) => {
  if (selectType.value === 'checkbox') {
    columns.value[name][fieldNames.value.checked] = !columns.value[name][fieldNames.value.checked]
    emit(
      'update:modelValue',
      columns.value
        .filter((item) => item[fieldNames.value.checked])
        .map((item) => item[fieldNames.value.value]),
    )
  } else {
    emit('update:modelValue', columns.value[name][fieldNames.value.value])
  }

  emit('change', columns.value[name])
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/mixin.scss';
@include b(check-button) {
  display: grid;
  grid-template-columns: v-bind(col);
  gap: v-bind(gap);
}
</style>
