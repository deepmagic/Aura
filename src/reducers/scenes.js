// TODO create generic normalized object
// reducer and use for scenes, tracks, instruments

import {
    SCENE_ADD,
    SCENE_DEL,
} from 'actions/scenes'

const initialState = {
    '1':  {name: '1'},
    ids: [1,],
};

export const scenes = (state = initialState, action) => {
    switch(action.type) {
        case SCENE_ADD:
            return {
                ...state,
                [action.sceneid]: action.scene,
                ids: [ ...state.ids, action.sceneid ]
            }
        case SCENE_DEL:
            const { [action.sceneid]: removed, ...newScenes } = state
            newScenes.ids = newScenes.ids.filter(id => id !== action.sceneid)
            return newScenes
        default:
            return state
    }
}
