import Tone from 'tone'
import { getInstrument } from 'instruments'
import { Loops } from './loops'
import { Midi } from './midi'
import { Tracks } from './tracks'
import { Transport } from './transport'

window.__debug_tone = Tone

export const Controller = () => {
    const instruments = {}      // references to Tone.Synth, Tone.Sampler, etc
    const tracks = new Tracks() // references to Track = volume, pan, solo, meter, etc

    // window.__debug_instruments = instruments
    // window.__debug_tracks = tracks

    const instrumentAdd = (action) => {
        instruments[action.trackid] = getInstrument(action.instrument.id)
        tracks.add(action.trackid, instruments[action.trackid].instrument)
    }

    // added above in instrumentAdd
    const trackAdd = () => {}

    // unused
    const trackDel = (action) => {
        tracks.del(action.trackid)
    }

    return {
        instrumentAdd,
        trackAdd,
        trackDel,
        ...Loops(instruments).actions,
        ...Midi(instruments),
        ...tracks.actions,
        ...Transport(tracks), // not sure this is a good idea, used for track levels loop
    }
}
