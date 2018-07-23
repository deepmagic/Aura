import React from 'react'
import WebMidi from 'webmidi'

// TEMP
import Tone from 'tone'
const chorus = new Tone.Chorus(4, 2.5, 0.5).toMaster()
const filter = new Tone.Filter(200, 'lowpass', -24).toMaster()
const fmSynth = new Tone.PolySynth(6, Tone.AMSynth).chain(filter, chorus)
fmSynth.set({oscillator: {type: 'sawtooth'}})

const MidiDevice = ({ device, onClick, selected }) => {
    // - {device.state} - {device.type} - {device.connection} - {device.manufacturer}
    return (
        <div className='midi-device' onClick={onClick}>
            {selected && <span> > </span>}
            {device.name}
        </div>
    )
}

const clampFloat = (low, high, value) =>
    Math.max(high * (value/127), low)

const clampInt = (low, high, value) =>
    Math.round(clampFloat(low, high, value))

export class Midi extends React.Component {
    constructor() {
        super()
        this.state = {
            midi: null,
            input: null,
        }

        this.noteon = this.noteon.bind(this)
        this.noteoff = this.noteoff.bind(this)
    }

    componentDidMount() {
        this.getMidi();
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

    noteon (msg) {
        console.log('noteon', msg.note.name, msg.note.octave, Tone.Transport.position)
        fmSynth.triggerAttack(`${msg.note.name}${msg.note.octave}`, undefined, msg.velocity);
    }
    noteoff (msg) {
        console.log('noteoff', msg)
        fmSynth.triggerRelease(`${msg.note.name}${msg.note.octave}`);
    }
    controlchange (msg) {
        //console.log('controlchange', msg)
        if (msg.controller.number === 20) {
            fmSynth.set({harmonicity: msg.value})
        }

        if (msg.controller.number === 21) {
            filter.frequency.value = clampFloat(20, 12000, msg.value)
            // console.log('filter', filter.frequency.value, msg.value)
        }
        if (msg.controller.number === 22) {
            filter.Q.value = clampFloat(0, 120, msg.value)
        }
    }

    selectInput(input) {
        if (!input) return

        input.addListener('noteon', 'all', this.noteon)
        input.addListener('noteoff', 'all', this.noteoff)
        input.addListener('controlchange', 'all', this.controlchange)
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

                { this.state.midi ?
                    <React.Fragment>
                        <h5>Inputs</h5>
                        <div className='inputs'>
                            {this.renderInputs()}
                        </div>

                        <h5>Outputs</h5>
                        <div className='outputs'>

                        </div>
                    </React.Fragment> :
                    <div>Disconnected  ... </div>
                }
            </div>
        )
    }
}
