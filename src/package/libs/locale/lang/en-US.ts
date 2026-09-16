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
        forbidDaysToast: 'This date is disabled',
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
    cascader: {
        title: 'Please select',
        placeholder: 'Please select'
    },
    search: {
        search: 'Search',
        placeholder: 'Search content'
    },
    upload: {
        progressLabel: (value: number) => `progress：${value}%`,
        error: 'Failed to upload',
        previewError: 'Failed to preview'
    },
    signature: {
        confirm: 'OK',
        clear: 'Clear',
        revoke: 'Undo',
        restore: 'Restore'
    },
    qrCode: {
        loading: 'Generate a QR code...',
        saveSuccess: 'QR code saved',
        save: 'Save QR code image'
    },
    coupon: {
        discountUnit: 'off',
        unit: 'CNY',
        receive: 'Claim now',
        typeMoneyOff: 'Money Off',
        typeDiscount: 'Discount',
        typeFixedAmount: 'No Threshold',
        typeUnknown: 'Unknown'
    },
    submitBar: {
        addToCart: 'Add to Cart',
        buyNow: 'Buy Now'
    },
    tooltip: {
        copy: 'Copy',
        copySuccess: 'Copied',
        copyFail: 'Copy failed'
    },
    text: {
        linkCopied: 'Link copied, please open it in your browser'
    },
    parse: {
        saveImage: 'Save Image',
        saveSuccess: 'Saved',
        linkCopied: 'Link copied'
    },
    mine: {
        vip: 'VIP',
        bio: 'This person is lazy and left nothing',
        components: 'Components',
        following: 'Following',
        followers: 'Followers',
        likes: 'Likes',
        orders: 'My Orders',
        address: 'Shipping Address',
        messages: 'Messages',
        favorites: 'Favorites',
        settings: 'Settings',
        help: 'Help Center',
        about: 'About Us',
        language: 'Language',
        logout: 'Log Out',
        pageNotExist: 'Page not found',
        langSwitch: 'Switched to Chinese',
        langSwitchEn: 'Switched to English'
    }
}
