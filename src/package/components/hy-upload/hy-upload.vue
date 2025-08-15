<template>
  <view class="hy-upload" :style="[customStyle]">
    <view class="hy-upload__wrap">
      <template v-if="previewImage">
        <view class="hy-upload__wrap__preview" v-for="(item, index) in lists" :key="index">
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
          <view v-else class="hy-upload__wrap__preview__other" @tap="onClickPreview(item, index)">
            <u-icon
              color="#80CBF9"
              size="26"
              :name="item.isVideo || (item.type && item.type === 'video') ? 'movie' : 'folder'"
            ></u-icon>
            <text class="hy-upload__wrap__preview__other__text">
              {{ item.isVideo || (item.type && item.type === 'video') ? '视频' : '文件' }}
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
              <HyIcon :name="IconConfig.CLOSE" color="#ffffff" size="14"></HyIcon>
            </view>
          </view>
          <!-- 删除图片图标 -->

          <!-- 上传成功图标 -->
          <view class="hy-upload__success" v-if="item.status === 'success'">
            <!-- #ifndef APP-NVUE -->
            <view class="hy-upload__success__icon">
              <HyIcon :name="IconConfig.CHECK_MASK" color="#ffffff" size="12"></HyIcon>
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
          <HyIcon :name="uploadIcon" size="26" :color="uploadIconColor"></HyIcon>
          <text v-if="uploadText" class="hy-upload__button__text">{{ uploadText }}</text>
        </view>
      </template>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-upload',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import defaultProps from './props'
import type IProps from './typing'
import type { FileVo } from './typing'
import { addUnit, chooseFile } from '../../utils'
import { IconConfig } from '../../config'
// 组件
import HyIcon from '../hy-icon/hy-icon.vue'

/**
 * 该组件用于上传图片或者视频等场景
 * @displayName hy-upload
 */
defineOptions({})

const props = withDefaults(defineProps<IProps>(), defaultProps)
const {
  accept,
  fileList,
  maxCount,
  disabled,
  extension,
  multiple,
  compressed,
  maxDuration,
  sizeType,
  camera,
  name,
  maxSize,
  previewFullImage,
  deletable,
  useBeforeRead,
} = toRefs(props)
const emit = defineEmits(['clickPreview', 'beforeRead', 'error', 'delete', 'afterRead', 'oversize'])

const lists = ref<FileVo[]>([])
const isInCount = ref<boolean>(true)
const previewImage = ref<boolean>(true)

const formatFileList = () => {
  lists.value = fileList.value.map((item: FileVo) =>
    Object.assign(Object.assign({}, item), {
      // 如果item.url为本地选择的blob文件的话，无法判断其为video还是image，此处优先通过accept做判断处理
      isImage: accept.value === 'image',
      isVideo: accept.value === 'video',
      deletable: item.deletable || deletable.value,
    }),
  )
  isInCount.value = lists.value.length < maxCount.value
}

watch(
  () => fileList.value,
  () => {
    formatFileList()
  },
  { immediate: true, deep: true },
)

watch(
  () => deletable.value,
  () => {
    formatFileList()
  },
)

watch(
  () => maxCount.value,
  () => {
    formatFileList()
  },
)

watch(
  () => accept.value,
  () => {
    formatFileList()
  },
)

const chooseFileFn = () => {
  if (disabled.value) return
  // 如果用户传入的是字符串，需要格式化成数组
  let capture
  try {
    capture = Array.isArray(capture) ? capture : capture!.split(',')
  } catch (e) {
    capture = []
  }
  chooseFile(
    Object.assign(
      {
        accept: accept.value,
        extension: extension.value,
        multiple: multiple.value,
        capture: capture,
        compressed: compressed.value,
        maxDuration: maxDuration.value,
        sizeType: sizeType.value,
        camera: camera.value,
      },
      {
        maxCount: maxCount.value - lists.value.length,
      },
    ),
  )
    .then((res: any) => {
      onBeforeRead(multiple.value ? res : res[0])
    })
    .catch((error) => {
      emit('error', error)
    })
}
// 文件读取之前
const onBeforeRead = (file: FileVo) => {
  let res: any = true
  // beforeRead是否为一个方法
  if (typeof props.beforeRead === 'function') {
    // 如果用户定义了此方法，则去执行此方法，并传入读取的文件回调
    res = props.beforeRead(file, getDetail())
  }
  if (useBeforeRead.value) {
    res = new Promise((resolve, reject) => {
      emit(
        'beforeRead',
        Object.assign(
          Object.assign(
            {
              file,
            },
            getDetail(),
          ),
          {
            callback: (ok: any) => {
              ok ? resolve(ok) : reject()
            },
          },
        ),
      )
    })
  }
  if (!res) return
  if (typeof res === 'function') {
    res.then((data: any) => onAfterRead(data || file))
  } else {
    onAfterRead(file)
  }
}
const getDetail = (index?: number) => {
  return {
    name: name.value,
    index: index == null ? fileList.value.length : index,
  }
}
const onAfterRead = (file: FileVo) => {
  const oversize = Array.isArray(file)
    ? file.some((item) => item.size > maxSize.value)
    : file.size > maxSize.value
  if (oversize) {
    emit(
      'oversize',
      Object.assign(
        {
          file,
        },
        getDetail(),
      ),
    )
    return
  }
  if (typeof props.afterRead === 'function') {
    props.afterRead(file, getDetail())
  }
  emit(
    'afterRead',
    Object.assign(
      {
        file,
      },
      getDetail(),
    ),
  )
}

/**
 * @description 删除文件
 * */
const deleteItem = (index: number) => {
  fileList.value.splice(index, 1)
  isInCount.value = lists.value.length < maxCount.value
  emit(
    'delete',
    Object.assign(Object.assign({}, getDetail(index)), {
      file: fileList.value[index],
    }),
  )
}

/**
 * @description 预览图片
 * */
const onPreviewImage = (previewItem: FileVo, index: number) => {
  if (!previewItem.isImage || !previewFullImage.value) return
  let current = 0
  const urls = []
  let imageIndex = 0
  for (var i = 0; i < lists.value.length; i++) {
    const item: FileVo = lists.value[i]
    if (item.isImage || (item.type && item.type === 'image')) {
      urls.push(item.url || item.thumb)
      if (i === index) {
        current = imageIndex
      }
      imageIndex += 1
    }
  }
  if (urls.length < 1) {
    return
  }
  uni.previewImage({
    urls: urls,
    current: current,
    fail() {
      uni.showToast({ title: '预览图片失败' })
    },
  })
}

/**
 * @description 预览视频
 * */
const onPreviewVideo = (index: number) => {
  if (!previewFullImage.value) return
  let current = 0
  const sources: any[] = []
  let videoIndex = 0
  for (let i = 0; i < lists.value.length; i++) {
    const item: FileVo = lists.value[i]
    if (item.isVideo || (item.type && item.type === 'video')) {
      sources.push(
        Object.assign(Object.assign({}, item), {
          type: 'video',
        }),
      )
      if (i === index) {
        current = videoIndex
      }
      videoIndex += 1
    }
  }
  if (sources.length < 1) {
    return
  }
  // #ifdef MP-WEIXIN
  wx.previewMedia({
    sources: sources,
    current: current,
    fail() {
      uni.showToast({ title: '预览视频失败' })
    },
  })
  // #endif
}

const onClickPreview = (item: FileVo, index: number) => {
  if (!previewFullImage.value) return
  switch (item.type) {
    case 'video':
      onPreviewVideo(index)
      break
    default:
      break
  }
  emit('clickPreview', Object.assign(Object.assign({}, item), getDetail(index)))
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
