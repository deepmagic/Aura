import React from 'react'

import { NUM_KEYS } from 'ui/sequencer/constants'
import { getNoteProps } from 'ui/sequencer/utils'
import { BarLine, BarSubLine, BarHorizontalLine } from 'ui/sequencer/pattern-bars'
import { NoteBox } from 'ui/sequencer/pattern-notes'

export class PatternGrid extends React.PureComponent {
    render() {
        const {
            onClickNote,
            bars,
            notes,
            barsize,
            width,
            height,
            timesig
        } = this.props

        return (
            <svg
                className='grid'
                width={width}
                height={height}
                shapeRendering='crispEdges'>
                {
                    [...Array(bars - 1).keys()].map(bar =>
                        <BarLine
                            key={bar}
                            bar={bar}
                            barsize={barsize} />)
                }
                {
                    [...Array(bars * timesig - 1).keys()].map(bar =>
                        <BarSubLine
                            key={bar}
                            bar={bar}
                            barsize={barsize}
                            timesig={timesig} />)
                }
                {
                    [...Array(NUM_KEYS - 1).keys()].map(bar =>
                        <BarHorizontalLine
                            key={bar}
                            bar={bar}
                            width={width} />)
                }
                {
                    notes.map((note, index) =>
                        <NoteBox
                            key={index}
                            onClick={(event) => onClickNote(event, index)}
                            {...getNoteProps(note, barsize)} />)
                }
            </svg>
        )
    }
}
