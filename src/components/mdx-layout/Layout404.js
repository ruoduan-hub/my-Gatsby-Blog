import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { StaticQuery, graphql } from 'gatsby'
import Header from '../Header'
import { Link } from 'gatsby'
import ThemeContext from '../../context/ThemeContext'
import Footer from '../Footer'
import SEO from '@src/components/SEO'

import * as S from './def-layout.module.scss'

const shortcodes = { Link }

const Layout404 = ({ children, path }) => {
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
                juejin
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
          juejin,
          email,
          aboutLike,
          skill,
        } = data.site.siteMetadata.social
        return (
            <>
                <SEO title="404" description="Not Found Page" />
                <ThemeContext.Consumer>
                    {theme => {
                        return (
                            <div>
                                <Header theme={theme} isHome={true} title={'404'} message="Not Found Page" />

                                <div
                                    className={`${S.main} ${theme.dark ? S.isMainDk : S.isMainWh
                                        }`}
                                >
                                    <main>
                                        <MDXProvider components={shortcodes}>
                                            <body style={{ backgroundColor: 'inherit' }}>
                                                {children}
                                            </body>
                                        </MDXProvider>
                                    </main>
                                </div>
                                <Footer theme={theme} />
                            </div>
                        )
                    }}
                </ThemeContext.Consumer>
            </>
        )
      }}
    />
  )
}

export default Layout404
