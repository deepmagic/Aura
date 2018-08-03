export const TRANSPORT_INIT = 'TRANSPORT_INIT'
export const TRANSPORT_PLAY = 'TRANSPORT_PLAY'
export const TRANSPORT_PAUSE = 'TRANSPORT_PAUSE'
export const TRANSPORT_STOP = 'TRANSPORT_STOP'
export const TRANSPORT_RECORD = 'TRANSPORT_RECORD'
export const TRANSPORT_TIME = 'TRANSPORT_TIME'

export const transportInit = () => ({ type: TRANSPORT_INIT })
export const transportPlay = () => ({ type: TRANSPORT_PLAY })
export const transportPause = () => ({ type: TRANSPORT_PAUSE })
export const transportStop = () => ({ type: TRANSPORT_STOP })
export const transportRecord = (flag) => ({ type: TRANSPORT_RECORD, flag })
export const transportTime = (time) => ({ type: TRANSPORT_TIME, time })
// set bpm
// set time signature
// set swing
// set loopEnd
