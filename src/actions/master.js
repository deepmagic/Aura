export const MASTER_LEVEL = 'MASTER_LEVEL'
export const MASTER_VOLUME = 'MASTER_VOLUME'

export const masterLevel = (level) => ({
    type: MASTER_LEVEL,
    level,
})

export const masterVolume = (volume) => ({
    type: MASTER_VOLUME,
    volume,
})
