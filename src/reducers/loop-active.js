import { LOOP_SET_ACTIVE } from 'actions/loops'

export const loopActive = (state = '', action) => {
    switch(action.type) {
        case LOOP_SET_ACTIVE:
            return action.loopid
        default:
            return state
    }
}
