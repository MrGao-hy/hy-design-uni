import type { ExtractPropTypes } from 'vue'
import skeletonProps from './props'

export type SkeletonTheme = 'text' | 'avatar' | 'paragraph' | 'image'
export type SkeletonAnimation = 'gradient' | 'flashed'
export type SkeletonRowColObj = {
    [key: string]: any
    type?: 'rect' | 'circle' | 'text'
    size?: string | number
    width?: string | number
    height?: string | number
    margin?: string | number
    background?: string
    marginLeft?: string | number
    marginRight?: string | number
    borderRadius?: string | number
    backgroundColor?: string
}
export type SkeletonRowCol = number | SkeletonRowColObj | Array<SkeletonRowColObj>
export type SkeletonThemeVars = {
    notifyPadding?: string
    notifyFontSize?: string
    notifyTextColor?: string
    notifyLineHeight?: number | string
    notifyDangerBackground?: string
    notifyPrimaryBackground?: string
    notifySuccessBackground?: string
    notifyWarningBackground?: string
}

export type HySkeletonProps = ExtractPropTypes<typeof skeletonProps>
