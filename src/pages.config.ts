import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

// 颜色只写这里
export const H5_BTN_SHARE = {
    type: 'share',
    color: '#892FE8' // ← 改这里 = 全局生效
}

// 如果以后还要加别的按钮，一起导出即可
export const H5_NAV_CONFIG = {
    titleNView: {
        buttons: [H5_BTN_SHARE]
    }
}

export default defineUniPages({
    // 这里写法和官方 pages.json 完全一致，只是变成 TS，可写注释、用变量
    globalStyle: {
        navigationBarTitleText: 'Demo',
        navigationBarTextStyle: 'black',
        navigationBarBackgroundColor: '#F8F8F8'
    },
    // 插件会先把文件系统扫出来的 pages 数组合并到这里
    // 我们利用 extend 钩子，给每个页面统一加 h5 按钮
    onPagesExtend(pages) {
        pages.forEach((p) => {
            if (!p.style) p.style = {}
            // 直接挂上去即可
            p.style.h5 = H5_NAV_CONFIG
        })
    }
})
