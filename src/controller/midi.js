import Tone from 'tone'

export const Midi = (instruments) => {
    let midiInstrument = null

    window.__debug_transport = Tone.Transport

    // update active notes loop
        // update off of all active notes to current position - to show note stretching while being input
        // if active note isn't finished by loop end,
            // end it on the loop end, and start another active for this note
    const recordNoteOn = (data, store) => {
        const { transport } = store.getState()
        if (!(transport.recording && transport.playing)) return

        console.log('record note on', data, Tone.Transport.position)
        // add note to active notes, with on/off at position

    }
    const recordNoteOff = (data, store) => {
        const { transport } = store.getState()
        if (!(transport.recording && transport.playing)) return

        console.log('record note off', data, Tone.Transport.position)
        // move active note to real notes dispatch(noteAdd())
        // del from active notes dispatch(midiActivenotesDel())
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
