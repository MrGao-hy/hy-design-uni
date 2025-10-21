<template>
  <view
    ref="hy-subsection"
    :class="[`hy-subsection__${mode}`, 'hy-subsection', customClass]"
    :style="[customStyle, wrapperStyle]"
  >
    <view ref="hy-subsection__bar" :style="barStyle" :class="barClass"></view>
    <view
      :class="wrapperClass(index)"
      :ref="`hy-subsection__item--${index}`"
      :style="itemStyle"
      @tap="clickHandler(item, index)"
      v-for="(item, index) in list"
      :key="index"
    >
      <text class="hy-subsection__item--text" :style="[textStyle(index)]">{{
        getName(item)
      }}</text>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-subsection",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed, ref, onMounted, getCurrentInstance } from "vue";
import type { CSSProperties, PropType } from "vue";
import type { ISubsectionEmits, SubSectionVo } from "./typing";
import { addUnit, getRect, guid } from "../../utils";

/**
 * 该分段器一般用于用户从几个选项中选择某一个的场景
 * @displayName hy-subsection
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps({
  /** 接收值 */
  modelValue: [String, Number],
  /** 默认值 */
  current: {
    type: Number,
    default: 0,
  },
  /** tab的数据 */
  list: {
    type: Array as PropType<SubSectionVo[]>,
    default: () => [],
  },
  /** list的键值 */
  customKeys: {
    type: Object,
    default: () => ({ name: "name", value: "value" }),
  },
  /** 激活时的颜色 */
  activeColor: String,
  /** 未激活时的颜色 */
  inactiveColor: String,
  /**
   * 模式选择，mode=button为按钮形式，mode=subsection时为分段模式
   * @values button,subsection
   * */
  mode: {
    type: String,
    default: "button",
  },
  /** 字体大小，单位px */
  fontSize: {
    type: Number,
    default: 12,
  },
  /** 激活选项的字体是否加粗 */
  bold: {
    type: Boolean,
    default: true,
  },
  /** 组件背景颜色，mode为button时有效 */
  bgColor: String,
  /** 定义需要用到的外部样式 */
  customStyle: Object as PropType<CSSProperties>,
  /** 自定义外部类名 */
  customClass: String,
});
const emit = defineEmits<ISubsectionEmits>();

const instance = getCurrentInstance();
// 组件尺寸
const itemRect = ref<UniApp.NodeInfo>({
  width: 0,
  height: 0,
});
const innerCurrent = ref<number>(0);
const guidClass = guid();

/**
 * @description 容器样式
 * */
const wrapperStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  // button模式时，设置背景色
  if (props.mode === "button") {
    style.backgroundColor = props.bgColor;
  }
  return style;
});
/**
 * @description 容器类名
 * */
const wrapperClass = computed(() => {
  return (index: number) => {
    return [
      "hy-subsection__item",
      "cursor-pointer",
      `hy-subsection__item--${innerCurrent.value}__${guidClass}`,
      `hy-subsection__item--${props.mode}`,
      index < props.list.length - 1 && "hy-subsection__item--no-border-right",
      index === 0 && "hy-subsection__item--first",
      index === props.list.length - 1 && "hy-subsection__item--last",
    ];
  };
});
/**
 * @description 滑块的样式
 * */
const barStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  style.width = `${itemRect.value.width}px`;
  style.height = `${itemRect.value.height}px`;
  // 通过translateX移动滑块，其移动的距离为索引*item的宽度
  style.transform = `translateX(${innerCurrent.value * itemRect.value.width!}px)`;
  if (props.mode === "subsection") {
    // 在subsection模式下，需要动态设置滑块的圆角，因为移动滑块使用的是translateX，无法通过父元素设置overflow: hidden隐藏滑块的直角
    style.backgroundColor = props.activeColor;
  }
  return style;
});
/**
 * @description 滑块的类目
 * */
const barClass = computed(() => {
  let className: string[] = ["hy-subsection__bar", "cursor-pointer"];
  const className_2 = [
    props.mode === "button" && "hy-subsection__button--bar",
    innerCurrent.value === 0 &&
      props.mode === "subsection" &&
      "hy-subsection__bar--first",
    innerCurrent.value > 0 &&
      innerCurrent.value < props.list.length - 1 &&
      props.mode === "subsection" &&
      "hy-subsection__bar--center",
    innerCurrent.value === props.list.length - 1 &&
      props.mode === "subsection" &&
      "hy-subsection__bar--last",
  ].filter(Boolean) as string[];
  className = className.concat(className_2);

  return className;
});
/**
 * @description 分段器item的样式
 * */
const itemStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  if (props.mode === "subsection") {
    // 设置border的样式
    style.borderColor = props.activeColor;
    style.borderWidth = "1px";
    style.borderStyle = "solid";
  }
  return style;
});
/**
 * @description 分段器文字颜色
 * */
const textStyle = computed(() => {
  return (index: number): CSSProperties => {
    const style: CSSProperties = {};
    style.fontWeight =
      props.bold && innerCurrent.value === index ? "bold" : "normal";
    style.fontSize = addUnit(props.fontSize);
    // subsection模式下，激活时默认为白色的文字
    if (props.mode === "subsection") {
      style.color = innerCurrent.value === index ? "#fff" : props.inactiveColor;
    } else {
      // button模式下，激活时文字颜色默认为activeColor
      style.color =
        innerCurrent.value === index ? props.activeColor : props.inactiveColor;
    }
    return style;
  };
});

onMounted(() => {
  init();
});

/**
 * @description 初始化
 * */
const init = () => {
  innerCurrent.value = props.list.findIndex((item: SubSectionVo) => {
    if (typeof item === "string" || typeof item === "number") {
      return item === props.modelValue;
    } else {
      return item[props.customKeys.value] === props.modelValue;
    }
  });

  // 设置默认值当没有找的时候导致样式问题
  innerCurrent.value =
    innerCurrent.value === -1 ? props.current : innerCurrent.value;

  // TODO： 多个数组在一起计算宽度， 宽度不一样会有问题，所以必须加guidClass随机数
  getRect(`.hy-subsection__item--0__${guidClass}`, false, instance).then(
    (size) => {
      itemRect.value = size as UniApp.NodeInfo;
    },
  );
};

/**
 * @description 判断值
 * */
const getValue = (item: SubSectionVo) => {
  return typeof item === "object" ? item[props.customKeys.value] : item;
};

/**
 * @description 判断展示文本
 * */
const getName = (item: SubSectionVo) => {
  return typeof item === "object" ? item[props.customKeys.name] : item;
};

/**
 * @description 点击事件
 * */
const clickHandler = (temp: SubSectionVo, index: number) => {
  // 值改变才触发
  if (innerCurrent.value !== index) {
    emit("change", index);
    emit("update:modelValue", getValue(temp));
  }
  innerCurrent.value = index;
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
