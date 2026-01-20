/**
 * @description 判断字符串是否是数字
 * @param {String | Number} text 值
 * @return {Boolean}
 * */
export const isNumericString = (text: string | number): boolean => {
    return typeof text === 'string' && !isNaN(Number(text))
}

/**
 * @description 判断是否是数字
 * @param {String | Number} text 值
 * @return {Boolean}
 * */
export const isNumber = (text: string | number): boolean => {
    return typeof text === 'number' || isNumericString(text)
}

/**
 * @description 判断是否数组
 * @param {any} arr 传入数组值
 * @return {Boolean}
 */
export const isArray = (arr: any): arr is Array<any> => {
    // 如果 Array.isArray 函数可用，直接使用该函数检查
    if (typeof Array.isArray === 'function') {
        return Array.isArray(arr)
    }
    // 否则，使用对象原型的 toString 方法进行检查
    return Object.prototype.toString.call(arr) === '[object Array]'
}

/**
 * @description 判断是否对象
 * @param obj 传入对象值
 * @return {Boolean}
 */
export const isObject = (obj: any): obj is Object => {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * @description 是否为base64图片
 * @param {String} url
 * @return
 */
export function isBase64Image(url: string): boolean {
    // 使用正则表达式检查URL是否以"data:image"开头，这是Base64图片的常见前缀
    return /^data:image\/(png|jpg|jpeg|gif|bmp);base64,/.test(url)
}

/**
 * @description 是否图片
 * @param {String} url
 * @return
 */
export function isImage(url: string): boolean {
    // 使用正则表达式检查URL是否以"data:image"开头，这是Base64图片的常见前缀
    return /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.webp)$/i.test(url)
}

/**
 * 是否视频格式
 * @param {String} value
 */
export function isVideo(value: string): boolean {
    const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i
    return VIDEO_REGEXP.test(value)
}

/**
 * 判断是否是日期格式
 * @param {unknown} val yyyy-mm-dd hh:mm:ss 或 时间戳
 */
export const isDate = (val: unknown): val is Date =>
    Object.prototype.toString.call(val) === '[object Date]' &&
    !Number.isNaN((val as Date).getTime())

/**
 * @description 验证是否是手机号格式
 * @param {unknown} phone 手机号
 */
export const isPhone = (phone: unknown): boolean => {
    if (typeof phone !== 'string' && typeof phone !== 'number') return false
    if (phone === '') return false

    const phoneStr = String(phone).trim()
    // 处理 +86 12345678901 格式
    const normalized = phoneStr.replace(/^\+86\s?/, '')
    return /^1[3-9]\d{9}$/.test(normalized) && normalized.length === 11
}

/**
 * @description 验证身份证号码
 * @param {unknown} idCard 身份证号
 * @return {Boolean}
 */
export const isIdCard = (idCard: unknown): boolean => {
    if (typeof idCard !== 'string' && typeof idCard !== 'number') return false
    const str = String(idCard).trim().toUpperCase()

    // 格式校验：15位或18位
    if (!/(^\d{15}$)|(^\d{17}[\dX]$)/.test(str)) return false

    // 18位身份证：校验校验码
    if (str.length === 18) {
        const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        const checksums = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

        let sum = 0
        for (let i = 0; i < 17; i++) {
            sum += parseInt(str[i]) * weights[i]
        }

        return checksums[sum % 11] === str[17]
    }

    return true // 15位不校验
}

/**
 * @description 验证是否是中文
 * @param {String} zh 校验值
 * @return {Boolean}
 */
export const isChinese = (zh: string): boolean => {
    const reg = /^[\u4e00-\u9fa5]+$/gi
    return reg.test(zh)
}

/**
 * @description 判断环境是否是H5
 */
export const isH5 = (() => {
    let isH5 = false
    // #ifdef H5
    isH5 = true
    // #endif
    return isH5
})()
