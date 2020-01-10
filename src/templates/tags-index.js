import React from "react"
import { Link, graphql } from "gatsby"
import { randomColor } from '../utils/utils'
import Layout from "../components/layout"
import SEO from "../components/seo"
import MyNav from '../components/nav'


import { rhythm } from "../utils/typography"




class TagsIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    console.log(this.props)
    
    return (
      <div className="bg">
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <MyNav />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article className="postArticle" key={node.fields.slug} style={{margin: '2rem 0'}}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none`,color: randomColor() }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
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
      </Layout>
      </div>
    )
  }
}

export default TagsIndex


export const pageQuery = graphql`
  query ($tags: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC },
      filter:{ frontmatter: {tags: {in: [$tags]}} }
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
            comments
            categories
          }
        }
      }
    }
  }
`
