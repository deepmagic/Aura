import {
    INSTRUMENT_ADD,
    INSTRUMENT_DEL,
} from 'actions/instruments'

const initialState = {
    ids: [],
}

export const instruments = (state = initialState, action) => {
    switch(action.type) {
        case INSTRUMENT_ADD:
            return {
                ...state,
                [action.trackid]: action.instrument,
                ids: [ ...state.ids, action.trackid ]
            }
        case INSTRUMENT_DEL:
            const { [action.trackid]: deleted, ...newInstruments } = state
            newInstruments.ids = newInstruments.ids.filter(id => id !== action.trackid)
            return newInstruments
        default:
            return state
    }
}
