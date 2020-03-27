import React from 'react'
import { rhythm } from "../utils/typography"
const src = [
    'https://tva1.sinaimg.cn/large/00831rSTly1gd8jsrc04aj30n01dsjsq.jpg',
    'https://tva1.sinaimg.cn/large/00831rSTly1gd8jt3b331j30n01dsq4c.jpg',
    'https://tva1.sinaimg.cn/large/00831rSTly1gd8jt8p7a3j30n01dsmyc.jpg',
    'https://tva1.sinaimg.cn/large/00831rSTly1gd8jtcyakej30n01dsab7.jpg',
    'https://tva1.sinaimg.cn/large/00831rSTly1gd8jtgn5obj30n01dsjsi.jpg'
]

const Game = (props) => {
    
    return (
        <div
        style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(40),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            position:'relative',
          }}
        >
            <h1>荆楚一骑给"太君"安排的极好 快给太君作个揖  </h1>

            {
                src.map(s => 
                    
                    <div>
                    <img style={{
                        width: '24rem',
                        height: 'auto',
                    }} src={s}>
                    </img>
                    </div>
                )
            }
            
        </div>
    )
  }

  export default Game