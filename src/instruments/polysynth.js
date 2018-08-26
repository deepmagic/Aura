import Tone from 'tone'
import { Keyboard } from './keyboard'

export const PolySynth = () => {
    const instrument = new Tone.PolySynth(6, Tone.AMSynth)
    instrument.set({oscillator: {partials : [0, 2, 3, 4]}})

    return Keyboard(instrument)
}
