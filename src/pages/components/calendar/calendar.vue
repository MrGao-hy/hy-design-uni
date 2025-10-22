<template>
  <hy-config-provider :custom-style="themeColor" :theme="darkMode">
    <hy-cell :list="list" @click="onClick"></hy-cell>
    <HyCalendar
      :show="show1"
      defaultDate="2022-02-15"
      @confirm="confirm"
      @close="close"
    ></HyCalendar>
    <HyCalendar
      :show="show2"
      mode="multiple"
      :defaultDate="['2022-03-01']"
      @confirm="confirm"
      @close="close"
    ></HyCalendar>
    <HyCalendar
      :show="show3"
      mode="range"
      @confirm="confirm"
      @close="close"
    ></HyCalendar>
    <HyCalendar
      :show="show4"
      mode="range"
      @confirm="confirm"
      @close="close"
      color="#f56c6c"
      defaultDate="2025-02-01"
    ></HyCalendar>
    <HyCalendar
      :show="show5"
      mode="range"
      @confirm="confirm"
      @close="close"
      defaultDate="2025-08-09"
      startText="住店"
      endText="离店"
      confirmDisabledText="请选择离店日期"
      :formatter="formatter"
    ></HyCalendar>
    <HyCalendar
      :show="show6"
      @confirm="confirm"
      @close="close"
      maxDate="2025-05-05"
    ></HyCalendar>
    <HyCalendar
      :show="show7"
      @confirm="confirm"
      @close="close"
      showLunar
    ></HyCalendar>
    <HyCalendar
      :show="show8"
      @confirm="confirm"
      @close="close"
      mode="multiple"
      :defaultDate="['2025-04-25', '2025-04-30']"
    ></HyCalendar>
    <HyCalendar
      :show="show9"
      @confirm="confirm"
      @close="close"
      minDate="2022-05-09"
      maxDate="2023-07-05"
      defaultDate="2022-09-09"
    ></HyCalendar>
  </hy-config-provider>
</template>

<script setup lang="ts">
import HyCalendar from "@/package/components/hy-calendar/hy-calendar.vue";
import HyCell from "@/package/components/hy-cell/hy-cell.vue";
import HyConfigProvider from "@/package/components/hy-config-provider/hy-config-provider.vue";
import { reactive, ref } from "vue";
import { useThemeStore } from "@/store";
import { storeToRefs } from "pinia";
const themeStore = useThemeStore();

const { themeColor, darkMode } = storeToRefs(themeStore);

const index = ref(0);
const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const show4 = ref(false);
const show5 = ref(false);
const show6 = ref(false);
const show7 = ref(false);
const show8 = ref(false);
const show9 = ref(false);
const formatter = (day: any) => {
  const d = new Date();
  let month = d.getMonth() + 1;
  const date = d.getDate();
  if (day.month == month && day.day == date + 3) {
    day.bottomInfo = "有优惠";
    day.dot = true;
  }
  return day;
};

const list = reactive([
  {
    title: "单个日期",
    value: "",
  },
  {
    title: "多个日期",
    value: "",
  },
  {
    title: "日期范围",
    value: "",
  },
  {
    title: "自定义主题颜色",
    value: "",
  },
  {
    title: "自定义文案",
    value: "",
  },
  {
    title: "日期最大范围",
    value: "",
  },
  {
    title: "显示农历",
    value: "",
  },
  {
    title: "默认日期",
    value: "",
  },
  {
    title: "日期最小范围",
    value: "",
  },
]);
const close = () => {
  controller(index.value);
};
const confirm = (e: string[]) => {
  controller(index.value);
  switch (index.value) {
    case 0:
      list[index.value].value = e[0];
      break;
    case 1:
      e.forEach((value, i) => {
        i === 0
          ? (list[index.value].value = value)
          : (list[index.value].value += ";" + value);
      });
      break;
    case 2:
      list[index.value].value = e[0] + "~" + e[e.length - 1];
      break;
    case 3:
      list[index.value].value = e[0] + "~" + e[e.length - 1];
      break;
    case 4:
      list[index.value].value = e[0] + "~" + e[e.length - 1];
      break;
    case 5:
      list[index.value].value = e[0];
      break;
    case 6:
      list[index.value].value = e[0];
      break;
    case 7:
      e.forEach((value, i) => {
        i === 0
          ? (list[index.value].value = value)
          : (list[index.value].value += ";" + value);
      });
      break;
    case 8:
      list[index.value].value = e[0];
      break;
    default:
      break;
  }
};
const onClick = (temp: AnyObject[], i: number) => {
  index.value = i;
  controller(i);
};

const controller = (index: number) => {
  switch (index) {
    case 0:
      show1.value = !show1.value;
      break;
    case 1:
      show2.value = !show2.value;
      break;
    case 2:
      show3.value = !show3.value;
      break;
    case 3:
      show4.value = !show4.value;
      break;
    case 4:
      show5.value = !show5.value;
      break;
    case 5:
      show6.value = !show6.value;
      break;
    case 6:
      show7.value = !show7.value;
      break;
    case 7:
      show8.value = !show8.value;
      break;
    case 8:
      show9.value = !show9.value;
      break;
    default:
      break;
  }
};
</script>

<style scoped lang="scss"></style>
