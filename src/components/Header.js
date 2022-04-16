import React, { useState } from 'react'
import { Link } from 'gatsby'

import Texty from 'rc-texty'
import 'rc-texty/assets/index.css'
import TweenOne from 'rc-tween-one'
import HeaderNav from './HeaderNav'

import * as S from './styles/header.module.scss'

const Header = ({ isHome, title, theme, imgSrc }) => {
  const { dark, toggleDark } = theme

  const [show, setShow] = useState(false)

  if (isHome) {
    return (
      <div
        onMouseOver={e => {
          e.stopPropagation()
          setShow(true)
        }}
        onMouseOut={e => {
          e.stopPropagation()
          setShow(false)
        }}
      >
        <div className={dark ? S.isDk : S.isWh}>
          <div
            style={
              {
                // marginLeft: `${rhythm(10)}`,
              }
            }
            className={S.headerBox}
            onClick={() => toggleDark()}
          >
            <h1>
              <Link
                style={{
                  boxShadow: `none`,
                  textDecoration: `none`,
                  color: `inherit`,
                }}
                onClick={e => e.stopPropagation()}
                to={`/`}
              >
                <Texty
                  className={S.title}
                  type="mask-top"
                  delay={400}
                  component={TweenOne}
                  componentProps={{
                    animation: [
                      { x: 130, type: 'set' },
                      { x: 100, delay: 500, duration: 450 },
                      {
                        ease: 'easeOutQuart',
                        duration: 300,
                        x: 0,
                      },
                      {
                        letterSpacing: 0,
                        delay: -300,
                        scale: 0.9,
                        ease: 'easeInOutQuint',
                        duration: 1000,
                      },
                      {
                        scale: 1,
                        width: '100%',
                        delay: -300,
                        duration: 1000,
                        ease: 'easeInOutQuint',
                      },
                    ],
                  }}
                >
                  {title}
                </Texty>
                <Texty
                  className={S.title}
                  style={{ fontSize: '1.5rem', fontWeight: 700 }}
                  type="bottom"
                  delay={2200}
                  interval={30}
                  mode="sync"
                >
                  Welcome to Ruoduan.com
                </Texty>
              </Link>
            </h1>
          </div>
        </div>

        <HeaderNav isShow={show} />
      </div>
    )
  }

  return (
    <div
      style={{ background: dark ? '' : 'rgba(224,224,206,1)' }}
      className={S.dv}
    >
      <div className={dark ? S.isDkPost : S.isWhPost}>
        <div
          style={
            {
              // marginLeft: `${rhythm(10)}`,
            }
          }
          className={S.headerBox}
          onClick={() => toggleDark()}
        >
          <h1>
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
                fontSize: '3rem',
              }}
              onClick={e => e.stopPropagation()}
              to={`/`}
            >
              <Texty
                className={S.title}
                type="mask-top"
                delay={400}
                component={TweenOne}
                componentProps={{
                  animation: [
                    { x: 130, type: 'set' },
                    { x: 100, delay: 500, duration: 450 },
                    {
                      ease: 'easeOutQuart',
                      duration: 300,
                      x: 0,
                    },
                    {
                      letterSpacing: 0,
                      delay: -300,
                      scale: 0.9,
                      ease: 'easeInOutQuint',
                      duration: 1000,
                    },
                    {
                      scale: 1,
                      width: '100%',
                      delay: -300,
                      duration: 1000,
                      ease: 'easeInOutQuint',
                    },
                  ],
                }}
              >
                {title}
              </Texty>
            </Link>
          </h1>
          <div className={S.img}>
            {typeof imgSrc === 'string' ? (
              <img src={imgSrc} alt="img" />
            ) : (
              <img src="https://source.unsplash.com/random/600x400" alt="img" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
