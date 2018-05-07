import { UI_TOGGLE_EXPAND } from 'actions/ui'

const initialState = {
    expand: true
}

export const ui = (state = initialState, action) => {
    switch(action.type) {
        case UI_TOGGLE_EXPAND:
            return { expand: !state.expand }
        default:
            return state
    }
}
