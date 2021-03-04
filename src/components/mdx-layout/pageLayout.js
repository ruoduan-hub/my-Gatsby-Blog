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
          <Header theme={theme} isHome={false} title={'About'} imgSrc='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.0513.org%2Fforum%2F201211%2F15%2F105130m7sluwslwm7uvvvv.jpg&refer=http%3A%2F%2Fpic.0513.org&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617431500&t=ae4cd6fc35cee8db0eaf816e84bc9d4e' />

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