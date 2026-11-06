/// <reference types="vite/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    // export interface GlobalComponents {
    //     // 匹配 the-xxx 组件
    //     TheRootPage: (typeof import('@/components/the-root-page.vue'))['default']
    // }
    export default component
}

declare namespace UniApp {
    interface Uni {
        wx: any
    }
    /** 微信小程序独有 API 类型补充（@dcloudio/types 未收录） */
    interface WxExtras {
        /** 设置页面样式，如 { overflow: 'hidden' }，基础库 2.16.0+ */
        setPageStyle(options: { style: Record<string, string> }): void
    }
}
declare var wx: UniApp.Uni & UniApp.WxExtras
