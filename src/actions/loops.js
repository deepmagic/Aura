export const LOOP_ADD = 'LOOP_ADD'
export const LOOP_DEL = 'LOOP_DEL'

export const loopAdd = (sceneIndex, loopid, loop) => ({
    type: LOOP_ADD,
    loopid,
    loop
})
export const loopDel = (loopid) => ({
    type: LOOP_DEL,
    loopid
})
