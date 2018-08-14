import { ui } from 'reducers/ui'
import { song } from 'reducers/song'
import { scenes, sceneActive } from 'reducers/scenes'
import { tracks } from 'reducers/tracks'
import { instruments } from 'reducers/instruments'
import { loops, loopActive } from 'reducers/loops'
import { transport, transportTime } from 'reducers/transport'
import { masterLevel } from 'reducers/master'

import { combineReducers } from 'redux'
export const rootReducer = combineReducers({
    ui,
    song,
    scenes,
    sceneActive,
    tracks,
    instruments,
    loops,
    loopActive,
    masterLevel,
    transport,
    transportTime,
})
