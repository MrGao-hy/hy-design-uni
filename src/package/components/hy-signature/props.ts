import type IProps from './typing'

const defaultProps: IProps = {
  penColor: '#000',
  lineWidth: 3,
  clearText: '清空',
  revokeText: '撤销',
  restoreText: '恢复',
  confirmText: '确认',
  fileType: 'png',
  quality: 1,
  exportScale: 1,
  disabled: false,
  height: 1,
  width: 1,
  round: '10rpx',
  backgroundColor: '',
  disableScroll: true,
  enableHistory: false,
  step: 1,
  undoText: '',
  redoText: '',
  pressure: false,
  minWidth: 2,
  maxWidth: 6,
  minSpeed: 1.5,
}

export default defaultProps
