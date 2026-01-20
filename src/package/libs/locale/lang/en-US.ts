export default {
    calendar: {
        placeholder: 'Select',
        title: 'Select Date',
        day: 'Date',
        week: 'Week',
        month: 'Month',
        year: 'year',
        confirm: 'OK',
        confirmDisabled: 'OK',
        startTime: 'Start Date',
        endTime: 'End Date',
        to: 'To',
        timeFormat: 'YY-MM-DD HH:mm:ss',
        dateFormat: 'YYYY-MM-DD',
        weekFormat: (year: number, week: number) => `${year} W${week}`,
        startWeek: 'Start Week',
        endWeek: 'End Week',
        startMonth: 'Start Month',
        endMonth: 'End Month',
        monthFormat: 'yyyy-MM',
        weeks: {
            sun: 'Sun',
            mon: 'Mon',
            tue: 'Tue',
            wed: 'Wed',
            thu: 'Thu',
            fri: 'Fri',
            sat: 'Sat'
        }
    },
    readMore: {
        expand: 'Expand',
        retract: 'Fold'
    },
    loadMore: {
        loadMore: 'Load more',
        loading: 'Loading...',
        finished: 'Finished loading'
    },
    modal: {
        confirm: 'OK',
        cancel: 'Cancel'
    },
    pagination: {
        prev: 'Previous',
        next: 'Next',
        page: (value: number) => `Page: ${value}`,
        total: (total: number) => `Total: ${total}`,
        size: (size: number) => `${size}/page`
    },
    picker: {
        cancel: 'Cancel',
        confirm: 'Done',
        placeholder: 'Please select'
    },
    datetimePicker: {
        confirm: 'Done',
        cancel: 'Cancel',
        placeholder: 'Please select a time'
    },
    addressPicker: {
        cancel: 'Cancel',
        confirm: 'Done',
        placeholder: 'Please select an address'
    },
    search: {
        search: 'Search',
        placeholder: 'Search content'
    },
    upload: {
        progressLabel: (value: number) => `progress：${value}%`,
        error: 'Failed to upload'
    },
    signature: {
        confirm: 'OK',
        clear: 'Clear',
        revoke: 'Undo',
        restore: 'Restore'
    },
    qrCode: {
        loading: 'Generate a QR code...'
    }
}
