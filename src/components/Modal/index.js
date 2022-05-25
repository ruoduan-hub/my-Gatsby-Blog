import React, { useState, useCallback } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Draggable from 'react-draggable'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit'

import * as S from './index.module.scss'

const PaperComponent = React.memo((props) => (
  <Draggable
    handle="#draggable-dialog-title"
    cancel={'[class*="MuiDialogContent-root"]'}
  >
    <Paper {...props} />
  </Draggable>
))

const Modal = ({ visible, setVisible, children }) => {
  const [isFullScreen, setFullScreen] = useState(false)

  const handleClose = useCallback(() => {
    setVisible(false)
  }, [setVisible])

  return (
    <Dialog
      PaperComponent={PaperComponent}
      open={visible}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      style={{ padding: '0 24px 24px 8px' }}
      fullScreen={isFullScreen}
    >
      <div className={S.title}>
        <DialogTitle className={S.DialogTitle} id="draggable-dialog-title">
          搜索内容
        </DialogTitle>
        <div>
          <IconButton
            onClick={() => setFullScreen(!isFullScreen)}
            aria-label="close"
          >
            {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>

          <IconButton onClick={() => handleClose()}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default Modal
