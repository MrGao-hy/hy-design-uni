<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">基础使用</view>
    <hy-upload
      :fileList="list"
      name="1"
      multiple
      :maxCount="1"
      @afterRead="afterRead"
    ></hy-upload>

    <view class="hy-title">限制图片上传大小</view>
    <hy-upload
      :fileList="list_2"
      :max-size="maxSize"
      @oversize="oversizeFn"
      @afterRead="afterRead_2"
    ></hy-upload>

    <view class="hy-title">多张图片上传</view>
    <hy-upload
      :fileList="list_1"
      @afterRead="afterRead_1"
      multiple
      upload-text="上传图片"
    ></hy-upload>

    <view class="hy-title">限制只上传视频</view>
    <hy-upload
      :fileList="list_3"
      @afterRead="afterRead_3"
      upload-text="上传视频"
      accept="video"
    ></hy-upload>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyUpload from "@/package/components/hy-upload/hy-upload.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import type {
  FileVo,
  UploadFileParams,
} from "@/package/components/hy-upload/typing";
import { ref } from "vue";
import { useThemeStore } from "@/store";
import { bytesToSize, isArray } from "@/package";
import { storeToRefs } from "pinia";
const themeStore = useThemeStore();

const { themeColor, darkMode } = storeToRefs(themeStore);
const maxSize = ref(500000);

const list = ref<FileVo[]>([
  {
    status: "success",
    message: "上传中",
    url: "https://img0.baidu.com/it/u=3196617431,1263013381&fm=253",
  },
]);
const list_1 = ref<FileVo[]>([]);
const list_2 = ref<FileVo[]>([]);
const list_3 = ref<FileVo[]>([]);

const afterRead = (event: any) => {
  let lists = event.file;
  let a = 0;
  list.value.push({
    status: "loading",
    message: "上传中",
    url: lists[0].url,
    schedule: a,
  });
  const timer = setInterval(() => {
    a += 10;
    list.value[0].schedule = a;
  }, 300);
  setTimeout(() => {
    clearInterval(timer);
    list.value = [
      {
        status: "success",
        message: "上传成功",
        url: lists[0].url,
        schedule: a,
      },
    ];
  }, 3000);
};

// 新增图片
const afterRead_1 = async (event: UploadFileParams) => {
  let lists = event.file;
  if (isArray(lists)) {
    lists.forEach((item) => {
      let a = 0;
      list_1.value.push({
        status: "loading",
        message: "上传中",
        url: item.url,
        schedule: a,
      });
      const index = list_1.value.findIndex((v) => v.url === item.url);
      const timer = setInterval(() => {
        a += 10;
        list_1.value[index].schedule = a;
      }, 300);
      setTimeout(() => {
        clearInterval(timer);
        list_1.value[index] = {
          status: "success",
          message: "上传成功",
          url: item.url,
          schedule: a,
        };
      }, 3000);
    });
  }
};

const afterRead_2 = (params: UploadFileParams) => {
  let lists = params.file as FileVo;
  let a = 0;
  list_2.value.push({
    status: "loading",
    message: "上传中",
    url: lists.url,
    schedule: a,
  });
  const timer = setInterval(() => {
    a += 10;
    list_2.value[0].schedule = a;
  }, 300);
  setTimeout(() => {
    clearInterval(timer);
    list_2.value = [
      {
        status: "success",
        message: "上传成功",
        url: lists.url,
        schedule: a,
      },
    ];
  }, 3000);
};

const afterRead_3 = (params: UploadFileParams) => {
  let lists = params.file as FileVo;
  let a = 0;
  list_3.value.push({
    status: "loading",
    message: "上传中",
    url: lists.url,
    schedule: a,
  });
  const timer = setInterval(() => {
    a += 10;
    list_3.value[0].schedule = a;
  }, 300);
  setTimeout(() => {
    clearInterval(timer);
    list_3.value = [
      {
        status: "success",
        message: "上传成功",
        url: lists.url,
        schedule: a,
      },
    ];
  }, 3000);
};

const oversizeFn = () => {
  uni.showToast({
    title: `图片超出${bytesToSize(maxSize.value)}限制大小`,
    icon: "none",
  });
};
</script>

<style scoped lang="scss"></style>
