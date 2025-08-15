<template>
  <view class="hy-picker">
    <view
      v-if="hasInput"
      class="hy-picker-input cursor-pointer"
      @click="onShowByClickInput"
    >
      <slot>
        <HyInput
          v-model="inputLabelValue"
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
          :placeholder="input?.placeholder || '请选择'"
          :placeholderStyle="input?.placeholderStyle"
          :placeholderClass="input?.placeholderClass"
          :customStyle="
            Object.assign({ 'pointer-events': 'none' }, input?.customStyle)
          "
        ></HyInput>
        <div class="input-cover"></div>
      </slot>
    </view>
    <HyPopup
      :show="show || (hasInput && showByClickInput)"
      :mode="popupMode"
      :zIndex="zIndex"
      @close="closeHandler"
    >
      <view class="hy-picker">
        <!-- 头部内容 -->
        <view class="hy-picker__title" v-if="showToolbar">
          <view
            class="hy-picker__title--left"
            :style="{ color: cancelColor }"
            @tap="cancel"
          >
            {{ cancelText }}
          </view>
          <view class="hy-picker__title--center">
            {{ title }}
          </view>
          <view
            class="hy-picker__title--right"
            :style="{ color: confirmColor }"
            @tap="onConfirm"
          >
            <slot name="toolbar-right">
              {{ confirmText }}
            </slot>
          </view>
        </view>
        <!-- 头部内容 -->

        <slot name="toolbar-bottom"></slot>

        <!-- 选择器内容 -->
        <picker-view
          class="hy-picker--view"
          :indicatorStyle="`height: ${addUnit(itemHeight)}`"
          :value="innerIndex"
          :immediateChange="immediateChange"
          :style="{
            height: `${addUnit(visibleItemCount * itemHeight)}`,
          }"
          mask-class="hy-picker--view__mask"
          maskStyle="backgroundImage: none;"
          @change="changeHandler"
        >
          <picker-view-column
            v-for="(item, index) in innerColumns"
            :key="index"
            class="hy-picker--view__column"
          >
            <view
              v-if="Array.isArray(item)"
              class="hy-picker--view__column__item u-line-1"
              :class="[
                index1 === innerIndex[index] &&
                  'hy-picker--view__column__item--selected',
              ]"
              v-for="(item1, index1) in item"
              :key="index1"
              :style="{
                height: addUnit(itemHeight),
                lineHeight: addUnit(itemHeight),
                fontWeight: index1 === innerIndex[index] ? 'bold' : 'normal',
                display: 'block',
              }"
            >
              {{ getItemText(item1) }}
            </view>
          </picker-view-column>
        </picker-view>
        <!-- 选择器内容 -->

        <!-- 加载loading -->
        <view v-if="loading" class="hy-picker--loading">
          <HyIcon :name="IconConfig.LOADING" :isRotate="loading"></HyIcon>
        </view>
        <!-- 加载loading -->
      </view>
    </HyPopup>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-picker",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed, ref, toRefs, watch } from "vue";
import type { PropType } from "vue";
import { deepClone, sleep, addUnit, isArray } from "../../utils";
import { IconConfig } from "../../config";
import type { IPickerEmits, PickerColumnVo } from "./typing";
import type HyInputProps from "../hy-input/typing";
// 组件
import HyInput from "../hy-input/hy-input.vue";
import HyIcon from "../hy-icon/hy-icon.vue";
import HyPopup from "../hy-popup/hy-popup.vue";

/**
 * 此选择器用于单列，多列，多列联动的选择场景。
 * @displayName hy-picker
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 显示到输入框值 */
  modelValue: {
    type: [String, Array],
    default: "",
  },
  /** 是否显示弹窗 */
  show: {
    type: Boolean,
    default: false,
  },
  /** 弹窗弹出模式 */
  popupMode: {
    type: String,
    default: "bottom",
  },
  /** 分割数组条件 */
  separator: {
    type: String,
    default: "/",
  },
  /** 是否显示顶部的操作栏 */
  showToolbar: {
    type: Boolean,
    default: true,
  },
  /** 顶部标题 */
  title: String,
  /** 二维数组，设置每一列的数据 */
  columns: {
    type: Array as unknown as PropType<(string | PickerColumnVo)[][]>,
    default: [],
  },
  /** 是否显示加载中状态 */
  loading: {
    type: Boolean,
    default: false,
  },
  /** 各列中，单个选项的高度 */
  itemHeight: {
    type: Number,
    default: 44,
  },
  /** 取消按钮的文字 */
  cancelText: {
    type: String,
    default: "取消",
  },
  /** 确认按钮的文字 */
  confirmText: {
    type: String,
    default: "确定",
  },
  /** 取消按钮的颜色 */
  cancelColor: {
    type: String,
    default: "#909193",
  },
  /** 确认按钮的颜色 */
  confirmColor: String,
  /** 每列中可见选项的数量 */
  visibleItemCount: {
    type: Number,
    default: 5,
  },
  /** 显示到选项对象中，需要展示的属性键名 */
  keyName: {
    type: String,
    default: "text",
  },
  /** 是否允许点击遮罩关闭选择器 */
  closeOnClickOverlay: {
    type: Boolean,
    default: false,
  },
  /** 各列的默认索引 */
  defaultIndex: {
    type: Array as PropType<number[]>,
    default: [],
  },
  /** 是否在手指松开时立即触发change事件 */
  immediateChange: {
    type: Boolean,
    default: true,
  },
  /** 最高层级 */
  zIndex: {
    type: Number,
    default: 10076,
  },
  /** 是否显示输入框 */
  hasInput: {
    type: Boolean,
    default: false,
  },
  /** 输入框集合属性 */
  input: {
    type: Object as PropType<HyInputProps>,
    default: () => {},
  },
  /** 是否自定义选择器nav左边内容 */
  toolbarRightSlot: {
    type: Boolean,
    default: false,
  },
});
const {
  keyName,
  closeOnClickOverlay,
  hasInput,
  defaultIndex,
  modelValue,
  columns,
  separator,
  input,
} = toRefs(props);
const emit = defineEmits<IPickerEmits>();

// 上一次选择的列索引
const lastIndex = ref([]);
// 索引值 ，对应picker-view的value
const innerIndex = ref<any[]>([]);
// 各列的值
const innerColumns = ref<any[][]>([]);
// 上一次的变化列索引
const columnIndex = ref<number>(0);
const showByClickInput = ref<boolean>(false);
const currentActiveValue = ref([]); //当前用户选中，但是还没确认的值，用户没做change操作时候，点击确认可以默认选中第一个

/**
 * @description 设置整体各列的columns的值
 * */
const setColumns = (columns: any[]) => {
  innerColumns.value = deepClone(columns);
  // 如果在设置各列数据时，没有被设置默认的各列索引defaultIndex，那么用0去填充它，数组长度为列的数量
  if (innerIndex.value.length === 0) {
    innerIndex.value = new Array(columns.length).fill(0);
  }
};

/**
 * @description 监听默认索引的变化，重新设置对应的值
 * */
watch(
  () => defaultIndex.value,
  (newValue) => {
    setIndexs(newValue, true);
  },
);

/**
 * @description 监听columns参数的变化
 * */
watch(
  () => columns.value,
  (newValue) => {
    setColumns(newValue);
  },
  { deep: true, immediate: true },
);

/**
 * @description 已选&&已确认的值显示在input上面的文案
 * */
const inputLabelValue = computed((): string => {
  let firstItem = innerColumns.value[0] && innerColumns.value[0][0];
  // //区分是不是对象数组
  if (
    firstItem &&
    Object.prototype.toString.call(firstItem) === "[object Object]"
  ) {
    let res: Record<string, any>[] = [];
    innerColumns.value.map((ite, i) => {
      res.push(
        ...innerColumns.value[i]?.filter((item) => {
          return (
            isArray(modelValue.value) && modelValue.value.includes(item["id"])
          );
        }),
      );
    });
    res = res.map((item) => item[keyName.value]);
    return res.join(separator.value);
  } else {
    //用户确定的值，才显示到输入框
    if (modelValue.value.length && isArray(modelValue.value)) {
      return modelValue.value.join(separator.value);
    }
    return modelValue.value as string;
  }
});

/**
 * @description 已选，待确认的值
 * */
const inputValue = computed(() => {
  let items = innerColumns.value.map(
    (item, index) => item[innerIndex.value[index]],
  );
  let res: any[] = [];
  //区分是不是对象数组
  if (
    items[0] &&
    Object.prototype.toString.call(items[0]) === "[object Object]"
  ) {
    //对象数组返回id集合
    items.forEach((element) => {
      res.push(element && element["id"]);
    });
  } else {
    //非对象数组返回元素集合
    items.forEach((element) => {
      res.push(element);
    });
  }
  return res;
});

/**
 * @description 显示
 * */
const onShowByClickInput = () => {
  if (!input.value?.disabled) {
    showByClickInput.value = !showByClickInput.value;
  }
};

/**
 * @description 获取item需要显示的文字，判别为对象还是文本
 * */
const getItemText = (item: any) => {
  if (
    Object.prototype.toString.call(item) === "[object Object]" &&
    keyName.value
  ) {
    return item[keyName.value];
  } else {
    return item;
  }
};

/**
 * @description 关闭选择器
 * */
const closeHandler = () => {
  if (closeOnClickOverlay.value) {
    if (hasInput.value) {
      showByClickInput.value = false;
    }
    emit("update:show", false);
    emit("close");
  }
};

/**
 * @description 点击工具栏的取消按钮
 * */
const cancel = () => {
  if (hasInput.value) {
    showByClickInput.value = false;
  }
  emit("update:show", false);
  emit("cancel");
};

/**
 * @description 点击工具栏的确定按钮
 * */
const onConfirm = () => {
  //如果用户有没有触发过change
  if (!currentActiveValue.value.length) {
    let arr = [0];
    //如果有默认值&&默认值的数组长度是正确的，就用默认值
    if (
      Array.isArray(defaultIndex.value) &&
      defaultIndex.value.length == innerColumns.value.length
    ) {
      arr = [...defaultIndex.value];
    } else {
      //否则默认都选中第一个
      arr = Array(innerColumns.value.length).fill(0);
    }
    setLastIndex(arr);
    setIndexs(arr);
  }
  emit("update:modelValue", inputValue.value);
  if (hasInput.value) {
    showByClickInput.value = false;
  }
  emit("update:show", false);
  emit("confirm", {
    indexs: innerIndex.value,
    value: innerColumns.value.map(
      (item, index) => item[innerIndex.value[index]],
    ),
    values: innerColumns.value,
  });
};

/**
 * @description 选择器某一列的数据发生变化时触发
 * */
const changeHandler = (e: any) => {
  const { value } = e.detail;
  let index = 0,
    columnI = 0;
  //记录用户选中但是还没确认的值
  currentActiveValue.value = value;
  // 通过对比前后两次的列索引，得出当前变化的是哪一列
  for (let i = 0; i < value.length; i++) {
    let item = value[i];
    if (item !== (lastIndex.value[i] || 0)) {
      // 把undefined转为合法假值0
      // 设置columnIndex为当前变化列的索引
      columnI = i;
      // index则为变化列中的变化项的索引
      index = item;
      break; // 终止循环，即使少一次循环，也是性能的提升
    }
  }
  columnIndex.value = columnI;
  const values = innerColumns.value;
  // 将当前的各项变化索引，设置为"上一次"的索引变化值
  setLastIndex(value);
  setIndexs(value);
  //如果是非自带输入框才会在change时候触发v-model绑值的变化
  //否则会非常的奇怪，用户未确认，值就变了
  if (!hasInput.value) {
    emit("update:modelValue", inputValue.value);
  }
  emit("change", {
    value: innerColumns.value.map((item, index) => item[value[index]]),
    index,
    indexs: value,
    // values为当前变化列的数组内容
    values,
    columnIndex: columnI,
  });
};

/**
 * @description 设置index索引，此方法可被外部调用设置
 * */
const setIndexs = (index: number[], isSetLastIndex?: boolean) => {
  innerIndex.value = deepClone(index);
  if (isSetLastIndex) {
    setLastIndex(index);
  }
};

/**
 * @description 记录上一次的各列索引位置
 * */
const setLastIndex = (index: number[]) => {
  // 当能进入此方法，意味着当前设置的各列默认索引，即为“上一次”的选中值，需要记录，是因为changeHandler中
  // 需要拿前后的变化值进行对比，得出当前发生改变的是哪一列
  lastIndex.value = deepClone(index);
};

/**
 * @description 设置对应列选项的所有值
 * */
const setColumnValues = (columnI: number, values: Record<string, any>) => {
  // 替换innerColumns数组中columnIndex索引的值为values，使用的是数组的splice方法
  innerColumns.value.splice(columnI, 1, values);
  // 替换完成之后将修改列之后的已选值置空
  setLastIndex(innerIndex.value.slice(0, columnI));
  // 拷贝一份原有的innerIndex做临时变量，将大于当前变化列的所有的列的默认索引设置为0
  let tmpIndex = deepClone(innerIndex.value);
  for (let i = 0; i < innerColumns.value.length; i++) {
    if (i > columnIndex.value) {
      tmpIndex[i] = 0;
    }
  }
  // 一次性赋值，不能单个修改，否则无效
  setIndexs(tmpIndex);
};

/**
 * @description 获取对应列的所有选项
 * */
const getColumnValues = (columnI: number) => {
  // 进行同步阻塞，因为外部得到change事件之后，可能需要执行setColumnValues更新列的值
  // 索引如果在外部change的回调中调用getColumnValues的话，可能无法得到变更后的列值，这里进行一定延时，保证值的准确性
  (async () => {
    await sleep();
  })();
  return innerColumns.value[columnI];
};

/**
 * @description 获取各列选中值对应的索引
 * */
const getIndexs = () => {
  return innerIndex.value;
};

/**
 * @description 获取各列选中的值
 * */
const getValues = () => {
  // 进行同步阻塞，因为外部得到change事件之后，可能需要执行setColumnValues更新列的值
  // 索引如果在外部change的回调中调用getValues的话，可能无法得到变更后的列值，这里进行一定延时，保证值的准确性
  (async () => {
    await sleep();
  })();
  return innerColumns.value.map((item, index) => item[innerIndex.value[index]]);
};

defineExpose({
  setColumnValues,
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
