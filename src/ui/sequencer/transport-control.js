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
            </div>
        )
    }
}

const fmSynth = new Tone.PolySynth(6, Tone.AMSynth).toMaster()
fmSynth.set({oscillator: {type: 'sawtooth'}})

function loopCallback(time) {
	console.log("loop", time, Tone.Transport.position, Tone.Transport.progress)
    fmSynth.triggerAttackRelease('C2','16n', time);
}

// Tone.Transport.bpm.value = 120
Tone.Transport.setLoopPoints(0, '4m')
Tone.Transport.loop = true

var loop = new Tone.Loop(loopCallback, '1m')
loop.start(0)
