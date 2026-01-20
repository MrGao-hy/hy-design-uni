import { getByPath, Locale } from '../index'

export const useTranslate = (name: string) => {
    const t = (key: string, ...args: unknown[]) => {
        const currentMessages = Locale.messages()
        const value = getByPath(currentMessages[name], key)
        return typeof value === 'function' ? value(...args) : value
    }
    return { t }
}
