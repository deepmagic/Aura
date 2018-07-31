import React from 'react'
import { Icon } from 'ui/common/icon'
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
