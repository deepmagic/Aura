import Tone from 'tone'

import { loopAddNote } from 'actions/loops'
import {
    midiActivenotesAdd,
    midiActivenotesDel
} from 'actions/midi-activenotes'

// TODO move this fn out of ui utils
import { getLoopId } from 'ui/sequencer/utils'

export const Midi = (instruments) => {
    let midiInstrument = null

    // window.__debug_transport = Tone.Transport

    // update active notes loop
        // update off of all active notes to current position - to show note stretching while being input
        // if active note isn't finished by loop end,
            // end it on the loop end

    const recordNoteOn = (data, store) => {
        const { transport } = store.getState()

        if (!transport.recording && !transport.playing) return

        console.log('record note on', data, Tone.Transport.position)
        // add note to active notes, with on/off at position
        const note = {
            n: data.note.name,
            o: data.note.octave,
            v: data.velocity,
            on: Tone.Transport.position,
            off: Tone.Transport.position
        }

        store.dispatch(midiActivenotesAdd(note))
    }
    const recordNoteOff = (data, store) => {
        const {
            transport,
            midi,
            midiActivenotes,
            sceneActive
        } = store.getState()

        if (!transport.recording && !transport.playing) return

        console.log('record note off', data, Tone.Transport.position, 'midi track', midi.trackid)

        const noteKey = data.note.name + data.note.octave
        const midiNote = { ...midiActivenotes[noteKey], off: Tone.Transport.position }
        const loopid = getLoopId(sceneActive, midi.trackid)

        store.dispatch(midiActivenotesDel(noteKey))   // delete note from active midi notes
        store.dispatch(loopAddNote(loopid, midiNote)) // add note to current scene:track loop
    }

// public
    const midiSetTrack = (trackid) => {
        if (instruments[trackid]) {
            midiInstrument = instruments[trackid]
        } else {
            midiInstrument = null
        }
    }
    const midiNoteOn = (data, store) => {
        if (!midiInstrument) return

        recordNoteOn(data, store)
        midiInstrument.midiOn(data)
    }
    const midiNoteOff = (data, store) => {
        if (!midiInstrument) return

        recordNoteOff(data, store)
        midiInstrument.midiOff(data)
    }
    const midiCtrlChange = (/* data, store */) => {
        // midiInstrument
        // record modulation
    }

    return {
        midiSetTrack,
        midiNoteOn,
        midiNoteOff,
        midiCtrlChange,
    }
}
