import React from 'react'
import * as S from './styles/header.module.scss'
import ThemeContext from '../context/ThemeContext'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Header from './Header'
import Footer from './Footer'

const STYLE = {
  height: '100%',
  minHeight: '100vh',
}

const Layout = ({ children, title, isHome, count }) => {
  // const rootPath = `${__PATH_PREFIX__}/`
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <ThemeContext.Consumer>
          {theme => (
            <div style={STYLE} className={theme.dark ? 'dark' : 'light'}>
              <Header theme={theme} isHome={isHome} title={title} />

              <main
                className={
                  theme.dark ? S.isMainDk : isHome ? S.isMainWh : S.isMainWhPost
                }
              >
                <div>{children}</div>
              </main>

              <Footer count={count} theme={theme} />
            </div>
          )}
        </ThemeContext.Consumer>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  // 头部文字
  title: PropTypes.string,
  // 是否是首页
  isHome: PropTypes.bool,
  // 文章数量
  count: PropTypes.number,
}

export default Layout
