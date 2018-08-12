import {
    UI_TOGGLE_EXPAND,
    UI_TOGGLE_SONGPATTERN,
    UI_TOGGLE_INSTRUMENT_SELECT,
    UI_PATTERN_TOOL,
} from 'actions/ui'

const initialState = {
    expand: true,
    songpattern: false,
    instrumentselect: false,
    patternTool: 'draw',
}

export const ui = (state = initialState, action) => {
    switch(action.type) {
        case UI_TOGGLE_EXPAND:
            return { ...state, expand: !state.expand }
        case UI_TOGGLE_SONGPATTERN:
            return { ...state, songpattern: !state.songpattern }
        case UI_TOGGLE_INSTRUMENT_SELECT:
            return { ...state, instrumentselect: !state.instrumentselect }
        case UI_PATTERN_TOOL:
            return { ...state, patternTool: action.tool }
        default:
            return state
    }
}
