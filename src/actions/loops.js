export const LOOP_ADD = 'LOOP_ADD'
export const LOOP_SET_ADD = 'LOOP_SET_ADD'
export const LOOP_DEL = 'LOOP_DEL'
export const LOOP_SET_ACTIVE = 'LOOP_SET_ACTIVE'
export const LOOP_ADD_NOTE = 'LOOP_ADD_NOTE'
export const LOOP_DEL_NOTE = 'LOOP_DEL_NOTE'

export const loopAdd = (loopid, loop) => ({
    type: LOOP_ADD,
    loopid,
    loop,
})

export const loopSetAdd = (loops) => ({
    type: LOOP_SET_ADD,
    loops,
})

export const loopDel = (loopid) => ({
    type: LOOP_DEL,
    loopid,
})

export const setActiveLoop = (loopid) => ({
    type: LOOP_SET_ACTIVE,
    loopid,
})

export const loopAddNote = (loopid, note) => ({
    type: LOOP_ADD_NOTE,
    loopid,
    note,
})

export const loopDelNote = (loopid, index) => ({
    type: LOOP_DEL_NOTE,
    loopid,
    index,
})
