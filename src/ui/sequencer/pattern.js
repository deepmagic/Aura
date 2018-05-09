import React from 'react'
import { Icon } from 'ui/common/icon'

export class Pattern extends React.Component {
    constructor() {
        super()
        this.onScroll = this.onScroll.bind(this)
        this.lockscroll = '__lock_scroll__'
        this.state = {
            offsetBar: 0
        }
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
    onWheel = (event) => {

        if(event.deltaY < 0) { // up
            if(this.state.offsetBar < 12) {
                this.setState({offsetBar: this.state.offsetBar + 1 })
            }
        } else { // down
            if(this.state.offsetBar > 0) {
                this.setState({offsetBar: this.state.offsetBar - 1 })
            }
        }

        event.preventDefault()
    }
    render() {
        const { pattern: { bars }, style } = this.props

        const BARS = bars + this.state.offsetBar

        return (
            <div className='pattern' style={style} onWheel={this.onWheel}>
                <div className='pattern-header'>
                    <PatternControl tool='select' />
                    <Bars bars={BARS} />
                </div>
                <div className='pattern-content'>
                    <div className='left keys dragscroll' ref={l => this.left = l} onScroll={this.onScroll}>
                        <PatternKeys key={60} />
                    </div>
                    <div className='right dragscroll' ref={r => this.right = r} onScroll={this.onScroll}>
                        <Grid bars={BARS} />
                    </div>
                </div>
                <div className='pattern-footer'>
                    <div className='foot-switch' />
                    <Modulation bars={BARS} />
                </div>
            </div>
        )
    }
}

// TODO split this out, remove redundancy
const PatternControl = ({ tool }) =>
    <div className='pattern-control'>
        <div className={`draw ${tool === 'draw' ? 'active' : ''}`}>
            <Icon>create</Icon>
            Draw
        </div>
        <div className={`select ${tool === 'select' ? 'active' : ''}`}>
            <Icon>select_all</Icon>
            Select
        </div>
    </div>

const Bars = ({ bars }) => {
    return (
        <div className='bars'>
            <div className='bar-row'>
                <div className='bar-range' />
                { [...Array(bars).keys()].map(bar => <Bar key={bar} bar={bar} />) }
            </div>
            <div className='spacer' />
            <div className='sub-bars'>
                { [...Array(bars).keys()].map(bar =>
                    [...Array(4).keys()].map(sub => <SubBar key={sub+bar} sub={sub} bar={bar} />)
                ) }
            </div>
        </div>
    )
}
const Bar = ({bar}) =>
    <div className='bar'>{`${bar + 1} Bar`}</div>
const SubBar = ({sub, bar}) =>
    <div className='sub-bar'>{`${bar+1}.${sub+1}`}</div>

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
            <svg className='grid' height={MAX_HEIGHT} width={MAX_WIDTH} shapeRendering='crispEdges'>
                {
                    [...Array(bars*4).keys()].map(bar =>
                        <BarLine key={bar} bar={bar} bars={bars} />)
                }
                {
                    [...Array(bars*64).keys()].map(bar =>
                        <BarSubLine key={bar} bar={bar} />)
                }
                {
                    [...Array(120).keys()].map(bar =>
                        <BarCrossLine key={bar} bar={bar} />)
                }
                <React.Fragment>
                    <NoteBar x={x*3} y={y} w={x} v={0.2} />
                    <NoteBar x={x*5} y={y*2} w={x} v={0.2} />
                    <NoteBar x={x*10} y={y*3} w={x*2} v={0.2} />
                    <NoteBar x={x*12} y={y*6} w={x*4} v={0.5} />
                </React.Fragment>
            </svg>
        )
    }
}
// vertical bar delimiters
const BarLine = ({bar, bars}) => {
    const x = BARSIZE / bars * (bar + 1)
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

const NOTE_OFFSET = 2
const NOTE_HEIGHT = 30
const NoteBar = ({x, y, w, v}) => {
    return (
        <React.Fragment>
            <rect className='midi-note'   x={x} y={y+NOTE_OFFSET} width={w} height={NOTE_HEIGHT  } />
            <rect className='midi-note-v' x={x} y={y+NOTE_OFFSET} width={w} height={NOTE_HEIGHT*v} />
        </React.Fragment>
    )
}

class Modulation extends React.Component {
    render() {
        const { bars } = this.props

        return (
            <svg className='modulation' height={50} width={MAX_WIDTH} shapeRendering='crispEdges'>
                {
                    [...Array(bars*4).keys()].map(bar =>
                        <BarLine key={bar} bar={bar} bars={bars} />)
                }
            </svg>
        )
    }
}
