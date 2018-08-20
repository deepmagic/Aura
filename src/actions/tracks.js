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

export const TRACK_LEVEL = 'TRACK_LEVEL'
export const TRACK_MUTE = 'TRACK_MUTE'
export const TRACK_NAME = 'TRACK_NAME'
export const TRACK_PAN = 'TRACK_PAN'
export const TRACK_SEND = 'TRACK_SEND'
export const TRACK_SOLO = 'TRACK_SOLO'
export const TRACK_VOLUME = 'TRACK_VOLUME'

export const trackLevel = (trackid, level) => ({
    type: TRACK_LEVEL,
    trackid,
    level,
})
export const trackMute = (trackid, mute) => ({
    type: TRACK_MUTE,
    trackid,
    mute,
})
export const trackName = (trackid, name) => ({
    type: TRACK_NAME,
    trackid,
    name,
})
export const trackPan = (trackid, pan) => ({
    type: TRACK_PAN,
    trackid,
    pan,
})
export const trackSend = (trackid, send) => ({
    type: TRACK_SEND,
    trackid,
    send,
})
export const trackSolo = (trackid, solo) => ({
    type: TRACK_SOLO,
    trackid,
    solo,
})
export const trackVolume = (trackid, volume) => ({
    type: TRACK_VOLUME,
    trackid,
    volume,
})
