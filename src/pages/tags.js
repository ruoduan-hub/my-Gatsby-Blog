import React  from 'react'
import { Link } from 'gatsby'
import SEO from '../components/seo'
import { Card, Row, Col } from 'antd';
import { rhythm, scale} from "../utils/typography"
import { randomColor } from '../utils/utils'
import Img from '../components/img'
import MyNav from '../components/nav'
import Comment from '../components/comment'
import './style/tags.css'




const Tags = (props) => {
  let urlData = {}
  const title = props.data.site.siteMetadata.title
  props.data.allMarkdownRemark.edges.forEach((item => {
    urlData[item.node.frontmatter.tags] = item.node.frontmatter.tags
  }))
  const imgStyle = {
    position: 'relative',
    minHeight: '30rem',
    overflow: 'hidden'
  }
  console.log(props.data)
  return (
    <>
    <div className="tagsImg" style={imgStyle}>
    <SEO title="标签页面" description="若端blog，标签页面" />
      <Img />
      <div style={{
      backgroundColor:'rgba(255,255,255,0.5)',
      position: 'absolute',
      bottom: '0rem',
      width:' 100%',
      height: 'auto',
      }}>
        <div style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(30),
          padding: '1rem 0'
          } }>
          <MyNav />
        </div>
      </div>

      <h1
        className="blogName"
          style={{
            ...scale(2),
            marginBottom: rhythm(1.5),
            marginTop: 0,
            position: 'absolute',
            top: '30%',
            left: '10%',
            fontSize: '5rem'
            
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `rgba(255,255,255,0.6)`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
    </div>

    <div className="title" style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(40),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}>
        

        <Card title="Click on the tab to jump to the corresponding article">
            <Row>
              <Col md={24} sm={0} xs={0} >
                {Object.keys(urlData).map((key) =>
                  <Card.Grid key={key} style={{
                    width: '25%' ,
                    minHeight: '3em',
                    textAlign: 'center',
                    fontSize: '20px'  
                  }}>
                    <Link style={{color: randomColor(), width:'%100',height:'100%' }} to={`/tags/${key}`}>{key}</Link>
                  </Card.Grid>
                )}
              </Col>
              <Col  md={0} sm={24} xs={24}>
                {Object.keys(urlData).map((key) =>
                  <Card.Grid key={key} style={{
                    width: '50%' ,
                    minHeight: '3em',
                    textAlign: 'center',
                    fontSize: '20px'  
                  }}>
                    <Link style={{color: randomColor(), width:'%100',height:'100%' }} to={`/tags/${key}`}>{key}</Link>
                  </Card.Grid>
                )}
              </Col>
            </Row>
            
        </Card>
        </div>

    <Comment gitalkConfig={props.data.site.siteMetadata.gitalkConfig} path={props.path} />
    </>
  )
}


export default Tags


export const pageQuery = graphql`
  query {
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
            date(formatString: "YYYY 年 MM 月 DD 日 HH:MM:SS")
            title
            tags
            categories
          }
        }
      }
    }
  }
`