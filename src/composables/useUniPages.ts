import type { PageContext } from '@uni-helper/vite-plugin-uni-pages'

export const useUniPages = {
    exclude: ['**/components/**/**.*'],
    subPackages: ['src/pages-design'],
    homePage: 'pages/index/Index',
    onBeforeWriteFile(ctx: PageContext) {
        ctx.subPageMetaData.forEach((item) => {
            if (item.root === 'pages-design') {
                item.pages.forEach((p) => {
                    if (!p.style) p.style = {}
                    p.style.h5 = {
                        titleNView: {
                            buttons: [{ type: 'share', color: '#892FE8' }]
                        }
                    }
                })
            }
        })
    }
}
