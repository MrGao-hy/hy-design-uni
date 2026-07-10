export interface UpdateVersionOptions {
    /** 最新版本号 */
    version: string
    /** 更新内容 */
    description: string
    /** 下载地址 */
    url: string
    /** 是否强制更新 */
    force?: boolean
    /** iOS AppStore地址 */
    iosStoreUrl?: string
    /** 下载进度 */
    onProgress?: (progress: UniNamespace.OnProgressDownloadResult) => void
    /** 更新前回调 */
    beforeUpdate?: (version: string) => boolean | void
    /** 更新成功 */
    onSuccess?: () => void
    /** 更新失败 */
    onFail?: (error: string) => void
    /** 点击确认回调 */
    onConfirm?: () => void
    /** 点击取消回调 */
    onCancel?: () => void
}

export const appInit = {
    /**
     * 检查更新
     */
    updateVersion(options: UpdateVersionOptions) {
        const {
            version,
            description,
            url,
            force = false,
            iosStoreUrl,
            onProgress,
            beforeUpdate,
            onSuccess,
            onFail,
            onConfirm,
            onCancel
        } = options

        if (!version) {
            console.error('version不能为空')
            return
        }

        if (plus.runtime.appid)
            plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
                const localVersion = widgetInfo.version
                const compareResult = this.compareVersion(version, localVersion || '')
                if (compareResult !== 1) {
                    return uni.showToast({ title: '已是最新版本', icon: 'none' })
                }

                if (typeof beforeUpdate === 'function') {
                    const result = beforeUpdate(version)

                    if (result === false) {
                        return
                    }
                }

                uni.showModal({
                    title: `发现新版本 V${version}`,
                    content: description,
                    showCancel: !force,
                    confirmText: '立即更新',
                    success: (res) => {
                        if (!res.confirm) {
                            if (typeof onCancel === 'function') {
                                onCancel()
                            }
                            return
                        }

                        if (typeof onConfirm === 'function') {
                            onConfirm()
                        }

                        const platform = uni.getSystemInfoSync().platform

                        // iOS
                        if (platform === 'ios') {
                            if (iosStoreUrl) {
                                plus.runtime.openURL(iosStoreUrl)
                            } else {
                                uni.showToast({
                                    title: '请配置AppStore地址',
                                    icon: 'none'
                                })
                            }
                            return
                        }

                        // Android
                        this.downloadApp(url, {
                            onProgress,
                            onSuccess,
                            onFail
                        })
                    }
                })
            })
    },

    /**
     * 比较版本号
     * @param serverVersion 服务端版本
     * @param localVersion 本地版本
     * @returns
     *  1: 服务端版本更高
     *  0: 版本相同
     * -1: 本地版本更高
     */
    compareVersion(serverVersion: string, localVersion: string) {
        if (!serverVersion || !localVersion) return 0
        const v1 = serverVersion.split('.').map(Number)
        const v2 = localVersion.split('.').map(Number)
        const length = Math.max(v1.length, v2.length)

        for (let i = 0; i < length; i++) {
            const n1 = v1[i] || 0
            const n2 = v2[i] || 0

            if (n1 > n2) {
                return 1
            }

            if (n1 < n2) {
                return -1
            }
        }

        return 0
    },

    /**
     * 下载更新包
     */
    downloadApp(
        downloadUrl: string,
        callbacks?: {
            onProgress?: (progress: UniNamespace.OnProgressDownloadResult) => void
            onSuccess?: () => void
            onFail?: (error: string) => void
        }
    ) {
        const { onProgress, onSuccess, onFail } = callbacks || {}

        if (!downloadUrl) {
            const msg = '下载地址不能为空'

            uni.showToast({
                title: msg,
                icon: 'none'
            })

            onFail?.(msg)

            return
        }

        const downloadTask = uni.downloadFile({
            url: downloadUrl,

            success: (res) => {
                if (res.statusCode !== 200) {
                    const msg = '下载失败'

                    uni.showToast({
                        title: msg,
                        icon: 'none'
                    })

                    onFail?.(msg)

                    return
                }

                this.installPackage(res.tempFilePath, downloadUrl, onSuccess, onFail)
            },

            fail: (err) => {
                console.error('下载失败', err)

                const msg = '下载失败'

                uni.showToast({
                    title: msg,
                    icon: 'none'
                })

                onFail?.(msg)
            }
        })

        downloadTask.onProgressUpdate((res) => {
            onProgress?.(res)
        })
    },

    /**
     * 安装更新包
     */
    installPackage(
        filePath: string,
        downloadUrl: string,
        onSuccess?: () => void,
        onFail?: (error: string) => void
    ) {
        const isWgt = downloadUrl.toLowerCase().endsWith('.wgt')

        const isApk = downloadUrl.toLowerCase().endsWith('.apk')

        // WGT热更新
        if (isWgt) {
            plus.runtime.install(
                filePath,
                {
                    force: false
                },
                () => {
                    uni.showToast({
                        title: '更新成功'
                    })

                    onSuccess?.()

                    setTimeout(() => {
                        plus.runtime.restart()
                    }, 1000)
                },
                (err) => {
                    console.error('安装失败', err)

                    const msg = `安装失败:${err.message}`

                    uni.showToast({
                        title: msg,
                        icon: 'none'
                    })

                    onFail?.(msg)
                }
            )

            return
        }

        // APK整包更新
        if (isApk) {
            plus.runtime.openFile(filePath, {}, (err) => {
                console.error('APK安装失败', err)

                const msg = 'APK安装失败'

                uni.showToast({
                    title: msg,
                    icon: 'none'
                })

                onFail?.(msg)
            })

            return
        }

        const msg = '未知安装包格式'

        uni.showToast({
            title: msg,
            icon: 'none'
        })

        onFail?.(msg)
    }
}
