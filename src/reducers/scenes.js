import {
    SCENE_ADD,
    SCENE_DEL,
} from 'actions/scenes'

const initialState = {
    '1':  {name: 'scene1'},
    '2':  {name: 'scene2'},
    '3':  {name: 'scene3'},
    '4':  {name: 'scene4'},
    '5':  {name: 'scene5'},
    '6':  {name: 'scene6'},
    '7':  {name: 'scene7'},
    '8':  {name: 'scene8'},
    '9':  {name: 'scene9'},
    '10': {name: 'scene10'},
    ids: [1,2,3,4,5,6,7,8,9,10],
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
