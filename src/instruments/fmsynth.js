import Tone from 'tone'
import { Keyboard } from './keyboard'

export const FMSynth = () => {
    return Keyboard(new Tone.PolySynth(16, Tone.FMSynth))
}
