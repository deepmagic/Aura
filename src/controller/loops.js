import Tone from 'tone'
import {
    getLoopsMaxBars,
    getSceneId,
    getTrackId,
} from 'ui/sequencer/utils'
import { transportLoopLength } from 'actions/transport'

window.Tone = Tone

const readNotes = (notes) => notes.map((note) => ({ ...note, time: note.on }))

export const Loops = (instruments) => {
    const loops = {}      // references to Tone.Part
    const loopNotes = {}  // maintain refernce to note values in loops, required for Part.remove

    const updateTransportLoopEnd = (store) => {
        const { sceneActive, loops: stateLoops } = store.getState()
        const maxBars = getLoopsMaxBars(sceneActive, stateLoops)

        store.dispatch(transportLoopLength(maxBars))
    }

    const loopAdd = (action, store) => {
        const { sceneActive } = store.getState()
        const loopIds = Object.keys(action.loops)

        for (let i = 0; i < loopIds.length; i++) {
            const loopId = loopIds[i]
            const trackId = getTrackId(loopIds[i])

            loopNotes[loopId] = readNotes(action.loops[loopId].notes)
            loops[loopId] = new Tone.Part(instruments[trackId].play, loopNotes[loopId])
            loops[loopId].loop = true
            loops[loopId].loopStart = 0
            loops[loopId].loopEnd = `${action.loops[loopId].bars}m`

            if (getSceneId(loopId) === sceneActive) {
                loops[loopId].start(0)
            }
        }

        // loop is added to store after middleware fn completes
        setTimeout(() => { updateTransportLoopEnd(store) })
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

    const loopSetBars = (action, store) => {
        loops[action.loopid].loopEnd = `${action.bars}m`

        // loop is updated after middleware completes
        setTimeout(() => { updateTransportLoopEnd(store) })
    }

    const sceneSetActive = (sceneId, store) => {
        for(const loopId in loops) {
            if (sceneId === getSceneId(loopId)) {
                loops[loopId].start(0)
            } else {
                loops[loopId].stop(0)
            }
        }

        const {
            sceneActive,
            transport,
        } = store.getState()

        if (transport.playing) {
            Tone.Transport.position = 0
        }

        if (sceneActive !== sceneId) {
            setTimeout(() => { updateTransportLoopEnd(store) })
        }
    }

    return {
        loops,
        loopNotes,
        actions: {
            loopAdd,
            loopAddNote,
            loopDelNote,
            loopSetBars,
            sceneSetActive,
        }
    }
}
