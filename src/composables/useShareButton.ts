import { onNavigationBarButtonTap } from '@dcloudio/uni-app'
import { config } from '@/config/config'

export function useShareButton() {
    onNavigationBarButtonTap((e: Page.NavigationBarButtonTapOption) => {
        const pages = getCurrentPages()
        if (e.index === 0) {
            window.open(`${config.url}/#/${pages[pages.length - 1].route}`, '_blank')
        }
    })
}
