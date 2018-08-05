import {
    LOOP_ADD,
    LOOP_SET_ADD,
    LOOP_DEL,
    LOOP_ADD_NOTE,
    LOOP_DEL_NOTE,
    LOOP_SET_ACTIVE,
} from 'actions/loops'

export const loops = (state = {}, action) => {
    switch(action.type) {
        case LOOP_ADD:
            return { ...state, [action.loopid]: action.loop }
        case LOOP_SET_ADD:
            return { ...state, ...action.loops }
        case LOOP_DEL: {
            const { [action.loopid]: deleted, ...newLoops } = state
            return newLoops
        }
        case LOOP_ADD_NOTE: {
            const loop = state[action.loopid]
            return {
                ...state,
                [action.loopid]: {
                    ...loop,
                    notes: [...loop.notes, action.note]
                }
            }
        }
        case LOOP_DEL_NOTE: {
            const loop = state[action.loopid]
            return {
                ...state,
                [action.loopid]: {
                    ...loop,
                    notes: loop.notes.filter((_, index) => index !== action.index)
                }
            }
        }
        default:
            return state
    }
}

export const loopActive = (state = '', action) => {
    switch(action.type) {
        case LOOP_SET_ACTIVE:
            return action.loopid
        default:
            return state
    }
}
