import React from 'react'
import { Row, Col } from 'antd'


const MusicPlay = (props) => {
    return (
        <Row>
        <Col xs={0} md={24}>
        <div style={{
            position: 'absolute',
            right: '5rem',
            top: '-2rem'
        }}>
        {/* {   
            typeof window !== 'undefined' && <Cplayer 
            onPlay={onPlay}
            playlist={props.list}
        />
        }   */}
        </div>
        </Col>
        </Row>
    )
}

export default MusicPlay