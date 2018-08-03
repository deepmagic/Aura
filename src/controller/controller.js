import Tone from 'tone'
import { Transport } from './transport'

// per loop
const fmSynth = new Tone.PolySynth(6, Tone.AMSynth).toMaster()
fmSynth.set({oscillator: {type: 'square'}})

// global
Tone.Transport.bpm.value = 120
Tone.Transport.setLoopPoints(0, '1m')
Tone.Transport.loop = true

/*
const patternNotes = [
    { n: 'C',  o: 3, v: 0.9, on: '0:0:0.0',  off: '0:0:1.0' },
    { n: 'E',  o: 3, v: 0.9, on: '0:0:2.0',  off: '0:0:3.0' },
    { n: 'G',  o: 3, v: 0.9, on: '0:0:4.0',  off: '0:0:5.0' },
    { n: 'B',  o: 3, v: 0.9, on: '0:0:6.0',  off: '0:0:7.0' },
    { n: 'C',  o: 4, v: 0.9, on: '0:0:8.0',  off: '0:0:9.0' },
    { n: 'B',  o: 3, v: 0.9, on: '0:0:10.0', off: '0:0:11.0' },
    { n: 'G',  o: 3, v: 0.9, on: '0:0:12.0', off: '0:0:13.0' },
    { n: 'E',  o: 3, v: 0.9, on: '0:0:14.0', off: '0:0:15.0' },
]

const pNotes = patternNotes.map((note) =>
    ({ ...note, time: note.on })
)

const part = new Tone.Part((time, note) => {
    console.log('part note', note, 'time', time, Tone.Transport.position, Tone.Transport.progress)

    const duration = Tone.TimeBase(note.off) - Tone.TimeBase(note.on)
    fmSynth.triggerAttackRelease(note.n+note.o, duration, time, note.v)

}, pNotes)
part.start(0)
*/

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
