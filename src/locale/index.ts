import { Locale } from '@/package'
import enUS from './en-US'
import zhCN from './zh-CN'

/**
 * 多语言文案注册
 * 命名空间规范：按页面/模块划分，useTranslate(name) 中的 name 对应此处 key
 * 新增页面文案时，在 en.json 和 zh-CN.json 中同步添加对应命名空间
 */
const messages = {
    'en-US': enUS,
    'zh-CN': zhCN
}

/**
 * 初始化多语言
 * 默认使用英文
 * 切换语言：Locale.use('zh-CN') / Locale.use('en')
 */
export function setupLocale() {
    Locale.add(messages)
}


export { Locale }
