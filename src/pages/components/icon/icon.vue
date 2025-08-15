<template>
  <hy-config-provider  :custom-style="themeColor" :theme="darkMode">
    <view class="hy-title">图标图片(带圆角)</view>
    <view class="hy-flex">
      <hy-icon :name="config.avatar" size="80" round="5px" />
    </view>

    <view class="hy-title">图标文字位置</view>
    <view class="hy-flex">
      <hy-icon :name="IconConfig.LOCK" label="横向" label-pos="right" />
      <hy-icon :name="IconConfig.LOCK" label="纵向" label-pos="bottom" />
    </view>

    <view class="hy-title">图标旋转</view>
    <view class="hy-flex">
      <hy-icon :name="IconConfig.LOCK" is-rotate />
    </view>

    <view class="hy-title">图标大小</view>
    <view class="hy-flex">
      <hy-icon :name="IconConfig.LOCK" size="12px" />
      <hy-icon :name="IconConfig.LOCK" size="30" />
    </view>

    <view class="hy-title">图标颜色</view>
    <view class="hy-flex">
      <hy-icon :name="IconConfig.LOCK" color="red" />
      <hy-icon :name="IconConfig.LOCK" color="#FFD04B" />
    </view>

    <view class="hy-title">图标集</view>
    <view class="hy-container">
      <hy-grid :list="icons" border></hy-grid>
    </view>
  </hy-config-provider>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { IconConfig } from "hy-app";
import { config } from "@/config/config";

import HyIcon from "@/package/components/hy-icon/hy-icon.vue";
import HyGrid from "@/package/components/hy-grid/hy-grid.vue";
// import HyIcon from "hy-app/components/hy-icon/hy-icon.vue";
// import HyGrid from "hy-app/components/hy-grid/hy-grid.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import { useThemeStore } from "@/store";
const themeStore = useThemeStore();

const { themeColor, darkMode } = themeStore;

// 图标集合
const icons = reactive([
  {
    icon: "loading",
    label: "加载动画",
    name: "LOADING",
  },
  {
    icon: "close",
    label: "关闭",
    name: "CLOSE",
  },
  {
    icon: "collect",
    label: "空星",
    name: "STAR",
  },
  {
    icon: "collect-fill",
    label: "实星",
    name: "STAR_FILL",
  },
  {
    icon: "smile",
    label: "微笑",
    name: "SMILE",
  },
  {
    icon: "smile-fill",
    label: "微笑-实心",
    name: "SMILE_FILL",
  },
  {
    icon: "cry-fill",
    label: "难过-实心",
    name: "CRY_FILL",
  },
  {
    icon: "check-mask",
    label: "打勾，勾选",
    name: "CHECK_MASK",
  },
  {
    icon: "edit",
    label: "编辑",
    name: "EDIT",
  },
  {
    icon: "shop",
    label: "商城",
    name: "SHOP",
  },
  {
    icon: "lock-fill",
    label: "实心锁",
    name: "LOCK_FILL",
  },
  {
    icon: "lock-open-fill",
    label: "打开实心锁",
    name: "LOCK_OPEN_FILL",
  },
  {
    icon: "lock",
    label: "空心锁",
    name: "LOCK",
  },
  {
    icon: "map",
    label: "地点",
    name: "MAP",
  },
  {
    icon: "map-fill",
    label: "地点-实心",
    name: "MAP_FILL",
  },
  {
    icon: "shopping-cart",
    label: "购物车",
    name: "SHOPPING_CART",
  },
  {
    icon: "shopping-cart-fill",
    label: "购物车-实心",
    name: "SHOPPING_CART_FILL",
  },
  {
    icon: "shopping-cart-add",
    label: "添加购物车",
    name: "SHOPPING_CART_ADD",
  },
  {
    icon: "shopping-bag",
    label: "购物袋",
    name: "SHOPPING_BAG",
  },
  {
    icon: "refresh",
    label: "刷新",
    name: "REFRESH",
  },
  {
    icon: "task",
    label: "任务",
    name: "TASK",
  },
  {
    icon: "tag",
    label: "标签",
    name: "TAG",
  },
  {
    icon: "left",
    label: "左",
    name: "LEFT",
  },
  {
    icon: "right",
    label: "右",
    name: "RIGHT",
  },
  {
    icon: "up",
    label: "上",
    name: "UP",
  },
  {
    icon: "down",
    label: "下",
    name: "DOWN",
  },
  {
    icon: "arrow-up-fill",
    label: "向上-实心",
    name: "ARROW_UP_FILL",
  },
  {
    icon: "arrow-down-fill",
    label: "向下-实心",
    name: "ARROW_DOWN_FILL",
  },
  {
    icon: "arrow-left-fill",
    label: "向左-实心",
    name: "ARROW_LEFT_FILL",
  },
  {
    icon: "arrow-right-fill",
    label: "向右-实心",
    name: "ARROW_RIGHT_FILL",
  },
  {
    icon: "arrow-double-left",
    label: "向左双箭头",
    name: "ARROW_DOUBLE_LEFT",
  },
  {
    icon: "arrow-double-right",
    label: "向右双箭头",
    name: "ARROW_DOUBLE_RIGHT",
  },
  {
    icon: "arrow-leftward",
    label: "箭头向左",
    name: "ARROW_LEFTWARD",
  },
  {
    icon: "arrow-rightward",
    label: "箭头向右",
    name: "ARROW_RIGHTWARD",
  },
  {
    icon: "history",
    label: "历史",
    name: "HISTORY",
  },
  {
    icon: "time",
    label: "时间",
    name: "TIME",
  },
  {
    icon: "network",
    label: "网络",
    name: "NETWORK",
  },
  {
    icon: "list-dot",
    label: "列表",
    name: "LIST_DOT",
  },
  {
    icon: "menu",
    label: "菜单",
    name: "MENU",
  },
  {
    icon: "search",
    label: "搜索",
    name: "SEARCH",
  },
  {
    icon: "plus",
    label: "加",
    name: "PLUS",
  },
  {
    icon: "minus",
    label: "减",
    name: "MINUS",
  },
  {
    icon: "remind",
    label: "提醒",
    name: "REMIND",
  },
  {
    icon: "warning",
    label: "警告",
    name: "WARNING",
  },
  {
    icon: "warning-fill",
    label: "警告-实心",
    name: "WARNING_FILL",
  },
  {
    icon: "delete",
    label: "删除",
    name: "DELETE",
  },
  {
    icon: "delete-fill",
    label: "删除-实心",
    name: "DELETE_FILL",
  },
  {
    icon: "screen",
    label: "筛选",
    name: "SCREEN",
  },
  {
    icon: "class",
    label: "分类",
    name: "CLASS",
  },
  {
    icon: "class-fill",
    label: "应用",
    name: "CLASS_FILL",
  },
  {
    icon: "home",
    label: "首页",
    name: "HOME",
  },
  {
    icon: "home-fill",
    label: "首页-实心",
    name: "HOME_FILL",
  },
  {
    icon: "mine",
    label: "我的",
    name: "MINE",
  },
  {
    icon: "mine-fill",
    label: "我的-实心",
    name: "MINE_FILL",
  },
  {
    icon: "setting",
    label: "设置",
    name: "SETTING",
  },
  {
    icon: "close-circle",
    label: "关闭圆圈",
    name: "CLOSE_CIRCLE",
  },
  {
    icon: "close-circle-fill",
    label: "关闭圆圈-实心",
    name: "CLOSE_CIRCLE_FILL",
  },
  {
    icon: "notice",
    label: "注意",
    name: "NOTICE",
  },
  {
    icon: "notice-fill",
    label: "注意-实心",
    name: "NOTICE_FILL",
  },
  {
    icon: "success",
    label: "成功",
    name: "SUCCESS",
  },
  {
    icon: "success-fill",
    label: "成功-实心",
    name: "SUCCESS_FILL",
  },
  {
    icon: "help",
    label: "帮助",
    name: "HELP",
  },
  {
    icon: "help-fill",
    label: "帮助-实心",
    name: "HELP_FILL",
  },
  {
    icon: "upload",
    label: "上传",
    name: "UPLOAD",
  },
  {
    icon: "switch",
    label: "转换",
    name: "SWITCH",
  },
  {
    icon: "download",
    label: "下载",
    name: "DOWNLOAD",
  },
  {
    icon: "security",
    label: "保护",
    name: "SECURITY",
  },
  {
    icon: "scan",
    label: "扫码",
    name: "SCAN",
  },
  {
    icon: "save",
    label: "保存",
    name: "SAVE",
  },
  {
    icon: "picture",
    label: "图片",
    name: "PHOTO",
  },
  {
    icon: "pdf",
    label: "pdf",
    name: "PDF",
  },
  {
    icon: "navigation",
    label: "导航",
    name: "NAVIGATION",
  },
  {
    icon: "print",
    label: "打印",
    name: "PRINT",
  },
  {
    icon: "layers",
    label: "layers",
    name: "LAYERS",
  },
  {
    icon: "link",
    label: "链接",
    name: "LINK",
  },
  {
    icon: "export",
    label: "导出",
    name: "EXPORT",
  },
  {
    icon: "ellipsis",
    label: "省略号",
    name: "ELLIPSIS",
  },
  {
    icon: "customer-service",
    label: "客服",
    name: "CUSTOMER_SERVICE",
  },
  {
    icon: "comment",
    label: "信息",
    name: "COMMENT",
  },
  {
    icon: "message",
    label: "消息",
    name: "MESSAGE",
  },
  {
    icon: "message-fill",
    label: "消息-实心",
    name: "MESSAGE_FILL",
  },
  {
    icon: "systemprompt_fill",
    label: "通知-实心",
    name: "NOTIFICATION_FILL",
  },
  {
    icon: "attachment",
    label: "附件",
    name: "ATTACHMENT",
  },
  {
    icon: "camera",
    label: "相机",
    name: "CAMERA",
  },
  {
    icon: "eye",
    label: "眼睛",
    name: "EYE",
  },
  {
    icon: "calendar",
    label: "日历",
    name: "CALENDAR",
  },
  {
    icon: "copy",
    label: "复制",
    name: "COPY",
  },
  {
    icon: "order",
    label: "订单",
    name: "ORDER",
  },
  {
    icon: "share",
    label: "分享",
    name: "SHARE",
  },
  {
    icon: "share-fill",
    label: "分享-实心",
    name: "SHARE_FILL",
  },
  {
    icon: "send",
    label: "发送",
    name: "SEND",
  },
]);
</script>

<style scoped lang="scss">
.icon {
  box-sizing: border-box;
  width: 100vw;
}
</style>
