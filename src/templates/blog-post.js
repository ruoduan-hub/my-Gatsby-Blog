import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Comment from '../components/comment'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import MyNav from '../components/nav'
import { Icon } from 'antd'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    return (
      <>
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <MyNav small={true} />
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                ...scale(-1 / 5),
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
              {previous && (
                <Link className="nextText" to={previous.fields.slug} rel="prev">
                  <Icon type="double-left" /> {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link className="nextText" to={next.fields.slug} rel="next">
                  {next.frontmatter.title} <Icon type="double-right" />
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>

      <Comment gitalkConfig={this.props.data.site.siteMetadata.gitalkConfig} path={this.props.path} />
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        date(formatString: "YYYY 年 MM 月 DD 日")
            title
            tags
            comments
            categories
      }
    }
  }
`
