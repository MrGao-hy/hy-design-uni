import { onShow } from '@dcloudio/uni-app'
import { useTranslate } from '@/package'

/**
 * 在页面 onShow 时按当前语言设置导航栏标题
 * 因 definePage({ style: { navigationBarTitleText } }) 是编译时静态值，
 * 不响应 Locale.use() 语言切换，需运行时调用 uni.setNavigationBarTitle 覆盖
 * @param namespace useTranslate 命名空间（同 locale key）
 */
export function usePageTitle(namespace: string) {
    const { t } = useTranslate(namespace)
    onShow(() => {
        uni.setNavigationBarTitle({ title: t('title') })
    })
}
