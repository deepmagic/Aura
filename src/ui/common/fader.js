import React from 'react'

export const Fader = ({level}) =>
    <div className='fader'>
        <div
            className='slider-wrap'
            style={{ transform: `translateY(${100 - level}%)` }}>
            <div className='slider'>
                <div className='bar' />
            </div>
        </div>
    </div>
