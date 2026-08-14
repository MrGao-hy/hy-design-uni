<template>
    <the-root-page>
        <scroll-view class="tools-page" scroll-y :show-scrollbar="false">
            <!-- 顶部说明 -->
            <hy-card custom-class="intro-card">
                <hy-flex vertical gap="12rpx">
                    <hy-flex align="center" gap="12rpx">
                        <view class="intro-icon">
                            <hy-icon :name="IconConfig.SETTING_FILL" size="22" color="#fff" />
                        </view>
                        <hy-text :text="t('title')" size="34rpx" :bold="true" />
                    </hy-flex>
                    <hy-text :text="t('intro')" size="24rpx" color="#666" block />
                    <!-- 总览统计 -->
                    <hy-flex align="center" gap="16rpx" custom-class="summary-row">
                        <view class="summary-item summary-item--pass">
                            <hy-text :text="String(passCount)" size="32rpx" :bold="true" block />
                            <hy-text :text="t('pass')" size="22rpx" color="#666" block />
                        </view>
                        <view class="summary-item summary-item--fail">
                            <hy-text :text="String(failCount)" size="32rpx" :bold="true" block />
                            <hy-text :text="t('fail')" size="22rpx" color="#666" block />
                        </view>
                        <view class="summary-item summary-item--pending">
                            <hy-text :text="String(pendingCount)" size="32rpx" :bold="true" block />
                            <hy-text :text="t('pending')" size="22rpx" color="#666" block />
                        </view>
                        <view class="summary-action">
                            <hy-button
                                type="primary"
                                size="small"
                                :loading="runningAll"
                                :disabled="runningAll"
                                @click="runAll"
                            >
                                {{ runningAll ? t('running') : t('runAll') }}
                            </hy-button>
                        </view>
                    </hy-flex>
                </hy-flex>
            </hy-card>

            <!-- 检测项列表 -->
            <hy-card v-for="item in checks" :key="item.key" custom-class="check-card">
                <view class="check-row">
                    <view class="check-info" @click="toggleDetail(item.key)">
                        <view class="check-icon" :style="{ backgroundColor: item.iconBg }">
                            <hy-icon :name="item.icon" size="18" color="#fff" />
                        </view>
                        <hy-flex vertical :flex="1" gap="4rpx">
                            <hy-flex align="center" gap="8rpx">
                                <hy-text :text="t(item.key)" size="28rpx" :bold="true" />
                                <hy-tag
                                    v-if="item.status !== 'pending'"
                                    :label="statusLabel(item.status)"
                                    :type="statusTagType(item.status)"
                                    size="mini"
                                />
                            </hy-flex>
                            <hy-text :text="t(`${item.key}_desc`)" size="22rpx" color="#999" />
                        </hy-flex>
                        <hy-icon :name="item.expanded ? 'up' : 'down'" size="16" color="#c0c4cc" />
                    </view>

                    <!-- 操作按钮 -->
                    <view class="check-action">
                        <hy-button
                            size="mini"
                            :type="item.status === 'fail' ? 'error' : 'primary'"
                            :plain="item.status === 'pass'"
                            :loading="item.loading"
                            :disabled="item.loading"
                            @click="runOne(item.key)"
                        >
                            {{ item.loading ? t('running') : t('retry') }}
                        </hy-button>
                    </view>
                </view>

                <!-- 详情区域 -->
                <view v-if="item.expanded" class="check-detail">
                    <view class="detail-row">
                        <hy-text :text="t('result')" size="24rpx" color="#999" />
                        <hy-text :text="item.message || t('noResult')" size="24rpx" color="#333" />
                    </view>
                    <view v-if="item.detail" class="detail-code">
                        <hy-text :text="item.detail" size="22rpx" color="#666" block />
                    </view>
                    <view v-if="item.suggestion" class="detail-suggestion">
                        <hy-icon :name="IconConfig.NOTICE" size="14" color="#ff9900" />
                        <hy-text
                            :text="item.suggestion"
                            size="22rpx"
                            color="#ff9900"
                            :flex="true"
                        />
                    </view>
                </view>
            </hy-card>

            <!-- 底部操作 -->
            <hy-card custom-class="footer-card">
                <hy-flex vertical gap="16rpx">
                    <hy-button
                        type="primary"
                        block
                        :loading="generatingReport"
                        :disabled="generatingReport"
                        @click="generateReport"
                    >
                        {{ t('generateReport') }}
                    </hy-button>
                    <hy-button type="info" plain block @click="resetAll">
                        {{ t('reset') }}
                    </hy-button>
                </hy-flex>
            </hy-card>
        </scroll-view>

        <!-- 报告弹窗 -->
        <hy-popup v-model:show="reportVisible" mode="bottom" :round="16">
            <view class="report-popup">
                <view class="report-header">
                    <hy-text :text="t('reportTitle')" size="32rpx" :bold="true" />
                    <hy-icon
                        :name="IconConfig.CLOSE"
                        size="22"
                        color="#999"
                        @click="reportVisible = false"
                    />
                </view>
                <scroll-view class="report-body" scroll-y>
                    <view
                        v-for="item in checks"
                        :key="item.key"
                        class="report-item"
                        :class="`report-item--${item.status}`"
                    >
                        <view class="report-item__header">
                            <hy-text :text="t(item.key)" size="26rpx" :bold="true" />
                            <hy-tag
                                :label="statusLabel(item.status)"
                                :type="statusTagType(item.status)"
                                size="mini"
                            />
                        </view>
                        <hy-text
                            v-if="item.message"
                            :text="item.message"
                            size="22rpx"
                            color="#666"
                            block
                        />
                    </view>
                </scroll-view>
                <view class="report-footer">
                    <hy-button type="primary" block @click="copyReport">
                        {{ t('copyReport') }}
                    </hy-button>
                </view>
            </view>
        </hy-popup>
    </the-root-page>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { IconConfig, Locale, useCurrentLang, useToast } from '@/package'

// 国际化文案
const i18nMessages: Record<string, Record<string, string>> = {
    'zh-CN': {
        title: '鸿蒙审核测试工具',
        intro: '面向 HarmonyOS 应用市场上架审核的前端自检工具，覆盖网络、存储、安全区、暗黑模式、性能、权限等关键检测点。',
        runAll: '一键全量检测',
        running: '检测中...',
        retry: '重新检测',
        pass: '通过',
        fail: '未通过',
        pending: '未检测',
        result: '结果',
        noResult: '暂无检测结果，请先执行检测',
        generateReport: '生成检测报告',
        reset: '重置全部结果',
        reportTitle: '检测报告',
        copyReport: '复制报告内容',
        copySuccess: '报告已复制到剪贴板',
        resetSuccess: '已重置全部检测结果',
        allPass: '全部检测项已通过',
        hasFail: '存在未通过项，请查看详情',
        // 检测项
        deviceInfo: '设备信息',
        deviceInfo_desc: '获取系统型号、屏幕、像素比等基础信息',
        httpsCheck: 'HTTPS 网络检测',
        httpsCheck_desc: '审核要求所有外网请求必须使用 HTTPS',
        storageCheck: '本地存储检测',
        storageCheck_desc: '验证 setStorage / getStorage 读写正常',
        safeArea: '安全区域适配',
        safeArea_desc: '检测状态栏、导航栏、底部安全区高度',
        darkMode: '暗黑模式适配',
        darkMode_desc: '检测系统主题切换是否正常响应',
        networkType: '网络状态检测',
        networkType_desc: '获取当前网络类型与在线状态',
        clipboard: '剪贴板检测',
        clipboard_desc: '验证剪贴板写入读取功能',
        vibrate: '震动反馈检测',
        vibrate_desc: '触发短震动验证硬件反馈',
        performance: '启动性能检测',
        performance_desc: '测量页面加载耗时与基础性能指标',
        permission: '权限状态检测',
        permission_desc: '检测位置、存储、相机等关键权限状态',
        // 提示
        httpsPass: '未检测到 HTTP 明文请求',
        httpsFail: '检测到 HTTP 明文请求，请改用 HTTPS',
        storagePass: '本地存储读写正常',
        storageFail: '本地存储读写异常：',
        safeAreaPass: '安全区数据已获取',
        safeAreaFail: '安全区数据获取失败',
        darkModePass: '当前主题：',
        darkModeFail: '无法获取系统主题',
        networkPass: '网络在线，类型：',
        networkFail: '网络获取失败：',
        clipboardPass: '剪贴板读写正常',
        clipboardFail: '剪贴板读写异常：',
        vibratePass: '震动触发成功',
        vibrateFail: '震动触发失败：',
        performancePass: '页面加载耗时：',
        performanceFail: '性能数据获取失败',
        permissionPass: '权限检测完成',
        permissionFail: '权限检测失败：',
        suggestHttps: '鸿蒙审核强制要求 HTTPS，请检查所有外网域名',
        suggestSafeArea: '请使用 safeAreaInsets 适配顶部底部安全区',
        suggestDarkMode: '建议跟随系统主题或提供手动切换',
        suggestPermission: '请在使用相关功能前申请权限并说明用途'
    },
    'en-US': {
        title: 'HarmonyOS Audit Toolkit',
        intro: 'Front-end self-check toolkit for HarmonyOS AppGallery review, covering network, storage, safe area, dark mode, performance and permissions.',
        runAll: 'Run All Checks',
        running: 'Running...',
        retry: 'Re-run',
        pass: 'Pass',
        fail: 'Fail',
        pending: 'Pending',
        result: 'Result',
        noResult: 'No result yet, please run check first',
        generateReport: 'Generate Report',
        reset: 'Reset All',
        reportTitle: 'Audit Report',
        copyReport: 'Copy Report',
        copySuccess: 'Report copied to clipboard',
        resetSuccess: 'All results have been reset',
        allPass: 'All checks passed',
        hasFail: 'Some checks failed, please review details',
        deviceInfo: 'Device Info',
        deviceInfo_desc: 'Get system model, screen, pixel ratio, etc.',
        httpsCheck: 'HTTPS Network',
        httpsCheck_desc: 'All external requests must use HTTPS',
        storageCheck: 'Local Storage',
        storageCheck_desc: 'Verify setStorage / getStorage works',
        safeArea: 'Safe Area',
        safeArea_desc: 'Detect status bar, navbar, bottom safe area',
        darkMode: 'Dark Mode',
        darkMode_desc: 'Detect system theme switch',
        networkType: 'Network Status',
        networkType_desc: 'Get current network type and online status',
        clipboard: 'Clipboard',
        clipboard_desc: 'Verify clipboard read/write',
        vibrate: 'Vibrate',
        vibrate_desc: 'Trigger short vibration',
        performance: 'Performance',
        performance_desc: 'Measure page load time',
        permission: 'Permissions',
        permission_desc: 'Detect location, storage, camera permissions',
        httpsPass: 'No HTTP plaintext request detected',
        httpsFail: 'HTTP plaintext request detected, please use HTTPS',
        storagePass: 'Local storage works fine',
        storageFail: 'Storage error: ',
        safeAreaPass: 'Safe area data fetched',
        safeAreaFail: 'Failed to fetch safe area data',
        darkModePass: 'Current theme: ',
        darkModeFail: 'Cannot get system theme',
        networkPass: 'Online, type: ',
        networkFail: 'Network error: ',
        clipboardPass: 'Clipboard works fine',
        clipboardFail: 'Clipboard error: ',
        vibratePass: 'Vibration triggered',
        vibrateFail: 'Vibration failed: ',
        performancePass: 'Page load time: ',
        performanceFail: 'Failed to get performance data',
        permissionPass: 'Permission check done',
        permissionFail: 'Permission check failed: ',
        suggestHttps: 'HTTPS is mandatory for HarmonyOS review',
        suggestSafeArea: 'Use safeAreaInsets to adapt top/bottom safe area',
        suggestDarkMode: 'Follow system theme or provide manual switch',
        suggestPermission: 'Apply permissions before use and explain purposes'
    }
}

Locale.add(i18nMessages)

const currentLang = useCurrentLang()
void currentLang
const t = (key: string): string => {
    const msgs = Locale.messages()
    return msgs?.[key] || key
}

const toast = useToast()

// 页面入口时间戳，用于性能检测
const pageStartTime = Date.now()

// 检测项状态
type CheckStatus = 'pending' | 'pass' | 'fail'

interface CheckItem {
    key: string
    icon: string
    iconBg: string
    status: CheckStatus
    loading: boolean
    expanded: boolean
    message: string
    detail: string
    suggestion: string
}

// 初始化检测项
const createChecks = (): CheckItem[] => [
    {
        key: 'deviceInfo',
        icon: IconConfig.MINE_FILL,
        iconBg: '#667eea',
        status: 'pending',
        loading: false,
        expanded: false,
        message: '',
        detail: '',
        suggestion: ''
    },
    {
        key: 'httpsCheck',
        icon: IconConfig.LOCK_FILL,
        iconBg: '#48bb78',
        status: 'pending',
        loading: false,
        expanded: false,
        message: '',
        detail: '',
        suggestion: ''
    },
    {
        key: 'storageCheck',
        icon: IconConfig.TASK,
        iconBg: '#ed8936',
        status: 'pending',
        loading: false,
        expanded: false,
        message: '',
        detail: '',
        suggestion: ''
    },
    {
        key: 'safeArea',
        icon: IconConfig.SCREEN,
        iconBg: '#4299e1',
        status: 'pending',
        loading: false,
        expanded: false,
        message: '',
        detail: '',
        suggestion: ''
    },
    {
        key: 'darkMode',
        icon: IconConfig.SETTING_FILL,
        iconBg: '#9f7aea',
        status: 'pending',
        loading: false,
        expanded: false,
        message: '',
        detail: '',
        suggestion: ''
    },
    {
        key: 'networkType',
        icon: IconConfig.REFRESH,
        iconBg: '#38b2ac',
        status: 'pending',
        loading: false,
        expanded: false,
        message: '',
        detail: '',
        suggestion: ''
    },
    {
        key: 'clipboard',
        icon: IconConfig.EDIT,
        iconBg: '#f56565',
        status: 'pending',
        loading: false,
        expanded: false,
        message: '',
        detail: '',
        suggestion: ''
    },
    {
        key: 'vibrate',
        icon: IconConfig.NOTICE,
        iconBg: '#ecc94b',
        status: 'pending',
        loading: false,
        expanded: false,
        message: '',
        detail: '',
        suggestion: ''
    },
    {
        key: 'performance',
        icon: IconConfig.SUCCESS,
        iconBg: '#38a169',
        status: 'pending',
        loading: false,
        expanded: false,
        message: '',
        detail: '',
        suggestion: ''
    },
    {
        key: 'permission',
        icon: IconConfig.LOCK,
        iconBg: '#d53f8c',
        status: 'pending',
        loading: false,
        expanded: false,
        message: '',
        detail: '',
        suggestion: ''
    }
]

const checks = reactive<CheckItem[]>(createChecks())

// 统计
const passCount = computed(() => checks.filter((c) => c.status === 'pass').length)
const failCount = computed(() => checks.filter((c) => c.status === 'fail').length)
const pendingCount = computed(() => checks.filter((c) => c.status === 'pending').length)

// 状态文案
const statusLabel = (status: CheckStatus): string => t(status)
const statusTagType = (status: CheckStatus): 'success' | 'error' | 'info' => {
    if (status === 'pass') return 'success'
    if (status === 'fail') return 'error'
    return 'info'
}

// 展开收起
const toggleDetail = (key: string) => {
    const item = checks.find((c) => c.key === key)
    if (item) item.expanded = !item.expanded
}

// 更新检测项结果
const updateCheck = (
    key: string,
    result: { status: CheckStatus; message: string; detail?: string; suggestion?: string }
) => {
    const item = checks.find((c) => c.key === key)
    if (!item) return
    item.status = result.status
    item.message = result.message
    item.detail = result.detail || ''
    item.suggestion = result.suggestion || ''
    item.loading = false
    item.expanded = true
}

// ========== 各检测项实现 ==========

// 设备信息
const checkDeviceInfo = async () => {
    try {
        // 同步获取系统信息，所有端均支持
        const info = uni.getSystemInfoSync()
        const detail = [
            `品牌: ${info.brand || '-'}`,
            `型号: ${info.model || '-'}`,
            `系统: ${info.system || info.osName || '-'}`,
            `版本: ${info.version || info.osVersion || '-'}`,
            `屏幕: ${info.screenWidth || '-'}x${info.screenHeight || '-'}`,
            `像素比: ${info.pixelRatio || '-'}`,
            `状态栏: ${info.statusBarHeight || 0}px`,
            `安全区: ${JSON.stringify(info.safeAreaInsets || {})}`,
            `语言: ${info.language || '-'}`
        ].join('\n')
        updateCheck('deviceInfo', {
            status: 'pass',
            message: `${info.brand || ''} ${info.model || ''}`.trim() || 'OK',
            detail
        })
    } catch (e) {
        updateCheck('deviceInfo', { status: 'fail', message: String(e) })
    }
}

// HTTPS 检测
const checkHttps = async () => {
    // 检测项目中可能配置的请求域名是否为 HTTPS
    // 此处扫描已知的可能配置（如果项目扩展，可在此添加）
    const suspiciousUrls: string[] = []

    // 检测本地存储中是否有 http:// 开头的配置
    try {
        const keys = uni.getStorageInfoSync().keys || []
        keys.forEach((key: string) => {
            const val = uni.getStorageSync(key)
            if (typeof val === 'string' && val.startsWith('http://')) {
                suspiciousUrls.push(`${key}: ${val}`)
            }
        })
    } catch (e) {
        // 忽略存储读取错误
    }

    if (suspiciousUrls.length > 0) {
        updateCheck('httpsCheck', {
            status: 'fail',
            message: t('httpsFail'),
            detail: suspiciousUrls.join('\n'),
            suggestion: t('suggestHttps')
        })
    } else {
        updateCheck('httpsCheck', {
            status: 'pass',
            message: t('httpsPass'),
            detail: '已扫描本地存储，未发现 http:// 明文地址'
        })
    }
}

// 本地存储检测
const checkStorage = async () => {
    const testKey = 'harmony_test_storage'
    const testValue = `test_${Date.now()}`
    try {
        uni.setStorageSync(testKey, testValue)
        const read = uni.getStorageSync(testKey)
        uni.removeStorageSync(testKey)
        if (read === testValue) {
            updateCheck('storageCheck', {
                status: 'pass',
                message: t('storagePass'),
                detail: `写入: ${testValue}\n读取: ${read}`
            })
        } else {
            updateCheck('storageCheck', {
                status: 'fail',
                message: t('storageFail') + '数据不一致'
            })
        }
    } catch (e) {
        updateCheck('storageCheck', {
            status: 'fail',
            message: t('storageFail') + String(e)
        })
    }
}

// 安全区检测
const checkSafeArea = async () => {
    try {
        const info = uni.getSystemInfoSync()
        const top = info.statusBarHeight || 0
        // 不同端 safeAreaInsets 字段可能不同
        const insets: any = (info as any).safeAreaInsets || { top: 0, bottom: 0, left: 0, right: 0 }
        const bottom = insets.bottom || 0
        if (top > 0 || bottom > 0) {
            updateCheck('safeArea', {
                status: 'pass',
                message: t('safeAreaPass'),
                detail: `顶部状态栏: ${top}px\n底部安全区: ${bottom}px\n insets: ${JSON.stringify(insets)}`
            })
        } else {
            updateCheck('safeArea', {
                status: 'fail',
                message: t('safeAreaFail'),
                suggestion: t('suggestSafeArea')
            })
        }
    } catch (e) {
        updateCheck('safeArea', {
            status: 'fail',
            message: t('safeAreaFail'),
            detail: String(e)
        })
    }
}

// 暗黑模式
const checkDarkMode = async () => {
    try {
        const info = uni.getSystemInfoSync()
        const theme = (info as any).theme || 'light'
        updateCheck('darkMode', {
            status: 'pass',
            message: t('darkModePass') + (theme === 'dark' ? 'Dark' : 'Light'),
            detail: `theme: ${theme}\n说明：鸿蒙审核建议跟随系统主题`
        })
    } catch (e) {
        updateCheck('darkMode', {
            status: 'fail',
            message: t('darkModeFail'),
            detail: String(e),
            suggestion: t('suggestDarkMode')
        })
    }
}

// 网络状态
const checkNetwork = async () => {
    return new Promise<void>((resolve) => {
        uni.getNetworkType({
            success: (res) => {
                updateCheck('networkType', {
                    status: 'pass',
                    message: t('networkPass') + res.networkType,
                    detail: `networkType: ${res.networkType}`
                })
                resolve()
            },
            fail: (err) => {
                updateCheck('networkType', {
                    status: 'fail',
                    message: t('networkFail') + (err.errMsg || ''),
                    detail: JSON.stringify(err)
                })
                resolve()
            }
        })
    })
}

// 剪贴板
const checkClipboard = async () => {
    const testText = `harmony_clip_${Date.now()}`
    try {
        uni.setClipboardData({
            data: testText,
            success: () => {
                uni.getClipboardData({
                    success: (res) => {
                        if (res.data === testText) {
                            updateCheck('clipboard', {
                                status: 'pass',
                                message: t('clipboardPass'),
                                detail: `写入: ${testText}\n读取: ${res.data}`
                            })
                        } else {
                            updateCheck('clipboard', {
                                status: 'fail',
                                message: t('clipboardFail') + '数据不一致'
                            })
                        }
                    },
                    fail: (err) => {
                        updateCheck('clipboard', {
                            status: 'fail',
                            message: t('clipboardFail') + (err.errMsg || '')
                        })
                    }
                })
            },
            fail: (err) => {
                updateCheck('clipboard', {
                    status: 'fail',
                    message: t('clipboardFail') + (err.errMsg || '')
                })
            }
        })
    } catch (e) {
        updateCheck('clipboard', {
            status: 'fail',
            message: t('clipboardFail') + String(e)
        })
    }
}

// 震动
const checkVibrate = async () => {
    try {
        uni.vibrateShort({
            type: 'light',
            success: () => {
                updateCheck('vibrate', {
                    status: 'pass',
                    message: t('vibratePass'),
                    detail: '已触发 short light 振动'
                })
            },
            fail: (err) => {
                updateCheck('vibrate', {
                    status: 'fail',
                    message: t('vibrateFail') + (err.errMsg || ''),
                    detail: JSON.stringify(err)
                })
            }
        })
    } catch (e) {
        updateCheck('vibrate', {
            status: 'fail',
            message: t('vibrateFail') + String(e)
        })
    }
}

// 性能
const checkPerformance = async () => {
    try {
        const now = Date.now()
        // 计算从页面入口到当前的耗时（粗略估算）
        const elapsed = now - pageStartTime
        // performance.now（部分端支持）
        let startup = 0
        // #ifdef H5
        if (typeof performance !== 'undefined' && performance.now) {
            startup = performance.now()
        }
        // #endif
        // 内存信息（仅 H5 支持）
        let memInfo = '不支持'
        // #ifdef H5
        const perfMem = (performance as any).memory
        if (perfMem) {
            memInfo = `jsHeapSize: ${Math.round(
                perfMem.usedJSHeapSize / 1024
            )}KB / ${Math.round(perfMem.jsHeapSizeLimit / 1024)}KB`
        }
        // #endif
        updateCheck('performance', {
            status: 'pass',
            message: t('performancePass') + `${elapsed}ms`,
            detail: `页面加载耗时: ${elapsed}ms\nperformance.now: ${startup.toFixed(2)}\n内存: ${memInfo}`
        })
    } catch (e) {
        updateCheck('performance', {
            status: 'fail',
            message: t('performanceFail'),
            detail: String(e)
        })
    }
}

// 权限
const checkPermission = async () => {
    // 权限检测在多端差异较大，这里给出检测框架
    const detail: string[] = []
    let allPass = true

    // #ifdef APP-PLUS
    try {
        const result = await new Promise<{ authSetting: Record<string, boolean> }>((resolve) => {
            uni.getSetting({
                success: (res: any) => resolve(res as { authSetting: Record<string, boolean> }),
                fail: () => resolve({ authSetting: {} })
            })
        })
        const auth = result.authSetting || {}
        const perms = [
            'scope.userLocation',
            'scope.userInfo',
            'scope.camera',
            'scope.record',
            'scope.writePhotosAlbum',
            'scope.album'
        ]
        perms.forEach((p) => {
            const v = auth[p]
            detail.push(`${p}: ${v === undefined ? '未申请' : v ? '已授权' : '已拒绝'}`)
            if (v === false) allPass = false
        })
    } catch (e) {
        detail.push(`getSetting 异常: ${String(e)}`)
        allPass = false
    }
    // #endif

    // #ifdef MP-WEIXIN || MP-ALIPAY
    try {
        const result = await new Promise<{ authSetting: Record<string, boolean> }>((resolve) => {
            uni.getSetting({
                success: (res: any) => resolve(res as { authSetting: Record<string, boolean> }),
                fail: () => resolve({ authSetting: {} })
            })
        })
        const auth = result.authSetting || {}
        Object.keys(auth).forEach((p) => {
            const v = auth[p]
            detail.push(`${p}: ${v ? '已授权' : '已拒绝'}`)
            if (v === false) allPass = false
        })
        if (Object.keys(auth).length === 0) {
            detail.push('当前无已申请权限记录')
        }
    } catch (e) {
        detail.push(`getSetting 异常: ${String(e)}`)
    }
    // #endif

    // #ifdef H5 || APP-HARMONY
    detail.push('H5/鸿蒙端使用通用权限检测，建议结合具体权限 API 测试')
    // #endif

    updateCheck('permission', {
        status: allPass ? 'pass' : 'fail',
        message: t('permissionPass'),
        detail: detail.join('\n'),
        suggestion: allPass ? '' : t('suggestPermission')
    })
}

// 检测调度
const checkerMap: Record<string, () => Promise<void> | void> = {
    deviceInfo: checkDeviceInfo,
    httpsCheck: checkHttps,
    storageCheck: checkStorage,
    safeArea: checkSafeArea,
    darkMode: checkDarkMode,
    networkType: checkNetwork,
    clipboard: checkClipboard,
    vibrate: checkVibrate,
    performance: checkPerformance,
    permission: checkPermission
}

// 执行单个检测
const runOne = async (key: string) => {
    const item = checks.find((c) => c.key === key)
    if (!item) return
    item.loading = true
    item.expanded = true
    item.status = 'pending'
    item.message = ''
    item.detail = ''
    item.suggestion = ''
    try {
        await checkerMap[key]()
    } catch (e) {
        updateCheck(key, { status: 'fail', message: String(e) })
    }
}

// 一键全量检测
const runningAll = ref(false)
const runAll = async () => {
    if (runningAll.value) return
    runningAll.value = true
    for (const item of checks) {
        item.loading = true
        item.status = 'pending'
        item.message = ''
        item.detail = ''
        item.suggestion = ''
    }
    // 顺序执行避免并发干扰
    for (const item of checks) {
        try {
            await checkerMap[item.key]()
        } catch (e) {
            updateCheck(item.key, { status: 'fail', message: String(e) })
        }
    }
    runningAll.value = false
    // 同步未通过项数到本地，供首页徽标使用
    const fails = checks.filter((c) => c.status === 'fail').length
    uni.setStorageSync('harmony_tools_issues', fails)
    if (fails === 0) {
        toast.success(t('allPass'))
    } else {
        toast.warning(t('hasFail'))
    }
}

// 重置
const resetAll = () => {
    checks.forEach((item) => {
        item.status = 'pending'
        item.loading = false
        item.expanded = false
        item.message = ''
        item.detail = ''
        item.suggestion = ''
    })
    uni.removeStorageSync('harmony_tools_issues')
    toast.success(t('resetSuccess'))
}

// 报告
const reportVisible = ref(false)
const generatingReport = ref(false)
const generateReport = () => {
    generatingReport.value = true
    // 展开所有未通过项
    checks.forEach((c) => {
        if (c.status === 'fail') c.expanded = true
    })
    setTimeout(() => {
        reportVisible.value = true
        generatingReport.value = false
    }, 300)
}

// 复制报告
const copyReport = () => {
    const lines: string[] = [
        `# ${t('reportTitle')}`,
        `时间: ${new Date().toLocaleString()}`,
        `通过: ${passCount.value}  失败: ${failCount.value}  未检测: ${pendingCount.value}`,
        ''
    ]
    checks.forEach((c) => {
        lines.push(`## ${t(c.key)} [${statusLabel(c.status)}]`)
        if (c.message) lines.push(`- ${c.message}`)
        if (c.detail) lines.push(`\n${c.detail}`)
        if (c.suggestion) lines.push(`\n建议: ${c.suggestion}`)
        lines.push('')
    })
    const text = lines.join('\n')
    uni.setClipboardData({
        data: text,
        success: () => toast.success(t('copySuccess'))
    })
}
</script>

<style lang="scss">
.tools-page {
    height: 100vh;
    padding: $hy-border-margin-padding-base;
    box-sizing: border-box;
}

.intro-card {
    margin-bottom: $hy-border-margin-padding-base;
}

.intro-icon {
    width: 60rpx;
    height: 60rpx;
    border-radius: $hy-radius-base;
    background: linear-gradient(135deg, #9f7aea, #667eea);
    display: flex;
    align-items: center;
    justify-content: center;
}

.summary-row {
    margin-top: $hy-border-margin-padding-sm;
    padding: $hy-border-margin-padding-base;
    background: $hy-background;
    border-radius: $hy-radius-sm;
}

.summary-item {
    flex: 1;
    text-align: center;
    padding: 8rpx 0;

    &--pass {
        border-right: 1rpx solid #e4e7ed;
    }
    &--fail {
        border-right: 1rpx solid #e4e7ed;
    }
    &--pending {
        // 最后一项无边框
    }
}

.summary-action {
    flex-shrink: 0;
    padding-left: $hy-border-margin-padding-base;
}

.check-card {
    margin-bottom: $hy-border-margin-padding-base;
}

.check-row {
    display: flex;
    align-items: center;
    padding: 4rpx 0;
}

.check-info {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 16rpx 0;
    min-width: 0;
}

.check-icon {
    width: 48rpx;
    height: 48rpx;
    border-radius: $hy-radius-sm;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: $hy-border-margin-padding-base;
    flex-shrink: 0;
}

.check-action {
    flex-shrink: 0;
    padding-left: $hy-border-margin-padding-base;
}

.check-detail {
    margin-top: $hy-border-margin-padding-base;
    padding-top: $hy-border-margin-padding-base;
    border-top: 1rpx dashed #ebeef5;
}

.detail-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12rpx;
}

.detail-code {
    background: $hy-background;
    border-radius: $hy-radius-sm;
    padding: $hy-border-margin-padding-base;
    margin-bottom: 12rpx;
    white-space: pre-wrap;
    word-break: break-all;
}

.detail-suggestion {
    display: flex;
    align-items: flex-start;
    gap: 8rpx;
    padding: $hy-border-margin-padding-base;
    background: rgba(255, 153, 0, 0.08);
    border-radius: $hy-radius-sm;
}

.footer-card {
    margin-top: $hy-border-margin-padding-base;
    margin-bottom: 60rpx;
}

/* 报告弹窗 */
.report-popup {
    padding: $hy-border-margin-padding-base;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
}

.report-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: $hy-border-margin-padding-base;
    border-bottom: 1rpx solid #ebeef5;
}

.report-body {
    flex: 1;
    padding: $hy-border-margin-padding-base 0;
    max-height: 60vh;
}

.report-item {
    padding: $hy-border-margin-padding-base;
    margin-bottom: $hy-border-margin-padding-base;
    border-radius: $hy-radius-sm;
    background: $hy-background;

    &--pass {
        border-left: 6rpx solid $hy-success;
    }
    &--fail {
        border-left: 6rpx solid $hy-error;
    }
    &--pending {
        border-left: 6rpx solid $hy-info;
    }
}

.report-item__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8rpx;
}

.report-footer {
    padding-top: $hy-border-margin-padding-base;
    border-top: 1rpx solid #ebeef5;
}
</style>
