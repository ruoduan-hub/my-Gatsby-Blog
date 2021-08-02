import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { StaticQuery, graphql } from 'gatsby'
// import { MDXRenderer } from "gatsby-plugin-mdx"
import Header from '../Header'
import { Link } from 'gatsby'
import ThemeContext from '../../context/ThemeContext'
import Comment from '../Comment'
import {
  GithubOutlined,
  ZhihuOutlined,
  MailOutlined,
  createFromIconfontCN,
} from '@ant-design/icons'
import { Divider } from 'antd'
import { openPage } from '../../utils/utils'
import MusicPlay from '../MusicPlay'
import Footer from '../Footer'
import StateSearch from '../StateSearch'

import S from './about-layout.module.scss'

const shortcodes = { Link }

const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2715701_n2qt9yg9v4b.js', // 在 iconfont.cn 上生成
})

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
                  imgSrc="https://tva1.sinaimg.cn/large/008eGmZEly1go7wupjosrj30zk0qo43e.jpg"
                />

                <StateSearch />

                <div className={theme.dark ? S.isMainDk : S.isMainWhPost}>
                  <main className={S.main}>
                    <div className={S.mid}>
                      <div className={S.info}>
                        <MailOutlined
                          onClick={() => openPage(`mailto:${email}`)}
                          style={{ fontSize: '2rem' }}
                        />
                        <GithubOutlined
                          onClick={() => openPage(github)}
                          style={{ fontSize: '2rem' }}
                        />
                        <ZhihuOutlined
                          onClick={() => openPage(zhihu)}
                          style={{ fontSize: '2rem' }}
                        />
                        <MyIcon
                          type="icon-juejin"
                          onClick={() => openPage(juejin)}
                          style={{ fontSize: '2rem' }}
                        />
                      </div>

                      <div>
                        <MDXProvider components={shortcodes}>
                          <body style={{ backgroundColor: 'inherit' }}>
                            {children}
                          </body>
                        </MDXProvider>
                      </div>

                      <div>
                        <MusicPlay />
                      </div>

                      <Divider>留言</Divider>

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
