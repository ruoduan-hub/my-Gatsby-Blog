import React, { useCallback } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Draggable from 'react-draggable'
import Paper from '@material-ui/core/Paper'

const PaperComponent = props => (
  <Draggable
    handle="#draggable-dialog-title"
    cancel={'[class*="MuiDialogContent-root"]'}
  >
    <Paper {...props} />
  </Draggable>
)

const Modal = ({ visible, setVisible, children }) => {
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
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        搜索内容
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default Modal
