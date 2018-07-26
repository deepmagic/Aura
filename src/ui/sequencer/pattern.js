import React from 'react'
import { PatternControl } from 'ui/sequencer/pattern-control'
import { NOTES, OCTAVES } from 'ui/constants'

// bars, max 16
// barsize = screenWidth / zoom
// zoom = min 1 - max 8 bars
    // scroll horizontally to view more
// barwidth = pageWidth / zoom
// svgWidth = bars * barwidth

// 33  = note height + border
// 101 = note width + border
const numkeys = OCTAVES.length * NOTES.length
const NOTEHEIGHT = 33
const MAX_HEIGHT = NOTES.length * OCTAVES.length * NOTEHEIGHT
const SCREENWIDTH = 1920 - 100
const ZOOM_MAX = 8
const ZOOM_MIN = 1
const BEATS = 4
const TIMESIG = 4

export class Pattern extends React.PureComponent {
    constructor(props) {
        super(props)
        this.onScroll = this.onScroll.bind(this)
        this.lockscroll = '__lock_scroll__'
        this.state = {
            offsetLeft: 0,
            zoom: Math.min(this.props.pattern.bars, ZOOM_MAX)
        }
    }

    componentDidUpdate (prevProps) {
        // this likely won't work correctly in the long run
        if (prevProps.pattern !== this.props.pattern) {
            this.setState({
                offsetLeft: 0,
                zoom: Math.min(this.props.pattern.bars, ZOOM_MAX)
            })
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
            this.modulation.scrollLeft = event.target.scrollLeft
            this.subbars.scrollLeft = event.target.scrollLeft
            this.lockScroll(this.left, this.modulation, this.subbars)
        } else if (event.target === this.modulation && !this.modulation[this.lockscroll]) {
            this.right.scrollLeft = event.target.scrollLeft
            this.subbars.scrollLeft = event.target.scrollLeft
            this.lockScroll(this.right, this.subbars)
        }

        this.setState({offsetLeft: this.right.scrollLeft})
    }
    onWheel = (event) => {
        const zoom = this.state.zoom + (event.deltaY < 0 ? -1 : 1)

        if ((zoom >= ZOOM_MIN) &&
            (zoom <= Math.min(this.props.pattern.bars, ZOOM_MAX))) {
            this.setState({ zoom })
        }

        event.preventDefault()
    }

    // TODO mouseDown, mouseUp - draw notes via drag
    gridClick = (event) => {
        /// Y
        const noteIndex  = Math.floor(event.nativeEvent.offsetY / NOTEHEIGHT)
        const noteOctave = Math.floor(noteIndex / OCTAVES.length)
        const noteKey    = Math.floor(noteIndex % OCTAVES.length)

        console.log('note', `${NOTES[noteKey]}${OCTAVES[noteOctave] - 1}`)

        /// X
        const { pattern: { bars } } = this.props
        const barsize = SCREENWIDTH / this.state.zoom
        const bar = Math.floor(event.nativeEvent.offsetX / barsize)

        const barOffset = Math.floor(event.nativeEvent.offsetX % barsize) / barsize
        const beat = Math.floor(barOffset * BEATS)

        const beatOffset = barOffset  * BEATS % BEATS - beat
        const sixteenths = beatOffset * BEATS

        console.log('bar', bar, 'beat', beat, 'sixteenths', sixteenths)
    }

    render() {
        const { pattern: { bars, notes }, style } = this.props
        const barsize = SCREENWIDTH / this.state.zoom
        const width = barsize * bars
        const rangeStyle = {
            transform: `translateX(${this.state.offsetLeft * this.state.zoom / bars}px)`,
            width: SCREENWIDTH / bars * this.state.zoom
        }

        return (
            <div className='pattern' style={style} onWheel={this.onWheel}>
                <div className='pattern-header'>
                    <PatternControl />
                    <div className='bars'>
                        <div className='bar-row'>
                            <div className='bar-range' style={rangeStyle} />
                            {
                                [...Array(bars).keys()].map(bar =>
                                    <Bar key={bar} bar={bar} />)
                            }
                        </div>
                        <div className='spacer' />
                        <div className='sub-bars-con' ref={sb => this.subbars = sb} onScroll={this.onScroll}>
                            <div className='sub-bars' style={{ width: width }}>
                                {
                                    [...Array(bars).keys()].map(bar =>
                                        [...Array(TIMESIG).keys()].map(sub =>
                                            <SubBar key={sub+bar} sub={sub} bar={bar} />))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pattern-content'>
                    <div className='left keys dragscroll' ref={l => this.left = l} onScroll={this.onScroll}>
                        <PatternKeys />
                    </div>
                    <div className='right dragscroll' ref={r => this.right = r} onScroll={this.onScroll} onClick={this.gridClick}>
                        <Grid
                            width={width}
                            height={MAX_HEIGHT}
                            bars={bars}
                            barsize={barsize}
                            notes={notes} />
                    </div>
                </div>
                <div className='pattern-footer'>
                    <div className='foot-switch' />
                    <div className='footer-right dragscroll' ref={m => this.modulation = m} onScroll={this.onScroll}>
                        <Modulation
                            width={width}
                            height={50}
                            bars={bars}
                            barsize={barsize}
                            notes={notes} />
                    </div>
                </div>
            </div>
        )
    }
}

// TODO split this out, remove redundancy
const Bar = ({bar}) =>
    <div className='bar'>{`${bar + 1} Bar`}</div>
const SubBar = ({sub, bar}) =>
    <div className='sub-bar'>{`${bar+1}.${sub+1}`}</div>
const PatternKeys = () => {
    return (
        OCTAVES.map((octave, o) =>
            NOTES.map((note, n) =>
                <Note key={o+n} note={note} octave={octave - 1} />
            )
        )
    )
}
const Note = ({note, octave}) =>
    <div className={`note${note.length === 2 ? ' sharp' : ''}`}>
        {`${note}${octave}`}
    </div>

const getNoteOffset = (time, barsize) =>
    time.bar*barsize + time.n4*(barsize/4) + time.n16*(barsize/16)
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
    const y = NOTES.indexOf(n) * OCTAVES.indexOf(o) * NOTEHEIGHT

    return { x, y, w, v }
}
const getNoteVelocityProps = ({ n, o, v, on, off }, height, barsize) => {
    // TODO remove redundancy
    const x = getNoteOffset(parseTransportTime(on), barsize)
    const w = getNoteOffset(parseTransportTime(off), barsize) - x
    const y = height - v * height

    return { x, y, w, v }
}

class Grid extends React.PureComponent {
    render() {
        const { bars, notes, barsize, width, height } = this.props

        return (
            <svg className='grid' width={width} height={height} shapeRendering='crispEdges'>
                {
                    [...Array(bars*TIMESIG).keys()].map(bar =>
                        <BarLine
                            key={bar}
                            bar={bar}
                            barsize={barsize} />)
                }
                {
                    [...Array(bars*bars*BEATS).keys()].map(bar =>
                        <BarSubLine
                            key={bar}
                            bar={bar}
                            barsize={barsize} />)
                }
                {
                    [...Array(numkeys).keys()].map(bar =>
                        <BarHorizontalLine
                            key={bar}
                            bar={bar}
                            noteheight={NOTEHEIGHT}
                            width={width} />)
                }
                {
                    notes.map((note, index) =>
                        <NoteBox
                            key={index}
                            {...getNoteProps(note, barsize)} />)
                }
            </svg>
        )
    }
}
// bar lines
const BarLine = ({bar, barsize}) => {
    const x = barsize / TIMESIG * (bar + 1)
    return <line className='bar-line' x1={x} y1={0} x2={x} y2={MAX_HEIGHT} />
}
const BarSubLine = ({bar, barsize}) => {
    const x = (barsize / TIMESIG / BEATS) * (bar + 1)
    return <line className='bar-sub-line' x1={x} y1={0} x2={x} y2={MAX_HEIGHT} />
}
const BarHorizontalLine = ({bar, noteheight, width}) => {
    const y = noteheight * (bar + 1)
    return <line className='bar-horizontal-line' x1={0} y1={y} x2={width} y2={y} />
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

class Modulation extends React.PureComponent {
    render() {
        const { bars, notes, barsize, width, height } = this.props

        return (
            <svg className='modulation' width={width} height={height} shapeRendering='crispEdges'>
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
