import React from 'react'

export const Knob = ({rotation}) =>
    <div className='knob'>
        <div className='handle'>
            <div
                className='dot'
                style={{ transform: `rotateZ(${rotation}deg)` }} />
        </div>
    </div>
