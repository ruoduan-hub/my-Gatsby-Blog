/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import {
  AlipayOutlined,
  QrcodeOutlined,
  WechatOutlined,
} from '@ant-design/icons'
import { Button } from 'antd'
const ButtonGroup = Button.Group

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      wechat: file(absolutePath: { regex: "/wechatImage.jpg/" }) {
        childImageSharp {
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
      }
      alipay: file(absolutePath: { regex: "/alipayImage.jpg/" }) {
        childImageSharp {
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)
  let [isShow, setShow] = useState(false)
  let [qrcode, setQrcode] = useState(data.wechat.childImageSharp.fixed)
  return (
    <>
      <Button onClick={() => setShow(!isShow)} icon={<QrcodeOutlined />}>
        打赏支持
      </Button>

      <div
        style={{
          margin: '2rem 0',
          display: 'flex',
        }}
      >
        {isShow ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <p
              style={{ fontFamily: 'Ma Shan Zheng,cursive', fontSize: '1rem' }}
            >
              {' '}
              如果觉得我的文章对您有用，请随意打赏。您的支持将鼓励我继续创作!{' '}
            </p>
            <ButtonGroup style={{ margin: '2rem 0' }}>
              <Button
                onClick={() => setQrcode(data.wechat.childImageSharp.fixed)}
                style={{ backgroundColor: '#24AA39', borderColor: '#24AA39' }}
                color="red"
                type="primary"
              >
                <WechatOutlined />
                微&nbsp;&nbsp;&nbsp;&nbsp;信
              </Button>
              <Button
                onClick={() => setQrcode(data.alipay.childImageSharp.fixed)}
                style={{ backgroundColor: '#039AE3', borderColor: '#039AE3' }}
                type="primary"
              >
                支付宝
                <AlipayOutlined />
              </Button>
            </ButtonGroup>

            <div>
              <Image
                fixed={qrcode}
                style={{
                  maxHeight: '30rem',
                }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default Bio
