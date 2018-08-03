import {
    LOOP_SET_ADD,
    LOOP_ADD_NOTE,
    LOOP_DEL_NOTE,
} from 'actions/loops'
import {
    INSTRUMENT_ADD
} from 'actions/instruments'

import {
    TRANSPORT_PLAY,
    TRANSPORT_PAUSE,
    TRANSPORT_STOP,
} from 'actions/transport'

import { Controller } from './controller'
const ToneController = Controller()

export const toneMiddleware = store => next => action => {
    // TODO something besides switch
    switch(action.type) {
    // INSTRUMENTS
        case INSTRUMENT_ADD:
            ToneController.addInstrument(action)
            break
    // LOOPS
        case LOOP_SET_ADD:
            ToneController.loopAdd(action)
            break
        case LOOP_ADD_NOTE:
            ToneController.loopAddNote(action)
            break
        case LOOP_DEL_NOTE:
            ToneController.loopDelNote(action)
            break
    // TRANSPORT
        case TRANSPORT_PLAY:
            ToneController.transportPlay()
            break
        case TRANSPORT_PAUSE:
            ToneController.transportPause()
            break
        case TRANSPORT_STOP:
            ToneController.transportStop()
            break
    }

    next(action)
}
