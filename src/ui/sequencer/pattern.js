import React from 'react'

export class Pattern extends React.Component {
    constructor() {
        super()
        this.onScroll = this.onScroll.bind(this)
        this.lockscroll = '__lock_scroll__'
    }
    unlockScroll (...args) {
        args.forEach(el => {
            delete el[this.lockscroll]
        })
    }
    lockScroll (...args) {
        args.forEach(el => {
            el[this.lockscroll] = true
        })

        clearTimeout(this.scrollLock)
        this.scrollLock = setTimeout(this.unlockScroll.bind(this, ...args), 100)
    }
    onScroll = (event) => {
        if (event.target === this.left && !this.left[this.lockscroll]) {
            this.right.scrollTop = event.target.scrollTop
            this.lockScroll(this.right)
        } else if (event.target === this.right && !this.right[this.lockscroll]) {
            this.left.scrollTop = event.target.scrollTop
            this.lockScroll(this.left)
        }
    }

    render() {
        const { pattern: { bars }, style } = this.props

        return (
            <div className='pattern' style={style}>
                <div className='pattern-header'>
                    <PatternControl />
                    <Bars bars={bars} />
                </div>
                <div className='pattern-content'>
                    <div className='left keys dragscroll' ref={l => this.left = l} onScroll={this.onScroll}>
                        <PatternKeys key={60} />
                    </div>
                    <div className='right dragscroll' ref={r => this.right = r} onScroll={this.onScroll}>
                        <Grid bars={bars} />
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

// 33 = note height + border
// 101 = note width + border
const MAX_HEIGHT = notes.length * octaves.length * 33
const MAX_WIDTH = 1920 - 101
const BARSIZE = 455
const NOTESIZE = 33

class Grid extends React.Component {
    render() {
        const { bars } = this.props
        const x = BARSIZE/8
        const y = NOTESIZE

        return (
            <svg className='grid' height={MAX_HEIGHT} width={MAX_WIDTH}>
                <React.Fragment>
                    <rect className='midi-note' x={x*3}  y={y+1}   width={x} height={31} />
                    <rect className='midi-note' x={x*5}  y={y*2+1} width={x} height={31} />
                    <rect className='midi-note' x={x*10} y={y*3+1} width={x} height={31} />
                    <rect className='midi-note' x={x*12} y={y*6+1} width={x} height={31} />
                </React.Fragment>
                {
                    [...Array(bars).keys()].map(bar =>
                        <BarLine key={bar} bar={bar} />)
                }
                {
                    [...Array(bars*64).keys()].map(bar =>
                        <BarSubLine key={bar} bar={bar} />)
                }
                {
                    [...Array(120).keys()].map(bar =>
                        <BarCrossLine key={bar} bar={bar} />)
                }

            </svg>
        )
    }
}
// vertical bar delimiters
const BarLine = ({bar}) => {
    const x = BARSIZE/2 * (bar + 1)

    return <line className='bar-line' x1={x} y1={0} x2={x} y2={MAX_HEIGHT} />
}
const BarSubLine = ({bar}) => {
    const x = (BARSIZE/8) * (bar + 1)

    return <line className='bar-sub-line' x1={x} y1={0} x2={x} y2={MAX_HEIGHT} />
}
const BarCrossLine = ({bar}) => {
    const y = NOTESIZE * (bar + 1)

    return <line className='bar-cross-line' x1={0} y1={y} x2={MAX_WIDTH} y2={y} />
}

class Velocity extends React.Component {
    render() {
        return (
            <svg className='velocity' height={50} width={MAX_WIDTH}></svg>
        )
    }
}
