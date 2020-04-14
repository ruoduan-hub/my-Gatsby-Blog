import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
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
            {title}
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
            fontSize: "2.5rem",
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
            {title}
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
        <main>{children}</main>
        <footer style={{ color: "#333" }}>
          {/* TODO 授权文字 */}© {new Date().getFullYear()}, 滇ICP备19003866号
          本网站版权归本站作者Ruoduan所有
          {` `}
        </footer>
      </div>
    )
  }
}

export default Layout
