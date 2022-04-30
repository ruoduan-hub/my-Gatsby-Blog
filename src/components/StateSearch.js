import React, { useState, useImperativeHandle, forwardRef } from 'react'

import Modal from './Modal'
import Search from './Search'

import { useHotkeys } from 'react-hotkeys-hook'

const StateSearch = (props, ref) => {
  const [visible, setVisible] = useState(false)

  useHotkeys('shift+k,command+k', () => setVisible(true))

  useImperativeHandle(ref, () => ({
    // handleVisible 暴露给父组件
    handleVisible: setVisible,
  }))

  return (
    <Modal setVisible={setVisible} visible={visible}>
      <Search />
    </Modal>
  )
}

export default React.memo(forwardRef(StateSearch))
