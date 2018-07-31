import {
    LOOP_SET_ADD,
    LOOP_ADD_NOTE,
    LOOP_DEL_NOTE,
} from 'actions/loops'
import {
    INSTRUMENT_ADD
} from 'actions/instruments'

import { Controller } from './controller'
const ToneController = Controller()

export const toneMiddleware = store => next => action => {
    // console.log('action', action)
    switch(action.type) {
        case INSTRUMENT_ADD:
            ToneController.addInstrument(action)
            break;
        case LOOP_SET_ADD:
            ToneController.loopAdd(action)
            break;
        case LOOP_ADD_NOTE:
            ToneController.loopAddNote(action)
            break;
        case LOOP_DEL_NOTE:
            ToneController.loopDelNote(action)
            break;
    }

    next(action)
}
