import {
    TRACK_ADD,
    TRACK_DEL,
} from 'actions/tracks'

const initialState = {
    ids: [],
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
            const { [action.trackid]: removed, ...newTracks } = state
            newTracks.ids = newTracks.ids.filter(id => id !== action.trackid)
            return newTracks
        default:
            return state
    }
}
