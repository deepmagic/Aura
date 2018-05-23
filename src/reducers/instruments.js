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
                [action.instrumentid]: action.instrument,
                ids: [ ...state.ids, action.instrumentid ]
            }
        case INSTRUMENT_DEL:
            const { [action.instrumentid]: removed, ...newInstruments } = state
            newInstruments.ids = newInstruments.ids.filter(id => id !== action.instrumentid)
            return newInstruments
        default:
            return state
    }
}
