import { MIDI_SET_TRACK } from 'actions/midi'

export const midi = (state = {}, action) => {
    switch(action.type) {
        case MIDI_SET_TRACK:
            return { trackid: action.trackid }
        default:
            return state
    }
}
