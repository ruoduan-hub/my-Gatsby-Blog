import React, { useState } from 'react'
import Drawer from '@material-ui/core/Drawer'
import MenuIcon from '@material-ui/icons/Menu'
const WithDrawer = (props) => {
  // 抽屉状态
  let [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  return (
    <>
      <div className="leftController">
        {/* eslint-disable */}
        <span
          role="button"
          tabIndex="0"
          onClick={showDrawer}
          style={{
            position: 'fixed',
            top: '1rem',
            left: '2rem',
            cursor: 'pointer',
          }}
        >
          <MenuIcon fontSize="2rem" />
        </span>
        <Drawer anchor="left" open={visible} onClose={onClose}>
          <div
            style={{
              padding: '0.5rem 1rem',
              minWidth: '230px',
              maxWidth: '280px',
            }}
          >
            {props.data}
          </div>
        </Drawer>
      </div>
    </>
  )
}

export default WithDrawer
