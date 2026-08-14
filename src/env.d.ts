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
}
declare var wx: UniApp.Uni
