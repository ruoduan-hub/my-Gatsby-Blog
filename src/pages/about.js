import React  from 'react'
import MusicPlay from '../components/music-play'
import { Card, Icon, Avatar, Descriptions, Row, Col, Tag, List, Divider } from 'antd';
// 导入公共样式
import { rhythm } from "../utils/typography"
import { openPage, randomColor } from '../utils/utils'
const { Meta } = Card;




const About = (props) => {
  console.log(props)
  const {author, description} = props.data.site.siteMetadata
  const { github, zhihu, weibo, email, aboutLike, skill } = props.data.site.siteMetadata.social
  
  return (
    <>
      <div className="leftController">
        <MusicPlay />
      </div>

      <div className="about"
       style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(40),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        display: 'flex'
      }}
       >
      <Row>
      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <div className="aboutCard">
          <Card
            cover={
              <img
                alt="me"
                srcSet={props.data.about.childImageSharp.fixed.srcSet}
              />
            }
            actions={[
              <Icon onClick={() => openPage(github)} style={{fontSize:'2rem'}} type="github" key="setting" />,
              <Icon onClick={() => openPage(zhihu)} style={{fontSize:'2rem'}} type="zhihu" key="edit" />,
              <Icon onClick={() => openPage(weibo)} style={{fontSize:'2rem'}} type="weibo" key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src={props.data.about.childImageSharp.fixed.src} />}
              title={author}
              description={description}
            />
          </Card>
         </div>
      </Col>

      <Col xs={24} sm={24} md={15} lg={15} xl={15}>
        <div className="aboutInfo" style={{margin: '0 2rem'}}>
          <Descriptions title="关于我">
          <Descriptions.Item label="About">{author}</Descriptions.Item>
            <Descriptions.Item label="Live">Hangzhou</Descriptions.Item>
            <Descriptions.Item label="Job">Develop Web .</Descriptions.Item>
            <Descriptions.Item label="E-mail">{email}</Descriptions.Item>
            <Descriptions.Item span={2} label="我中意你啊">
              {
                aboutLike.map(item => 
                <Tag key={item} color={randomColor()}>{item}</Tag>  
                )
              }
            </Descriptions.Item>

            <Row>
              <Col xs={0} md={24}>
                <Descriptions.Item >
                  <List
                    size="small"
                    bordered
                    dataSource={skill}
                    renderItem={item => <List.Item>{item}</List.Item>}
                  />
                </Descriptions.Item>
              </Col>
            </Row>
            
        </Descriptions>
        </div>
      </Col>
      </Row>
      </div>
      <Divider />
    </>
  )
}


export default About


export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author
        description
        social {
          github
          zhihu
          weibo
          email
          aboutLike
          skill

        }
      }
    }
    about: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
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
            description
            aa
            tags
          }
        }
      }
    }
  }
`