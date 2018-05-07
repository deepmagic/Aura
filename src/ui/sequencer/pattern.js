import React from 'react'

export class Pattern extends React.Component {
    render() {
        const { pattern: { bars }, style } = this.props

        return (
            <div className='pattern' style={style}>
                <div className='pattern-header'>
                    <PatternControl />
                    <Bars bars={bars} />
                </div>
                <div className='pattern-content'>
                    <div className='left keys dragscroll'>
                        <PatternKeys key={60} />
                    </div>
                    <div className='right dragscroll'>
                        <Grid />
                        notes
                    </div>
                </div>
                <div className='pattern-footer'>
                    <div className='foot-switch' />
                    <Velocity />
                </div>
            </div>
        )
    }
}

const PatternControl = () =>
    <div className='pattern-control'></div>

const Bars = ({ bars }) => {
    return (
        <div className='bars'>
            <div className='bar-row'>
                { [...Array(bars).keys()].map(bar => <Bar key={bar} bar={bar} />) }
            </div>
            <div className='spacer' />
            <div className='sub-bars' />
        </div>
    )
}
const Bar = ({bar}) =>
    <div className='bar'>{`${bar + 1} Bar`}</div>

const notes = ["A#", "A", "G#", "G", "F#", "F", "E", "D#", "D", "C#", "C"]
const octaves = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
const PatternKeys = () => {
    return (
        octaves.map((octave, o) =>
            notes.map((note, n) =>
                <Note key={o+n} note={note} octave={octave - 1} />
            )
        )
    )
}
const Note = ({note, octave}) =>
    <div className={`note${note.length === 2 ? ' sharp' : ''}`}>
        {`${note}${octave}`}
    </div>

const MAX_HEIGHT = notes.length * octaves.length * 65
const MAX_WIDTH = 1920 - 101
class Grid extends React.Component {

    render() {
        return (
            <svg height={MAX_HEIGHT} width={MAX_WIDTH}></svg>
        )
    }
}
class Velocity extends React.Component {
    render() {
        return (
            <svg height={48} width={MAX_WIDTH}></svg>
        )
    }
}
