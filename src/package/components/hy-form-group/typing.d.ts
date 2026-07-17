import type { HyInputProps } from '../../index'
import type { InputOnBlurEvent } from '@uni-helper/uni-types'

export interface HyInputInstance extends HyInputProps {
    onChange: (value: string) => void
    onBlur: (event: InputOnBlurEvent, value: string) => void
    onPrefix: () => void
    onSuffix: () => void
}
