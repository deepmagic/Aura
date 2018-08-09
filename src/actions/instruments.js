export const INSTRUMENT_ADD = 'INSTRUMENT_ADD'
export const INSTRUMENT_DEL = 'INSTRUMENT_DEL'

export const instrumentAdd = (trackid, instrument) => ({
    type: INSTRUMENT_ADD,
    trackid,
    instrument
})
export const instrumentDel = (trackid) => ({
    type: INSTRUMENT_DEL,
    trackid
})
