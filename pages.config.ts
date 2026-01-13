import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

// 如果以后还要加别的按钮，一起导出即可
export const H5_NAV_CONFIG = {
    titleNView: {
        buttons: [
            {
                type: 'share',
                color: '#892FE8'
            }
        ]
    }
}

export default defineUniPages({
    globalStyle: {
        navigationBarTitleText: '华玥组件库',
        enablePullDownRefresh: false
    },
    tabBar: {
        color: '#7A7E83',
        selectedColor: '#3cc51f',
        borderStyle: 'black',
        list: [
            {
                pagePath: 'pages/index/Index',
                text: '首页',
                iconPath: './static/tabbar/home.png',
                selectedIconPath: './static/tabbar/homeHL.png'
            },
            {
                pagePath: 'pages/mine/Index',
                text: '我的',
                iconPath: './static/tabbar/personal.png',
                selectedIconPath: './static/tabbar/personalHL.png'
            }
        ]
    },
    easycom: {
        autoscan: true,
        custom: {
            '^hy-(.*)': 'hy-app/components/hy-$1/hy-$1.vue'
        }
    },
    beforeWrite(pages) {
        console.log(pages)
        pages.forEach((p) => {
            if (p.path) {
                if (!p.style) p.style = {}
                p.style.h5 = {
                    titleNView: {
                        buttons: [{ type: 'share', color: '#892FE8' }]
                    }
                }
            }
        })
    }
})
