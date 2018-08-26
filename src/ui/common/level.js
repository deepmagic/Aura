import React from 'react'

// TODO proper dB range
export const Level = ({level}) =>
    <div className='level-indicator'>
        <div className='indicator' style={{ transform: `translateY(${100 - level*100}%)` }} />
    </div>
