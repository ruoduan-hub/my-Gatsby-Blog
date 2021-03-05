import React from 'react'
import S from './styles/header-nav.module.scss'
import {
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons'


const IconStyle = {
  style: {
    fontSize: '1.5rem'
  }
}

const HeaderNav = ({ isShow=true }) => {

  return (
    <div style={{ display: isShow ? 'block' :'none' }} className={S.navSticky}>
      <div className={S.menu}>
        <span>
          <HomeOutlined {...IconStyle} />
          <i>Home</i>
        </span>
        <span>
          <UnorderedListOutlined {...IconStyle} />
          <i>Other</i>
        </span>
        <span>
          <UserOutlined {...IconStyle} />
          <i>About</i>
        </span>
      </div>
    </div>
  )
}

export default HeaderNav