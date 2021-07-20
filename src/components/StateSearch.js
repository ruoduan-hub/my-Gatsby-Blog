import React, { useState, useImperativeHandle, forwardRef } from 'react'

import Modal from './Modal'
import Search from './Search'
import Hotkeys from 'react-hot-keys'

const StateSearch = (props, ref) => {
  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    // handleVisible 暴露给父组件
    handleVisible: setVisible,
  }))

  return (
    <Hotkeys keyName="shift+k,command+k" onKeyDown={() => setVisible(true)}>
      <Modal setVisible={setVisible} visible={visible}>
        <Search />
      </Modal>
    </Hotkeys>
  )
}

export default forwardRef(StateSearch)
