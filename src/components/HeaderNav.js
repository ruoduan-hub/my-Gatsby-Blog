import React, { useState, useCallback, useEffect, useRef } from 'react'
import { navigate } from 'gatsby'

import * as S from './styles/header-nav.module.scss'

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import ListAltIcon from '@material-ui/icons/ListAlt'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined'

import StateSearch from './StateSearch'

import { throttle } from '@src/utils/utils'

const IconStyle = {
  style: {
    fontSize: '2.3rem',
  },
}

const HeaderNav = ({ isShow }) => {
  const [show, setShow] = useState(isShow)
  const searchdRef = useRef()

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

  const handleV = (set) => {
    // console.log(set)
  }

  return (
    <>
      <div onClick={throttle(toggleShow, 700)} className={S.nav}>
        <div style={{ top: show ? '0' : '-6rem' }} className={S.navSticky}>
          <div className={S.menu}>
            <span onClick={(e) => handleNavigateTo(e, '/')}>
              <HomeOutlinedIcon {...IconStyle} />
              <i>Home</i>
            </span>
            <span onClick={(e) => handleNavigateTo(e, '/other')}>
              <ListAltIcon {...IconStyle} />
              <i>Other</i>
            </span>
            <span onClick={(e) => handleNavigateTo(e, '/about')}>
              <PersonOutlineOutlinedIcon {...IconStyle} />
              <i>About</i>
            </span>
            <span onClick={() => searchdRef.current.handleVisible(true)}>
              <FindInPageOutlinedIcon {...IconStyle} />
              <i>⌘+k | ↑+k</i>
            </span>
          </div>
        </div>
      </div>
      <StateSearch handleVisible={handleV} ref={searchdRef} />
    </>
  )
}

HeaderNav.defaultProps = {
  isShow: Boolean,
}

export default React.memo(HeaderNav)
