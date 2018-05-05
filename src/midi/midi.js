import React from 'react'
import WebMidi from 'webmidi';

// TEMP
import Tone from 'tone'
const fmSynth = new Tone.PolySynth(6, Tone.DuoSynth).toMaster();
// const fmSynth = new Tone.FMSynth().toMaster()

const MidiDevice = ({ device, onClick, selected }) => {
    // - {device.state} - {device.type} - {device.connection} - {device.manufacturer}
    return (
        <div className='midi-device' onClick={onClick}>
            {selected && <span> > </span>}
            {device.name}
        </div>
    )
}

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
            }
        })
    }

    noteon (msg) {
        console.log('noteon', msg)
        fmSynth.triggerAttack(`${msg.note.name}${msg.note.octave}`, undefined, msg.velocity);
    }
    noteoff (msg) {
        console.log('noteoff', msg)
        fmSynth.triggerRelease(`${msg.note.name}${msg.note.octave}`);
    }
    controlchange (msg) {
        console.log('controlchange', msg)
    }

    selectInput(input) {
        console.log('input', input);
        input.addListener('noteon', 'all', this.noteon)
        input.addListener('noteoff', 'all', this.noteoff)
        input.addListener('controlchange', 'all', this.controlchange)
        this.setState({input})
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
