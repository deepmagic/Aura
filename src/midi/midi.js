import React from 'react'
import WebMidi from 'webmidi'

const MidiDevice = ({ device, onClick, selected }) => {
    // - {device.state} - {device.type} - {device.connection} - {device.manufacturer}
    return (
        <div className='midi-device' onClick={onClick}>
            {selected && <span> > </span>}
            {device.name}
        </div>
    )
}

// const clampFloat = (low, high, value) =>
//    Math.max(high * (value/127), low)

// const clampInt = (low, high, value) =>
//    Math.round(clampFloat(low, high, value))

export class MidiView extends React.Component {
    constructor() {
        super()
        this.state = {
            midi: null,
            input: null,
        }
    }

    componentDidMount() {
        this.getMidi()
    }

    getMidi () {
        WebMidi.enable((err) => {
            if (err) {
                console.log("WebMidi could not be enabled.", err)
            } else {
                this.setState({midi: WebMidi})
                this.selectInput( WebMidi.getInputById(window.localStorage['lastMidi']) )
            }
        })
    }

    onClock = (event) => {
        if (this.lastTimestamp) {
            const deltaTime = event.timestamp - this.lastTimestamp
            console.log('bpm', (1000 / deltaTime / 24) * 60 )
        }

        this.lastTimestamp = event.timestamp

    }

    selectInput = (input) => {
        if (!input) return

        const { midiNoteOn, midiNoteOff, midiCtrlChange } = this.props
        input.addListener('noteon', 'all', midiNoteOn)
        input.addListener('noteoff', 'all', midiNoteOff)
        input.addListener('controlchange', 'all', midiCtrlChange)
        // input.addListener('clock', 'all', this.onClock)
        this.setState({input})
        window.localStorage['lastMidi'] = input.id
    }

    renderInputs() {
        return this.state.midi.inputs.map((input, index) =>
            <MidiDevice
                selected={input === this.state.input}
                key={index}
                device={input}
                onClick={this.selectInput.bind(this, input)} />
        )
    }

    render() {
        return (
            <div className='midi'>
                <h4>Midi</h4>
                { this.state.midi
                    ?
                    <React.Fragment>
                        <h5>Inputs</h5>
                        <div className='inputs'>
                            {this.renderInputs()}
                        </div>

                        <h5>Outputs</h5>
                        <div className='outputs'>

                        </div>
                    </React.Fragment>
                    :
                    <div>Disconnected  ... </div>
                }
            </div>
        )
    }
}

import { connect } from 'react-redux'
import { midiNoteOn, midiNoteOff, midiCtrlChange } from 'actions/midi'
export const Midi = connect(
    null,
    {
        midiNoteOn,
        midiNoteOff,
        midiCtrlChange,
    }
)(MidiView)
