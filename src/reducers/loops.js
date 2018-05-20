import {
    LOOP_ADD,
    LOOP_DEL,
} from 'actions/loops'

const initialState = {
    '1:1': { notes: [], bars: 1 }, '1:2': { notes: [], bars: 1 }, '1:3': { notes: [], bars: 1 }, '1:4': { notes: [], bars: 1 }, '1:5': { notes: [], bars: 1 }, '1:6': { notes: [], bars: 1 }, '1:7': { notes: [], bars: 1 }, '1:8': { notes: [], bars: 1 }, '1:9': { notes: [], bars: 1 }, '1:10': { notes: [], bars: 1 }, '1:11': { notes: [], bars: 1 }, '1:12': { notes: [], bars: 1 }, '1:13': { notes: [], bars: 1 },
    '2:1': { notes: [], bars: 1 }, '2:2': { notes: [], bars: 1 }, '2:3': { notes: [], bars: 1 }, '2:4': { notes: [], bars: 1 }, '2:5': { notes: [], bars: 1 }, '2:6': { notes: [], bars: 1 }, '2:7': { notes: [], bars: 1 }, '2:8': { notes: [], bars: 1 }, '2:9': { notes: [], bars: 1 }, '2:10': { notes: [], bars: 1 }, '2:11': { notes: [], bars: 1 }, '2:12': { notes: [], bars: 1 }, '2:13': { notes: [], bars: 1 },
    '3:1': { notes: [], bars: 1 }, '3:2': { notes: [], bars: 1 }, '3:3': { notes: [], bars: 1 }, '3:4': { notes: [], bars: 1 }, '3:5': { notes: [], bars: 1 }, '3:6': { notes: [], bars: 1 }, '3:7': { notes: [], bars: 1 }, '3:8': { notes: [], bars: 1 }, '3:9': { notes: [], bars: 1 }, '3:10': { notes: [], bars: 1 }, '3:11': { notes: [], bars: 1 }, '3:12': { notes: [], bars: 1 }, '3:13': { notes: [], bars: 1 },
    '4:1': { notes: [], bars: 1 }, '4:2': { notes: [], bars: 1 }, '4:3': { notes: [], bars: 1 }, '4:4': { notes: [], bars: 1 }, '4:5': { notes: [], bars: 1 }, '4:6': { notes: [], bars: 1 }, '4:7': { notes: [], bars: 1 }, '4:8': { notes: [], bars: 1 }, '4:9': { notes: [], bars: 1 }, '4:10': { notes: [], bars: 1 }, '4:11': { notes: [], bars: 1 }, '4:12': { notes: [], bars: 1 }, '4:13': { notes: [], bars: 1 },
    '5:1': { notes: [], bars: 1 }, '5:2': { notes: [], bars: 1 }, '5:3': { notes: [], bars: 1 }, '5:4': { notes: [], bars: 1 }, '5:5': { notes: [], bars: 1 }, '5:6': { notes: [], bars: 1 }, '5:7': { notes: [], bars: 1 }, '5:8': { notes: [], bars: 1 }, '5:9': { notes: [], bars: 1 }, '5:10': { notes: [], bars: 1 }, '5:11': { notes: [], bars: 1 }, '5:12': { notes: [], bars: 1 }, '5:13': { notes: [], bars: 1 },
    '6:1': { notes: [], bars: 1 }, '6:2': { notes: [], bars: 1 }, '6:3': { notes: [], bars: 1 }, '6:4': { notes: [], bars: 1 }, '6:5': { notes: [], bars: 1 }, '6:6': { notes: [], bars: 1 }, '6:7': { notes: [], bars: 1 }, '6:8': { notes: [], bars: 1 }, '6:9': { notes: [], bars: 1 }, '6:10': { notes: [], bars: 1 }, '6:11': { notes: [], bars: 1 }, '6:12': { notes: [], bars: 1 }, '6:13': { notes: [], bars: 1 },
    '7:1': { notes: [], bars: 1 }, '7:2': { notes: [], bars: 1 }, '7:3': { notes: [], bars: 1 }, '7:4': { notes: [], bars: 1 }, '7:5': { notes: [], bars: 1 }, '7:6': { notes: [], bars: 1 }, '7:7': { notes: [], bars: 1 }, '7:8': { notes: [], bars: 1 }, '7:9': { notes: [], bars: 1 }, '7:10': { notes: [], bars: 1 }, '7:11': { notes: [], bars: 1 }, '7:12': { notes: [], bars: 1 }, '7:13': { notes: [], bars: 1 },
    '8:1': { notes: [], bars: 1 }, '8:2': { notes: [], bars: 1 }, '8:3': { notes: [], bars: 1 }, '8:4': { notes: [], bars: 1 }, '8:5': { notes: [], bars: 1 }, '8:6': { notes: [], bars: 1 }, '8:7': { notes: [], bars: 1 }, '8:8': { notes: [], bars: 1 }, '8:9': { notes: [], bars: 1 }, '8:10': { notes: [], bars: 1 }, '8:11': { notes: [], bars: 1 }, '8:12': { notes: [], bars: 1 }, '8:13': { notes: [], bars: 1 },
    '9:1': { notes: [], bars: 1 }, '9:2': { notes: [], bars: 1 }, '9:3': { notes: [], bars: 1 }, '9:4': { notes: [], bars: 1 }, '9:5': { notes: [], bars: 1 }, '9:6': { notes: [], bars: 1 }, '9:7': { notes: [], bars: 1 }, '9:8': { notes: [], bars: 1 }, '9:9': { notes: [], bars: 1 }, '9:10': { notes: [], bars: 1 }, '9:11': { notes: [], bars: 1 }, '9:12': { notes: [], bars: 1 }, '9:13': { notes: [], bars: 1 },
    '10:1': { notes: [], bars: 1 }, '10:2': { notes: [], bars: 1 }, '10:3': { notes: [], bars: 1 }, '10:4': { notes: [], bars: 1 }, '10:5': { notes: [], bars: 1 }, '10:6': { notes: [], bars: 1 }, '10:7': { notes: [], bars: 1 }, '10:8': { notes: [], bars: 1 }, '10:9': { notes: [], bars: 1 }, '10:10': { notes: [], bars: 1 }, '10:11': { notes: [], bars: 1 }, '10:12': { notes: [], bars: 1 }, '10:13': { notes: [], bars: 1 },
}

export const loops = (state = initialState, action) => {
    switch(action.type) {
        case LOOP_ADD:
            return { ...state, [action.loopid]: action.loop }
        case LOOP_DEL:
            const { [action.loopid]: removed, ...newLoops } = state
            return newLoops
        default:
            return state
    }
}
