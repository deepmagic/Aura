import React from 'react'
import { PatternControl } from 'ui/sequencer/pattern-control'
import { NOTES, OCTAVES, NOTE_HEIGHT, MAX_HEIGHT } from 'ui/sequencer/constants'
import { BarLine, BarSubLine, BarHorizontalLine } from 'ui/sequencer/pattern-bars'
import { getNoteProps, getNoteVelocityProps } from 'ui/sequencer/utils'
import { PatternGrid } from 'ui/sequencer/pattern-grid'
import { PatternModulation } from 'ui/sequencer/pattern-modulation'
import { Note, NoteBox } from 'ui/sequencer/pattern-notes'

// on/off time bar:beat:sixteenths
// https://tonejs.github.io/docs/r12/Type#barsbeatssixteenths

const ZOOM_MAX = 8
const ZOOM_MIN = 1

// input constants
const SCREEN_WIDTH = 1920 - 100
// TODO remove one of these
const BEATS = 4
const TIMESIG = 4

const Bar = ({bar}) =>
    <div className='bar'>{`${bar + 1} Bar`}</div>

const SubBar = ({sub, bar}) =>
    <div className='sub-bar'>{`${bar+1}.${sub+1}`}</div>

const PatternKeys = () =>
    OCTAVES.map((octave, o) =>
        NOTES.map((note, n) =>
            <Note key={o+n} note={note} octave={octave - 1} />
        )
    )

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
        const noteIndex  = Math.floor(event.nativeEvent.offsetY / NOTE_HEIGHT)
        const noteOctave = Math.floor(noteIndex / OCTAVES.length)
        const noteKey    = Math.floor(noteIndex % OCTAVES.length)

        /// X
        const { pattern: { bars } } = this.props
        const barsize = SCREEN_WIDTH / this.state.zoom
        const bar = Math.floor(event.nativeEvent.offsetX / barsize)

        const barOffset = Math.floor(event.nativeEvent.offsetX % barsize) / barsize
        const beat = Math.floor(barOffset * BEATS)

        const beatOffset = barOffset  * BEATS % BEATS - beat
        const sixteenths = (beatOffset * BEATS).toPrecision(3)

        console.log(`${NOTES[noteKey]}${OCTAVES[noteOctave] - 1} @ ${bar}:${beat}:${sixteenths}`)
    }

    render() {
        const { pattern: { bars, notes }, style } = this.props
        const barsize = SCREEN_WIDTH / this.state.zoom
        const width = barsize * bars
        const rangeStyle = {
            transform: `translateX(${this.state.offsetLeft * this.state.zoom / bars}px)`,
            width: SCREEN_WIDTH / bars * this.state.zoom
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
                        <PatternGrid
                            width={width}
                            height={MAX_HEIGHT}
                            bars={bars}
                            barsize={barsize}
                            notes={notes}
                            timesig={TIMESIG}
                            beats={BEATS} />
                    </div>
                </div>
                <div className='pattern-footer'>
                    <div className='foot-switch' />
                    <div className='footer-right dragscroll' ref={m => this.modulation = m} onScroll={this.onScroll}>
                        <PatternModulation
                            width={width}
                            height={50}
                            bars={bars}
                            barsize={barsize}
                            notes={notes}
                            timesig={TIMESIG}
                            beats={BEATS} />
                    </div>
                </div>
            </div>
        )
    }
}
