import { ui } from 'reducers/ui'
import { song } from 'reducers/song'
import { scenes } from 'reducers/scenes'
import { tracks } from 'reducers/tracks'
import { instruments } from 'reducers/instruments'
import { loops } from 'reducers/loops'
import { loopActive } from 'reducers/loop-active'

import { combineReducers } from 'redux'
export const rootReducer = combineReducers({
    ui,
    song,
    scenes,
    tracks,
    instruments,
    loops,
    loopActive,
})
