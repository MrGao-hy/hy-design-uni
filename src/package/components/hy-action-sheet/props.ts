import type { HyActionSheetProps } from './typing'

const defaultProps: HyActionSheetProps = {
  modelValue: false,
  actions: [],
  panels: [],
  round: '20px',
  title: '',
  titleAlign: 'center',
  cancelText: '',
  closeOnClickAction: true,
  closeOnClickOverlay: true,
  duration: 200,
  zIndex: 100,
  safeAreaInsetBottom: true,
}

export default defaultProps
