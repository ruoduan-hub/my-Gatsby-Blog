import React  from 'react'
import { Link } from 'gatsby'
import { Card } from 'antd';
import { rhythm, scale} from "../utils/typography"
import { randomColor } from '../utils/utils'
import Img from '../components/img'
import MyNav from '../components/nav'
import './style/tags.css'




const Tags = (props) => {
  let urlData = {}
  const title = props.data.site.siteMetadata.title
  props.data.allMarkdownRemark.edges.forEach((item => {
    urlData[item.node.frontmatter.tags] = item.node.frontmatter.tags
  }))
  const imgStyle = {
    position: 'relative',
  }
  if (Number(document.body.scrollWidth > 768)) {
    imgStyle.minHeight = '30rem'
  }
  console.log(props.data)

  return (
    <>
    <div className="tagsImg" style={imgStyle}>
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
          maxWidth: rhythm(40),
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
          {
            Object.keys(urlData).map((key) =>
            <Card.Grid style={{
              width: Number(document.body.clientWidth) < 768?'50%':'25%' ,
              minHeight: '3em',
              textAlign: 'center',
              fontSize: '20px'  
            }}>
              <Link style={{color: randomColor(), width:'%100',height:'100%' }} to={`/tags/${key}`}>{key}</Link>
            </Card.Grid>
            )
          }
        </Card>
        </div>
    </>
  )
}


export default Tags


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
            description
            aa
            tags
          }
        }
      }
    }
  }
`