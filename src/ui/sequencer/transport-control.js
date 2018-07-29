import React from 'react'
import { Icon } from 'ui/common/icon'
// import { transportController } from 'controller/transport-controller'
import Tone from 'tone'

export class TransportControl extends React.Component {
    constructor() {
        super()

        this.state = {
            recording: false,
            playing: false,
            paused: false
        }
    }
    record = (toggle = true) => {
        let recording = this.state.recording

        if (!toggle || this.state.recording) {
            recording = false
        } else {
            recording = true
        }

        this.setState({recording})
    }
    stop = () => {
        Tone.Transport.stop()
        this.record(false)
        this.setState({playing: false, paused: false})
    }
    playpause = () => {
        let paused = this.state.paused
        let playing = this.state.playing

        if (!this.state.paused && Tone.Transport.ticks) {
            Tone.Transport.pause()
            paused = true
            playing = false
        } else {
            Tone.Transport.start()
            paused = false
            playing = true
        }

        this.setState({
            paused,
            playing
        })
    }
    render() {
        const { style } = this.props
        const playClass = this.state.playing
            ? 'active'
            : this.state.paused
            ? 'paused'
            : ''

        return (
            <div className='transport-control' style={style}>
                <button className='textbtn function'>
                    Function
                </button>

                <button
                    className={`record${this.state.recording ? ' active' : ''}`}
                    onClick={this.record}>
                    <Icon>fiber_manual_record</Icon>
                </button>

                <button onClick={this.stop}>
                    <Icon>stop</Icon>
                </button>

                <button
                    className={`play ${playClass}`}
                    onClick={this.playpause}>
                    <Icon>play_arrow</Icon>
                </button>

                <button>
                    <Icon>loop</Icon>
                </button>

                <button className='textbtn tempo'>
                    Tempo
                </button>

                <button className='textbtn quantize'>
                    Quantize
                </button>
            </div>
        )
    }
}

// per loop
const fmSynth = new Tone.PolySynth(6, Tone.AMSynth).toMaster()
fmSynth.set({oscillator: {type: 'sawtooth'}})

// global
Tone.Transport.bpm.value = 120
Tone.Transport.setLoopPoints(0, '1m')
Tone.Transport.loop = true

const patternNotes = [
    { n: 'C',  o: 3, v: 0.9, on: '0:0:0.0',  off: '0:0:1.0' },
    { n: 'E',  o: 3, v: 0.9, on: '0:0:2.0',  off: '0:0:3.0' },
    { n: 'G',  o: 3, v: 0.9, on: '0:0:4.0',  off: '0:0:5.0' },
    { n: 'B',  o: 3, v: 0.9, on: '0:0:6.0',  off: '0:0:7.0' },
    { n: 'C',  o: 4, v: 0.9, on: '0:0:8.0',  off: '0:0:9.0' },
    { n: 'B',  o: 3, v: 0.9, on: '0:0:10.0', off: '0:0:11.0' },
    { n: 'G',  o: 3, v: 0.9, on: '0:0:12.0', off: '0:0:13.0' },
    { n: 'E',  o: 3, v: 0.9, on: '0:0:14.0', off: '0:0:15.0' },
]

const pNotes = patternNotes.map((note) =>
    ({ ...note, time: note.on })
)

const part = new Tone.Part((time, note) => {
    console.log('part note', note, 'time', time, Tone.Transport.position, Tone.Transport.progress)

    const duration = Tone.TimeBase(note.off) - Tone.TimeBase(note.on)
    fmSynth.triggerAttackRelease(note.n+note.o, duration, time, note.v)

}, pNotes)
part.start(0)
