
const initialState = {
    '1':  {name: 'instrument1', },
    '2':  {name: 'instrument2', },
    '3':  {name: 'instrument3', },
    '4':  {name: 'instrument4', },
    '5':  {name: 'instrument5', },
    '6':  {name: 'instrument6', },
    '7':  {name: 'instrument7', },
    '8':  {name: 'instrument8', },
    '9':  {name: 'instrument9', },
    '10': {name: 'instrument10', },
    '11': {name: 'instrument11', },
    '12': {name: 'instrument12', },
    '13': {name: 'instrument13', },
    ids: [1,2,3,4,5,6,7,8,9,10,11,12,13],
}

export const instruments = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state
    }
}
