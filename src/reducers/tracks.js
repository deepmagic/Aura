import {
    TRACK_ADD,
    TRACK_DEL,
    TRACK_LEVELS, // TODO refactor master as track 0 
    TRACK_MUTE,
    TRACK_NAME,
    TRACK_PAN,
    TRACK_SEND,
    TRACK_SOLO,
    TRACK_VOLUME,
} from 'actions/tracks'

const initialState = {
    ids: [],
}

const updateTrack = (state, action, key) => {
    return {
        ...state,
        [action.trackid]: { ... state[action.trackid], [key]: action[key] }
    }
}

export const tracks = (state = initialState, action) => {
    switch(action.type) {
        case TRACK_ADD:
            return {
                ...state,
                [action.trackid]: action.track,
                ids: [ ...state.ids, action.trackid ]
            }
        case TRACK_DEL:
            const { [action.trackid]: deleted, ...newTracks } = state
            newTracks.ids = newTracks.ids.filter(id => id !== action.trackid)
            return newTracks
        case TRACK_LEVELS: {
            const newTracks = {}

            for (let i = 0; i < action.tracks.length; i++) {
                const trackid = action.tracks[i]
                const level = action.levels[i]
                newTracks[trackid] = { ...state[trackid], level }
            }

            return { ...state, ...newTracks }
        }
        case TRACK_MUTE:
            return updateTrack(state, action, 'mute')
        case TRACK_NAME:
            return updateTrack(state, action, 'name')
        case TRACK_PAN:
            return updateTrack(state, action, 'pan')
        case TRACK_SEND:
            return updateTrack(state, action, 'send')
        case TRACK_SOLO:
            // TODO unsolo all other tracks, Tone does this internally
            return updateTrack(state, action, 'solo')
        case TRACK_VOLUME:
            return updateTrack(state, action, 'volume')
        default:
            return state
    }
}
