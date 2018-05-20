import {
    TRACK_ADD,
    TRACK_DEL,
} from 'actions/tracks'

const initialState = {
    '1':  {name: 'track1', },
    '2':  {name: 'track2', },
    '3':  {name: 'track3', },
    '4':  {name: 'track4', },
    '5':  {name: 'track5', },
    '6':  {name: 'track6', },
    '7':  {name: 'track7', },
    '8':  {name: 'track8', },
    '9':  {name: 'track9', },
    '10': {name: 'track10', },
    '11': {name: 'track11', },
    '12': {name: 'track12', },
    '13': {name: 'track13', },
    ids: [1,2,3,4,5,6,7,8,9,10,11,12,13],
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
