export const MIDI_ACTIVENOTES_ADD = 'MIDI_ACTIVENOTES_ADD'
export const MIDI_ACTIVENOTES_DEL = 'MIDI_ACTIVENOTES_DEL'
export const MIDI_ACTIVENOTES_UPDATE = 'MIDI_ACTIVENOTES_UPDATE'
export const MIDI_ACTIVENOTES_CLEAR = 'MIDI_ACTIVENOTES_CLEAR'

export const midiActivenotesAdd = (n, o, on, off, v) => ({
    type: MIDI_ACTIVENOTES_ADD,
    n, o, on, off, v,
})
export const midiActivenotesDel = (n, o) => ({
    type: MIDI_ACTIVENOTES_DEL,
    n, o,
})
export const midiActivenotesUpdate = (n, o, on, off, v) => ({
    type: MIDI_ACTIVENOTES_UPDATE,
    n, o, on, off, v,
})
export const midiActivenotesClear = () => ({
    type: MIDI_ACTIVENOTES_CLEAR
})
