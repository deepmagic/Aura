// trivial redux setup
import { combineReducers } from 'redux'

import { ui } from 'reducers/ui'
import { song } from 'reducers/song'
import { scenes } from 'reducers/scenes'
import { tracks } from 'reducers/tracks'
import { instruments } from 'reducers/instruments'
import { loops } from 'reducers/loops'

export const rootReducer = combineReducers({
    ui,
    song,
    scenes,
    tracks,
    instruments,
    loops,
})
