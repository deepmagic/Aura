export const INSTRUMENT_ADD = 'INSTRUMENT_ADD'
export const INSTRUMENT_DEL = 'INSTRUMENT_DEL'

export const instrumentAdd = (instrumentid, instrument) => ({
    type: INSTRUMENT_ADD,
    instrumentid,
    instrument
})
export const instrumentDel = (instrumentid) => ({
    type: INSTRUMENT_DEL,
    instrumentid
})
