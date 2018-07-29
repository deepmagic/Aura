import React from 'react'
import { MAX_HEIGHT, NOTE_HEIGHT } from 'ui/sequencer/constants'

export const BarLine = ({bar, barsize}) => {
    const x = barsize * (bar + 1)
    return <line className='bar-line' x1={x} y1={0} x2={x} y2={MAX_HEIGHT} />
}

export const BarSubLine = ({bar, barsize, timesig}) => {
    const x = barsize / timesig * (bar + 1)
    return <line className='bar-sub-line' x1={x} y1={0} x2={x} y2={MAX_HEIGHT} />
}

export const BarHorizontalLine = ({bar, width}) => {
    const y = NOTE_HEIGHT * (bar + 1)
    return <line className='bar-horizontal-line' x1={0} y1={y} x2={width} y2={y} />
}
