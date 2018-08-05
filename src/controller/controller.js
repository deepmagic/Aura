import Tone from 'tone'
import { Transport } from './transport'

const readNotes = (notes) => notes.map((note) => ({ ...note, time: note.on }))
const getTrackId = (id) => id.split(':')[1]

export const Controller = () => {
    const instruments = {}  // seferences to Tone.Synth, Tone.Sampler, etc
    const loops = {}        // references to Tone.Part
    const loopNotes = {}    // maintain refernce to note values in loops, required for Part.remove

    // window.__debug_instruments = instruments
    window.__debug_loopnotes = loopNotes

    const addInstrument = (action) => {
        console.log('add instrument', action)
        // TODO look up instrument and get right class
        instruments[action.instrumentid] = new Tone.PolySynth(6, Tone.AMSynth).toMaster()
        instruments[action.instrumentid].set({oscillator: {type: 'sawtooth'}})
    }

    const loopAdd = (action) => {
        console.log('add loopset', action.loops)

        const loopIds = Object.keys(action.loops)
        for (let i = 0; i < loopIds.length; i++) {
            const loopId = loopIds[i]
            const trackId = getTrackId(loopIds[i])

            loopNotes[loopId] = readNotes(action.loops[loopId].notes)
            loops[loopId] = new Tone.Part((time, note) => {

                // console.log('part note', note, 'time', time, Tone.Transport.position, Tone.Transport.progress)

                const duration = Tone.TimeBase(note.off) - Tone.TimeBase(note.on)
                instruments[trackId].triggerAttackRelease(note.n+note.o, duration, time, note.v)

            }, loopNotes[loopId])

            loops[loopId].start(0)
        }
    }

    const loopAddNote = (action) => {
        console.log('loopAddNote', action)
        const noteValue = { ...action.note, time: action.note.on }
        loopNotes[action.loopid].push(noteValue)
        loops[action.loopid].add(action.note.on, noteValue)
    }

    const loopDelNote = (action) => {
        console.log('loopDelNote', action)
        const noteValue = loopNotes[action.loopid].splice(action.index, 1)[0]
        loops[action.loopid].remove(noteValue.on, noteValue)
    }

    return {
        addInstrument,
        loopAdd,
        loopAddNote,
        loopDelNote,
        ...Transport(),
    }
}
