import React from 'react'
import ReactDOM from 'react-dom'
import { Link, graphql, navigate } from 'gatsby'

import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined'
import NavigateBeforeOutlinedIcon from '@material-ui/icons/NavigateBeforeOutlined'

import Bio from '../components/Boi'
import Comment from '../components/Comment'
import Layout from '../components/layout'
import SEO from '../components/SEO'
import { rhythm, scale } from '../utils/typography'

import WithDrawer from '../components/WithDrawer'
import Toc from '../components/Toc'
import StateSearch from '../components/StateSearch'

import * as S from './styles/post.module.scss'

// portals 插槽 插到到DOM元素
const PortalsRoot =
  typeof document !== 'undefined' ? document.getElementById('___gatsby') : null

const openImage = (e) => {
  window?.open(e.target.src)
}

/**
 * 
 * @returns { 
 *    start: () => void, 
 *    stop: () => void 
 *  }
 */
const openEventImg = () => {
  const imgs = typeof document !== `undefined` ? Array.from(document.querySelectorAll('img')).slice(1) : []
  return {
    start: () => {
      imgs.forEach(item => {
        item.addEventListener('click', openImage)
      })
    },

    stop: () => {
      imgs.forEach(item => {
        item.removeEventListener('click', openImage)
      })
    }
  }
}
class BlogPostTemplate extends React.Component {
  state = {
    tabs: {},
  }

  el = typeof document !== `undefined` ? document.createElement('div') : null

  componentDidMount() {
    // 挂载到dom元素上
    PortalsRoot.appendChild(this.el)

    // 生成标签
    const edges = this.props.data.allMarkdownRemark.edges
    let _t = {}
    edges.forEach((item) => {
      _t[item.node.frontmatter.tags] = item.node.frontmatter.tags
    })
    this.setState({
      tabs: _t,
    })
    openEventImg().start()
  }
  componentWillUnmount() {
    // 清除元素
    PortalsRoot.removeChild(this.el)
    openEventImg().stop()
  }

  render() {
    const post = this.props.data.markdownRemark
    const { previous, next } = this.props.pageContext

    return (
      <>
        {/* portals 挂载到外层 */}
        <div>
          {typeof window !== 'undefined' &&
            ReactDOM.createPortal(
              <div>
                <WithDrawer
                  data={
                    <Toc
                      tocHtml={this.props.data.markdownRemark.tableOfContents}
                    />
                  }
                />
              </div>,
              this.el
            )}
          <Layout
            location={this.props.location}
            title={post.frontmatter.title}
            isHome={false}
          >
            <SEO
              title={post.frontmatter.title}
              tags={post.frontmatter.title || post.frontmatter.title}
              description={post.frontmatter.description || post.excerpt}
            />

            <StateSearch />

            <div className={S.article}>
              <Grid container>
                <Grid item xs={12} md={8}>
                  <article>
                    <header>
                      <p
                        style={{
                          ...scale(1 / 5),
                          display: `block`,
                          marginBottom: rhythm(1),
                        }}
                      >
                        {post.frontmatter.date}
                      </p>
                    </header>
                    <section dangerouslySetInnerHTML={{ __html: post.html }} />
                    <hr
                      style={{
                        marginBottom: rhythm(1),
                      }}
                    />
                    <footer>
                      <Bio />
                    </footer>
                  </article>
                </Grid>

                <Hidden xsDown>
                  <Grid item md={1}></Grid>
                </Hidden>

                <Hidden xsDown>
                  <Grid item md={3}>
                    <div className={S.leftToc}>
                      <h3>Tags</h3>
                      <div className={S.tabs}>
                        {Object?.keys(this.state.tabs).map((key) => (
                          <nav
                            key={key}
                            onClick={() => navigate(`/tags/${key}`)}
                          >
                            {key}
                          </nav>
                        ))}
                      </div>

                      <h3>Toc</h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: String(
                            this.props.data.markdownRemark.tableOfContents
                          ),
                        }}
                      ></div>
                    </div>
                  </Grid>
                </Hidden>
              </Grid>
            </div>

            <nav>
              <ul
                style={{
                  display: `flex`,
                  flexWrap: `wrap`,
                  justifyContent: `space-between`,
                  listStyle: `none`,
                  padding: 0,
                  margin: '2rem 0',
                }}
              >
                <li>
                  {next && (
                    <Link
                      style={{ display: 'flex', alignItems: 'center' }}
                      className="nextText"
                      to={next.fields.slug}
                      rel="next"
                    >
                      <NavigateBeforeOutlinedIcon />
                      {next.frontmatter.title}
                    </Link>
                  )}
                </li>

                <li>
                  {previous && (
                    <Link
                      className="nextText"
                      to={previous.fields.slug}
                      style={{ display: 'flex', alignItems: 'center' }}
                      rel="prev"
                    >
                      {previous.frontmatter.title} <NavigateNextOutlinedIcon />
                    </Link>
                  )}
                </li>
              </ul>
            </nav>

            <Comment
              gitalkConfig={this.props.data.site.siteMetadata.gitalkConfig}
              path={this.props.path}
            />
          </Layout>
        </div>
      </>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        gitalkConfig {
          clientID
          clientSecret
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY 年 MM 月 DD 日")
            title
            tags
            categories
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents
      frontmatter {
        date(formatString: "YYYY 年 MM 月 DD 日")
        title
        tags
        categories
      }
    }
  }
`
