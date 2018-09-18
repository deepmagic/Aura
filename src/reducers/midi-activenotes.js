import {
    MIDI_ACTIVENOTES_ADD,
    MIDI_ACTIVENOTES_DEL,
    MIDI_ACTIVENOTES_UPDATE,
    MIDI_ACTIVENOTES_CLEAR,
} from 'actions/midi-activenotes'

const initialState = {}

export const midiActivenotes = (state = initialState, action) => {
    switch(action.type) {
        case MIDI_ACTIVENOTES_ADD:
        case MIDI_ACTIVENOTES_UPDATE: {
            const { type: deleted, ...newNote } = action
            return { ...state, [action.n + action.o]: newNote } // notes can be overwritten here
        }
        case MIDI_ACTIVENOTES_DEL: {
            const { [action.note]: deleted, ...activeNotes } = state
            return { ...activeNotes }
        }
        case MIDI_ACTIVENOTES_CLEAR:
            return initialState
        default:
            return state
    }
}
