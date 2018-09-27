import React from 'react'
import { NOTES, OCTAVES, NOTE_HEIGHT, MAX_HEIGHT } from 'ui/sequencer/constants'
import { Note } from 'ui/sequencer/pattern-notes'
import { PatternControl } from 'ui/sequencer/pattern-control'
import { PatternGrid } from 'ui/sequencer/pattern-grid'
import { PatternModulation } from 'ui/sequencer/pattern-modulation'
// import cssColors from 'styles/colors.scss'
import cssConstants from 'styles/constants.scss'

// on/off time bar:beat:sixteenths
// https://tonejs.github.io/docs/r12/Type#barsbeatssixteenths

const ZOOM_MIN = 1
const ZOOM_MAX = 8

// input constants TODO get 1920 screen width on browswer resize event
const SCREEN_WIDTH = 1920 - cssConstants.leftkeyswidth

class Bar extends React.PureComponent {
    render () {
        const { bar } = this.props
        return <div className='bar'>{`${bar + 1} Bar`}</div>
    }
}

class SubBar extends React.PureComponent {
    render () {
        const {sub, bar} = this.props
        return <div className='sub-bar'>{`${bar+1}.${sub+1}`}</div>
    }
}

class PatternKeys extends React.PureComponent {
    render () {
        return (
            OCTAVES.map((octave, o) =>
                NOTES.map((note, n) =>
                    <Note key={o+n} note={note} octave={octave - 1} />))
        )
    }
}

const PatternPlayhead = ({x, active}) =>
    <div
        className={`playhead ${active ? 'active' : ''}`}
        style={{ transform: `translateX(${x}px)`, height: MAX_HEIGHT }} />

class PatternView extends React.Component {
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
        if (prevProps.loopid !== this.props.loopid) {
            this.setState({
                offsetLeft: 0,
                zoom: Math.min(this.props.pattern.bars, ZOOM_MAX)
            })
        }
    }
    shouldComponentUpdate (nextProps) {
        return nextProps.ui.songpattern || this.props.ui.songpattern
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

    getNoteAtPoint = (x, y) => {
        const barsize = SCREEN_WIDTH / this.state.zoom
        const {
            timesig,
        } = this.props

        /// Y
        const noteIndex  = Math.floor(y / NOTE_HEIGHT)
        const octave = Math.floor(noteIndex / NOTES.length)
        const note   = Math.floor(noteIndex % NOTES.length)

        /// X
        const bar = Math.floor(x / barsize)

        const barOffset = Math.floor(x % barsize) / barsize
        const beat = Math.floor(barOffset * timesig)

        const beatOffset =  barOffset  * timesig % timesig - beat
        const sixteenths = (beatOffset * timesig)

        return {
            note: NOTES[note],
            octave: OCTAVES[octave],
            bar,
            beat,
            sixteenths,
        }
    }

    onNoteClick = (event, noteIndex) => {
        console.log('note clicked', noteIndex, this.props.loopActive)

        this.props.loopDelNote(this.props.loopActive, noteIndex)
        event.stopPropagation()
    }

    // TODO mouseDown, mouseUp - draw notes via drag
    gridClick = (event) => {
        const { offsetX, offsetY } = event.nativeEvent
        const note = this.getNoteAtPoint(offsetX, offsetY)

        console.log(`${note.note}${note.octave - 1} @ ${note.bar}:${note.beat}:${note.sixteenths}`)

        const {
            loopActive,
            loopAddNote,
        } = this.props

        loopAddNote(loopActive, {
            n: note.note,
            o: note.octave,
            v: 0.8,
            on:  `${note.bar}:${note.beat}:${note.sixteenths}`,
            off: `${note.bar}:${note.beat}:${note.sixteenths + 2.0}`
        })
    }

    render() {
        const {
            pattern: {
                bars,
                notes
            },
            style,
            timesig,
            transport,
            transportTime,
            transportLoopLength,
        } = this.props

        const barsize = SCREEN_WIDTH / this.state.zoom
        const width = barsize * bars
        const rangeStyle = {
            transform: `translateX(${this.state.offsetLeft * this.state.zoom / bars}px)`,
            width: SCREEN_WIDTH / bars * this.state.zoom
        }

        const playTime = width * transportTime
        const relativePlayTime = playTime / (bars / transportLoopLength) % width

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
                                        [...Array(timesig).keys()].map(sub =>
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
                    <div className='right' ref={r => this.right = r} onScroll={this.onScroll} onClick={this.gridClick}>
                        <PatternPlayhead
                            x={relativePlayTime}
                            active={transport.playing} />
                        <PatternGrid
                            onClickNote={this.onNoteClick}
                            width={width}
                            height={MAX_HEIGHT}
                            bars={bars}
                            barsize={barsize}
                            notes={notes}
                            timesig={timesig} />
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
                            timesig={timesig} />
                    </div>
                </div>
            </div>
        )
    }
}

import { connect } from 'react-redux'
import { loopAddNote, loopDelNote } from 'actions/loops'
export const Pattern = connect(
    (state) => ({
        loopActive: state.loopActive,
        transport: state.transport,
        transportTime: state.transportTime,
        transportLoopLength: state.transport.loopLength,
        ui: state.ui,
    }),
    {
        loopAddNote,
        loopDelNote,
    }
)(PatternView)
