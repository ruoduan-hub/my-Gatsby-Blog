import React from "react"
import { MDXProvider } from "@mdx-js/react"
// import { MDXRenderer } from "gatsby-plugin-mdx"
import Header from '../header'
import { Link } from "gatsby"
import ThemeContext from '../../context/ThemeContext'
import Comment from '../comment'

import S from './page-layout.module.scss'

const shortcodes = { Link }

const PageLayout = ({ children, path }) => {

  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div>
          <Header theme={theme} isHome={false} title={'About'} imgSrc='https://tva1.sinaimg.cn/large/008eGmZEly1go7wupjosrj30zk0qo43e.jpg' />

          <main className={S.main}>
            <MDXProvider components={shortcodes}>{children}</MDXProvider>

            <Comment
              path={path}
            />
          </main>
        </div>
      )}
    </ThemeContext.Consumer>

  )
}

export default PageLayout