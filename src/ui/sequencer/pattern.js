import React from 'react'
import { Icon } from 'ui/common/icon'

// bars, max 16
// zoom = min 1 - max 8 bars
    // scroll horizontally to view more
// barwidth = pageWidth / zoom
// svgWidth = bars * barwidth
const ZOOM_MAX = 8
const ZOOM_MIN = 1

export class Pattern extends React.Component {
    constructor(props) {
        super(props)
        this.onScroll = this.onScroll.bind(this)
        this.lockscroll = '__lock_scroll__'
        this.state = { zoom: props.pattern.bars }
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
        let zoom = this.state.zoom

        if(event.deltaY < 0) { // up
            if(this.state.zoom < ZOOM_MAX) {
                zoom++
            }
        } else { // down
            if(this.state.zoom > ZOOM_MIN) {
                zoom--
            }
        }

        this.setState({ zoom })
        event.preventDefault()

        console.log('zoom', zoom)
    }
    render() {
        const { pattern: { bars, notes }, style } = this.props

        return (
            <div className='pattern' style={style} onWheel={this.onWheel}>
                <div className='pattern-header'>
                    <PatternControl tool='select' />
                    <Bars bars={bars} />
                </div>
                <div className='pattern-content'>
                    <div className='left keys dragscroll' ref={l => this.left = l} onScroll={this.onScroll}>
                        <PatternKeys />
                    </div>
                    <div className='right dragscroll' ref={r => this.right = r} onScroll={this.onScroll}>
                        <Grid
                            bars={bars}
                            notes={notes}
                            zoom={this.state.zoom} />
                    </div>
                </div>
                <div className='pattern-footer'>
                    <div className='foot-switch' />
                    <Modulation
                        bars={bars}
                        notes={notes}
                        zoom={this.state.zoom} />
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

// 33  = note height + border
// 101 = note width + border
const NOTESIZE = 33
const BARSIZE = 455
const QUNSIZE = BARSIZE / 4
const SXNSIZE = BARSIZE / 16
const MAX_HEIGHT = notes.length * octaves.length * NOTESIZE
const MAX_WIDTH = 1920 - 101

const getNoteOffset = (time) => {
    return time.bar*BARSIZE + time.n4*QUNSIZE + time.n16*SXNSIZE
}
const parseTransportTime = (time) => {
    const [bar, n4, n16] = time.split(':')
    return {
        bar: parseInt(bar, 10),
        n4 : parseInt(n4, 10),
        n16: parseFloat(n16),
    }
}
const getNoteProps = ({ n, o, v, on, off }) => {
    const x = getNoteOffset(parseTransportTime(on))
    const w = getNoteOffset(parseTransportTime(off)) - x
    const y = notes.indexOf(n) * octaves.indexOf(o) * NOTESIZE

    return { x, y, w, v }
}
const getNoteVelocityProps = ({ n, o, v, on, off }, h) => {
    // TODO remove redundancy
    const x = getNoteOffset(parseTransportTime(on))
    const w = getNoteOffset(parseTransportTime(off)) - x
    const y = h - v * h

    return { x, y, w, v }
}

class Grid extends React.Component {
    render() {
        const { bars, notes } = this.props
        const x = BARSIZE/8
        const y = NOTESIZE

        return (
            <svg className='grid' height={MAX_HEIGHT} width={MAX_WIDTH} shapeRendering='crispEdges'>
                {
                    [...Array(bars*4).keys()].map(bar =>
                        <BarLine key={bar} bar={bar} bars={bars} />)
                }
                {
                    [...Array(bars*16).keys()].map(bar =>
                        <BarSubLine key={bar} bar={bar} bars={bars} />)
                }
                {
                    [...Array(120).keys()].map(bar =>
                        <BarCrossLine key={bar} bar={bar} />)
                }
                {
                    notes.map((note, index) => <NoteBox key={index} {...getNoteProps(note)} />)
                }
            </svg>
        )
    }
}
// bar lines
const BarLine = ({bar, bars}) => {
    const x = BARSIZE / bars * (bar + 1)
    return <line className='bar-line' x1={x} y1={0} x2={x} y2={MAX_HEIGHT} />
}
const BarSubLine = ({bar, bars}) => {
    const x = (BARSIZE / bars / 4) * (bar + 1)
    return <line className='bar-sub-line' x1={x} y1={0} x2={x} y2={MAX_HEIGHT} />
}
const BarCrossLine = ({bar}) => {
    const y = NOTESIZE * (bar + 1)
    return <line className='bar-cross-line' x1={0} y1={y} x2={MAX_WIDTH} y2={y} />
}

// note boxes
const NOTE_OFFSET = 2
const NOTE_HEIGHT = 30
const NoteBox = ({x, y, w, v}) => {
    return (
        <React.Fragment>
            <rect className='midi-note'   x={x} y={y+NOTE_OFFSET} width={w} height={NOTE_HEIGHT} />
            <rect className='midi-note-v' x={x} y={y+NOTE_OFFSET} width={w} height={NOTE_HEIGHT*(1-v)} />
        </React.Fragment>
    )
}

class Modulation extends React.Component {
    render() {
        const { bars, notes } = this.props
        const h = 50

        return (
            <svg className='modulation' height={h} width={MAX_WIDTH} shapeRendering='crispEdges'>
                {
                    [...Array(bars*4).keys()].map(bar =>
                        <BarLine key={bar} bar={bar} bars={bars} />)
                }
                {
                    notes.map((note, index) =>
                        <NoteVelocityBar key={index} h={h} {...getNoteVelocityProps(note, h)} />)
                }
            </svg>
        )
    }
}

const NoteVelocityBar = ({ x, y, h }) => {
    return (
        <React.Fragment>
            <line className='note-vel-line' x1={x} y1={y} x2={x} y2={h} />
            <circle className='note-vel-circle' cx={x} cy={y} r={4} shapeRendering='auto' />
        </React.Fragment>
    );
}
