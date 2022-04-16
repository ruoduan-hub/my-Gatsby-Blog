import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { StaticQuery, graphql } from 'gatsby'
// import { MDXRenderer } from "gatsby-plugin-mdx"
import Header from '../Header'
import { Link } from 'gatsby'
import ThemeContext from '../../context/ThemeContext'
import Comment from '../Comment'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import GitHubIcon from '@material-ui/icons/GitHub'

import { openPage } from '../../utils/utils'
import MusicPlay from '../MusicPlay'
import Footer from '../Footer'
import StateSearch from '../StateSearch'

import * as S from './about-layout.module.scss'

const shortcodes = { Link }

const AboutLayout = ({ children, path }) => {
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
          <ThemeContext.Consumer>
            {theme => (
              <div>
                <Header
                  theme={theme}
                  isHome={false}
                  title={'About'}
                  imgSrc="https://i.loli.net/2021/09/15/ahWet8mwBYiqoGO.jpg"
                />

                <StateSearch />

                <div className={theme.dark ? S.isMainDk : S.isMainWhPost}>
                  <main className={S.main}>
                    <div className={S.mid}>
                      <div className={S.info}>
                        <i onClick={() => openPage(`mailto:${email}`)}>
                          <MailOutlineIcon style={{ fontSize: '2rem' }} />
                        </i>

                        <i onClick={() => openPage(github)}>
                          <GitHubIcon style={{ fontSize: '2rem' }} />
                        </i>

                        <i onClick={() => openPage(zhihu)}>
                          <svg
                            t="1628165881392"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="5274"
                            width="2rem"
                            height="2rem"
                          >
                            <path
                              d="M354.688 562.304h189.504c0-52.48-12.864-71.168-20.224-73.088H360.192c1.92-3.712 7.36-121.728 9.216-224.704h154.56c3.648-39.36-5.504-73.088-22.08-74.944H227.776c3.648-16.832 7.36-35.584 14.72-56.192 9.152-28.16 18.368-56.192 23.872-67.456-3.648-3.712-11.008-1.856-27.52 3.776a109.76 109.76 0 0 0-46.08 24.32 89.92 89.92 0 0 0-22.08 30.016c-16.512 43.072-51.52 166.656-97.472 252.8 71.68-5.568 106.688-46.784 117.76-80.512 5.504-11.264 7.36-24.32 11.008-33.728h95.68c0 43.072-1.856 121.792-9.216 226.624-82.752 0-121.408-1.856-167.424-1.856-25.728 7.488-38.656 48.704-42.24 74.88h202.304c-5.504 39.36-7.36 59.968-22.08 118.016a509.184 509.184 0 0 1-132.48 213.568 436.672 436.672 0 0 1-60.672 54.272c-1.856 1.92-1.856 1.92-1.856 3.776 20.224 18.752 93.824 0 108.544-5.632 14.72-5.632 27.584-9.344 38.656-18.688 38.656-33.728 86.464-108.672 115.84-221.056 110.464 131.136 134.4 170.432 161.92 202.24h3.712c9.216-31.808 14.72-84.224 3.712-110.464l-7.36-13.12c-53.376-65.536-53.376-65.536-114.112-131.072-34.944 28.096-42.24 35.584-42.24 35.584s7.296-29.952 9.152-43.072c9.216-33.728 9.216-50.56 12.864-84.288m594.24-385.856H599.424c-3.712 0-11.072 5.632-11.072 11.264v664.896c0 3.712 3.712 9.344 11.072 9.344h55.168c3.648 0 9.216 37.504 23.936 76.8 77.248-50.56 110.336-71.168 126.912-76.8h143.488c5.568 0 9.216-3.712 9.216-9.344 0-443.904 1.856-211.648 1.856-666.816 0-5.568-7.36-9.344-11.072-9.344m-64.384 604.992c0 3.712-3.648 5.632-5.504 5.632h-75.392c-1.92 0-3.712 1.856-3.712 1.856a725.12 725.12 0 0 1-91.968 58.048c-7.36-26.24-14.72-59.904-16.576-59.904h-22.08c-3.712 0-5.504-1.92-5.504-5.632V257.024c0-3.776 3.648-7.488 5.504-7.488h209.728c1.856 0 5.504 3.712 5.504 5.568v526.336"
                              p-id="5275"
                            ></path>
                          </svg>
                        </i>

                        <i onClick={() => openPage(juejin)}>
                          <svg
                            t="1628166093612"
                            class="icon"
                            viewBox="0 0 1212 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="5416"
                            width="2rem"
                            height="2rem"
                          >
                            <path
                              d="M600.738 204.342l-88.28-69.605-92.214 72.73-4.796 3.854 97.01 77.34 97.334-77.34-9.054-6.98zM935.289 474.3L512.216 807.909 89.41 474.49l-62.464 50.176 485.269 382.626L997.753 524.45 935.29 474.3z m-423.073 27.055L281.977 319.838l-62.437 50.15L512.19 600.764l292.944-230.993-62.437-50.15-230.48 181.734z"
                              fill="#2c2c2c"
                              p-id="5417"
                            ></path>
                          </svg>
                        </i>
                      </div>

                      <div>
                        <MDXProvider components={shortcodes}>
                          <body style={{ backgroundColor: 'inherit' }}>
                            {children}
                          </body>
                        </MDXProvider>
                      </div>

                      <div style={{ margin: '2em 0' }}>
                        <MusicPlay />
                      </div>

                      <Comment path={path} />
                    </div>
                  </main>
                </div>

                <Footer theme={theme} />
              </div>
            )}
          </ThemeContext.Consumer>
        )
      }}
    />
  )
}

export default AboutLayout
