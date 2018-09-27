import {
    TRANSPORT_PLAY,
    TRANSPORT_PAUSE,
    TRANSPORT_STOP,
    TRANSPORT_RECORD,
    TRANSPORT_REPEAT,
    TRANSPORT_TIME,
    TRANSPORT_BPM,
    TRANSPORT_LOOP_LENGTH,
} from 'actions/transport'

import {
    TRANSPORT_DEFAULT_BPM,
    TRANSPORT_DEFAULT_LOOPLENGTH,
} from 'controller/constants'

const initialState = {
    bpm: TRANSPORT_DEFAULT_BPM,
    loopLength: TRANSPORT_DEFAULT_LOOPLENGTH,
}

export const transport = (state = initialState, action) => {
    switch(action.type) {
        case TRANSPORT_PLAY:
            return { ...state, playing: true, paused: false }
        case TRANSPORT_PAUSE:
            return { ...state, playing: false, paused: true }
        case TRANSPORT_STOP:
            return { ...state, playing: false, paused: false, recording: false }
        case TRANSPORT_RECORD:
            return { ...state, recording: action.flag }
        case TRANSPORT_REPEAT:
            return { ...state, repeat: !state.repeat }
        case TRANSPORT_BPM:
            return { ...state, bpm: action.bpm }
        case TRANSPORT_LOOP_LENGTH:
            return { ...state, loopLength: action.loopLength }
        default:
            return state
    }
}

export const transportTime = (state = 0, action) => {
    switch(action.type) {
        case TRANSPORT_TIME:
            return action.time
        default:
            return state
    }
}
