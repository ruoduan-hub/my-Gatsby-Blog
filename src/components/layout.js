import React from 'react'
import S from './styles/header.module.scss'
import ThemeContext from '../context/ThemeContext'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Header from './header'

const Layout = ({ children, title, isHome }) => {

  // const rootPath = `${__PATH_PREFIX__}/`
  console.log(isHome, 'isHome')
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
            <div className={theme.dark ? 'dark' : 'light'}>

              <Header theme={theme} isHome={isHome} title={title} />

              <main className={theme.dark ? S.isMainDk : isHome ? S.isMainWh : S.isMainWhPost}>
                <div>
                  {children}
                </div>
              </main>

            </div>
          )}
        </ThemeContext.Consumer>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
