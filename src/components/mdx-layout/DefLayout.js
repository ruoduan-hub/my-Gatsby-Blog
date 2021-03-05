import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { StaticQuery, graphql } from 'gatsby'
import Header from '../Header'
import { Link } from "gatsby"
import ThemeContext from '../../context/ThemeContext'
import Comment from '../Comment'
import { Divider } from 'antd'

import S from './def-layout.module.scss'


const shortcodes = { Link }


const DefLayout = ({ children, path }) => {
  // console.log(props)

  return (

    <StaticQuery
      query={graphql`
      query {
        site {
          siteMetadata {
            title
            author
            description
            gitalkConfig {
              clientID
              clientSecret
            }
            social {
              github
              zhihu
              weibo
              email
              aboutLike
              skill
            }
          }
        }
        
        
      }
    `}

      render={data => {

        const {
          github,
          zhihu,
          weibo,
          email,
          aboutLike,
          skill,
        } = data.site.siteMetadata.social
        return (
          <ThemeContext.Consumer>
            {(theme) => {
              console.log(S, 11)
              return (
                <div>
                  <Header theme={theme} isHome={true} title={'Other'}  />
  
                  <div  className={`${S.main} ${theme.dark ? S.isMainDk : S.isMainWh}`}>
                    <main>
                      <MDXProvider components={shortcodes}>{children}</MDXProvider>

                      <Divider>留言</Divider>

                      <Comment
                        path={path}
                      />
                    </main>
                  </div>
                </div>
              )
            }}
          </ThemeContext.Consumer>
        )
      }}
    />
  )
}

export default DefLayout