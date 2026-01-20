import { reactive, ref } from 'vue'
import zhCN from './lang/zh-CN'
import { deepMerge } from '../index'

type Message = Record<string, any>
type Messages = Record<string, Message>

const lang = ref<string>('zh-CN')
const messages = reactive<Messages>({
    'zh-CN': zhCN
})

export const Locale = {
    messages(): Message {
        return messages[lang.value]
    },

    use(newLang: string, newMessage?: Message) {
        lang.value = newLang
        if (newMessage) {
            this.add({ [newLang]: newMessage })
        }
    },

    add(newMessages: Messages = {}) {
        deepMerge(messages, newMessages)
    }
}

export const useCurrentLang = () => lang

export default Locale
