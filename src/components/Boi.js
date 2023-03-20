/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
// import Image from 'gatsby-image'
import { GatsbyImage } from 'gatsby-plugin-image'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import LocalCafeOutlinedIcon from '@material-ui/icons/LocalCafeOutlined'

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      wechat: file(absolutePath: { regex: "/wechatImage.jpg/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED)
        }
      }
      alipay: file(absolutePath: { regex: "/alipayImage.jpg/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED)
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
      <Button
        variant="contained"
        color="primary"
        startIcon={<LocalCafeOutlinedIcon />}
        onClick={() => setShow(!isShow)}
      >
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
            <ButtonGroup
              variant="text"
              color="primary"
              style={{ margin: '2rem 0' }}
            >
              <Button
                onClick={() => setQrcode(data.wechat.childImageSharp.fixed)}
              >{`微  信`}</Button>
              <Button
                onClick={() => setQrcode(data.alipay.childImageSharp.fixed)}
              >
                支付宝
              </Button>
            </ButtonGroup>

            <div>
              <GatsbyImage
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
