export const SCENE_ADD = 'SCENE_ADD'
export const SCENE_DEL = 'SCENE_DEL'

export const sceneAdd = (sceneid, scene) => ({
    type: SCENE_ADD,
    sceneid,
    scene
})
export const sceneDel = (sceneid) => ({
    type: SCENE_DEL,
    sceneid
})
