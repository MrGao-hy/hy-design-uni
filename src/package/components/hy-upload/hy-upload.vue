<template>
  <view class="hy-upload" :style="[customStyle]">
    <view class="hy-upload__wrap">
      <template v-if="previewImage">
        <view
          class="hy-upload__wrap__preview"
          v-for="(item, index) in lists"
          :key="index"
        >
          <image
            v-if="item.isImage || (item.type && item.type === 'image')"
            :src="item.thumb || item.url"
            :mode="imageMode"
            class="hy-upload__wrap__preview__image"
            @tap="onPreviewImage(item, index)"
            :style="[
              {
                width: addUnit(width),
                height: addUnit(height),
              },
            ]"
          />
          <view
            v-else
            class="hy-upload__wrap__preview__other"
            @tap="onClickPreview(item, index)"
          >
            <HyIcon
              color="#80CBF9"
              size="26"
              :name="
                item.isVideo || (item.type && item.type === 'video')
                  ? 'movie'
                  : 'folder'
              "
            ></HyIcon>
            <text class="hy-upload__wrap__preview__other__text">
              {{
                item.isVideo || (item.type && item.type === "video")
                  ? "视频"
                  : "文件"
              }}
            </text>
          </view>

          <!-- 上传进度条	-->
          <view class="material-sent" v-if="item.status === 'loading'">
            <progress
              class="select-tips"
              :percent="item.schedule"
              stroke-width="4"
              activeColor="#B99C65"
            />
            <view class="tips-text">上传进度{{ item.schedule }}%</view>
          </view>
          <!-- 上传进度条	-->

          <!-- 删除图片图标 -->
          <view
            class="hy-upload__deletable"
            v-if="item.status !== 'loading' && (deletable || item.deletable)"
            @tap.stop="deleteItem(index)"
          >
            <view class="hy-upload__deletable__icon">
              <HyIcon
                :name="IconConfig.CLOSE"
                color="#ffffff"
                size="14"
              ></HyIcon>
            </view>
          </view>
          <!-- 删除图片图标 -->

          <!-- 上传成功图标 -->
          <view class="hy-upload__success" v-if="item.status === 'success'">
            <!-- #ifndef APP-NVUE -->
            <view class="hy-upload__success__icon">
              <HyIcon
                :name="IconConfig.CHECK_MASK"
                color="#ffffff"
                size="12"
              ></HyIcon>
            </view>
            <!-- #endif -->
          </view>
          <!-- 上传成功图标 -->
        </view>
      </template>

      <template v-if="isInCount">
        <view v-if="$slots.trigger" @tap="chooseFileFn">
          <slot name="trigger" />
        </view>
        <view
          v-else-if="!$slots.trigger && ($slots.default || $slots.$default)"
          @tap="chooseFileFn"
        >
          <slot />
        </view>
        <view
          v-else
          class="hy-upload__button"
          :hover-class="!disabled ? 'hy-upload__button--hover' : ''"
          hover-stay-time="150"
          @tap="chooseFileFn"
          :class="[disabled && 'hy-upload__button--disabled']"
          :style="[
            {
              width: addUnit(width),
              height: addUnit(height),
            },
          ]"
        >
          <HyIcon
            :name="uploadIcon"
            size="26"
            :color="uploadIconColor"
          ></HyIcon>
          <text v-if="uploadText" class="hy-upload__button__text">{{
            uploadText
          }}</text>
        </view>
      </template>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "hy-upload",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { PropType, CSSProperties } from "vue";
import type { FileVo, IUploadEmits, ReadFunctionVo } from "./typing";
import { addUnit, bytesToSize, chooseFile, isArray } from "../../utils";
import { IconConfig } from "../../config";
// 组件
import HyIcon from "../hy-icon/hy-icon.vue";

/**
 * 该组件用于上传图片或者视频等场景
 * @displayName hy-upload
 */
defineOptions({});

// const props = withDefaults(defineProps<IProps>(), defaultProps)
const props = defineProps({
  /**
   * 接受的文件类型
   * @values all,media,image,file,video
   * */
  accept: {
    type: String,
    default: "image",
  },
  /** 根据文件拓展名过滤，每一项都不能是空字符串。默认不过滤。 */
  extension: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  /** 图片或视频拾取模式，当accept为image类型时设置capture可选额外camera可以直接调起摄像头 */
  capture: {
    type: Array as PropType<("album" | "camera")[]>,
    default: () => ["album", "camera"],
  },
  /** 当accept为video时生效，是否压缩视频 */
  compressed: {
    type: Boolean,
    default: true,
  },
  /** 当accept为video时生效，可选值为back或front */
  camera: {
    type: String,
    default: "back",
  },
  /** 当accept为video时生效，拍摄视频最长拍摄时间，单位秒 */
  maxDuration: {
    type: Number,
    default: 60,
  },
  /** 上传区域的图标，只能内置图标 */
  uploadIcon: {
    type: String,
    default: IconConfig.UPLOAD,
  },
  /** 上传区域的图标的字体颜色，只能内置图标 */
  uploadIconColor: {
    type: String,
    default: "#D3D4D6",
  },
  /** 是否开启文件读取前事件 */
  useBeforeRead: {
    type: Boolean,
    default: false,
  },
  /** 是否显示组件自带的图片预览功能 */
  previewFullImage: {
    type: Boolean,
    default: true,
  },
  /** 最大上传数量 */
  maxCount: {
    type: Number,
    default: 52,
  },
  /** 是否启用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 预览上传的图片时的裁剪模式，和image组件mode属性一致
   * @values scaleToFill,aspectFit,aspectFill,widthFix,heightFix,top,bottom,center,left,right,top left,top right,bottom left,bottom right
   * */
  imageMode: {
    type: String,
    default: "aspectFill",
  },
  /** 标识符，可以在回调函数的第二项参数中获取 */
  name: {
    type: String,
    default: "",
  },
  /** 所选的图片的尺寸 */
  sizeType: {
    type: Array as PropType<("original" | "compressed")[]>,
    default: ["original", "compressed"],
  },
  /** 是否开启图片多选，部分安卓机型不支持 */
  multiple: {
    type: Boolean,
    default: false,
  },
  /** 是否展示删除按钮 */
  deletable: {
    type: Boolean,
    default: true,
  },
  /** 文件大小限制，单位为byte */
  maxSize: {
    type: Number,
    default: Number.MAX_VALUE,
  },
  /** 显示已上传的文件列表 */
  fileList: {
    type: Array as PropType<FileVo[]>,
    default: () => [],
  },
  /** 上传区域的提示文字 */
  uploadText: {
    type: String,
    default: "",
  },
  /** 内部预览图片区域和选择图片按钮的区域宽度 */
  width: {
    type: [String, Number],
    default: 80,
  },
  /** 内部预览图片区域和选择图片按钮的区域高度 */
  height: {
    type: [String, Number],
    default: 80,
  },
  /** 读取前的处理函数 */
  beforeRead: Function as PropType<ReadFunctionVo>,
  /** 读取后的处理函数 */
  afterRead: Function as PropType<ReadFunctionVo>,
  /** 定义需要用到的外部样式 */
  customStyle: {
    type: Object as PropType<CSSProperties>,
  },
});
const emit = defineEmits<IUploadEmits>();

const lists = ref<FileVo[]>([]);
// 上传按钮
const isInCount = ref<boolean>(true);
// 遮罩框
const previewImage = ref<boolean>(true);

const formatFileList = () => {
  lists.value = props.fileList.map((item: FileVo) =>
    Object.assign(Object.assign({}, item), {
      // 如果item.url为本地选择的blob文件的话，无法判断其为video还是image，此处优先通过accept做判断处理
      isImage: props.accept === "image",
      isVideo: props.accept === "video",
      deletable: item.deletable || props.deletable,
    }),
  );
  isInCount.value = lists.value.length < props.maxCount;
};

watch(
  () => props.fileList,
  () => {
    formatFileList();
  },
  { immediate: true, deep: true },
);

watch(
  () => props.deletable,
  () => {
    formatFileList();
  },
);

watch(
  () => props.maxCount,
  () => {
    formatFileList();
  },
);

watch(
  () => props.accept,
  () => {
    formatFileList();
  },
);

const chooseFileFn = () => {
  if (props.disabled) return;
  // 如果用户传入的是字符串，需要格式化成数组
  chooseFile(
    Object.assign(
      {
        accept: props.accept,
        extension: props.extension,
        multiple: props.multiple,
        capture: props.capture,
        compressed: props.compressed,
        maxDuration: props.maxDuration,
        sizeType: props.sizeType,
        camera: props.camera,
      },
      {
        maxCount: props.maxCount - lists.value.length,
      },
    ),
  )
    .then((res: any) => {
      onBeforeRead(props.multiple ? res : res[0]);
    })
    .catch((error) => {
      emit("error", error);
    });
};
// 文件读取之前
const onBeforeRead = (file: FileVo) => {
  let res: any = true;
  // beforeRead是否为一个方法
  if (typeof props.beforeRead === "function") {
    // 如果用户定义了此方法，则去执行此方法，并传入读取的文件回调
    res = props.beforeRead(file, getDetail());
  }
  if (props.useBeforeRead) {
    res = new Promise((resolve, reject) => {
      emit(
        "beforeRead",
        Object.assign(
          Object.assign(
            {
              file,
            },
            getDetail(),
          ),
          {
            callback: (ok: any) => {
              ok ? resolve(ok) : reject();
            },
          },
        ),
      );
    });
  }
  if (!res) return;
  if (typeof res === "function") {
    res.then((data: any) => onAfterRead(data || file));
  } else {
    onAfterRead(file);
  }
};
const getDetail = (index?: number) => {
  return {
    name: props.name,
    index: index == null ? props.fileList.length : index,
  };
};
const onAfterRead = (file: FileVo) => {
  const oversize = isArray(file)
    ? file.some((item) => item.size > props.maxSize)
    : Number(file.size) > props.maxSize;
  if (oversize) {
    emit(
      "oversize",
      Object.assign(
        {
          file,
        },
        getDetail(),
      ),
    );
    return;
  }
  if (typeof props.afterRead === "function") {
    props.afterRead(file, getDetail());
  }
  emit(
    "afterRead",
    Object.assign(
      {
        file,
      },
      getDetail(),
    ),
  );
};

/**
 * @description 删除文件
 * */
const deleteItem = (index: number) => {
  props.fileList.splice(index, 1);
  isInCount.value = lists.value.length < props.maxCount;
  emit(
    "delete",
    Object.assign(Object.assign({}, getDetail(index)), {
      file: props.fileList[index],
    }),
  );
};

/**
 * @description 预览图片
 * */
const onPreviewImage = (previewItem: FileVo, index: number) => {
  if (!previewItem.isImage || !props.previewFullImage) return;
  let current = 0;
  const urls: string[] = [];
  let imageIndex = 0;
  for (let i = 0; i < lists.value.length; i++) {
    const item: FileVo = lists.value[i];
    if (item.isImage || (item.type && item.type === "image")) {
      urls.push(item.url || (item.thumb as string));
      if (i === index) {
        current = imageIndex;
      }
      imageIndex += 1;
    }
  }
  if (!urls || urls.length < 1) return;
  uni.previewImage({
    urls: urls,
    current: current,
    fail() {
      uni.showToast({ title: "预览图片失败" });
    },
  });
};

/**
 * @description 预览视频
 * */
const onPreviewVideo = (index: number) => {
  if (!props.previewFullImage) return;
  let current = 0;
  const sources: any[] = [];
  let videoIndex = 0;
  for (let i = 0; i < lists.value.length; i++) {
    const item: FileVo = lists.value[i];
    if (item.isVideo || (item.type && item.type === "video")) {
      sources.push(
        Object.assign(Object.assign({}, item), {
          type: "video",
        }),
      );
      if (i === index) {
        current = videoIndex;
      }
      videoIndex += 1;
    }
  }
  if (sources.length < 1) {
    return;
  }
  // #ifdef MP-WEIXIN
  wx.previewMedia({
    sources: sources,
    current: current,
    fail() {
      uni.showToast({ title: "预览视频失败" });
    },
  });
  // #endif
};

const onClickPreview = (item: FileVo, index: number) => {
  if (!props.previewFullImage) return;
  switch (item.type) {
    case "video":
      onPreviewVideo(index);
      break;
    default:
      break;
  }
  emit(
    "clickPreview",
    Object.assign(Object.assign({}, item), getDetail(index)),
  );
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
