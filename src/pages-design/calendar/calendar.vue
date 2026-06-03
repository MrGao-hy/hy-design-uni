<template>
    <the-root-page>
        <the-cell :list="list" @click="onClick"></the-cell>

        <!-- 1. 单个日期 -->
        <hy-calendar
            v-model:show="show1"
            defaultDate="2022-02-15"
            @confirm="(e) => confirm(0, e)"
        ></hy-calendar>

        <!-- 2. 多个日期 -->
        <hy-calendar
            v-model:show="show2"
            mode="multiple"
            :defaultDate="['2022-03-01']"
            @confirm="(e) => confirm(1, e)"
        ></hy-calendar>

        <!-- 3. 日期范围 -->
        <hy-calendar
            v-model:show="show3"
            mode="range"
            @confirm="(e) => confirm(2, e)"
        ></hy-calendar>

        <!-- 4. 自定义主题颜色 -->
        <hy-calendar
            v-model:show="show4"
            mode="range"
            color="#f56c6c"
            @confirm="(e) => confirm(3, e)"
        ></hy-calendar>

        <!-- 5. 自定义文案 -->
        <hy-calendar
            v-model:show="show5"
            mode="range"
            startText="住店"
            endText="离店"
            confirmDisabledText="请选择离店日期"
            :formatter="formatter"
            @confirm="(e) => confirm(4, e)"
        ></hy-calendar>

        <!-- 6. 日期最大范围 -->
        <hy-calendar
            v-model:show="show6"
            maxDate="2025-05-05"
            @confirm="(e) => confirm(5, e)"
        ></hy-calendar>

        <!-- 7. 显示农历 -->
        <hy-calendar v-model:show="show7" showLunar @confirm="(e) => confirm(6, e)"></hy-calendar>

        <!-- 8. 默认日期 -->
        <hy-calendar
            v-model:show="show8"
            mode="multiple"
            minDate="2025-04-09"
            maxDate="2025-05-05"
            :defaultDate="['2025-04-25', '2025-04-30']"
            @confirm="(e) => confirm(7, e)"
        ></hy-calendar>

        <!-- 9. 日期范围限制 -->
        <hy-calendar
            v-model:show="show9"
            minDate="2025-05-09"
            maxDate="2025-07-05"
            defaultDate="2025-06-09"
            @confirm="(e) => confirm(8, e)"
        ></hy-calendar>

        <!-- 10. 范围选择限制 -->
        <hy-calendar
            v-model:show="show10"
            mode="range"
            :maxRange="7"
            rangePrompt="最多选择7天"
            allowSameDay
            @confirm="(e) => confirm(9, e)"
        ></hy-calendar>

        <!-- 11. 禁用日期 -->
        <hy-calendar
            v-model:show="show11"
            mode="single"
            minDate="2025-05-09"
            maxDate="2025-07-05"
            :forbidDays="forbidDays"
            forbidDaysToast="该日期已被预约"
            @confirm="(e) => confirm(10, e)"
        ></hy-calendar>

        <!-- 12. 只读模式 -->
        <hy-calendar
            v-model:show="show12"
            readonly
            mode="range"
            minDate="2025-05-09"
            maxDate="2025-07-05"
            :defaultDate="['2025-06-01', '2025-06-15']"
            @confirm="(e) => confirm(11, e)"
        ></hy-calendar>

        <!-- 13. 多选限制数量 -->
        <hy-calendar
            v-model:show="show13"
            mode="multiple"
            :maxCount="3"
            @confirm="(e) => confirm(12, e)"
        ></hy-calendar>

        <!-- 14. 自定义星期文案 -->
        <hy-calendar
            v-model:show="show14"
            :weekText="weekText"
            @confirm="(e) => confirm(13, e)"
        ></hy-calendar>
    </the-root-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useShareButton } from '@/composables'

definePage({
    style: {
        navigationBarTitleText: '日历'
    }
})

const index = ref(0)
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
const show6 = ref(false)
const show7 = ref(false)
const show8 = ref(false)
const show9 = ref(false)
const show10 = ref(false)
const show11 = ref(false)
const show12 = ref(false)
const show13 = ref(false)
const show14 = ref(false)

// 禁用日期列表
const forbidDays = ref(['2025-06-01', '2025-06-02', '2025-06-03'])

// 自定义星期文案（英文）
const weekText = ref(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])

const formatter = (day: any) => {
    const d = new Date()
    let month = d.getMonth() + 1
    const date = d.getDate()
    if (day.month == month && day.day == date + 3) {
        day.bottomInfo = '有优惠'
        day.dot = true
    }
    return day
}

const list = reactive([
    { title: '单个日期', value: '' },
    { title: '多个日期', value: '' },
    { title: '日期范围', value: '' },
    { title: '自定义主题颜色', value: '' },
    { title: '自定义文案', value: '' },
    { title: '日期最大范围', value: '' },
    { title: '显示农历', value: '' },
    { title: '默认日期', value: '' },
    { title: '日期范围限制', value: '' },
    { title: '范围选择限制（7天）', value: '' },
    { title: '禁用日期', value: '' },
    { title: '只读模式', value: '' },
    { title: '多选限制数量', value: '' },
    { title: '自定义星期文案', value: '' }
])

const confirm = (idx: number, dates: string[]) => {
    index.value = idx
    if (dates.length === 1) {
        list[idx].value = dates[0]
    } else if (list[idx].title.includes('范围')) {
        list[idx].value = `${dates[0]} ~ ${dates[dates.length - 1]}`
    } else {
        list[idx].value = dates.join('; ')
    }
}

const onClick = (_: any, i: number) => {
    index.value = i
    const shows = [
        show1,
        show2,
        show3,
        show4,
        show5,
        show6,
        show7,
        show8,
        show9,
        show10,
        show11,
        show12,
        show13,
        show14
    ]
    shows[i].value = !shows[i].value
}

useShareButton()
</script>

<style scoped lang="scss"></style>
