import React from "react"
import { Link, graphql } from "gatsby"
import { DoubleLeftOutlined, DoubleRightOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { BackTop } from 'antd';

import Bio from "../components/bio"
import Comment from '../components/comment'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import MyNav from '../components/nav'
import { autoBaiduSubmit } from "../utils/utils"

class BlogPostTemplate extends React.Component {
  constructor(){
    super()
    this.state = {
      eyeModel :{
        background: null
      },
    }
  }
  componentDidMount () {
    autoBaiduSubmit()
  }
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    // 护眼模式 func
    const changeEye = () => {
      if (!this.state.eyeModel.background){
        this.setState({
          eyeModel: {background: '#E3EDCD'}
        })
      } else {
        this.setState({
          eyeModel: {background: false}
        })
      }
    }

    return <>
    <div style={this.state.eyeModel} id="main">
    <BackTop visibilityHeight={800} />
    <div id="eyeModel" style={{
      position: 'fixed',
      right: '3rem',
      bottom: '10rem',
      zIndex: 99
    }} >
      {
        this.state.eyeModel.background ? 
        <EyeInvisibleOutlined onClick={changeEye} style={{fontSize: '3rem'}} /> 
        :
        <EyeOutlined onClick={changeEye} style={{fontSize: '3rem'}} />
        
      }
    </div>
    <Layout location={this.props.location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        tags={post.frontmatter.title || post.frontmatter.title}
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
            {next && (
              <Link className="nextText" to={next.fields.slug} rel="next">
                <DoubleLeftOutlined />{next.frontmatter.title}
              </Link>
            )}
          </li>

          <li>
            {previous && (
              <Link className="nextText" to={previous.fields.slug} rel="prev">
                 {previous.frontmatter.title} <DoubleRightOutlined />
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>

    <Comment gitalkConfig={this.props.data.site.siteMetadata.gitalkConfig} path={this.props.path} />
    </div>
    </>;
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
        categories
      }
    }
  }
`
