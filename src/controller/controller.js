import Tone from 'tone'
import { getInstrument } from 'instruments'
import { Midi } from './midi'
import { Tracks } from './tracks'
import { Transport } from './transport'

window.__debug_tone = Tone

const readNotes = (notes) => notes.map((note) => ({ ...note, time: note.on }))
const getTrackId = (id) => id.split(':')[1]

export const Controller = () => {
    const instruments = {}  // references to Tone.Synth, Tone.Sampler, etc
    const loops = {}        // references to Tone.Part
    const loopNotes = {}    // maintain refernce to note values in loops, required for Part.remove
    const tracks = new Tracks()       // references to Track = volume, pan, solo, meter, etc

    window.__debug_instruments = instruments
    // window.__debug_loopnotes = loopNotes
    window.__debug_tracks = tracks

    const instrumentAdd = (action) => {
        instruments[action.trackid] = getInstrument(action.instrument.id)
        tracks.add(action.trackid, instruments[action.trackid].instrument)
    }

    const loopAdd = (action) => {
        const loopIds = Object.keys(action.loops)
        for (let i = 0; i < loopIds.length; i++) {
            const loopId = loopIds[i]
            const trackId = getTrackId(loopIds[i])

            loopNotes[loopId] = readNotes(action.loops[loopId].notes)
            loops[loopId] = new Tone.Part(instruments[trackId].play, loopNotes[loopId])
            loops[loopId].start(0)
        }
    }

    const loopAddNote = (action) => {
        const noteValue = { ...action.note, time: action.note.on }
        loopNotes[action.loopid].push(noteValue)
        loops[action.loopid].add(action.note.on, noteValue)
    }

    const loopDelNote = (action) => {
        const noteValue = loopNotes[action.loopid].splice(action.index, 1)[0]
        loops[action.loopid].remove(noteValue.on, noteValue)
    }

    // added above in instrumentAdd
    const trackAdd = () => {}

    // unused
    const trackDel = (action) => {
        tracks.del(action.trackid)
    }

    return {
        instrumentAdd,
        loopAdd,
        loopAddNote,
        loopDelNote,
        trackAdd,
        trackDel,
        ...Midi(instruments),
        ...tracks.actions,
        ...Transport(tracks), // not sure this is a good idea, used for track levels loop
    }
}
