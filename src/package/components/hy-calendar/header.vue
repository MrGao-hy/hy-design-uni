<template>
  <view class="hy-calendar-header hy-border-bottom">
    <text class="hy-calendar-header__title" v-if="showTitle">{{ title }}</text>
    <text class="hy-calendar-header__subtitle" v-if="showSubtitle">{{
      subtitle
    }}</text>
    <view class="hy-calendar-header__weekdays">
      <text class="hy-calendar-header__weekdays__weekday">{{
        weekText[0]
      }}</text>
      <text class="hy-calendar-header__weekdays__weekday">{{
        weekText[1]
      }}</text>
      <text class="hy-calendar-header__weekdays__weekday">{{
        weekText[2]
      }}</text>
      <text class="hy-calendar-header__weekdays__weekday">{{
        weekText[3]
      }}</text>
      <text class="hy-calendar-header__weekdays__weekday">{{
        weekText[4]
      }}</text>
      <text class="hy-calendar-header__weekdays__weekday">{{
        weekText[5]
      }}</text>
      <text class="hy-calendar-header__weekdays__weekday">{{
        weekText[6]
      }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: "hy-calendar-header",
  props: {
    // 标题
    title: {
      type: String,
      default: "",
    },
    // 副标题
    subtitle: {
      type: String,
      default: "",
    },
    // 是否显示标题
    showTitle: {
      type: Boolean,
      default: true,
    },
    // 是否显示副标题
    showSubtitle: {
      type: Boolean,
      default: true,
    },
    // 星期文本
    weekText: {
      type: Array,
      default: () => {
        return ["一", "二", "三", "四", "五", "六", "日"];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    name() {},
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
