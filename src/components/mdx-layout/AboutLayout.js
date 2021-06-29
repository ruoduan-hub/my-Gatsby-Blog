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
  WeiboOutlined,
  ZhihuOutlined,
  MailOutlined,
} from '@ant-design/icons'
import { Divider } from 'antd'
import { openPage } from '../../utils/utils'
import MusicPlay from '../MusicPlay'
import Footer from '../Footer'
import StateSearch from '../StateSearch'


import S from './about-layout.module.scss'

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
                        <WeiboOutlined
                          onClick={() => openPage(weibo)}
                          style={{ fontSize: '2rem' }}
                        />
                      </div>

                      <div>
                        <MDXProvider components={shortcodes}>
                          <body style={{ backgroundColor: 'inherit' }}>{children}</body>
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
