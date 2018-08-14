import { MASTER_LEVEL } from 'actions/master'

export const masterLevel = (state = 0, action) => {
    switch(action.type) {
        case MASTER_LEVEL:
            return action.level
        default:
            return state
    }
}
