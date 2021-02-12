import React from 'react'
import { randomImg } from '../utils/utils'

const img = props => {
  return (
    <>
      <div style={{ maxHeight: '40rem', overflow: 'hidden' }}>
        <img
          alt="标签"
          className="imgaft"
          src={randomImg.biying}
          style={{
            position: 'relative',
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        />
      </div>
    </>
  )
}

export default img
