// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import pages from '../../pages.config' // 这里是你 defineUniPages 导出的配置

const routes = Object.values(pages.pages || {}).map((p) => ({
    path: '/' + p.path,
    name: p.name,
    component: () => import(`../pages/${p.path}/index.vue`)
}))

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
