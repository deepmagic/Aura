import React from 'react'
import { Icon } from 'ui/common/icon'

// bars, max 16
// barsize = screenWidth / zoom
// zoom = min 1 - max 8 bars
    // scroll horizontally to view more
// barwidth = pageWidth / zoom
// svgWidth = bars * barwidth

// 33  = note height + border
// 101 = note width + border
const notes = ["A#", "A", "G#", "G", "F#", "F", "E", "D#", "D", "C#", "C"]
const octaves = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
const NOTEHEIGHT = 33
const BARSIZE = 455
const QUNSIZE = BARSIZE / 4
const SXNSIZE = BARSIZE / 16
const MAX_HEIGHT = notes.length * octaves.length * NOTEHEIGHT
const MAX_WIDTH = 1920 - 101
const SCREENWIDTH = 1920 - 101
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

        if(event.deltaY < 0) { // down
            if(this.state.zoom > ZOOM_MIN) {
                zoom--
            }
        } else { // up
            if(this.state.zoom < Math.min(this.props.pattern.bars, ZOOM_MAX)) {
                zoom++
            }
        }

        this.setState({ zoom })
        event.preventDefault()

        console.log('zoom', zoom)
    }
    render() {
        const { pattern: { bars, notes }, style } = this.props
        const barsize = SCREENWIDTH / this.state.zoom
        const width = barsize * bars

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
                            width={width}
                            height={MAX_HEIGHT}
                            bars={bars}
                            barsize={barsize}
                            notes={notes}
                            zoom={this.state.zoom} />
                    </div>
                </div>
                <div className='pattern-footer'>
                    <div className='foot-switch' />
                    <Modulation
                        bars={bars}
                        barsize={barsize}
                        height={50}
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

const getNoteOffset = (time, barsize) => {
    return time.bar*barsize + time.n4*(barsize/4) + time.n16*(barsize/16)
}
const parseTransportTime = (time) => {
    const [bar, n4, n16] = time.split(':')
    return {
        bar: parseInt(bar, 10),
        n4 : parseInt (n4, 10),
        n16: parseFloat(n16),
    }
}
const getNoteProps = ({ n, o, v, on, off }, barsize) => {
    const x = getNoteOffset(parseTransportTime(on), barsize)
    const w = getNoteOffset(parseTransportTime(off), barsize) - x
    const y = notes.indexOf(n) * octaves.indexOf(o) * NOTEHEIGHT

    return { x, y, w, v }
}
const getNoteVelocityProps = ({ n, o, v, on, off }, height, barsize) => {
    // TODO remove redundancy
    const x = getNoteOffset(parseTransportTime(on), barsize)
    const w = getNoteOffset(parseTransportTime(off), barsize) - x
    const y = height - v * height

    return { x, y, w, v }
}

class Grid extends React.Component {
    render() {
        const { bars, notes, barsize, width, height } = this.props

        return (
            <svg className='grid' width={width} height={height} shapeRendering='crispEdges'>
                {
                    [...Array(bars*bars).keys()].map(bar =>
                        <BarLine key={bar} bar={bar} bars={bars} barsize={barsize} />)
                }
                {
                    [...Array(bars*bars*16).keys()].map(bar =>
                        <BarSubLine key={bar} bar={bar} bars={bars} barsize={barsize} />)
                }
                {
                    [...Array(120).keys()].map(bar =>
                        <BarCrossLine key={bar} bar={bar} noteheight={NOTEHEIGHT} width={width} />)
                }
                {
                    notes.map((note, index) =>
                        <NoteBox key={index} {...getNoteProps(note, barsize)} />)
                }
            </svg>
        )
    }
}
// bar lines
const BarLine = ({bar, bars, barsize}) => {
    const x = barsize / bars * (bar + 1)
    return <line className='bar-line' x1={x} y1={0} x2={x} y2={MAX_HEIGHT} />
}
const BarSubLine = ({bar, bars, barsize}) => {
    const x = (barsize / bars / 4) * (bar + 1)
    return <line className='bar-sub-line' x1={x} y1={0} x2={x} y2={MAX_HEIGHT} />
}
const BarCrossLine = ({bar, noteheight, width}) => {
    const y = noteheight * (bar + 1)
    return <line className='bar-cross-line' x1={0} y1={y} x2={width} y2={y} />
}

// note boxes
const NOTEOFFSET = 2
const BOXHEIGHT = NOTEHEIGHT - 3
const NoteBox = ({x, y, w, v}) => {
    return (
        <React.Fragment>
            <rect className='midi-note'   x={x} y={y+NOTEOFFSET} width={w} height={BOXHEIGHT} />
            <rect className='midi-note-v' x={x} y={y+NOTEOFFSET} width={w} height={BOXHEIGHT*(1-v)} />
        </React.Fragment>
    )
}

class Modulation extends React.Component {
    render() {
        const { bars, notes, barsize, height } = this.props

        return (
            <svg className='modulation' height={height} width={SCREENWIDTH} shapeRendering='crispEdges'>
                {
                    [...Array(bars*bars*4).keys()].map(bar =>
                        <BarLine key={bar} bar={bar} bars={bars} barsize={barsize} />)
                }
                {
                    notes.map((note, index) =>
                        <NoteVelocityBar key={index} height={height} {...getNoteVelocityProps(note, height, barsize)} />)
                }
            </svg>
        )
    }
}
const NoteVelocityBar = ({ x, y, height }) => {
    return (
        <React.Fragment>
            <line className='note-vel-line' x1={x} y1={y} x2={x} y2={height} />
            <circle className='note-vel-circle' cx={x} cy={y} r={4} shapeRendering='auto' />
        </React.Fragment>
    );
}
