<template>
  <hy-config-provider
    @click="closeOutside"
    :custom-style="themeColor"
    :theme="darkMode"
  >
    <hy-card>
      <template #header>
        <view class="header">
          <view class="hy-title">基础使用</view>
          <hy-popover
            v-model="show"
            content="我是提示信息"
            placement="bottom-end"
          >
            <hy-icon :name="IconConfig.HELP"></hy-icon>
          </hy-popover>
        </view>
      </template>

      <template #body>
        <view class="container">
          <view class="top">
            <hy-popover :content="content" placement="bottom-start">
              <hy-button text="左上角" :stop="false"></hy-button>
            </hy-popover>
            <hy-popover :content="content" placement="bottom">
              <hy-button text="中上" :stop="false"></hy-button>
            </hy-popover>
            <hy-popover :content="content" placement="bottom-end">
              <hy-button text="右上角" :stop="false"></hy-button>
            </hy-popover>
          </view>

          <view class="center">
            <hy-popover :content="content" placement="right-start">
              <hy-button text="中左上" :stop="false"></hy-button>
            </hy-popover>
            <hy-popover :content="content" placement="left-start">
              <hy-button text="中右下" :stop="false"></hy-button>
            </hy-popover>
          </view>
          <view class="center">
            <hy-popover :content="content" placement="right">
              <hy-button text="中左" :stop="false"></hy-button>
            </hy-popover>
            <hy-popover :content="content" placement="left">
              <hy-button text="中右" :stop="false"></hy-button>
            </hy-popover>
          </view>
          <view class="center">
            <hy-popover :content="content" placement="right-end">
              <hy-button text="中右上" :stop="false"></hy-button>
            </hy-popover>
            <hy-popover :content="content" placement="left-end">
              <hy-button text="中右下" :stop="false"></hy-button>
            </hy-popover>
          </view>

          <view class="bottom">
            <hy-popover :content="content" placement="top-start">
              <hy-button text="左下角" :stop="false"></hy-button>
            </hy-popover>
            <hy-popover :content="content" placement="top">
              <hy-button text="中下" :stop="false"></hy-button>
            </hy-popover>
            <hy-popover :content="content" placement="top-end">
              <hy-button text="右下角" :stop="false"></hy-button>
            </hy-popover>
          </view>
        </view>
      </template>
    </hy-card>

    <view class="hy-title">多列联动</view>
    <view class="hy-container">
      <hy-popover
        mode="menu"
        :content="menus"
        placement="bottom-start"
        @menu-click="onMenu"
      >
        <hy-button text="菜单栏" :stop="false"></hy-button>
      </hy-popover>
    </view>

    <view class="hy-title">自定义插槽</view>
    <view class="hy-container hy-flex">
      <hy-popover placement="top-end">
        <template #content>
          <view class="custom-content">这是一段自定义样式的内容。</view>
        </template>
        <hy-button text="自定义" :stop="false"></hy-button>
      </hy-popover>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import { IconConfig } from "@/package";
import { useThemeStore } from "@/store";
import { ref, reactive } from "vue";
import { useQueue } from "@/package";

// 组件
import HyPopover from "@/package/components/hy-popover/hy-popover.vue";
import HyIcon from "@/package/components/hy-icon/hy-icon.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import HyCard from "@/package/components/hy-card/hy-card.vue";
import HyButton from "@/package/components/hy-button/hy-button.vue";
import { storeToRefs } from "pinia";

const themeStore = useThemeStore();
const { closeOutside } = useQueue();
const { themeColor, darkMode } = storeToRefs(themeStore);
const content = ref(
  "华玥组件库，我为自己代言，华玥组件库是一款集合了所以功能的超现代化的组件库，中国13亿人都在用的它",
);
const count = ref(0);
const menus = reactive([
  {
    icon: IconConfig.REMIND,
    content: "全部标记已读",
  },
  {
    icon: IconConfig.DELETE,
    content: "清空最近会话",
  },
  {
    icon: IconConfig.SETTING,
    content: "消息订阅设置",
  },
  {
    icon: IconConfig.NOTICE,
    content: "消息异常检测",
  },
]);
const show = ref(false);

setTimeout(() => (count.value = 10), 2000);

const onMenu = ({ index, item }) => {
  uni.showToast({ title: `点击了第${index}个`, icon: "none" });
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .hy-title {
    padding: 0 10px;
  }
}
.container {
  height: 260px;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: space-between;
  .top {
    display: flex;
    justify-content: space-between;
  }
  .center {
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
  }
}
.custom-content {
  /* 必填 开始 */
  position: relative;
  z-index: 999;
  border-radius: 4px;
  /* 必填 结束 */
  background: #ffffff;
  color: #8268de;
  font-weight: bolder;
  padding: 10px;
  width: 150px;
}
</style>
