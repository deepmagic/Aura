export const SCENE_ADD = 'SCENE_ADD'
export const SCENE_DEL = 'SCENE_DEL'
export const SCENE_SET_ACTIVE = 'SCENE_SET_ACTIVE'

export const sceneAdd = (sceneid, scene) => ({
    type: SCENE_ADD,
    sceneid,
    scene
})

export const sceneDel = (sceneid) => ({
    type: SCENE_DEL,
    sceneid
})

export const sceneSetActive = (sceneid) => ({
    type: SCENE_SET_ACTIVE,
    sceneid
})
