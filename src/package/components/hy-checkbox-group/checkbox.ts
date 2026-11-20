import type { InjectionKey } from 'vue'
import type { ICheckboxGroupContext } from './typing'

/** hy-checkbox-group 与 hy-checkbox-item 之间的注入标识 */
export const CHECKBOX_GROUP_KEY: InjectionKey<ICheckboxGroupContext> = Symbol('hy-checkbox-group')
