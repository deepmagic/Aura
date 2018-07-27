import React from 'react'

import { NOTE_HEIGHT, NUM_KEYS, MAX_HEIGHT } from 'ui/sequencer/constants'
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
                    [...Array(bars*timesig).keys()].map(bar =>
                        <BarLine
                            key={bar}
                            bar={bar}
                            barsize={barsize}
                            timesig={timesig}
                            maxheight={MAX_HEIGHT} />)
                }
                {
                    [...Array(bars*bars*timesig).keys()].map(bar =>
                        <BarSubLine
                            key={bar}
                            bar={bar}
                            barsize={barsize}
                            timesig={timesig}
                            maxheight={MAX_HEIGHT} />)
                }
                {
                    [...Array(NUM_KEYS).keys()].map(bar =>
                        <BarHorizontalLine
                            key={bar}
                            bar={bar}
                            noteheight={NOTE_HEIGHT}
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
