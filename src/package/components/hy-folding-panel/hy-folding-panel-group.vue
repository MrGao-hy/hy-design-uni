<template>
  <view class="hy-folding-panel-group">
    <slot></slot>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-folding-panel-group"
};
</script>

<script setup lang="ts">
import { provide, ref, watch, onMounted, nextTick, getCurrentInstance } from 'vue';
import type { Ref } from 'vue';

// Props定义
const props = defineProps({
  /**
   * 当前激活的面板索引，支持v-model
   */
  modelValue: {
    type: Number,
    default: -1
  },
  /**
   * 是否手风琴模式，默认true
   */
  accordion: {
    type: Boolean,
    default: true
  },
  /**
   * 是否禁用整个折叠面板组
   */
  disabled: {
    type: Boolean,
    default: false
  }
});

// 事件定义
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'change', index: number): void;
  (e: 'open', index: number): void;
  (e: 'close', index: number): void;
}>();

// 内部激活索引
const activeIndex = ref(props.modelValue);

// 监听v-model变化
watch(() => props.modelValue, (newVal) => {
  activeIndex.value = newVal;
});

// 监听内部激活索引变化
watch(activeIndex, (newVal) => {
  emit('update:modelValue', newVal);
  emit('change', newVal);
});

// 提供给子组件的方法
const updateActiveIndex = (index: number) => {
  if (props.disabled) return;
  
  if (props.accordion) {
    // 手风琴模式下，如果点击的是当前激活的索引，则关闭（设为-1）
    const wasActive = activeIndex.value === index;
    activeIndex.value = wasActive ? -1 : index;
    
    // 触发相应的事件
    if (!wasActive) {
      emit('open', index);
    } else {
      emit('close', index);
    }
  } else {
    // 非手风琴模式下，这里不做特殊处理，由子组件自己控制
    activeIndex.value = index;
  }
};

// 提供给子组件的配置
provide('hy-folding-panel-group', {
  accordion: props.accordion,
  disabled: props.disabled,
  activeIndex,
  updateActiveIndex
});

// 自动为子组件设置索引
onMounted(() => {
  nextTick(() => {
    const children = getCurrentInstance()?.proxy?.$el?.querySelectorAll('.hy-folding-panel-item');
    children?.forEach((child, index) => {
      const vueComponent = (child as any).__vueParentComponent?.proxy;
      if (vueComponent && vueComponent.$options.name === 'hy-folding-panel-item') {
        vueComponent.index = index;
      }
    });
  });
});

// 对外暴露的方法
defineExpose({
  /**
   * 打开指定索引的面板
   */
  open: (index: number) => {
    if (props.disabled) return;
    activeIndex.value = index;
    emit('open', index);
  },
  
  /**
   * 关闭所有面板
   */
  closeAll: () => {
    if (props.disabled) return;
    const prevIndex = activeIndex.value;
    activeIndex.value = -1;
    if (prevIndex !== -1) {
      emit('close', prevIndex);
    }
  },
  
  /**
   * 切换指定索引面板的状态
   */
  toggle: (index: number) => {
    if (props.disabled) return;
    updateActiveIndex(index);
  },
  
  /**
   * 关闭指定索引的面板
   */
  close: (index: number) => {
    if (props.disabled) return;
    if (activeIndex.value === index) {
      activeIndex.value = -1;
      emit('close', index);
    }
  }
});
</script>

<style lang="scss" scoped>
.hy-folding-panel-group {
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.hy-folding-panel-group--disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>