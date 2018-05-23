export const LOOP_ADD = 'LOOP_ADD'
export const LOOP_SET_ADD = 'LOOP_SET_ADD'
export const LOOP_DEL = 'LOOP_DEL'

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
