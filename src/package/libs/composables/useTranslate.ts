import { Locale } from '../index'
function getValue(obj, path) {
    return path.split('.').reduce((o, k) => o?.[k], obj)
}
export const useTranslate = (name?: string) => {
    if (!name) return
    const t = (key: string, ...args: unknown[]) => {
        const currentMessages = Locale.messages()
        const value = getValue(currentMessages[name], key)
        return typeof value === 'function' ? value(...args) : value
    }
    return { t }
}
