export const MIDI_NOTE_ON = 'MIDI_NOTE_ON'
export const MIDI_NOTE_OFF = 'MIDI_NOTE_OFF'
export const MIDI_CTRL_CHANGE = 'MIDI_CTRL_CHANGE'

export const midiNoteOn = (data) => ({ type: MIDI_NOTE_ON, data })
export const midiNoteOff = (data) => ({ type: MIDI_NOTE_OFF, data})
export const midiCtrlChange = (data)  => ({ type: MIDI_CTRL_CHANGE, data })
