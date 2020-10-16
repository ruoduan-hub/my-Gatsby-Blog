import React from "react"
import ReactDOM from 'react-dom';
import { Link, graphql } from "gatsby"
import {
    DoubleLeftOutlined,
    DoubleRightOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
    ProfileFilled,
} from "@ant-design/icons"
import { BackTop } from "antd"

import Bio from "../components/bio"
import Comment from "../components/comment"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import MyNav from "../components/nav"
import { autoBaiduSubmit } from "../utils/utils"
import WithDrawer from "../components/drawer"
import Toc from "../components/toc"
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();
// portals 插槽 插到到DOM元素
const PortalsRoot = typeof document!== 'undefined' ? document.getElementById('___gatsby'): null

class BlogPostTemplate extends React.Component {
    constructor() {
        super()
        this.state = {
            eyeModel: {
                background: null,
            },
        }
        // 创建一个dom元素容器
        this.el = typeof document !== `undefined` ? document.createElement('div') : null
    }
    componentDidMount() {
        autoBaiduSubmit()
        // 挂载到dom元素上
        PortalsRoot.appendChild(this.el)
    }
    componentWillUnmount() {
        // 清除元素
        PortalsRoot.removeChild(this.el);
    }

    render() {
        const post = this.props.data.markdownRemark
        const siteTitle = this.props.data.site.siteMetadata.title
        const { previous, next } = this.props.pageContext

        // 护眼模式 func
        const changeEye = () => {
            if (!this.state.eyeModel.background) {
                this.setState({
                    eyeModel: { background: "#E3EDCD" },
                })
            } else {
                this.setState({
                    eyeModel: { background: false },
                })
            }
        }

        return (
            <>
                <WithDrawer
                    data={
                        <Toc tocHtml={this.props.data.markdownRemark.tableOfContents} />
                    }
                    button={<ProfileFilled style={{ fontSize: "2rem" }} />}
                />

                {/* portals 挂载到外层 */}
                <div style={this.state.eyeModel} id="main">

                {
                typeof window !== 'undefined' && ReactDOM.createPortal(
                            <div
                                id="eyeModel"
                                style={{
                                    position: "fixed",
                                    right: "3rem",
                                    top: '1rem',
                                    zIndex: 99,
                                }}
                            >
                                {this.state.eyeModel.background ? (
                                    <div>
                                        <EyeInvisibleOutlined
                                            onClick={changeEye}
                                            style={{ fontSize: "3rem" }}
                                        />
                                        <BackTop visibilityHeight={800} />
                                    </div>
                                ) : (

                                        <div>
                                            <EyeOutlined onClick={changeEye} style={{ fontSize: "3rem" }} />
                                            <BackTop visibilityHeight={800} />
                                        </div>
                                    )}
                            </div>,
                            this.el
                        )
                    }
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
                                        marginTop: rhythm(.2),
                                        marginBottom: rhythm(.5),
                                    }}
                                >
                                    {post.frontmatter.title}
                                </h1>
                                <p
                                    style={{
                                        ...scale(1 / 5),
                                        display: `block`,
                                        marginBottom: rhythm(1),
                                        fontSize: rhythm(.5),
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
                                    margin: "2rem 0",
                                }}
                            >
                                <li>
                                    {next && (
                                        <Link className="nextText" to={next.fields.slug} rel="next">
                                            <DoubleLeftOutlined />
                                            {next.frontmatter.title}
                                        </Link>
                                    )}
                                </li>

                                <li>
                                    {previous && (
                                        <Link
                                            className="nextText"
                                            to={previous.fields.slug}
                                            rel="prev"
                                        >
                                            {previous.frontmatter.title} <DoubleRightOutlined />
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </nav>
                    </Layout>

                    <Comment
                        gitalkConfig={this.props.data.site.siteMetadata.gitalkConfig}
                        path={this.props.path}
                    />
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
