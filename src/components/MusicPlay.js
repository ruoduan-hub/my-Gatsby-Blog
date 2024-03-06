import React, { useState, useEffect, Suspense } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import MusicNoteIcon from '@material-ui/icons/MusicNote';

import Link from 'gatsby'

import { rhythm } from '../utils/typography'

const MusicPlay = (props) => {
  let [isShow, setShow] = useState('block')

  const actionShow = () => {
    if (isShow === 'none') {
      setShow('block')
    } else {
      setShow('none')
    }
  }

  const keyDownClose = () => {
    document.onkeydown = (e) => {
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
            douyinlink
          }
        }
      }
    }
  `)

  return (
    <Suspense>
      {/* eslint-disable */}
      <div
        role="button"
        onClick={actionShow}
        style={{
          fontSize: "2rem",
          fontFamily: "Black Ops One",
          cursor: "pointer",
          margin: "2rem 0",
          display: "flex",
          alignItems: "center",
        }}
      >
        <PlayCircleOutlineIcon
          style={{ fontSize: "2rem", marginRight: "0.3rem" }}
        />
        <span>My Guitar Song</span>
      </div>

      <div style={{ display: isShow }}>
        <a target="_blank" href={music.site.siteMetadata.social.douyinlink}>
          <h4>🎵 Guitar抖音日常分享(点击跳转)</h4>
        </a>
        <Grid container spacing={6}>
          {/* {typeof window !== "undefined" && (
          <Cplayer onPlay={onPlay} playlist={props.list} />
        )} */}
          {music.site.siteMetadata.social.myMusicList.map((item) => (
            <Grid key={item.title} item xs={12} md={6}>
              <Card>
                <CardHeader
                  title={
                    <Typography variant="button" display="block" gutterBottom>
                      {item.title}
                    </Typography>
                  }
                  subheader={
                    <Typography
                      color="textSecondary"
                      variant="body2"
                      gutterBottom
                      style={{ height: "3em" }}
                    >
                      {item.description}
                    </Typography>
                  }
                />
                <CardContent>
                  <div>
                    <audio style={{ width: "100%" }} controls>
                      <source src={item.src} />
                      <source src={item.src} />
                      <track label={item.title} kind="captions"></track>
                      您的浏览器不支持该音频格式。
                    </audio>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Suspense>
  )
}

export default MusicPlay
