import {
    UI_TOGGLE_EXPAND,
    UI_TOGGLE_SONGPATTERN,
} from 'actions/ui'

const initialState = {
    expand: false,
    songpattern: false,
}

export const ui = (state = initialState, action) => {
    switch(action.type) {
        case UI_TOGGLE_EXPAND:
            return { expand: !state.expand }
        case UI_TOGGLE_SONGPATTERN:
            return { songpattern: !state.songpattern }
        default:
            return state
    }
}
