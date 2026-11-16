import type { SwipeActionOptionsVo, SwipeActionReason, SwipeActionStatus } from './typing'
import type { CSSProperties, PropType } from 'vue'

const swipeActionProps = {
    /**
     * 滑动按钮的状态，使用v-model进行双向绑定。
     * @values left,close,right
     * */
    modelValue: String as PropType<SwipeActionStatus>,
    /** 是否禁用滑动操作 */
    disabled: {
        type: Boolean,
        default: false
    },
    /** 显示底部边框 */
    borderBottom: {
        type: Boolean,
        default: false
    },
    /** 右侧按钮内容 */
    options: {
        type: Array as unknown as PropType<SwipeActionOptionsVo[]>,
        default: () => [
            {
                text: '收藏',
                style: {
                    backgroundColor: '#3c9cff'
                }
            },
            {
                text: '删除',
                style: {
                    backgroundColor: '#f56c6c'
                }
            }
        ]
    },
    /** 动画过渡时间，单位ms */
    duration: {
        type: Number,
        default: 300
    },
    /** 关闭滑动按钮前的钩子函数 */
    beforeClose: Function,
    /** 定义需要用到的外部样式 */
    customStyle: Object as PropType<CSSProperties>,
    /** 自定义外部类名 */
    customClass: String
}

export default swipeActionProps
