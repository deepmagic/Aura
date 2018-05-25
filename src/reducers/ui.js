import {
    UI_TOGGLE_EXPAND,
    UI_TOGGLE_SONGPATTERN,
    UI_TOGGLE_INSTRUMENT_SELECT,
} from 'actions/ui'

const initialState = {
    expand: false,
    songpattern: false,
    instrumentselect: false,
}

export const ui = (state = initialState, action) => {
    switch(action.type) {
        case UI_TOGGLE_EXPAND:
            return { expand: !state.expand }
        case UI_TOGGLE_SONGPATTERN:
            return { songpattern: !state.songpattern }
        case UI_TOGGLE_INSTRUMENT_SELECT:
            return { instrumentselect: !state.instrumentselect }
        default:
            return state
    }
}
