import React from 'react'
import * as S from './styles/header.module.scss'
import ThemeContext from '../context/ThemeContext'
import PropTypes from 'prop-types'
import { StaticQuery, useStaticQuery, graphql } from 'gatsby'
import Header from './Header'
import Footer from './Footer'

const STYLE = {
  height: '100%',
  minHeight: '100vh',
}

const Layout = ({ children, isHome, count }) => {
  // const rootPath = `${__PATH_PREFIX__}/`
  const { title } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `).site.siteMetadata

  return (
    <ThemeContext.Consumer>
      {(theme) => (
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
