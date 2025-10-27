<template>
  <view
    class="hy-swiper"
    :style="{
      backgroundColor: bgColor,
      height: addUnit(height),
      borderRadius: addUnit(radius),
    }"
  >
    <view class="hy-swiper__loading" v-if="loading">
      <HyIcon :is-rotate="loading" :name="IconConfig.LOADING"></HyIcon>
    </view>
    <swiper
      v-else
      class="hy-swiper__wrapper"
      :style="{
        flex: '1',
        height: addUnit(height),
      }"
      @change="change"
      :circular="circular"
      :interval="interval"
      :duration="duration"
      :autoplay="autoplay"
      :current="current"
      :currentItemId="currentItemId"
      :previousMargin="addUnit(previousMargin)"
      :nextMargin="addUnit(nextMargin)"
      :acceleration="acceleration"
      :displayMultipleItems="list.length > 0 ? displayMultipleItems : 0"
      :easingFunction="easingFunction"
    >
      <swiper-item
        class="hy-swiper__wrapper--item"
        v-for="(item, index) in list"
        :key="index"
      >
        <slot :record="item" :index="index">
          <view
            class="hy-swiper__wrapper--item__wrapper"
            :style="[itemStyle(index)]"
          >
            <!-- 在nvue中，image图片的宽度默认为屏幕宽度，需要通过flex:1撑开，另外必须设置高度才能显示图片 -->
            <image
              class="hy-swiper__wrapper--item__wrapper--image"
              v-if="getItemType(item) === 'image'"
              :src="getSource(item)"
              :mode="imgMode"
              @tap="clickHandler(index)"
              :style="{
                height: addUnit(height),
                borderRadius: addUnit(radius),
              }"
            ></image>
            <video
              class="hy-swiper__wrapper--item__wrapper--video"
              v-if="getItemType(item) === 'video'"
              :id="`video-${index}`"
              :enable-progress-gesture="false"
              :src="getSource(item)"
              :poster="getPoster(item)"
              :title="showTitle && hasTitle(item)"
              :style="{
                height: addUnit(height),
              }"
              controls
              @tap="clickHandler(index)"
            ></video>
            <view
              v-if="showTitle && hasTitle(item)"
              class="hy-swiper__wrapper--item__wrapper--title"
            >
              <text class="hy-line-1">{{ hasTitle(item) }}</text>
            </view>
          </view>
        </slot>
      </swiper-item>
    </swiper>
    <view class="hy-swiper__indicator" :style="[indicatorStyle]">
      <slot name="indicator">
        <HySwiperIndicator
          v-if="!loading && indicator && !showTitle"
          :indicatorActiveColor="indicatorActiveColor"
          :indicatorInactiveColor="indicatorInactiveColor"
          :length="list.length"
          :current="currentIndex"
          :indicatorMode="indicatorMode"
        ></HySwiperIndicator>
      </slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-swiper",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { computed, ref, watch, getCurrentInstance } from "vue";
import type { CSSProperties, PropType } from "vue";
import { addUnit, isVideo, IconConfig } from "../../libs";
import type { ISwiperEmits, SwiperList, SwiperVo } from "./typing";

// 组件
import HyIcon from "../hy-icon/hy-icon.vue";
import HySwiperIndicator from "./hy-swiper-indicator.vue";
import type { SwiperEasingFunction } from "@uni-helper/uni-types";

/**
 * 一般用于导航轮播，广告展示等场景,可开箱即用
 * @displayName hy-swiper
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps);
const props = defineProps({
  /** 轮播图数据 */
  list: {
    type: Array as PropType<string[] | SwiperList[]>,
    default: () => [],
  },
  /** list数组中指定对象的目标属性名 */
  keyName: {
    type: String,
    default: "url",
  },
  /** 是否显示面板指示器 */
  indicator: {
    type: Boolean,
    default: false,
  },
  /** 指示器非激活颜色 */
  indicatorActiveColor: {
    type: String,
    default: "#FFFFFF",
  },
  /** 指示器的激活颜色 */
  indicatorInactiveColor: {
    type: String,
    default: "rgba(255, 255, 255, 0.35)",
  },
  /** 指示器样式，可通过bottom，left，right进行定位 */
  indicatorStyle: Object as PropType<CSSProperties>,
  /**
   * 指示器模式
   * @values line,dot
   * */
  indicatorMode: {
    type: String as PropType<HyApp.SwiperIndicatorModeType>,
    default: "line",
  },
  /** 是否自动切换 */
  autoplay: {
    type: Boolean,
    default: true,
  },
  /** 当前所在滑块的 index */
  current: {
    type: Number,
    default: 0,
  },
  /** 当前所在滑块的 item-id ，不能与 current 被同时指定 */
  currentItemId: String,
  /** 滑块自动切换时间间隔（ms） */
  interval: {
    type: Number,
    default: 3000,
  },
  /** 滑块切换过程所需时间（ms） */
  duration: {
    type: Number,
    default: 300,
  },
  /** 播放到末尾后是否重新回到开头 */
  circular: {
    type: Boolean,
    default: false,
  },
  /** 前边距，可用于露出前一项的一小部分，nvue和支付宝不支持 */
  previousMargin: {
    type: [String, Number],
    default: 0,
  },
  /** 后边距，可用于露出后一项的一小部分，nvue和支付宝不支持 */
  nextMargin: {
    type: [String, Number],
    default: 0,
  },
  /** 当开启时，会根据滑动速度，连续滑动多屏，支付宝不支持 */
  acceleration: {
    type: Boolean,
    default: false,
  },
  /** 同时显示的滑块数量，nvue、支付宝小程序不支持 */
  displayMultipleItems: {
    type: Number,
    default: 1,
  },
  /**
   * 指定swiper切换缓动动画类型， 只对微信小程序有效
   * @values default,linear,easeInCubic,easeOutCubic,easeInOutCubic
   * */
  easingFunction: {
    type: String as PropType<SwiperEasingFunction>,
    default: "default",
  },
  /** 图片的裁剪模式 */
  imgMode: {
    type: String,
    default: "aspectFill",
  },
  /** 组件高度 */
  height: {
    type: Number,
    default: 130,
  },
  /** 背景颜色 */
  bgColor: {
    type: String,
    default: "#f3f4f6",
  },
  /** 组件圆角，数值或带单位的字符串 */
  radius: {
    type: [String, Number],
    default: 4,
  },
  /** 轮播图是否加载中数据 */
  loading: {
    type: Boolean,
    default: false,
  },
  /** 是否显示标题，要求数组对象中有title属性 */
  showTitle: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits<ISwiperEmits>();

const instance = getCurrentInstance();
const currentIndex = ref<string | number>(0);

watch(
  () => props.current,
  (newVal) => {
    currentIndex.value = newVal;
  },
);

const hasTitle = computed(() => {
  return (item: string | Record<string, any>) => {
    if (typeof item === "object") {
      return item.title || "";
    } else {
      return "";
    }
  };
});

/**
 * @description 轮播图3D效果
 * */
const itemStyle = computed(() => {
  return (index: number): CSSProperties => {
    const style: CSSProperties = {};
    // #ifndef APP-NVUE || MP-TOUTIAO
    // 左右流出空间的写法不支持nvue和头条
    // 只有配置了此二值，才加上对应的圆角，以及缩放
    if (props.nextMargin && props.previousMargin) {
      style.borderRadius = addUnit(props.radius);
      if (index !== currentIndex.value) style.transform = "scale(0.92)";
    }
    // #endif
    return style;
  };
});

/**
 * @description 获取目标路径，可能数组中为字符串，对象的形式，额外可指定对象的目标属性名keyName
 * */
const getSource = (item: string | Record<string, any>): string => {
  if (typeof item === "string") return item;
  if (typeof item === "object" && props.keyName) return item[props.keyName];
  return "";
};

/**
 * @description 轮播切换事件
 */
const change = (e: SwiperVo) => {
  // 当前的激活索引
  const { current } = e.detail;
  pauseVideo(currentIndex.value);
  currentIndex.value = current;
  emit("update:current", currentIndex.value);
  emit("change", e.detail);
};

/**
 * @description 切换轮播时，暂停视频播放
 * */
const pauseVideo = (index: number | string) => {
  const lastItem = getSource(props.list[Number(index)]);
  if (isVideo(lastItem)) {
    // 当视频隐藏时，暂停播放
    const video = uni.createVideoContext(`video-${index}`, instance);
    video.pause();
  }
};

/**
 * @description 当一个轮播item为视频时，获取它的视频海报
 * */
const getPoster = (item: string | SwiperList): string => {
  return typeof item === "object" && item.poster ? item.poster : "";
};

/**
 * @description 点击某个item
 * */
const clickHandler = (index: number) => {
  emit("click", index);
};

/**
 * @description 判断链接是视频还是图片
 * */
const getItemType = computed(() => {
  return (item: string | Record<string, unknown>) => {
    if (typeof item === "string") return isVideo(item) ? "video" : "image";
    if (typeof item === "object" && props.keyName) {
      if (!item.type)
        return isVideo(item[props.keyName] as string) ? "video" : "image";
      if (item.type === "image") return "image";
      if (item.type === "video") return "video";
      return "image";
    }
  };
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
