import React, { useState, useEffect, useCallback } from "react"
import { Link } from "gatsby"

import Texty from "rc-texty"
import "rc-texty/assets/index.css"
import TweenOne from "rc-tween-one"
import HeaderNav from "./HeaderNav"
import Fireworks from "./FireworksCanvas"
import { throttle } from "@src/utils/utils"
import Brightness4OutlinedIcon from "@material-ui/icons/Brightness4Outlined"
import Brightness5OutlinedIcon from "@material-ui/icons/Brightness5Outlined"

import * as S from "./styles/header.module.scss"

const LightToDark = ({ theme }) => {
  const { dark, toggleDark } = theme

  const IconStyle = {
    style: {
      fontSize: "2.3rem",
      color: dark ? "#fff" : "rgb(33,33,41)",
    },
  }

  return (
    <div className={S.LightToDarkBox} onClick={() => toggleDark()}>
      {dark ? (
        <Brightness4OutlinedIcon {...IconStyle} />
      ) : (
        <Brightness5OutlinedIcon {...IconStyle} />
      )}
    </div>
  )
}

const Header = ({
  isHome,
  title,
  theme,
  imgSrc,
  message = "Welcome to Ruoduan.com",
}) => {
  const { dark } = theme

  const [show, setShow] = useState(true)

  const MouseOver = useCallback(
    throttle((e) => {
      setShow(true)
      e.stopPropagation()
    }, 1500),
    []
  )

  const MouseOut = useCallback(
    throttle((e) => {
      setShow(false)
      e.stopPropagation()
    }, 1500)
  )

  if (isHome) {
    return (
      <div onMouseEnter={(e) => MouseOver(e)} onMouseLeave={(e) => MouseOut(e)}>
        <div className={dark ? S.isDk : S.isWh}>
          <LightToDark theme={theme} />

          <Fireworks />
          <div
            style={
              {
                // marginLeft: `${rhythm(10)}`,
              }
            }
            className={S.headerBox}
          >
            <h1>
              <Link
                style={{
                  boxShadow: `none`,
                  textDecoration: `none`,
                  color: `inherit`,
                }}
                onClick={(e) => e.stopPropagation()}
                to={`/`}
              >
                <Texty
                  className={S.title}
                  type="mask-top"
                  delay={400}
                  component={TweenOne}
                  componentProps={{
                    animation: [
                      { x: 130, type: "set" },
                      { x: 100, delay: 500, duration: 450 },
                      {
                        ease: "easeOutQuart",
                        duration: 300,
                        x: 0,
                      },
                      {
                        letterSpacing: 0,
                        delay: -300,
                        scale: 0.9,
                        ease: "easeInOutQuint",
                        duration: 1000,
                      },
                      {
                        scale: 1,
                        width: "100%",
                        delay: -300,
                        duration: 1000,
                        ease: "easeInOutQuint",
                      },
                    ],
                  }}
                >
                  {title}
                </Texty>
                <Texty
                  className={S.title}
                  style={{ fontSize: "1.5rem", fontWeight: 700 }}
                  type="bottom"
                  delay={2200}
                  interval={30}
                  mode="sync"
                >
                  {message}
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
      style={{ background: dark ? "" : "rgba(224,224,206,1)" }}
      className={S.dv}
    >
      <div
        className={dark ? S.isDkPost : S.isWhPost}
        style={{ position: "relative" }}
      >
        <LightToDark theme={theme} />

        <Fireworks />
        <div
          style={
            {
              // marginLeft: `${rhythm(10)}`,
            }
          }
          className={S.headerBox}
        >
          <h1>
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
                fontSize: "3rem",
              }}
              onClick={(e) => e.stopPropagation()}
              to={`/`}
            >
              <Texty
                className={S.title}
                type="mask-top"
                delay={400}
                component={TweenOne}
                componentProps={{
                  animation: [
                    { x: 130, type: "set" },
                    { x: 100, delay: 500, duration: 450 },
                    {
                      ease: "easeOutQuart",
                      duration: 300,
                      x: 0,
                    },
                    {
                      letterSpacing: 0,
                      delay: -300,
                      scale: 0.9,
                      ease: "easeInOutQuint",
                      duration: 1000,
                    },
                    {
                      scale: 1,
                      width: "100%",
                      delay: -300,
                      duration: 1000,
                      ease: "easeInOutQuint",
                    },
                  ],
                }}
              >
                {title}
              </Texty>
            </Link>
          </h1>
          <div className={S.img}>
            {typeof imgSrc === "string" ? (
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
