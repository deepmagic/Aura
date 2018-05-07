// trivial redux setup
import { ui } from 'reducers/ui'

import { combineReducers } from 'redux'
export const rootReducer = combineReducers({
    ui
})
