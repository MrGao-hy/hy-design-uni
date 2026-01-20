/**
 * This file contains localization strings for various components.
 */

export default {
    calendar: {
        title: '选择日期',
        day: '日',
        week: '周',
        month: '月',
        year: '年',
        confirm: '确定',
        confirmDisabled: '确定',
        startTime: '开始',
        endTime: '结束',
        to: '至',
        timeFormat: 'YY年MM月DD日 HH:mm:ss',
        dateFormat: 'YYYY年MM月DD日',
        weekFormat: (year: number, week: number) => `${year} 第 ${week} 周`,
        startWeek: '开始周',
        endWeek: '结束周',
        startMonth: '开始月',
        endMonth: '结束月',
        monthFormat: 'YYYY年MM月',
        weeks: {
            sun: '日',
            mon: '一',
            tue: '二',
            wed: '三',
            thu: '四',
            fri: '五',
            sat: '六'
        }
    },
    readMore: {
        expand: '展开',
        retract: '收起'
    },
    loadMore: {
        loadMore: '加载更多',
        loading: '正在加载中...',
        finished: '已加载完毕'
    },
    modal: {
        confirm: '确定',
        cancel: '取消'
    },
    pagination: {
        prev: '上一页',
        next: '下一页',
        page: (value: number) => `当前页：${value}`,
        total: (total: number) => `当前数据：${total}条`,
        size: (size: number) => `分页大小：${size}`
    },
    picker: {
        cancel: '取消',
        confirm: '完成',
        placeholder: '请选择'
    },
    datetimePicker: {
        placeholder: '请选择时间',
        confirm: '完成',
        cancel: '取消'
    },
    addressPicker: {
        cancel: '取消',
        confirm: '完成',
        placeholder: '请选择地址'
    },
    search: {
        search: '搜索',
        placeholder: '搜索内容'
    },
    upload: {
        progressLabel: (value: number) => `上传进度${value}%`,
        error: '上传失败'
    },
    signature: {
        confirm: '确认',
        clear: '清空',
        revoke: '撤销',
        restore: '恢复'
    },
    qrCode: {
        loading: '二维码生成中...'
    }
}
