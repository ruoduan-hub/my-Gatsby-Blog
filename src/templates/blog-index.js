import React from 'react'
import { Link, graphql, navigate } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/SEO'

import { rhythm } from '../utils/typography'
import './styles/index.scss'
import QueueAnim from 'rc-queue-anim'

import S from './styles/index.module.scss'
import { Pagination } from 'antd'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    const posts = data.allMarkdownRemark.edges
    const { currentPage, numPages, limit } = this.props.pageContext
    // const isFirst = currentPage === 1
    // const isLast = currentPage === numPages
    // const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
    // const nextPage = (currentPage + 1).toString()
    return (
      <div>
        <Layout location={this.props.location} isHome={true} title={siteTitle}>
          <SEO title="所有文章" description="若端blog，所有文章" />

          <QueueAnim
            delay={300}
            type={['scaleY']}
            ease={['easeOutQuart', 'easeInOutQuart']}
            className="queue-simple"
          >
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <article className={S.postArticle} key={node.fields.slug}>
                  <header>
                    <hgroup
                      style={{
                        marginBottom: rhythm(1 / 4),
                        fontSize: '1.5rem',
                        fontFamily: 'Black Ops One',
                      }}
                    >
                      <Link
                        style={{
                          boxShadow: `none`,
                          textDecoration: `none`,
                          color: `inherit`,
                        }}
                        to={node.fields.slug}
                      >
                        {title}
                      </Link>
                    </hgroup>

                    <small style={{ color: 'rgb(107, 107, 107)' }}>
                      {node.frontmatter.date}
                    </small>
                  </header>
                  <section style={{ maxWidth: '50rem' }}>
                    <p
                      style={{ color: 'rgb(107, 107, 107)' }}
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                      }}
                    />
                  </section>
                </article>
              )
            })}

            <div className={S.PaginationDv}>
              <Pagination
                onChange={c => {
                  c === 1 ? navigate(`/`) : navigate(`/${c}`)
                }}
                defaultPageSize={limit}
                current={currentPage}
                total={numPages * limit}
              />
            </div>
          </QueueAnim>
        </Layout>
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
  }
`
