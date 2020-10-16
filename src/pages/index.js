import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MyNav from "../components/nav"
import { randomColor } from "../utils/utils"
import { autoBaiduSubmit } from "../utils/utils"

import { rhythm } from "../utils/typography"
import "./style/index.css"
import QueueAnim from 'rc-queue-anim';
class BlogIndex extends React.Component {
  componentDidMount() {
    autoBaiduSubmit()
  }

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    console.log(this.props)
    return (
      <div className="bg">
        <Layout location={this.props.location} title={siteTitle}>
          <SEO title="所有文章" description="若端blog，所有文章" />
          <MyNav />
          <QueueAnim delay={300} type={['scaleY']} ease={['easeOutQuart', 'easeInOutQuart']} className="queue-simple">
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <article
                className="postArticle"
                key={node.fields.slug}
                style={{ margin: "2rem 0" }}
              >
                <header>
                  <hgroup
                    style={{
                      marginBottom: rhythm(1 / 4),
                      fontSize: '1.5rem',
                      fontFamily: 'Black Ops One'
                    }}
                  >
                    <Link
                      style={{ boxShadow: `none`, color: randomColor() }}
                      to={node.fields.slug}
                    >
                      {title}
                    </Link>
                  </hgroup>
                  <small>{node.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                </section>
              </article>
            )
          })}
          </QueueAnim>
        </Layout>
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
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
  }
`
