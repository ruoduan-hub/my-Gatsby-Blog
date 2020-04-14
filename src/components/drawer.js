import React, { useState } from "react"
import { Drawer } from "antd"
import { WindowsFilled } from "@ant-design/icons"

const WithDrawer = props => {
  console.log(props)
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
            position: "fixed",
            top: "1rem",
            left: "2rem",
            cursor: "pointer",
          }}
        >
          {props.button ? (
            props.button
          ) : (
            <WindowsFilled style={{ fontSize: "2rem" }} />
          )}
        </span>
        <Drawer
          placement="left"
          onClose={onClose}
          visible={visible}
          mask={false}
        >
          {props.data}
        </Drawer>
      </div>
    </>
  )
}

export default WithDrawer
