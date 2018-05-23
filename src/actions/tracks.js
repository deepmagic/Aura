export const TRACK_ADD = 'TRACK_ADD'
export const TRACK_DEL = 'TRACK_DEL'

export const trackAdd = (trackid, track) => ({
    type: TRACK_ADD,
    trackid,
    track
})
export const trackDel = (trackid) => ({
    type: TRACK_DEL,
    trackid
})
