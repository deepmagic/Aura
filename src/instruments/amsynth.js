import Tone from 'tone'
import { Keyboard } from './keyboard'

export const AMSynth = () => {
    const chorus = new Tone.Chorus(4, 2.5, 0.5)
    const filter = new Tone.Filter(200, 'lowpass', -24)
    const instrument = new Tone.PolySynth(6, Tone.AMSynth).chain(filter, chorus)
    instrument.set({oscillator: {type: 'sawtooth'}})

    return Keyboard(instrument)
}
