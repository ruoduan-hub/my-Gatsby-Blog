import React from 'react'
import { Link } from 'gatsby'

import { rhythm, scale } from '../utils/typography'

import Texty from 'rc-texty'
import 'rc-texty/assets/index.css'
import TweenOne from 'rc-tween-one'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          className="blogName"
          style={{
            ...scale(2),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            <Texty
              className="title"
              type="mask-top"
              delay={400}
              enter={this.getEnter}
              interval={this.geInterval}
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
              className="title-bottom"
              style={{ fontSize: '1rem' }}
              type="bottom"
              split={this.getSplit}
              delay={2200}
              interval={30}
              mode="sync"
            >
              Welcome to Ruoduan.com
            </Texty>
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          className="blogName"
          style={{
            marginTop: 0,
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            fontSize: '2.5rem',
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            <Texty>{title}</Texty>
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(30),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main style={{ overflow: 'hidden' }}>{children}</main>
        <footer style={{ color: '#333' }}>
          {/* TODO 授权文字 */}© {new Date().getFullYear()}, 滇ICP备19003866号
          本网站版权归本站作者Ruoduan所有
          {` `}
        </footer>
      </div>
    )
  }
}

export default Layout
