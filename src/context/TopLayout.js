import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme, themeDark } from '../../src/theme'
import ThemeContext from './ThemeContext'

/**
 * material-ui 主题
 * @param {any} props
 * @returns {node}
 */
const TopLayout = (props) => {
  return (
    <ThemeContext.Consumer>
      {/* 使用 Context 配合 material-ui theme 切换深色模式 */}
      {(themeContext) => {
        return (
          <React.Fragment>
            <Helmet>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"
              />
              <link
                href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
                rel="stylesheet"
              />
            </Helmet>
            <ThemeProvider theme={themeContext.dark ? theme : themeDark}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {props.children}
            </ThemeProvider>
          </React.Fragment>
        )
      }}
    </ThemeContext.Consumer>
  )
}

TopLayout.propTypes = {
  children: PropTypes.node,
}

export default TopLayout
