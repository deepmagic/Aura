
export const Midi = (instruments) => {
    let midiInstrument = null

    const midiSetTrack = (trackid) => {
        if (instruments[trackid]) {
            midiInstrument = instruments[trackid]
        } else {
            midiInstrument = null
        }
    }

    const midiNoteOn = (data) => {
        if (!midiInstrument) return

        midiInstrument.midiOn(data)
    }

    const midiNoteOff = (data) => {
        if (!midiInstrument) return

        midiInstrument.midiOff(data)
    }

    const midiCtrlChange = () => {
        // midiInstrument
    }

    return {
        midiSetTrack,
        midiNoteOn,
        midiNoteOff,
        midiCtrlChange,
    }
}
