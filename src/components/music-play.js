import React from 'react';
import Cplayer from 'react-cplayer'
import { Row, Col } from 'antd'


const MusicPlay = (props) => {
    const onPlay = () => {
        console.log('onPlay');
    }
    return (
        <Row>
        <Col xs={0} md={24}>
        <div style={{
            position: 'absolute',
            right: '5rem',
            top: '-2rem'
        }}>
        {   
            typeof window !== 'undefined' && <Cplayer 
            onPlay={onPlay}
            playlist={[
                {
                src: 'https://music.163.com/song/media/outer/url?id=500684228.mp3',
                poster: 'http://p2.music.126.net/noJPpaixwhM7vS7Mfhs9sg==/109951163008620133.jpg',
                name: 'Discovery',
                artist: 'Electro-Light',
                lyric: '',
                sublyric: '',
                album: 'Discovery'
                },
            ]}
        />
        }
            
        </div>
        </Col>
        </Row>
    )
}

export default MusicPlay