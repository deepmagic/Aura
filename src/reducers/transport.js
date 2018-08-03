import {
    TRANSPORT_PLAY,
    TRANSPORT_PAUSE,
    TRANSPORT_STOP,
    TRANSPORT_RECORD,
    TRANSPORT_TIME,
} from 'actions/transport'

export const transport = (state = {}, action) => {
    switch(action.type) {
        case TRANSPORT_PLAY:
            return { ...state, playing: true, paused: false }
        case TRANSPORT_PAUSE:
            return { ...state, playing: false, paused: true }
        case TRANSPORT_STOP:
            return { ...state, playing: false, paused: false, recording: false }
        case TRANSPORT_RECORD:
            return { ...state, recording: action.flag }
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
