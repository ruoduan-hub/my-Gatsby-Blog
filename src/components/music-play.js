import React from 'react';
import Cplayer from 'react-cplayer'

const MusicPlay = (props) => {
    const onPlay = () => {
        console.log('onPlay');
    }
    return (
        <div>
            <Cplayer 
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
        </div>
    )
}

export default MusicPlay