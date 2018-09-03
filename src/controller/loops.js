import Tone from 'tone'

const readNotes = (notes) => notes.map((note) => ({ ...note, time: note.on }))
const getTrackId = (id) => id.split(':')[1]

export const Loops = (instruments) => {
    const loops = {}      // references to Tone.Part
    const loopNotes = {}  // maintain refernce to note values in loops, required for Part.remove

    // window.__debug_loopnotes = loopNotes

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

    return {
        loops,
        loopNotes,
        actions: {
            loopAdd,
            loopAddNote,
            loopDelNote,
        }
    }
}
