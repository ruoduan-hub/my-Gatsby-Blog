import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { PlayCircleOutlined } from '@ant-design/icons'
import { List, Card } from 'antd'
import { rhythm } from '../utils/typography'

const MusicPlay = props => {
  let [isShow, setShow] = useState('none')

  const actionShow = () => {
    if (isShow === 'none') {
      setShow('block')
    } else {
      setShow('none')
    }
  }

  const keyDownClose = () => {
    document.onkeydown = e => {
      if (Number(e.keyCode) === 27) {
        setShow('none')
      }
    }
  }

  useEffect(() => typeof window !== 'undefined' && keyDownClose(), [])

  const music = useStaticQuery(graphql`
    query music {
      site {
        siteMetadata {
          social {
            myMusicList {
              src
              title
              description
            }
          }
        }
      }
    }
  `)

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(40),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        position: 'relative',
      }}
    >
      {/* eslint-disable */}
      <div
        role="button"
        onClick={actionShow}
        style={{
          fontSize: '3rem',
          fontFamily: 'Black Ops One',
          cursor: 'pointer',
          margin: '1rem',
        }}
      >
        <PlayCircleOutlined />
        <span>My Guitar Song</span>
      </div>
      <div
        id="player"
        className="player"
        style={{
          display: isShow,
        }}
      >
        {/* {   
                    typeof window !== 'undefined' && <Cplayer 
                    onPlay={onPlay}
                    playlist={props.list}
                />
                }   */}
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 2,
            xxl: 2,
          }}
          dataSource={music.site.siteMetadata.social.myMusicList}
          renderItem={item => (
            <List.Item>
              <Card title={item.title}>
                <div key={item.title}>
                  <p>{item.description}</p>
                  <audio controls>
                    <source src={item.src} />
                    <source src={item.src} />
                    <track label={item.title} kind="captions"></track>
                    您的浏览器不支持该音频格式。
                  </audio>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default MusicPlay
