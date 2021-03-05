import React, { useState ,useCallback, useEffect } from 'react'
import { navigate } from 'gatsby'

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

const HeaderNav = ({ isShow }) => {

  const [show, setShow] = useState(isShow)

  const toggleShow = useCallback(() => {
    setShow(!show)
  }, [show])

  const handleNavigateTo = useCallback((e, path) => {
    e.stopPropagation()
    navigate(path)
  }, [])


  useEffect(() => {
    setShow(isShow)
  }, [isShow])

  return (
    <div style={{ height: '5rem' }}>
      <div style={{ opacity: Number(show), height: show ? '5rem' : '0' }} onClick={toggleShow} className={S.navSticky}>
      <div className={S.menu}>
        <span onClick={e => handleNavigateTo(e, '/')}>
          <HomeOutlined {...IconStyle} />
          <i>Home</i>
        </span>
        <span onClick={e => handleNavigateTo(e, '/other')}>
          <UnorderedListOutlined {...IconStyle} />
          <i>Other</i>
        </span>
        <span onClick={e => handleNavigateTo(e, '/about')}>
          <UserOutlined {...IconStyle} />
          <i>About</i>
        </span>
      </div>
    </div>
    </div>
  )
}

HeaderNav.defaultProps = {
  isShow: Boolean
}

export default React.memo(HeaderNav)