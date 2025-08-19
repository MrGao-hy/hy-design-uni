<template>
  <!-- 标题栏 -->
  <view
    :class="['hy-dropdown-item__header', isOpen && 'is-active']"
    @click="handleClick"
  >
    <text
      class="hy-dropdown-item__header--title"
      :style="{ color: currentColor, fontSize: addUnit(titleSize) }"
    >
      {{ title }}
    </text>
    <HyIcon
      :custom-style="{
        transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
      }"
      :name="menuIcon"
      :size="menuIconSize"
      :color="currentColor"
    ></HyIcon>
  </view>
  <!-- 下拉弹窗 -->
  <HyOverlay
    :show="isOpen"
    :custom-style="{ top: addUnit(dropPopupTop) }"
    @click="closePopupFn"
  >
    <view
      class="hy-dropdown-item__main"
      :style="{ top: addUnit(dropPopupTop), height: addUnit(dropHeight) }"
    >
      <view class="hy-dropdown-item__main--container" :class="customClass">
        <!-- 插槽 -->
        <slot v-if="hasSlot"></slot>
        <!-- 选项 -->
        <view class="hy-dropdown-item__main--container__list" v-else>
          <view
            :class="[
              'hy-dropdown-item__main--container__list-item',
              currentIndex === index && 'is-active',
            ]"
            v-for="(item, index) in menus"
            :key="item.value || index"
            @click="onSelect(item, index)"
          >
            <view
              class="hy-dropdown-item__main--container__list-item--label"
              :style="{
                color: currentIndex === index ? currentColor : inactiveColor,
              }"
            >
              {{ item.label }}
            </view>
            <!-- 勾选图标 -->
            <HyIcon
              v-if="currentIndex === index"
              :color="currentColor"
              :name="IconConfig.CHECK_MASK"
            ></HyIcon>
          </view>
        </view>
      </view>
    </view>
  </HyOverlay>
</template>

<script lang="ts">
export default {
  name: "hy-dropdown-item",
  options: {
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import {
  computed,
  inject,
  ref,
  onMounted,
  watch,
  useSlots,
  getCurrentInstance,
  type PropType,
} from "vue";
import type { IDropdownItemEmits, DropdownMenuItem } from "./typing";
import type FatherIProps from "../hy-dropdown/typing";
import { addUnit, getRect, throttle } from "../../utils";
import { IconConfig } from "../../config";
// 组件
import HyOverlay from "../hy-overlay/hy-overlay.vue";
import HyIcon from "../hy-icon/hy-icon.vue";

/**
 * 主要提供筛选下拉筛选框，内置基础筛选功能，可以根据自己的需求自定义筛选项。和hy-dropdown组合用法
 * @displayName hy-dropdown-item
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /** 获取值 */
  modelValue: String,
  /** 标题 */
  title: String,
  /** 下拉选择值 */
  menus: {
    type: Array as unknown as PropType<DropdownMenuItem[]>,
    default: [],
  },
  /** 禁用组件点击 */
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits<IDropdownItemEmits>();

const slots = useSlots();
//是否有插槽
const hasSlot = computed(() => {
  return Object.keys(slots).length > 0;
});
const instance = getCurrentInstance();
//父的props值
const dropdownProps: FatherIProps | undefined = inject("dropdownProps");
const { titleSize, menuIcon, menuIconSize, inactiveColor } =
  dropdownProps as FatherIProps;
//当前打开的dropItem项（标签名）
const currentDropItem: any = inject("currentDropItem");
//当前文字/箭头颜色
const currentColor = computed(() => {
  return isOpen.value ? dropdownProps?.activeColor : inactiveColor;
});
//是否打开
const isOpen = ref<boolean>(false);
//下拉弹窗距离页面顶部距离
const dropPopupTop = ref(0);
//下拉弹窗高度
const dropHeight = ref<string | number>(0);
//下拉选项当前选中的索引
const currentIndex = ref(-1);

//动态class
const customClass = computed(() => (isOpen.value ? "visible" : "hidden"));

onMounted(() => {
  getDropPopupTop();
});

/**
 * @description 计算下拉弹窗区域距离页面顶部距离
 * */
const getDropPopupTop = () => {
  getRect(".hy-dropdown-item__header", false, instance).then((rect) => {
    const { bottom } = rect as UniApp.NodeInfo;
    // #ifdef H5
    //H5需要加上导航栏高度，固定44px
    dropPopupTop.value = (bottom || 0) + 44;
    // #endif
    //  #ifndef H5
    dropPopupTop.value = bottom || 0;
    // #endif
  });
};

watch(isOpen, (v) => {
  //打开状态显示父容器
  if (v) {
    dropHeight.value = "auto";
  } else {
    //关闭状态隐藏父容器
    //延迟改变使得关闭动画能完整呈现
    setTimeout(() => {
      dropHeight.value = 0;
    }, 200);
  }
});
/**
 * @description 动态控制开关,
 * @desc 防止点击展开后在点击下一个，导致上一个没有关闭bug
 * */
watch(
  () => currentDropItem?.value,
  (newVal) => {
    //关闭其他条件的下拉弹窗
    if (newVal !== props.title) {
      isOpen.value = false;
    }
  },
);

//根据双向绑定值动态设置下拉选中项索引
watch(
  () => props.modelValue,
  (newVal) => {
    currentIndex.value = props.menus.findIndex((item) => item.value === newVal);
  },
  { immediate: true },
);

//选中监听
const onSelect = (item: DropdownMenuItem, index: number) => {
  isOpen.value = false;
  if (index !== currentIndex.value) {
    currentIndex.value = index;
    emit("change", item, index);
    emit("update:modelValue", item);
  }
};

/**
 * @description 打开或关闭
 * */
const handleClick = () =>
  throttle(() => {
    //节流处理，防止点击过快动画未结束又切换导致显示bug
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
      // 防止点击展开后在点击下一个，导致上一个没有关闭bug
      currentDropItem.value = props.title;
      getDropPopupTop();
    }
  });

/**
 * @description 点击遮罩框关闭弹窗
 * */
const closePopupFn = () => {
  if (dropdownProps?.closeOnClickMask) {
    isOpen.value = false;
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
