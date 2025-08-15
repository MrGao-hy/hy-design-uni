<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">基础使用</view>
    <hy-upload
      :fileList="list"
      @afterRead="afterRead"
      name="1"
      multiple
      :maxCount="1"
    ></hy-upload>

    <view class="hy-title">多张图片上传</view>
    <hy-upload
      :fileList="list_1"
      @afterRead="afterRead_1"
      multiple
      upload-text="上传图片"
    ></hy-upload>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyUpload from "@/package/components/hy-upload/hy-upload.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import type { FileVo } from "@/package/components/hy-upload/typing";
import { ref } from "vue";
import { useThemeStore } from "@/store";
const themeStore = useThemeStore();

const { themeColor, darkMode } = themeStore;

const list = ref<FileVo[]>([
  {
    status: "success",
    message: "上传中",
    url: "https://img0.baidu.com/it/u=3196617431,1263013381&fm=253",
  },
]);
const list_1 = ref<FileVo[]>([]);

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
const afterRead_1 = async (event) => {
  let lists = event.file;
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
};
</script>

<style scoped lang="scss"></style>
