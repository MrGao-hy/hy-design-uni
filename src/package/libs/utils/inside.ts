import { isArray } from './inspect'

/**
 * 生成bem规则类名
 * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
 * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
 * @param {String} name 组件名称
 * @param props
 * @param {Array} fixed 一直会存在的类名
 * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
 * @returns {Array|string}
 */
export const bem = (
    name: string,
    props: Record<string, any>,
    fixed: string[],
    change?: string[]
): string | string[] => {
    // 类名前缀
    const prefix = `hy-${name}--`
    const classes: Record<string, string | boolean> = {}
    if (fixed) {
        fixed.map((item: string) => {
            // 这里的类名，会一直存在
            classes[prefix + props[item]] = true
            if (item === 'type' && props['plain']) {
                classes[prefix + props[item] + '__plain'] = true
            }
        })
    }
    if (change) {
        change.map((item: string) => {
            // 这里的类名，会根据this[item]的值为true或者false，而进行添加或者移除某一个类
            props[item] ? (classes[prefix + item] = props[item]) : delete classes[prefix + item]
        })
    }
    return (
        Object.keys(classes)
            // 支付宝，头条小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
            // #ifdef MP-ALIPAY || MP-TOUTIAO || MP-LARK
            .join(' ')
        // #endif
    )
}

/**
 * error提示
 * @param {*} err 错误内容
 */
export function error(err: string) {
    // 开发环境才提示，生产环境不会提示
    if (process.env.NODE_ENV === 'development') {
        console.error(`华玥组件提示：${err}`)
    }
}

/**
 * 定时器同步执行，等待时间
 * @param {Number} value 等待时间
 */
export const sleep = (value: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null)
        }, value)
    })
}

/**
 * @param {Number} len uuid的长度
 * @param {Boolean} firstU 将返回的首字母置为"hy"
 * @param {Number | Null} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 */
export function guid(len: number = 32, firstU: boolean = true, radix: number | null = null) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    const uuid = []
    radix = radix || chars.length

    if (len) {
        // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
        for (let i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
    } else {
        let r
        // rfc4122标准要求返回的uuid中,某些位为固定的字符
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'

        for (let i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | (Math.random() * 16)
                uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
            }
        }
    }
    // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
    if (firstU) {
        uuid.shift()
        return `hy${uuid.join('')}`
    }
    return uuid.join('')
}

/**
 * 获取设备信息
 * */
export const getWindowInfo = ():
    UniNamespace.GetWindowInfoResult | UniNamespace.GetSystemInfoResult => {
    let ret: UniNamespace.GetWindowInfoResult | UniNamespace.GetSystemInfoResult
    // #ifdef APP || H5
    ret = uni.getWindowInfo()
    // #endif
    // #ifndef APP || H5
    ret = uni.getSystemInfoSync()
    // #endif
    return ret
}

function pickExclude(obj: Record<string, any>, keys: string[]): Record<string, any> {
    if (!['[object Object]', '[object File]'].includes(Object.prototype.toString.call(obj))) {
        return {}
    }
    return Object.keys(obj).reduce<Record<string, any>>((prev, key) => {
        if (!keys.includes(key)) {
            prev[key] = obj[key]
        }
        return prev
    }, {})
}

function formatImage(res: UniApp.ChooseImageSuccessCallbackResult) {
    const files = isArray(res.tempFiles) ? res.tempFiles : [res.tempFiles]
    return files.map((item) => {
        const file = item as Record<string, any>
        const base = {
            ...pickExclude(file, ['path']),
            type: 'image' as const,
            url: file.path,
            thumb: file.path,
            size: file.size
        }
        // #ifdef H5
        Object.assign(base, { name: file.name, file: file.file })
        // #endif
        return base
    })
}

function formatVideo(res: UniApp.ChooseVideoSuccess) {
    return [
        {
            ...pickExclude(res, ['tempFilePath', 'thumbTempFilePath', 'errMsg']),
            type: 'video',
            url: res.tempFilePath,
            thumb: res.tempFilePath,
            size: res.size,
            // #ifdef H5
            name: res.name,
            file: res
            // #endif
        }
    ]
}

function formatMedia(res: UniNamespace.ChooseMediaSuccessCallbackResult) {
    return res.tempFiles.map((item) => ({
        ...pickExclude(item, ['fileType', 'thumbTempFilePath', 'tempFilePath']),
        type: res.type,
        url: item.tempFilePath,
        thumb: res.type === 'video' ? item.thumbTempFilePath : item.tempFilePath,
        size: item.size,
        // #ifdef H5
        file: item
        // #endif
    }))
}

function formatFile(
    res: UniApp.ChooseFileSuccessCallbackResult | UniApp.ChooseMessageFileSuccessCallbackResult
) {
    const files: any[] = isArray(res.tempFiles) ? res.tempFiles : [res.tempFiles]
    return files.map((item) => ({
        ...pickExclude(item, ['path']),
        url: item.path,
        size: item.size,
        // #ifdef H5
        name: item.name,
        type: item.type,
        file: item
        // #endif
    }))
}

export function chooseFile({
    accept,
    multiple,
    sourceType,
    compressed,
    maxDuration,
    sizeType,
    camera,
    maxCount = 9,
    extension
}: HyMediaType.ChooseFileOption) {
    return new Promise((resolve, reject) => {
        switch (accept) {
            case 'image':
                uni.chooseImage({
                    count: multiple ? Math.min(maxCount, 9) : 1,
                    sourceType,
                    sizeType,
                    success: (res: UniApp.ChooseImageSuccessCallbackResult) =>
                        resolve(formatImage(res)),
                    fail: reject
                })
                break
            // #ifdef MP-WEIXIN
            // 只有微信小程序才支持chooseMedia接口
            case 'media':
                wx.chooseMedia({
                    count: multiple ? Math.min(maxCount, 9) : 1,
                    sourceType,
                    maxDuration,
                    sizeType,
                    camera,
                    success: (res: UniNamespace.ChooseMediaSuccessCallbackResult) =>
                        resolve(formatMedia(res)),
                    fail: reject
                })
                break
            // #endif
            case 'video':
                uni.chooseVideo({
                    sourceType,
                    compressed,
                    maxDuration,
                    camera,
                    success: (res: UniApp.ChooseVideoSuccess) => resolve(formatVideo(res)),
                    fail: reject
                })
                break
            // #ifdef MP-WEIXIN || H5
            // 只有微信小程序才支持chooseMessageFile接口
            case 'file':
                // #ifdef MP-WEIXIN
                wx.chooseMessageFile({
                    count: multiple ? maxCount : 1,
                    type: accept,
                    success: (res: UniApp.ChooseMessageFileSuccessCallbackResult) =>
                        resolve(formatFile(res)),
                    fail: reject
                })
                // #endif
                // #ifdef H5
                // 需要hx2.9.9以上才支持uni.chooseFile
                let params: UniNamespace.ChooseFileOptions = {
                    count: multiple ? maxCount : 1,
                    type: accept,
                    success: (res) => resolve(formatFile(res)),
                    fail: reject
                }
                if (extension && extension.length && extension.length > 0) {
                    params.extension = extension
                }
                uni.chooseFile(params)
                // #endif
                break
            // #endif
            default:
                // 此为保底选项，在accept不为上面任意一项的时候选取全部文件
                // #ifdef MP-WEIXIN
                wx.chooseMessageFile({
                    count: multiple ? maxCount : 1,
                    type: 'all',
                    success: (res) => resolve(formatFile(res)),
                    fail: reject
                })
                // #endif
                // #ifdef H5
                // 需要hx2.9.9以上才支持uni.chooseFile
                let paramsFile: UniNamespace.ChooseFileOptions = {
                    count: multiple ? maxCount : 1,
                    type: 'all',
                    success: (res: UniApp.ChooseFileSuccessCallbackResult) =>
                        resolve(formatFile(res)),
                    fail: reject
                }
                if (extension && extension.length && extension.length > 0) {
                    paramsFile.extension = extension
                }
                uni.chooseFile(paramsFile)
            // #endif
        }
    })
}

/**
 * 数字格式化
 * @param {number|string} number 要格式化的数字
 * @param {number} decimals 保留几位小数
 * @param {string} decimalPoint 小数点符号
 * @param {string} thousandsSeparator 千分位符号
 * @returns {string} 格式化后的数字
 */
export function priceFormat(
    number: string | number,
    decimals: number = 0,
    decimalPoint: string = '.',
    thousandsSeparator: string = ','
) {
    number = `${number}`.replace(/[^0-9+-Ee.]/g, '')
    const n = !isFinite(+number) ? 0 : +number
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    const sep = typeof thousandsSeparator === 'undefined' ? ',' : thousandsSeparator
    const dec = typeof decimalPoint === 'undefined' ? '.' : decimalPoint
    let s: string[] = []

    s = (prec ? n + '' : `${Math.round(n)}`).split('.')
    const re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, `$1${sep}$2`)
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || ''
        s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
}

/**
 * 默认的姓名脱敏规则
 * @param name 名字
 * @return {string}
 * */
export const formatName = (name: string): string => {
    let value = ''
    if (name.length === 2) {
        value = name.substring(0, 1) + '*'
    } else if (name.length > 2) {
        let char = ''
        for (let i = 0, len = name.length - 2; i < len; i++) {
            char += '*'
        }
        value = name.substring(0, 1) + char + name.substring(name.length - 1, name.length)
    } else {
        value = name
    }
    return value
}

export function getByPath(obj: Record<string, any>, path: string): unknown {
    return path.split('.').reduce((o, k) => o?.[k], obj)
}
