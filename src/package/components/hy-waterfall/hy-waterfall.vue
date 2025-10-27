<template>
  <view class="hy-waterfall">
    <view
      ref="hy-waterfall__left"
      id="hy-waterfall__left--column"
      class="hy-waterfall__column"
    >
      <slot name="left" :leftList="leftList"></slot>
    </view>
    <view
      ref="hy-waterfall__right"
      id="hy-waterfall__right--column"
      class="hy-waterfall__column"
    >
      <slot name="right" :rightList="rightList"></slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-waterfall",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed, getCurrentInstance, ref, watch } from "vue";
import type { PropType } from "vue";
import { getRect, isArray } from "../../libs";

/**
 * 这是一个瀑布流形式的组件，内容分为左右两列，结合uview的懒加载组件效果更佳。
 * 相较于某些只是奇偶数左右分别，或者没有利用vue作用域插槽的做法，
 * uView的瀑布流实现了真正的 组件化，搭配LazyLoad 懒加载和loadMore 加载更多组件，让您开箱即用，眼前一亮。
 * @displayName hy-waterfall
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 数据列表 */
  modelValue: {
    type: Array as PropType<AnyObject[]>,
    default: () => [],
  },
  /** 每次向结构插入数据的时间间隔，间隔越长，越能保证两列高度相近，但是对用户体验越不好 */
  addTime: {
    type: Number,
    default: 200,
  },
  /** id值 */
  idKey: {
    type: String,
    default: "id",
  },
});
const emit = defineEmits(["update:modelValue"]);

const instance = getCurrentInstance();
const leftList = ref<Record<string, any>[]>([]);
const rightList = ref<Record<string, any>[]>([]);
const tempList = ref([]);

/**
 * @description 清空数据列表
 */
const clear = (bak = true) => {
  leftList.value = [];
  rightList.value = [];
  // 同时清除父组件列表中的数据
  if (bak) {
    emit("update:modelValue", []);
  }
  tempList.value = [];
};
// 复制而不是引用对象和数组
const cloneData = (data: AnyObject[]) => {
  return JSON.parse(JSON.stringify(data));
};
const splitData = async () => {
  if (!tempList.value.length) return;
  const leftRect = (await getRect(
    "#hy-waterfall__left--column",
    false,
    instance,
  )) as UniApp.NodeInfo;
  const rightRect = (await getRect(
    "#hy-waterfall__right--column",
    false,
    instance,
  )) as UniApp.NodeInfo;
  // 如果左边小于或等于右边，就添加到左边，否则添加到右边
  let item = tempList.value[0];
  // 解决多次快速上拉后，可能数据会乱的问题，因为经过上面的两个await节点查询阻塞一定时间，加上后面的定时器干扰
  // 数组可能变成[]，导致此item值可能为undefined
  if (!item) return;
  if (leftRect.height !== undefined && rightRect.height !== undefined) {
    if (leftRect.height < rightRect.height) {
      leftList.value.push(item);
    } else if (leftRect.height > rightRect.height) {
      rightList.value.push(item);
    } else {
      // 这里是为了保证第一和第二张添加时，左右都能有内容
      // 因为添加第一张，实际队列的高度可能还是0，这时需要根据队列元素长度判断下一个该放哪边
      if (leftList.value.length <= rightList.value.length) {
        leftList.value.push(item);
      } else {
        rightList.value.push(item);
      }
    }
  }
  // 移除临时列表的第一项
  tempList.value.splice(0, 1);
  // 如果临时数组还有数据，继续循环
  if (tempList.value.length) {
    setTimeout(() => {
      splitData();
    }, props.addTime);
  }
};

/**
 * @description 破坏flowList变量的引用，否则watch的结果新旧值是一样的
 * */
const copyFlowList = computed(() => {
  if (!props.modelValue || props.modelValue.length == 0) {
    clear(false);
    return [];
  } else {
    return cloneData(props.modelValue);
  }
});

watch(
  () => copyFlowList.value,
  (newVal, oldValue) => {
    if (!newVal || newVal.length == 0) {
      clear(false);
    } else {
      // 取差值，即这一次数组变化新增的部分
      let startIndex =
        isArray(oldValue) && oldValue.length > 0 ? oldValue.length : 0;
      // 拼接上原有数据
      tempList.value = tempList.value.concat(
        cloneData(newVal.slice(startIndex)),
      );
      splitData();
    }
  },
  { immediate: true },
);

/**
 * @description 清除某一条指定的数据，根据id实现
 * */
const remove = (id: string) => {
  // 如果findIndex找不到合适的条件，就会返回-1
  let index;
  index = leftList.value.findIndex((val) => val[props.idKey] == id);
  if (index != -1) {
    // 如果index不等于-1，说明已经找到了要找的id，根据index索引删除这一条数据
    leftList.value.splice(index, 1);
  } else {
    // 同理于上方面的方法
    index = rightList.value.findIndex((val) => val[props.idKey] == id);
    if (index != -1) rightList.value.splice(index, 1);
  }
  // 同时清除父组件的数据中的对应id的条目
  index = props.modelValue.findIndex((val) => val[props.idKey] == id);
  if (index != -1) emit("update:modelValue", props.modelValue.splice(index, 1));
};
/**
 * @description 修改某条数据的某个属性
 * @param id 唯一值
 * @param key 键值
 * @param value 数据
 * */
const modify = (id: string, key: string, value: Record<string, any>[]) => {
  // 如果findIndex找不到合适的条件，就会返回-1
  let index;
  index = leftList.value.findIndex((val) => val[props.idKey] == id);
  if (index != -1) {
    // 如果index不等于-1，说明已经找到了要找的id，修改对应key的值
    leftList.value[index][key] = value;
  } else {
    // 同理于上方面的方法
    index = rightList.value.findIndex((val) => val[props.idKey] == id);
    if (index != -1) rightList.value[index][key] = value;
  }
  // 修改父组件的数据中的对应id的条目
  index = props.modelValue.findIndex((val) => val[props.idKey] == id);
  if (index != -1) {
    // 首先复制一份value的数据
    const data = cloneData(props.modelValue);
    // 修改对应索引的key属性的值为value
    data[index][key] = value;
    // 修改父组件通过v-model绑定的变量的值
    emit("update:modelValue", data);
  }
};

defineExpose({
  remove,
  clear,
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
