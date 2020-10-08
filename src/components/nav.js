// 导航栏组件
import React from "react"
import { Menu } from 'antd'
import {
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons"

import { navigate } from 'gatsby'

const { SubMenu } = Menu


const MyNav = props => {
  if (props.small && typeof window !== "undefined" && true) {
    return (
      <>
        {/* 导航栏 */}
        <Menu
          mode="inline"
          forceSubMenuRender
        >
          <SubMenu
            title="Menu"
          >
            <Menu.Item onClick={() => navigate('/')} key="1"><HomeOutlined />首页</Menu.Item>
            <Menu.Item onClick={() => navigate('/tags')} key="2"><UnorderedListOutlined />标签</Menu.Item>
            <Menu.Item onClick={() => navigate('/about')} key="3"><UserOutlined />关于我</Menu.Item>
          </SubMenu>
        </Menu>
      </>
    )
  } else {
    return (
      <>
        <ul
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "2rem",
          }}
        >
          <li style={{ display: "flex", flexDirection: "column" }}>
            <HomeOutlined
              style={{ fontSize: "3rem", marginBottom: "1rem" }}
              onClick={() => navigate('/')}
            />
          </li>

          <li style={{ display: "flex", flexDirection: "column" }}>
            <UnorderedListOutlined
              style={{ fontSize: "3rem", marginBottom: "1rem" }}
              onClick={() => navigate('/tags')}
            />
          </li>

          <li style={{ display: "flex", flexDirection: "column" }}>
            <UserOutlined
              style={{ fontSize: "3rem", marginBottom: "1rem" }}
              onClick={() => navigate('/about')}
            />
          </li>
        </ul>
        <br />
        <hr />
      </>
    )
  }
}

export default MyNav
