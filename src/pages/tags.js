import React, {useState}  from 'react'
import { Card } from 'antd';

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const Tags = (props) => {
  let urlData = {}
  props.data.allMarkdownRemark.edges.forEach((item => {
    urlData[item.node.frontmatter.tags] = item.node.frontmatter.tags
  }))

  console.log(urlData)

  return (
    <>
    <h1>当前所有标签</h1>
       {
         props.data.allMarkdownRemark.edges.map((item,i) => 
           <h3 key={item.node.frontmatter.title}>{item.node.frontmatter.tags}</h3>
          )
       }
        <Card title="Card Title">
          
          {
            Object.keys(urlData).map((key) =>
            <Card.Grid style={gridStyle}>
              {key}
            </Card.Grid>
            )
          }
        </Card>
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